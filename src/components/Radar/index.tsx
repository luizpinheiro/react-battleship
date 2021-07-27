import React, { useMemo } from 'react'

import * as S from './styles'
import { Coordinate, Ship } from '../../types'
import { hasCoordinate } from '../../utils/miscellaneous'
import { Turn } from '../../enums'
import winnerImage from './images/winner.png'
import loserImage from './images/loser.png'

type Props = {
  gameSize: number
  playerTurn: Turn
  ships: Ship[]
  playerHitPositions: Coordinate[]
  opponentHitPositions: Coordinate[]
  playerMissPositions: Coordinate[]
  opponentMissPositions: Coordinate[]
  onShot: (position: Coordinate) => void
  winner: Turn | null
}

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

const Radar = ({
  gameSize,
  playerTurn,
  ships,
  playerHitPositions,
  opponentHitPositions,
  playerMissPositions,
  opponentMissPositions,
  onShot,
  winner,
}: Props) => {
  const shipsPositions = useMemo(
    () => ships.map((ship) => ship.positions).flat(),
    [ships],
  )

  const handleShot = (position: Coordinate) => {
    if (
      playerTurn === Turn.opponent ||
      hasCoordinate(position, playerHitPositions) ||
      hasCoordinate(position, playerMissPositions)
    )
      return

    onShot(position)
  }

  const cells = []
  for (let longitude = -1; longitude < gameSize; longitude += 1) {
    for (let latitude = -1; latitude < gameSize; latitude += 1) {
      if (latitude === -1 && longitude === -1) {
        cells.push(<S.CornerBlock key={`${latitude}-${longitude}`} />)
        continue
      }
      if (longitude === -1) {
        cells.push(
          <S.LongitudinalIndex key={`${latitude}-${longitude}`}>
            {letterIndexes[latitude]}
          </S.LongitudinalIndex>,
        )
        continue
      }
      if (latitude === -1) {
        cells.push(
          <S.LatitudinalIndex key={`${latitude}-${longitude}`}>
            {longitude + 1}
          </S.LatitudinalIndex>,
        )
        continue
      }

      const position = { latitude, longitude }
      cells.push(
        <S.Cell
          key={`${latitude}-${longitude}`}
          ship={
            playerTurn !== Turn.player &&
            hasCoordinate(position, shipsPositions)
          }
          hit={hasCoordinate(
            position,
            playerTurn === Turn.player
              ? playerHitPositions
              : opponentHitPositions,
          )}
          miss={hasCoordinate(
            position,
            playerTurn === Turn.player
              ? playerMissPositions
              : opponentMissPositions,
          )}
          onClick={() => handleShot(position)}
          playerTurn={playerTurn}
        />,
      )
    }
  }

  return (
    <S.MainContainer gameSize={gameSize}>
      {playerTurn === Turn.opponent && (
        <S.ShipsContainer>
          {ships.map((ship) => {
            switch (ship.positions.length) {
              case 5:
                return (
                  <S.ShipCarrier
                    key={5}
                    orientation={ship.orientation}
                    top={ship.positions[0].longitude}
                    left={ship.positions[0].latitude}
                  />
                )
              case 4:
                return (
                  <S.ShipSubmarine
                    key={4}
                    orientation={ship.orientation}
                    top={ship.positions[0].longitude}
                    left={ship.positions[0].latitude}
                  />
                )
              case 3:
                return (
                  <S.ShipDestroyer
                    key={3}
                    orientation={ship.orientation}
                    top={ship.positions[0].longitude}
                    left={ship.positions[0].latitude}
                  />
                )
              case 2:
                return (
                  <S.ShipCruiser
                    key={2}
                    orientation={ship.orientation}
                    top={ship.positions[0].longitude}
                    left={ship.positions[0].latitude}
                  />
                )
              case 1:
                return (
                  <S.ShipBoat
                    key={1}
                    orientation={ship.orientation}
                    top={ship.positions[0].longitude}
                    left={ship.positions[0].latitude}
                  />
                )
              default:
                return <></>
            }
          })}
        </S.ShipsContainer>
      )}
      {winner === Turn.player && (
        <S.WinnerBanner>
          <img src={winnerImage} alt="" width={256} height={256} />
        </S.WinnerBanner>
      )}
      {winner === Turn.opponent && (
        <S.LoserBanner>
          <img src={loserImage} alt="" width={256} height={256} />
        </S.LoserBanner>
      )}
      {cells}
    </S.MainContainer>
  )
}

export default React.memo(Radar)
