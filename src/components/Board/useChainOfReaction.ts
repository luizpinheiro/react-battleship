import { useEffect } from 'react'

import { State, WAIT_BEFORE_TURN_TIME } from './reducer'
import {
  connect,
  dispatchToPeer,
  initializePeer,
  registerIncomingHandler,
} from '../../modules/communication'
import { Actions, GameStatus, Turn } from '../../enums'
import { Action } from '../../types'

export default (
  state: State,
  dispatch: React.Dispatch<Action>,
  peerId: string,
) => {
  /**
   * We need to register a function to handle incoming
   * actions from our peer. Since the incoming data will
   * always be an action that will be treated in our reduce,
   * we need to provide the dispatch function as the handler.
   * This way, local actions and remote actions will be treated
   * equally.
   */
  useEffect(() => {
    registerIncomingHandler(dispatch)
  }, [dispatch])

  /**
   * Initializes the peer. If we are provided with a peerId in the URL
   * then we try to connect to that peer so we can start playing.
   */
  useEffect(() => {
    const onConnected = () => {
      dispatch({ type: Actions.CONNECTION_ESTABLISHED })
    }
    initializePeer(state.peerId, onConnected).then(() => {
      if (peerId) connect(peerId)
    })
  }, [])

  /**
   * When the player of the turn becomes ready, we notify the opponent
   * so they can react to it.
   */
  useEffect(() => {
    if (state.playerReady) dispatchToPeer({ type: Actions.OPPONENT_READY })
  }, [state.playerReady])

  /**
   * When the player of the turn becomes positioned, we notify the opponent
   * so they can react to it.
   */
  useEffect(() => {
    if (state.playerPositioned)
      dispatchToPeer({ type: Actions.OPPONENT_FINISHED_POSITIONING })
  }, [state.playerPositioned])

  /**
   * If the turn is with the player and they shot, by reducing the number of
   * shots available, we notify the opponent regarding the shot action and
   * provide the position we have shot so they can notify back saying if we
   * have hit or missed.
   */
  useEffect(() => {
    if (state.gameStatus !== GameStatus.ongoing) return
    if (state.turn !== Turn.player) return
    if (state.lastShotPosition !== null)
      dispatchToPeer({
        type: Actions.OPPONENT_SHOT,
        position: state.lastShotPosition,
      })
  }, [state.playerShots, state.lastShotPosition, state.gameStatus, state.turn])

  /**
   * When the opponent shots we must notify back whether it hit or misses.
   * A separate communication is also sent if they happen to sunk any of
   * the player's ship.
   */
  useEffect(() => {
    if (
      state.gameStatus !== GameStatus.ongoing &&
      state.gameStatus !== GameStatus.finished
    )
      return
    if (state.turn !== Turn.opponent) return
    if (state.lastShotPosition)
      dispatchToPeer({
        type: state.lastShotHit ? Actions.PLAYER_HIT : Actions.PLAYER_MISS,
        position: state.lastShotPosition,
      })

    if (state.lastShotSunk)
      dispatchToPeer({
        type: Actions.OPPONENT_SHIP_SUNK,
      })
  }, [state.opponentShots, state.lastShotHit])

  /**
   * If the turn changes, we notify the opponent regarding so it can beging
   * it's turn.
   */
  useEffect(() => {
    if (state.gameStatus !== GameStatus.ongoing) return
    if (state.turn === Turn.player) console.log("Player's turn started!")
    else {
      dispatchToPeer({ type: Actions.OPPONENT_FINISHED_TURN })
      console.log("Opponent's turn started!")
    }
  }, [state.turn])

  /**
   * After a small delay we commit the change of turn. This is necessary so
   * the user will be able to see the feedback of its last shot before changing
   * the radar view to the attack mode.
   */
  useEffect(() => {
    if (state.afterTurnDelay) {
      console.log(`Will pass turn after ${WAIT_BEFORE_TURN_TIME}ms...`)
      setTimeout(() => {
        console.log('Passing turn...')
        dispatch({ type: Actions.PLAYER_FINISHED_TURN })
      }, WAIT_BEFORE_TURN_TIME)
    }
  }, [state.afterTurnDelay])
}
