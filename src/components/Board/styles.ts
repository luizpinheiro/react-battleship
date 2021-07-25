import styled from 'styled-components'

export const MainContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`

export const Shots = styled.div`
  font-size: 32px;
`

export const Ships = styled.div`
  font-size: 32px;
`

export const SidePanel = styled.div``

export const CenterPanel = styled.div<{ gameSize: number }>`
  flex-shrink: 0;
  width: ${(props) => props.gameSize * 50 + 20}px;
`
