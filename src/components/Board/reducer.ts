import { Actions, GameStatus, ShipStatus, Turn } from '../../enums'
import { Action, Coordinate, Ship } from '../../types'
import { randomStr } from '../../utils/random'
import {
  coordinateName,
  generateShipsRandomlyPositioned,
  hasCoordinate,
  hasShipOnPosition,
} from '../../utils/miscellaneous'

export const PLAYER_SHOTS = 3
export const WAIT_BEFORE_TURN_TIME = 3000
export const GAME_SIZE = 10
export const TOTAL_SHIPS = 1

const floatingShipsFilter = (ship: Ship) =>
  ship.totalHits < ship.positions.length

export type State = {
  peerId: string
  peerConnected: boolean
  turn: Turn
  gameStatus: GameStatus
  playerReady: boolean
  opponentReady: boolean
  playerPositioned: boolean
  opponentPositioned: boolean
  playerShots: number
  opponentShots: number
  lastShotPosition: Coordinate | null
  lastShotHit: boolean
  lastShotSunk: boolean
  playerShips: Ship[]
  playerFloatingShips: number
  opponentFloatingShips: number
  playerHits: Coordinate[]
  playerMisses: Coordinate[]
  opponentHits: Coordinate[]
  opponentMisses: Coordinate[]
  afterTurnDelay: boolean
  winner: Turn | null
  log: string[]
}

const persistAndReturn = (state: State): State => state

const retrieveState = (state: State) => persistAndReturn(state)

export const initialState: State = retrieveState({
  peerId: randomStr(8),
  peerConnected: false,
  turn: Turn.opponent,
  gameStatus: GameStatus.idle,
  playerReady: false,
  opponentReady: false,
  playerPositioned: false,
  opponentPositioned: false,
  playerShots: 3,
  opponentShots: 3,
  lastShotPosition: null,
  lastShotHit: false,
  lastShotSunk: false,
  playerShips: generateShipsRandomlyPositioned(GAME_SIZE, TOTAL_SHIPS),
  playerFloatingShips: TOTAL_SHIPS,
  opponentFloatingShips: TOTAL_SHIPS,
  playerHits: [],
  playerMisses: [],
  opponentHits: [],
  opponentMisses: [],
  afterTurnDelay: false,
  winner: null,
  log: [],
})

