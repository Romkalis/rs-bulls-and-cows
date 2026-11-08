import type { Base, Score } from '../types/core.type.js';
import { memoize } from '../utils/memoize.js';
import { normalize } from '../utils/normalize.js';

const DIGITS = '0123456789abcdef';

export function createDigitValidator(base: Base): (digit: string) => boolean {
  const availableValues = DIGITS.slice(0, base);

  return (digit: string) => {
    if (digit.length !== 1) {
      return false;
    }
    return availableValues.includes(digit.toLowerCase());
  };
}

export function isValidGuess(
  input: string,
  length: number,
  base: Base,
): boolean {
  const lowerInput = input.toLowerCase();
  const isUniq = new Set(lowerInput.split('')).size === input.length;
  const validator = createDigitValidator(base);
  const isValid: boolean = lowerInput
    .split('')
    .every((char) => validator(char));
  if (!isUniq || input.length !== length || !isValid) return false;

  return true;
}

export function evaluateGuess(secret: string, guess: string): Score {
  const secretChars = normalize(secret);
  const guessChars = normalize(guess);
  const secretDigits = new Set(secretChars);

  const bulls = guessChars.filter((ch, i) => ch === secretChars[i]).length;
  const common = guessChars.filter((ch) => secretDigits.has(ch)).length;

  return { bulls, cows: common - bulls };
}

export function generateSecret(
  length: number,
  base: Base,
  random: () => number = Math.random,
): string {
  if (length > base) {
    throw new RangeError(
      `Cannot build ${length} unique digits in base ${base}`,
    );
  }

  const digits = DIGITS.slice(0, base).split('');

  const addDigit = (secret: string): string => {
    if (secret.length === length) return secret;

    const unused = digits.filter((digit) => !secret.includes(digit));
    const index = Math.floor(random() * unused.length);

    return addDigit(secret + (unused[index] ?? ''));
  };

  return addDigit('');
}

export const countPossibleSecrets = memoize(
  (length: number, base: number): number => {
    if (length === 0) return 1;
    return base * countPossibleSecrets(length - 1, base - 1);
  },
);
