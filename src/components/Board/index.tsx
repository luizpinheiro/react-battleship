import React, { useCallback, useEffect, useReducer, useRef } from 'react'

import * as S from './styles'
import Radar from '../Radar'
import { Coordinate } from '../../types'
import { Actions, GameStatus, Turn } from '../../enums'
import PlayerStats from '../PlayerStats'
import Clock from '../Clock'
import reducer, { initialState, GAME_SIZE } from './reducer'
import SidePanel from '../SidePanel'
import useChainOfReaction from './useChainOfReaction'
import explosionSound from './sounds/explosion.mp3'
import waterHitSound from './sounds/water-hit.mp3'
import winSound from './sounds/win.mp3'
import loseSound from './sounds/lose.mp3'
import { dispatchToPeer } from '../../modules/communication'

type Props = {
  peerId: string
}

const Board = ({ peerId }: Props) => {
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

  useEffect(() => {
    if (state.gameStatus === GameStatus.ongoing && explosionSoundRef.current) {
      explosionSoundRef.current.pause()
      explosionSoundRef.current.currentTime = 0
      explosionSoundRef.current.play()
    }
  }, [state.playerHits, state.opponentHits])

  useEffect(() => {
    if (state.gameStatus === GameStatus.ongoing && waterHitSoundRef.current) {
      waterHitSoundRef.current.pause()
      waterHitSoundRef.current.currentTime = 0
      waterHitSoundRef.current.play()
    }
  }, [state.playerMisses, state.opponentMisses])

  useEffect(() => {
    if (state.gameStatus === GameStatus.finished) {
      if (state.winner === Turn.player && winSoundRef.current) {
        winSoundRef.current.pause()
        winSoundRef.current.currentTime = 0
        winSoundRef.current.play()
      } else if (loseSoundRef.current) {
        loseSoundRef.current.pause()
        loseSoundRef.current.currentTime = 0
        loseSoundRef.current.play()
      }
    }
  }, [state.gameStatus])

  useChainOfReaction(state, dispatch, peerId)

  return (
    <>
      <S.MainContainer>
        <SidePanel
          peerId={state.peerId}
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
            winner={state.winner}
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

export default React.memo(Board)
