import styled, { keyframes } from 'styled-components'

import crosshairImage from './images/crosshair.png'
import explosionImage from './images/explosion.png'
import waterSplashImage from './images/sea.png'
import { Orientation, Turn } from '../../enums'
import waterBgImage from './images/water-bg.jpg'
import submarine from './images/ships/submarine.png'
import carrier from './images/ships/carrier.png'
import boat from './images/ships/boat.png'
import destroyer from './images/ships/destroyer.png'
import cruiser from './images/ships/cruiser.png'

const CELL_SIZE = 50

const bgAnimation = keyframes`
  from {
    background-position: 0px 0px;
  }
  50% {
    background-position: 5px 5px;
  }
  to {
    background-position: 0px 0px;
  }
`

export const MainContainer = styled.div<{ gameSize: number }>`
  position: relative;
  margin: 0 auto;
  flex-shrink: 0;
  width: ${(props) => props.gameSize * 50 + 20}px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid black;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: -100px;
    left: -100px;
    width: 700px;
    height: 700px;
    background: url('${waterBgImage}');
    animation: 8s ${bgAnimation} infinite ease-in-out;
  }
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export const CornerBlock = styled.div`
  box-sizing: border-box;
  position: relative;
  z-index: 10;
  width: 20px;
  height: 20px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(0, 0, 255, 0.08);
`

export const LongitudinalIndex = styled.div`
  position: relative;
  z-index: 10;
  box-sizing: border-box;
  width: ${CELL_SIZE}px;
  height: 20px;
  font-size: 16px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  background: rgba(0, 0, 255, 0.08);
`

export const LatitudinalIndex = styled.div`
  position: relative;
  z-index: 10;
  box-sizing: border-box;
  width: 20px;
  height: ${CELL_SIZE}px;
  font-size: 16px;
  line-height: ${CELL_SIZE}px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.25);
  color: white;
  background: rgba(0, 0, 255, 0.08);
`

export const Cell = styled.div<{
  miss: boolean
  hit: boolean
  ship: boolean
  turn: Turn
  side: Turn
}>`
  position: relative;
  z-index: 10;
  box-sizing: border-box;
  width: ${CELL_SIZE}px;
  height: ${CELL_SIZE}px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: not-allowed;

  ${(props) =>
    !props.ship &&
    !props.hit &&
    !props.miss &&
    props.turn === Turn.player &&
    props.side === Turn.opponent &&
    `
    &:hover {
      background: url('${crosshairImage}') no-repeat center center;
      background-size: 45px 45px;
      cursor: none;
    }
  `}
  ${(props) =>
    props.miss &&
    `background: url('${waterSplashImage}') no-repeat center center; background-size: 50px 50px; background-color: rgba(0,0,0,.15);`}
  ${(props) =>
    props.hit &&
    `background-image: url('${explosionImage}'); background-color: rgba(0,0,0,.15); background-position: center center; background-repeat: no-repeat; background-size: 42px 42px;`}
`

export const WinnerBanner = styled.div`
  position: absolute;
  z-index: 20;
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
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ShipsContainer = styled.div`
  position: absolute;
  z-index: 1;
  top: 20px;
  left: 20px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
`

export const ShipSubmarine = styled.div<{
  orientation: Orientation
  top: number
  left: number
}>`
  position: absolute;
  background-image: url('${submarine}');
  background-size: 45px 182px;
  background-repeat: no-repeat;
  background-position: center center;
  width: 50px;
  height: 200px;
  top: ${(props) => props.top * 50}px;
  left: ${(props) => props.left * 50}px;
  ${(props) =>
    props.orientation === Orientation.horizontal &&
    `
    transform: rotate(-90deg) translate(75px, 75px);
    `}
  border-color: rgba(255,255,255,0.35);
  background-color: rgba(255, 255, 255, 0.08);
`

export const ShipCarrier = styled.div<{
  orientation: Orientation
  top: number
  left: number
}>`
  position: absolute;
  background-image: url('${carrier}');
  background-size: 44px 180px;
  background-repeat: no-repeat;
  background-position: center;
  width: 50px;
  height: 250px;
  top: ${(props) => props.top * 50}px;
  left: ${(props) => props.left * 50}px;
  ${(props) =>
    props.orientation === Orientation.horizontal &&
    `
    transform: rotate(-90deg) translate(100px, 100px);
    `}
  border-color: rgba(255,255,255,0.35);
  background-color: rgba(255, 255, 255, 0.08);
`

export const ShipBoat = styled.div<{
  orientation: Orientation
  top: number
  left: number
}>`
  position: absolute;
  background-image: url('${boat}');
  background-size: 12px 50px;
  background-repeat: no-repeat;
  background-position: center;
  width: 50px;
  height: 50px;
  top: ${(props) => props.top * 50}px;
  left: ${(props) => props.left * 50}px;
  ${(props) =>
    props.orientation === Orientation.horizontal &&
    `
    transform: rotate(-90deg);
    `}
  border-color: rgba(255,255,255,0.35);
  background-color: rgba(255, 255, 255, 0.08);
`

export const ShipDestroyer = styled.div<{
  orientation: Orientation
  top: number
  left: number
}>`
  position: absolute;
  background-image: url('${destroyer}');
  background-size: 25px 125px;
  background-repeat: no-repeat;
  background-position: center;
  width: 50px;
  height: 150px;
  top: ${(props) => props.top * 50}px;
  left: ${(props) => props.left * 50}px;
  ${(props) =>
    props.orientation === Orientation.horizontal &&
    `
    transform: rotate(-90deg) translate(47px, 50px);
    `}
  border-color: rgba(255,255,255,0.35);
  background-color: rgba(255, 255, 255, 0.08);
`

export const ShipCruiser = styled.div<{
  orientation: Orientation
  top: number
  left: number
}>`
  position: absolute;
  background-image: url('${cruiser}');
  background-size: 16px 90px;
  background-repeat: no-repeat;
  background-position: center;
  width: 50px;
  height: 100px;
  top: ${(props) => props.top * 50}px;
  left: ${(props) => props.left * 50}px;
  ${(props) =>
    props.orientation === Orientation.horizontal &&
    `
    transform: rotate(-90deg) translate(25px, 25px);
    `}
  background-color: rgba(255, 255, 255, 0.08);
`
