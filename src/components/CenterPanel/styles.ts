import styled from 'styled-components'

export const OutterContainer = styled.div``

export const MainContainer = styled.div`
  margin-top: 5px;
  box-sizing: border-box;
  padding: 16px;
  background: #fcfcfc;
  border: 1px solid rgba(0, 0, 0, 0.14);
  width: 280px;
  height: 530px;
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

export const LogContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const LogTitle = styled.h3`
  color: darkgreen;
  margin: 0 0 16px;
`
export const LogMessage = styled.p`
  font-size: 12px;
  margin: 3px 0;
  color: darkgreen;
  &:nth-child(even) {
    color: darkblue;
  }
`

export const MessagesContainer = styled.div`
  max-height: 290px;
  overflow: auto;
`

export const DescriptionText = styled.div`
  font-size: 14px;
  margin-bottom: 10px;
`
