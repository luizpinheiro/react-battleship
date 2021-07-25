import React from 'react'

import * as S from './styles'
import TorpedosCounter from '../TorpedosCounter'
import ShipsCounter from '../ShipsCounter'

type Props = {
  shipsCounter: number
  torpedosCounter: number
}

const PlayerStats = ({ torpedosCounter, shipsCounter }: Props) => (
  <S.MainContainer>
    <TorpedosCounter counter={torpedosCounter} />
    <ShipsCounter counter={shipsCounter} />
  </S.MainContainer>
)

export default React.memo(PlayerStats)
