export enum Orientation {
  horizontal,
  vertical = 1,
}

export enum ShipStatus {
  sunk,
  floating,
}

export enum GameStatus {
  idle = 'idle',
  playerReady = 'playerReady',
  opponentReady = 'opponentReady',
  positioning = 'positioning',
  playerPositioned = 'playerPositioned',
  opponentPositioned = 'opponentPositioned',
  ongoing = 'ongoing',
  finished = 'finished',
}

export enum Turn {
  player,
  opponent,
}

export enum ShipModel {
  'COURACEIRO' = 'COURACEIRO',
  'PORTA_AVIOES' = 'PORTA_AVIOES',
  'REBOCADOR' = 'REBOCADOR',
}

export enum Actions {
  'SHOT' = 'SHOT',
  'OPPONENT_SHOT' = 'OPPONENT_SHOT',
  'PLAYER_HIT' = 'PLAYER_HIT',
  'PLAYER_MISS' = 'PLAYER_MISS',
  'READY' = 'READY',
  'OPPONENT_READY' = 'OPPONENT_READY',
  'FINISHED_POSITIONING' = 'FINISHED_POSITIONING',
  'OPPONENT_FINISHED_POSITIONING' = 'OPPONENT_FINISHED_POSITIONING',
  'OPPONENT_FINISHED_TURN' = 'OPPONENT_FINISHED_TURN',
  'PLAYER_FINISHED_TURN' = 'PLAYER_FINISHED_TURN',
  'OPPONENT_SHIP_SUNK' = 'OPPONENT_SHIP_SUNK',
  'PLAY_AGAIN' = 'PLAY_AGAIN',
  'REPOSITION_SHIPS' = 'REPOSITION_SHIPS',
  'CONNECTION_ESTABLISHED' = 'CONNECTION_ESTABLISHED',
}
