import { Coordinate, Ship } from '../types'
import { GameStatus, Orientation, ShipStatus } from '../enums'
import { randomNumber } from './random'

export const hasCoordinate = (
  position: Coordinate,
  coordinates: Coordinate[],
): boolean =>
  coordinates.some(
    (coordinate) =>
      coordinate.latitude === position.latitude &&
      coordinate.longitude === position.longitude,
  )

export const hasShipOnPosition = (
  position: Coordinate,
  ships: Ship[],
): Ship | undefined =>
  ships.find((ship) => hasCoordinate(position, ship.positions))

export const statusName = (gameStatus: GameStatus) => {
  switch (gameStatus) {
    case GameStatus.idle:
      return 'Idle'
    case GameStatus.opponentReady:
      return 'Opponent Ready'
    case GameStatus.playerReady:
      return 'Ready'
    case GameStatus.positioning:
      return 'Positioning'
    case GameStatus.finished:
      return 'Finished'
    case GameStatus.ongoing:
      return 'Ongoing'
    case GameStatus.playerPositioned:
      return 'Waiting opponent'
    case GameStatus.opponentPositioned:
      return 'Opponent positioned'
    default:
      return 'Unknown Status'
  }
}

export const sleep = async (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms)
  })

export const coordinateName = (position: Coordinate): string => {
  const letterIndexes = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
  ]
  return `${letterIndexes[position.latitude]}${position.longitude + 1}`
}

const generateShip = (mapSize: number, shipSize: number): Ship => {
  const orientation = [Orientation.vertical, Orientation.horizontal][
    randomNumber(0, 1)
  ]
  const positions: Coordinate[] = []

  if (orientation === Orientation.vertical) {
    const latitude = randomNumber(0, mapSize - 1)
    const firstLongitudinalCell = randomNumber(0, mapSize - 1 - shipSize)
    for (let i = 0; i < shipSize; i += 1)
      positions.push({ latitude, longitude: firstLongitudinalCell + i })
  } else {
    const longitude = randomNumber(0, mapSize - 1)
    const firstLatitudinalCell = randomNumber(0, mapSize - 1 - shipSize)
    for (let i = 0; i < shipSize; i += 1)
      positions.push({ latitude: firstLatitudinalCell + i, longitude })
  }

  return {
    positions,
    hitPositions: [],
    orientation,
    status: ShipStatus.floating,
    totalHits: 0,
  }
}

const neighborhoodCoordinates = (coordinate: Coordinate): Coordinate[] => {
  const coordinates: Coordinate[] = []
  for (let i = -1; i <= 1; i += 1)
    for (let j = -1; j <= 1; j += 1)
      if (coordinate.latitude + i >= 0 && coordinate.longitude + j >= 0)
        coordinates.push({
          latitude: coordinate.latitude + i,
          longitude: coordinate.longitude + j,
        })
  return coordinates
}

const shipTouching = (ship: Ship, ships: Ship[]): boolean =>
  ship.positions.some((coordinate) => {
    const neighborhood = neighborhoodCoordinates(coordinate)
    return neighborhood.some((c) => hasShipOnPosition(c, ships))
  })

export const generateShipsRandomlyPositioned = (
  mapSize: number,
  totalShips: number,
) => {
  const ships: Ship[] = []
  for (let shipSize = totalShips; shipSize >= 1; shipSize -= 1) {
    let ship: Ship
    do {
      ship = generateShip(mapSize, shipSize)
    } while (shipTouching(ship, ships))
    ships.push(ship)
  }
  return ships
}
