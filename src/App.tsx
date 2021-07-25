import React from 'react'

import QueryString from 'query-string'
import { useLocation } from 'react-router-dom'

import Header from './components/Header'
import * as S from './styles'
import Board from './components/Board'
import { GlobalStyles } from './globalStyles'

function App() {
  const location = useLocation()
  const { p } = QueryString.parse(location.search)
  return (
    <>
      <GlobalStyles />
      <Header />
      <Board peerId={p ? p.toString() : ''} />
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
