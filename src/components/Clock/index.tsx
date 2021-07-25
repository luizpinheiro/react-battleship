import React, { useEffect, useState } from 'react'

import * as S from './styles'
import { GameStatus, Turn } from '../../enums'
import { statusName } from '../../utils/miscellaneous'

type Props = {
  gameStatus: GameStatus
  turn: Turn
}
const Clock = ({ gameStatus, turn }: Props) => {
  const [seconds, setSeconds] = useState<number>(0)
  const [intervalId, setIntervalId] = useState<number>()

  useEffect(() => {
    if (gameStatus === GameStatus.ongoing && !intervalId) {
      setIntervalId(
        window.setInterval(() => {
          setSeconds((s) => s + 1)
        }, 1000),
      )
    }
    if (gameStatus === GameStatus.finished) {
      window.clearInterval(intervalId)
    }
    if (gameStatus === GameStatus.idle) {
      setSeconds(0)
    }
  }, [gameStatus])

  return (
    <S.MainContainer>
      <S.ClockContainer>
        {Math.floor(seconds / 60)
          .toString()
          .padStart(2, '0')}{' '}
        : {(seconds % 60).toString().padStart(2, '0')}
      </S.ClockContainer>
      <S.StatusContainer>
        {gameStatus !== GameStatus.ongoing ? (
          statusName(gameStatus)
        ) : (
          <>{turn === Turn.player ? 'Your Turn' : 'Opponents Turn'}</>
        )}
      </S.StatusContainer>
    </S.MainContainer>
  )
}

export default React.memo(Clock)
