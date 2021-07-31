import React, { useEffect } from 'react'

import { GameStatus, Turn } from '../../enums'
import { State } from './reducer'

export default (
  explosionSoundRef: React.RefObject<HTMLAudioElement>,
  waterSoundRef: React.RefObject<HTMLAudioElement>,
  winSoundRef: React.RefObject<HTMLAudioElement>,
  loseSoundRef: React.RefObject<HTMLAudioElement>,
  state: State,
) => {
  useEffect(() => {
    if (state.gameStatus === GameStatus.ongoing && explosionSoundRef.current) {
      explosionSoundRef.current.pause()
      explosionSoundRef.current.currentTime = 0
      explosionSoundRef.current.play()
    }
  }, [state.playerHits, state.opponentHits])

  useEffect(() => {
    if (state.gameStatus === GameStatus.ongoing && waterSoundRef.current) {
      waterSoundRef.current.pause()
      waterSoundRef.current.currentTime = 0
      waterSoundRef.current.play()
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
}
