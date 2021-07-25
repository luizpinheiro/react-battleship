import React from 'react'

import * as S from './styles'
import shipImage from './ship.png'

type Props = {
  counter: number
}
const ShipsCounter = ({ counter }: Props) => (
  <S.MainContainer>
    <img src={shipImage} alt="" width={64} height={64} />
    <span>{counter}</span>
  </S.MainContainer>
)

export default React.memo(ShipsCounter)
