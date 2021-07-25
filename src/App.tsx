import React from 'react'

import { useParams } from 'react-router-dom'

import Board from './components/Board'

function App() {
  const { peerId } = useParams<{ peerId: string }>()
  console.log(`PeerId from URL:`, peerId)
  return (
    <>
      <Board peerId={peerId} />
    </>
  )
}

export default App
