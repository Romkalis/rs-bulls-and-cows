import type { GameState, Settings } from '../types/core.type.js';
import { evaluateGuess } from './game.js';

export function startGame(
  settings: Settings,
  secret: string,
  now: number,
): GameState {
  return {
    settings,
    secret,
    history: [],
    status: 'playing',
    startedAt: now,
    finishedAt: null,
  };
}

export function applyGuess(
  state: GameState,
  guess: string,
  now: number,
): GameState {
  const normalizedGuess = guess.toLowerCase();
  const isRepeated = state.history.some(
    (attempt) => attempt.guess === normalizedGuess,
  );

  if (state.status === 'won' || isRepeated) return state;

  const score = evaluateGuess(state.secret, normalizedGuess);
  const isWon = score.bulls === state.settings.length;

  return {
    ...state,
    history: [...state.history, { guess: normalizedGuess, score }],
    status: isWon ? 'won' : 'playing',
    finishedAt: isWon ? now : null,
  };
}
