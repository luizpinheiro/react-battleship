import React from 'react'

import QueryString from 'query-string'
import { useLocation } from 'react-router-dom'

import Header from './components/Header'
import Battleship from './components/Battleship'
import { GlobalStyles } from './globalStyles'
import Credits from './components/Credits'
import Signature from './components/Signature'

function App() {
  const location = useLocation()
  const { p: peerId } = QueryString.parse(location.search)
  return (
    <>
      <GlobalStyles />
      <Header />
      <Battleship peerId={peerId ? peerId.toString() : ''} />
      <Signature />
      <Credits />
    </>
  )
}

export default React.memo(App)
