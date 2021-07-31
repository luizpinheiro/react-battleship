import styled from 'styled-components'

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
