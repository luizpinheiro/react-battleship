import React from 'react'

import QueryString from 'query-string'
import { useLocation } from 'react-router-dom'

import Board from './components/Board'

function App() {
  const location = useLocation()
  const { p } = QueryString.parse(location.search)
  return (
    <>
      <Board peerId={p ? p.toString() : ''} />
    </>
  )
}

export default React.memo(App)
