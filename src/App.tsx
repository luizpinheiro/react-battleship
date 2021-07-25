import React from 'react'

import QueryString from 'query-string'
import { useLocation } from 'react-router-dom'

import * as S from './styles'
import Board from './components/Board'

function App() {
  const location = useLocation()
  const { p } = QueryString.parse(location.search)
  return (
    <>
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
