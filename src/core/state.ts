import type { GameState, Settings } from '../types/core.type.js';

export function startGame(
  settings: Settings,
  secret: string,
  now: number,
): GameState {
  void settings;
  void secret;
  void now;
  throw new Error('Not implemented');
}

export function applyGuess(
  state: GameState,
  guess: string,
  now: number,
): GameState {
  void state;
  void guess;
  void now;
  throw new Error('Not implemented');
}
