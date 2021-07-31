import React from 'react'

import * as S from './styles'

const Rules = () => (
  <S.RulesContainer>
    <h3>Rules:</h3>
    <S.RulesList>
      <S.RuleItem>
        Each player starts with 5 ships of 5 different sizes (from 5 places to
        1).
      </S.RuleItem>
      <S.RuleItem>
        There are two blue areas called <b>Radar</b> where the ships are placed.
        Yours are the left one. You can only see the ships at your Radar.
      </S.RuleItem>
      <S.RuleItem>
        The first player to finish positioning their ships will be the first to
        play.
      </S.RuleItem>
      <S.RuleItem>
        In each turn, a player have 3 torpedos to shot. You shoot by clicking at
        coordinates one the opponent&apos;s Radar when it is your turn and you
        have torpedos left to shoot.
      </S.RuleItem>
      <S.RuleItem>
        If you hit an enemy ship, a explosion Icon will appear. If you miss, a
        water icon will appear.
      </S.RuleItem>
      <S.RuleItem>
        When a player hits all places of an enemy&apos; ship, the ship is sunk.
      </S.RuleItem>
      <S.RuleItem>
        The first to sink all of the opponent&apos;s ships wins.
      </S.RuleItem>
      <S.RuleItem>
        The ships never touch each other, which means that on the side of a ship
        cell will always be a cell from the same ship or water (but not a cell
        from a different ship).
      </S.RuleItem>
    </S.RulesList>
  </S.RulesContainer>
)

export default React.memo(Rules)
