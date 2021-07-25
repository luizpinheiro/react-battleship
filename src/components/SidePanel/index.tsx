import React from 'react'

import * as S from './styles'
import { GameStatus } from '../../enums'

type Props = {
  gameStatus: GameStatus
  onReady: () => void
  onPositioned: () => void
  onPlayAgain: () => void
  onReposition: () => void
  log: string[]
  connected: boolean
  peerId: string
}

const SidePanel = ({
  gameStatus,
  onReady,
  onPlayAgain,
  onPositioned,
  onReposition,
  log,
  connected,
  peerId,
}: Props) => (
  <S.MainContainer>
    {gameStatus === GameStatus.idle && !connected && (
      <S.DescriptionText>
        Waiting for opponent. Share this link with a friend:
        <br />
        <a
          href={`${process.env.REACT_APP_URL}/${peerId}`}
          onClick={(e) => e.preventDefault()}
        >
          {process.env.REACT_APP_URL}/{peerId}
        </a>
        . After they connect, a &quot;Ready&quot; button will appear for you to
        click.
      </S.DescriptionText>
    )}
    {gameStatus === GameStatus.finished && (
      <S.PositionedButton type="button" onClick={onPlayAgain}>
        Play Again
      </S.PositionedButton>
    )}
    {(gameStatus === GameStatus.idle ||
      gameStatus === GameStatus.opponentReady) &&
      connected && (
        <>
          <S.DescriptionText>
            Whenever you&apos;re ready to fight, click the button bellow
          </S.DescriptionText>
          <S.ReadyButton type="button" onClick={onReady} disabled={!connected}>
            Ready!
          </S.ReadyButton>
        </>
      )}
    {gameStatus === GameStatus.playerReady &&
      'Waiting for the opponent to get ready!'}
    {(gameStatus === GameStatus.positioning ||
      gameStatus === GameStatus.opponentPositioned) && (
      <>
        <S.DescriptionText>
          Check if your ships are well positioned. If not, hit the button
          &quot;Reposition Ships&quot; below. If they are good, then hit
          &quot;Finish Positioning&quot;.
        </S.DescriptionText>
        <S.PositionedButton type="button" onClick={onPositioned}>
          Finish positioning
        </S.PositionedButton>
        <S.RepositionButton type="button" onClick={onReposition}>
          Reposition Ships
        </S.RepositionButton>
      </>
    )}
    {gameStatus === GameStatus.ongoing && (
      <S.DescriptionText>
        The battle has begun. When is your turn, hit a position on the blue
        radar! You will know if you hit or missed after every shot. The
        indicators above the radar shows how many shots and ships you have left.
        You gain 3 shots at beginning of each turn.
      </S.DescriptionText>
    )}
    <S.Separator />
    <S.LogContainer>
      <S.LogTitle>Battle Log</S.LogTitle>
      <S.MessagesContainer>
        {log.map((message, index) => {
          const k = `${log.length - index}`
          return <S.LogMessage key={k}>{message}</S.LogMessage>
        })}
      </S.MessagesContainer>
    </S.LogContainer>
  </S.MainContainer>
)

export default SidePanel
