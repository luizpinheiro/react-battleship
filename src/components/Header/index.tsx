import React from 'react'

import * as S from './styles'
import cap from './cap.png'

const Header = () => (
  <S.MainContainer>
    {' '}
    <img src={cap} alt="" width={32} height={32} />
    Battleship
  </S.MainContainer>
)

export default React.memo(Header)
