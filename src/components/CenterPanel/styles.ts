import styled from 'styled-components'

export const OutterContainer = styled.div``

export const MainContainer = styled.div`
  position: relative;
  margin-top: 5px;
  box-sizing: border-box;
  padding: 16px;
  background: #fcfcfc;
  border: 1px solid rgba(0, 0, 0, 0.14);
  width: 280px;
  height: 530px;
  overflow: auto;
`

export const ReadyButton = styled.button`
  width: 100%;
  height: 50px;
  font-size: 28px;
  font-weight: bold;
  color: white;
  background: darkgreen;
  cursor: pointer;
  padding: 0;
`

export const PositionedButton = styled.button`
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  background: darkblue;
  cursor: pointer;
  padding: 0;
  margin-bottom: 10px;
`

export const RepositionButton = styled.button`
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  background: orangered;
  cursor: pointer;
  padding: 0;
`

export const Separator = styled.div`
  margin: 10px 0;
  border: 1px dashed rgba(0, 0, 0, 0.25);
`

export const DescriptionText = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`
