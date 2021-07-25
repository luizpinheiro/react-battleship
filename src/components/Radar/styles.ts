import styled from 'styled-components'

import crosshairImage from './crosshair.png'
import explosionImage from './explosion.png'
import oceanImage from './ocean.png'
import { Turn } from '../../enums'

const CELL_SIZE = 50

export const MainContainer = styled.div<{ gameSize: number }>`
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid black;
  background: rgb(78, 70, 221);
  background: linear-gradient(
    315deg,
    rgba(78, 70, 221, 1) 0%,
    rgba(95, 95, 238, 1) 35%,
    rgba(0, 170, 255, 1) 100%
  );
`

export const CornerBlock = styled.div`
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  background: #efefef;
`

export const LongitudinalIndex = styled.div`
  box-sizing: border-box;
  width: ${CELL_SIZE}px;
  height: 20px;
  font-size: 16px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.25);
  background: #efefef;
`

export const LatitudinalIndex = styled.div`
  box-sizing: border-box;
  width: 20px;
  height: ${CELL_SIZE}px;
  font-size: 16px;
  line-height: ${CELL_SIZE}px;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.25);
  background: #efefef;
`

export const Cell = styled.div<{
  miss: boolean
  hit: boolean
  ship: boolean
  playerTurn: Turn
}>`
  box-sizing: border-box;
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  cursor: not-allowed;

  ${(props) =>
    !props.ship &&
    !props.hit &&
    !props.miss &&
    props.playerTurn === Turn.player &&
    `
    &:hover {
      background: url('${crosshairImage}') no-repeat center center;
      background-size: 45px 45px;
      cursor: none;
    }
  `}
  ${(props) =>
    props.ship && `border-color: darkblue; background-color: lightblue;`}
  ${(props) =>
    props.miss &&
    `background: url('${oceanImage}') no-repeat center center; background-size: 50px 50px;`}
  ${(props) =>
    props.hit &&
    `background-image: url('${explosionImage}'); background-position: center center; background-repeat: no-repeat; background-size: 50px 50px;`}
`
