import { Dispatch } from 'react'

import { Actions, Orientation, ShipStatus } from '../enums'

export type Ship = {
  positions: Coordinate[]
  hitPositions: Coordinate[]
  totalHits: 0
  status: ShipStatus
  orientation: Orientation
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