const reducerFunction = (state: State, action: Action): State => {
  switch (action.type) {
    /**
     * With this action we change states to reflect an opponent being
     * available within the peer connection.
     */
    case Actions.CONNECTION_ESTABLISHED:
      return {
        ...state,
        peerConnected: true,
        log: [
          'An opponent have connected to your game! Waiting for them to be ready.',
          ...state.log,
        ],
      }

    /**
     * When the player shots, we must change the state to reflect the ammunition
     * reduction as well as define if the turn must be passed (afterTurnDelay).
     * We also record the last shot position so we can process it later.
     */
    case Actions.SHOT:
      if (state.gameStatus !== GameStatus.ongoing) return state
      if (state.playerShots === 0) return state
      if (action.position === undefined) return state
      return persistAndReturn({
        ...state,
        playerShots: state.playerShots - 1,
        afterTurnDelay: state.playerShots === 1,
        log: [
          `Sending shot to position ${coordinateName(action.position)}`,
          ...state.log,
        ],
        lastShotPosition: action.position,
      })

    /**
     * When the opponent notifies back regarding a hit, we need to update
     * the state to reflect the number of hits and update the logs.
     */
    case Actions.PLAYER_HIT:
      if (!action.position) return state
      return persistAndReturn({
        ...state,
        playerHits: [...state.playerHits, action.position],
        log: [`You HIT a ship!`, ...state.log],
      })

    /**
     * Similarly to what happens when the opponent notifies about a hit,
     * we need to update our state whenever the player misses a shot.
     */
    case Actions.PLAYER_MISS:
      if (!action.position) return state
      return persistAndReturn({
        ...state,
        playerMisses: [...state.playerMisses, action.position],
        log: [`You MISSED a ship and hit water!`, ...state.log],
      })

    /**
     * When the opponent shots the player, they inform the position they have shot
     * and then we need to check if they hit something (and if they sunk something in case
     * they hit) or if they miss. We also update our ship status and counters for further use.
     */
    case Actions.OPPONENT_SHOT: {
      if (!action.position) return state
      const shipHit = hasShipOnPosition(action.position, state.playerShips)

      // Update ship status (is it floating?)
      const ships = state.playerShips.map((ship) => {
        if (action.position && hasCoordinate(action.position, ship.positions)) {
          ship.totalHits += 1
          ship.status =
            ship.totalHits === ship.positions.length
              ? ShipStatus.sunk
              : ShipStatus.floating
        }
        return ship
      })

      const floatingShips = ships.filter(floatingShipsFilter).length
      let logs = [
        `Incoming shot on position ${coordinateName(action.position)}: ${
          shipHit ? 'HIT!' : 'MISS!'
        }`,
      ]
      if (!floatingShips) logs = ['!!! You Lost !!!', ...logs]

      return {
        ...state,
        playerShips: ships,
        opponentHits: shipHit
          ? [...state.opponentHits, action.position]
          : state.opponentHits,
        opponentMisses: !shipHit
          ? [...state.opponentMisses, action.position]
          : state.opponentMisses,
        opponentShots: state.opponentShots - 1,
        lastShotPosition: action.position,
        lastShotHit: !!shipHit,
        lastShotSunk: state.playerFloatingShips > floatingShips,
        playerFloatingShips: floatingShips,
        winner: floatingShips === 0 ? Turn.opponent : null,
        gameStatus: floatingShips ? GameStatus.ongoing : GameStatus.finished,
        log: [...logs, ...state.log],
      }
    }

    /**
     * If an opponent ship sinks we need to update the counter of ships, check
     * if there is any winner based on the counters and update the game status
     * if needed. If a player sinks all of the opponent's ships then they win the game.
     */
    case Actions.OPPONENT_SHIP_SUNK: {
      const floatingShips = state.opponentFloatingShips - 1
      let logs = ['You have sunk an opponent ship!']
      if (!floatingShips) logs = ['!!! You Won !!!', ...logs]
      return {
        ...state,
        opponentFloatingShips: floatingShips,
        winner: floatingShips === 0 ? Turn.player : null,
        gameStatus: floatingShips ? GameStatus.ongoing : GameStatus.finished,
        log: [...logs, ...state.log],
      }
    }

    /**
     * If we finish the turn, we need to update the counters and flags that
     * help us to understand what happened in the turn so they won't affect
     * the next round.
     */
    case Actions.PLAYER_FINISHED_TURN:
      if (state.gameStatus !== GameStatus.ongoing) return state
      return {
        ...state,
        turn: Turn.opponent,
        opponentShots: PLAYER_SHOTS,
        playerShots: PLAYER_SHOTS,
        lastShotPosition: null,
        lastShotHit: false,
        lastShotSunk: false,
        log: ['>>> Opponent turn has begun! <<<', ...state.log],
      }

    /**
     * If the opponent finishes their round, we must also update our flags
     * and counters to reflect a new turn state.
     */
    case Actions.OPPONENT_FINISHED_TURN:
      if (state.gameStatus !== GameStatus.ongoing) return state
      return {
        ...state,
        turn: Turn.player,
        lastShotPosition: null,
        lastShotHit: false,
        lastShotSunk: false,
        playerShots: PLAYER_SHOTS,
        opponentShots: PLAYER_SHOTS,
        log: ['>>> Your turn has begun! <<<', ...state.log],
      }

    /**
     * Whenever the player is ready we must change the game status so we
     * can react when the opponent marks itself as ready as well. If they
     * already did that, than we can move to the positioning phase.
     */
    case Actions.READY:
      return {
        ...state,
        gameStatus:
          state.gameStatus === GameStatus.opponentReady
            ? GameStatus.positioning
            : GameStatus.playerReady,
        log: ['You are ready for the battle', ...state.log],
        playerReady: true,
      }

    /**
     * Whenever the opponent becomes ready we must change the game status so we
     * can react when the player readiness. If they
     * already did that, than we can move to the positioning phase.
     */
    case Actions.OPPONENT_READY:
      if (
        state.gameStatus !== GameStatus.idle &&
        state.gameStatus !== GameStatus.playerReady
      )
        return state
      return {
        ...state,
        gameStatus:
          state.gameStatus === GameStatus.playerReady
            ? GameStatus.positioning
            : GameStatus.opponentReady,
        log: ['Your opponent is ready for the battle', ...state.log],
        opponentReady: true,
      }

    /**
     * When the player finishes positioning its ships, we need to update
     * the state game accordingly. If the opponent is already positioned,
     * then we can start the next phase.
     */
    case Actions.FINISHED_POSITIONING:
      return {
        ...state,
        gameStatus:
          state.gameStatus === GameStatus.positioning
            ? GameStatus.playerPositioned
            : GameStatus.ongoing,
        turn:
          state.gameStatus === GameStatus.positioning
            ? Turn.player
            : Turn.opponent,
        playerPositioned: true,
        log: ['You finished positioning your ships', ...state.log],
      }

    /**
     * When the opponent finishes positioning their boats, we need
     * to update the state to reflect and if the player is all done
     * positioning as well, we can move to the next phase.
     */
    case Actions.OPPONENT_FINISHED_POSITIONING:
      if (
        state.gameStatus !== GameStatus.playerPositioned &&
        state.gameStatus !== GameStatus.positioning
      )
        return state
      return {
        ...state,
        gameStatus:
          state.gameStatus === GameStatus.playerPositioned
            ? GameStatus.ongoing
            : GameStatus.opponentPositioned,
        turn:
          state.gameStatus === GameStatus.playerPositioned
            ? Turn.player
            : Turn.opponent,
        opponentPositioned: true,
        log: ['Your opponent finished positioning their ships', ...state.log],
      }

    /**
     * If the player decides to play again or if their opponent decides
     * we need to restore the state to become as the initial one, except
     * for the ships that must be recalculated and also we reset the log
     */
    case Actions.PLAY_AGAIN:
      return {
        ...state,
        ...initialState,
        peerConnected: true,
        log: ['Game restarted'],
        playerShips: generateShipsRandomlyPositioned(GAME_SIZE, TOTAL_SHIPS),
      }

    /**
     * If the player try to reposition their ships, we need to generate new
     * random ones
     */
    case Actions.REPOSITION_SHIPS:
      return {
        ...state,
        playerShips: generateShipsRandomlyPositioned(GAME_SIZE, TOTAL_SHIPS),
      }
    default:
      return state
  }
}

export default (state: State, action: Action) =>
  persistAndReturn(reducerFunction(state, action))
