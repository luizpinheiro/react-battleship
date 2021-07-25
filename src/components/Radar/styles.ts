import styled, { keyframes } from 'styled-components'

import crosshairImage from './images/crosshair.png'
import explosionImage from './images/explosion.png'
import oceanImage from './images/ocean.png'
import { Turn } from '../../enums'

const CELL_SIZE = 50

const bgAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
`

export const MainContainer = styled.div<{ gameSize: number }>`
  position: relative;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid black;
  //background: rgb(78, 70, 221);
  //background: linear-gradient(
  //  315deg,
  //  rgba(78, 70, 221, 1) 0%,
  //  rgba(95, 95, 238, 1) 35%,
  //  rgba(0, 170, 255, 1) 100%
  //);
  background: rgb(60, 49, 255);
  background: linear-gradient(
    315deg,
    rgba(60, 49, 255, 1) 0%,
    rgba(95, 95, 238, 1) 35%,
    rgba(0, 170, 255, 1) 100%
  );
  background-size: 200% 200%;
  animation: ${bgAnimation} 10s easy infinite;
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

export const WinnerBanner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LoserBanner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
`
