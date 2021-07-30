import React from 'react'

import * as S from './styles'
import torpedoImage from './torpedo.png'

type Props = {
  counter: number
}
const TorpedosCounter = ({ counter }: Props) => (
  <S.MainContainer>
    <img src={torpedoImage} alt="" width={32} height={32} />
    <span>{counter}</span>
  </S.MainContainer>
)

export default React.memo(TorpedosCounter)
