import { Dispatch } from 'react'

import { Actions, ShipStatus } from '../enums'

export type Ship = {
  positions: Coordinate[]
  hitPositions: Coordinate[]
  totalHits: 0
  status: ShipStatus
}

export type Coordinate = {
  latitude: number
  longitude: number
}

export type Action = {
  type: Actions
  position?: Coordinate
}

export type IncomingDataHandler = Dispatch<Action>
