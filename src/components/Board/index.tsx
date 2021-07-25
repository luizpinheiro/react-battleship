import React, { useCallback, useReducer } from 'react'

import * as S from './styles'
import Radar from '../Radar'
import { Coordinate } from '../../types'
import { Actions, GameStatus } from '../../enums'
import PlayerStats from '../PlayerStats'
import Clock from '../Clock'
import reducer, { initialState } from './reducer'
import SidePanel from '../SidePanel'
import useChainOfReaction from './useChainOfReaction'

const GAME_SIZE = 12

type Props = {
  peerId: string
}

const Board = ({ peerId }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleShot = useCallback(
    (position: Coordinate) => {
      if (state.gameStatus === GameStatus.ongoing)
        dispatch({ type: Actions.SHOT, position })
    },
    [state.gameStatus, dispatch],
  )

  const handleReady = useCallback(() => {
    dispatch({ type: Actions.READY })
  }, [dispatch])

  const handlePositioned = useCallback(() => {
    dispatch({ type: Actions.FINISHED_POSITIONING })
  }, [dispatch])

  const handleReposition = useCallback(() => {
    dispatch({ type: Actions.REPOSITION_SHIPS })
  }, [dispatch])

  const handlePlayAgain = useCallback(() => {
    dispatch({ type: Actions.PLAY_AGAIN })
  }, [dispatch])

  useChainOfReaction(state, dispatch, peerId)

  return (
    <S.MainContainer>
      <SidePanel
        peerId="6ACyHxT4"
        gameStatus={state.gameStatus}
        onReady={handleReady}
        onPositioned={handlePositioned}
        log={state.log}
        onPlayAgain={handlePlayAgain}
        onReposition={handleReposition}
        connected={state.peerConnected}
      />
      <S.CenterPanel gameSize={GAME_SIZE}>
        <S.Header>
          <PlayerStats
            shipsCounter={state.playerFloatingShips}
            torpedosCounter={state.playerShots}
          />
          <Clock gameStatus={state.gameStatus} turn={state.turn} />
          <PlayerStats
            shipsCounter={state.opponentFloatingShips}
            torpedosCounter={state.opponentShots}
          />
        </S.Header>
        <Radar
          playerTurn={state.turn}
          gameSize={GAME_SIZE}
          ships={state.playerShips}
          playerHitPositions={state.playerHits}
          opponentHitPositions={state.opponentHits}
          playerMissPositions={state.playerMisses}
          opponentMissPositions={state.opponentMisses}
          onShot={handleShot}
        />
      </S.CenterPanel>
    </S.MainContainer>
  )
}

export default Board
