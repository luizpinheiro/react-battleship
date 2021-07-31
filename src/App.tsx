import React from 'react'

import QueryString from 'query-string'
import { useLocation } from 'react-router-dom'

import Header from './components/Header'
import * as S from './styles'
import Battleship from './components/Battleship'
import { GlobalStyles } from './globalStyles'

function App() {
  const location = useLocation()
  const { p: peerId } = QueryString.parse(location.search)
  return (
    <>
      <GlobalStyles />
      <Header />
      <Battleship peerId={peerId ? peerId.toString() : ''} />
      <S.CreditsContainer>
        <div>
          Sound effects by{' '}
          <a href="https://mixkit.co" rel="noreferrer" target="_blank">
            mixkit.co
          </a>
          .
        </div>
      </S.CreditsContainer>
    </>
  )
}

export default React.memo(App)
