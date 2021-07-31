import React, { useCallback, useReducer, useRef } from 'react'

import * as S from './styles'
import Radar from '../Radar'
import { Coordinate } from '../../types'
import { Actions, GameStatus, Turn } from '../../enums'
import reducer, { initialState, GAME_SIZE } from './reducer'
import CenterPanel from '../CenterPanel'
import useChainOfReaction from './useChainOfReaction'
import explosionSound from './sounds/explosion.mp3'
import waterHitSound from './sounds/water-hit.mp3'
import winSound from './sounds/win.mp3'
import loseSound from './sounds/lose.mp3'
import { dispatchToPeer } from '../../modules/communication'
import useSound from './useSound'

type Props = {
  peerId: string
}

const Battleship = ({ peerId }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const explosionSoundRef = useRef<HTMLAudioElement>(null)
  const waterHitSoundRef = useRef<HTMLAudioElement>(null)
  const winSoundRef = useRef<HTMLAudioElement>(null)
  const loseSoundRef = useRef<HTMLAudioElement>(null)

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
    dispatchToPeer({ type: Actions.PLAY_AGAIN })
  }, [dispatch])

  useChainOfReaction(state, dispatch, peerId)
  useSound(
    explosionSoundRef,
    waterHitSoundRef,
    winSoundRef,
    loseSoundRef,
    state,
  )

  return (
    <>
      <S.MainContainer>
        <Radar
          gameSize={GAME_SIZE}
          gameStatus={state.gameStatus}
          winner={state.winner}
          turn={state.turn}
          side={Turn.player}
          shotsAvailable={state.playerShots}
          ships={state.playerShips}
          hitPositions={state.opponentHits}
          missPositions={state.opponentMisses}
          onShot={handleShot}
        />
        <CenterPanel
          peerId={state.peerId}
          gameStatus={state.gameStatus}
          turn={state.turn}
          onReady={handleReady}
          onPositioned={handlePositioned}
          log={state.log}
          onPlayAgain={handlePlayAgain}
          onReposition={handleReposition}
          connected={state.peerConnected}
        />
        <Radar
          gameSize={GAME_SIZE}
          gameStatus={state.gameStatus}
          winner={state.winner}
          turn={state.turn}
          side={Turn.opponent}
          shotsAvailable={state.opponentShots}
          ships={[]}
          hitPositions={state.playerHits}
          missPositions={state.playerMisses}
          onShot={handleShot}
        />
      </S.MainContainer>
      <audio ref={explosionSoundRef} controls={false} autoPlay={false}>
        <source src={explosionSound} type="audio/mp3" />
      </audio>
      <audio ref={waterHitSoundRef} controls={false} autoPlay={false}>
        <source src={waterHitSound} type="audio/mp3" />
      </audio>
      <audio ref={winSoundRef} controls={false} autoPlay={false}>
        <source src={winSound} type="audio/mp3" />
      </audio>
      <audio ref={loseSoundRef} controls={false} autoPlay={false}>
        <source src={loseSound} type="audio/mp3" />
      </audio>
    </>
  )
}

export default React.memo(Battleship)
