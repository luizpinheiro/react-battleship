import React from 'react'

import * as S from './styles'
import shipImage from './ship.png'

type Props = {
  counter: number
}
const ShipsCounter = ({ counter }: Props) => (
  <S.MainContainer>
    <img src={shipImage} alt="" width={32} height={32} />
    <span>{counter}</span>
  </S.MainContainer>
)

export default React.memo(ShipsCounter)
