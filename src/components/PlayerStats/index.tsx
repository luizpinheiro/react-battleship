import React from 'react'

import * as S from './styles'
import TorpedosCounter from '../TorpedosCounter'
import ShipsCounter from '../ShipsCounter'
import { GameStatus, Turn } from '../../enums'

type Props = {
  gameStatus: GameStatus
  shipsCounter: number
  torpedosCounter: number
  side: Turn
  turn: Turn
}

const PlayerStats = ({
  gameStatus,
  torpedosCounter,
  shipsCounter,
  side,
  turn,
}: Props) => (
  <S.MainContainer>
    <S.TurnInfoContainer>
      {side === Turn.player &&
        side === turn &&
        gameStatus === GameStatus.ongoing && <S.TurnInfo>Your Turn</S.TurnInfo>}
      {side === Turn.opponent &&
        side === turn &&
        gameStatus === GameStatus.ongoing && (
          <S.TurnInfo>Opponent&apos;s Turn</S.TurnInfo>
        )}
    </S.TurnInfoContainer>
    <S.CountersContainer>
      <TorpedosCounter counter={torpedosCounter} />
      <ShipsCounter counter={shipsCounter} />
    </S.CountersContainer>
  </S.MainContainer>
)

export default React.memo(PlayerStats)
