import { describe, expect, it } from 'vitest';
import { applyGuess, startGame } from './state.js';

const settings = { length: 4, base: 10 } as const;

describe('startGame', () => {
  it('creates a new game with empty history', () => {
    expect(startGame(settings, '1234', 1000)).toEqual({
      settings,
      secret: '1234',
      history: [],
      status: 'playing',
      startedAt: 1000,
      finishedAt: null,
    });
  });
});

describe('applyGuess', () => {
  it('adds the attempt with its score to history', () => {
    const state = applyGuess(startGame(settings, '1234', 1000), '1243', 2000);

    expect(state.history).toEqual([
      { guess: '1243', score: { bulls: 2, cows: 2 } },
    ]);
    expect(state.status).toBe('playing');
  });

  it('does not change the previous state', () => {
    const before = startGame(settings, '1234', 1000);
    applyGuess(before, '5678', 2000);

    expect(before.history).toEqual([]);
  });

  it('returns the same state for a repeated guess', () => {
    const state = applyGuess(startGame(settings, '1234', 1000), '5678', 2000);

    expect(applyGuess(state, '5678', 3000)).toBe(state);
  });

  it('treats guesses in different case as the same', () => {
    const hex = startGame({ length: 2, base: 16 }, 'ab', 1000);
    const state = applyGuess(hex, 'cd', 2000);

    expect(applyGuess(state, 'CD', 3000)).toBe(state);
  });

  it('finishes the game when the secret is guessed', () => {
    const state = applyGuess(startGame(settings, '1234', 1000), '1234', 5000);

    expect(state.status).toBe('won');
    expect(state.finishedAt).toBe(5000);
  });

  it('ignores guesses after the game is won', () => {
    const won = applyGuess(startGame(settings, '1234', 1000), '1234', 5000);

    expect(applyGuess(won, '5678', 6000)).toBe(won);
  });
});
