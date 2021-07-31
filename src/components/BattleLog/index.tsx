import React from 'react'

import * as S from './styles'

type Props = {
  log: string[]
}

const BattleLog = ({ log }: Props) => (
  <S.LogContainer>
    <S.LogTitle>Battle Log</S.LogTitle>
    <S.MessagesContainer>
      {log.map((message, index) => {
        const k = `${log.length - index}`
        return <S.LogMessage key={k}>{message}</S.LogMessage>
      })}
    </S.MessagesContainer>
  </S.LogContainer>
)

export default React.memo(BattleLog)
