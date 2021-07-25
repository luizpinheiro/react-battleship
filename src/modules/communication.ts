import Peer from 'peerjs'

import { Action, IncomingDataHandler } from '../types'
import { randomStr } from '../utils/random'

const PEER_ID_PREFIX = 'com-battleship-react'

let peerClient: Peer | undefined
let connection: Peer.DataConnection | undefined
let incomingDataHandler: IncomingDataHandler | undefined
let lastMessageId: string | undefined
let connectionCallback: () => void

const handleMessage = (data: Action & { idempotencyKey: string }) => {
  if (lastMessageId === data.idempotencyKey) return
  incomingDataHandler && incomingDataHandler(data)
  lastMessageId = data.idempotencyKey
}

export const initializePeer = async (
  id: string,
  onConnected: () => void,
): Promise<void> =>
  new Promise((resolve) => {
    connectionCallback = onConnected
    console.log(`Initialiazing a new peer with id ${id}`)
    peerClient = new Peer(`${PEER_ID_PREFIX}-${id}`)
    peerClient.on('open', (id) => {
      console.log(`Peer ready to receive connections: ${id}`)
      resolve()
    })

    peerClient.on('connection', (dataConnection) => {
      connection = dataConnection
      connection.on('data', (data: Action & { idempotencyKey: string }) => {
        console.log('[0] Data received from peer:', data)
        handleMessage(data)
      })
      console.log(
        `Connection established with peer ${connection.peer}. Have fun!`,
      )

      connectionCallback()
    })
  })

export const connect = async (peerId: string) => {
  if (!peerClient)
    throw new Error('Impossible to connect, peerClient not ready')

  console.log(`Trying to establish connection with peer ${peerId}...`)
  connection = peerClient.connect(`${PEER_ID_PREFIX}-${peerId}`)
  connection.on('open', () => {
    console.log(
      `Connection established with peer ${connection?.peer}. Have fun!`,
    )
    connectionCallback()
  })

  connection.on('data', (data: Action & { idempotencyKey: string }) => {
    console.log('[1] Data received from peer:', data)
    handleMessage(data)
  })
}

export const dispatchToPeer = (data: Action) => {
  setTimeout(() => {
    if (!connection) throw new Error('Not connected to any peer')
    const idempotencyKey = randomStr(10)
    console.log(`Sending data to peer:`, { ...data, idempotencyKey })
    console.log(`Idempotency: ${idempotencyKey}`)
    connection.send({ ...data, idempotencyKey })
  }, 500)
}

export const registerIncomingHandler = (handler: IncomingDataHandler): void => {
  console.log('Registering new incoming handler...')
  incomingDataHandler = handler
}
