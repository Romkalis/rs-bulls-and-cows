import type { Base, Score } from '../types/core.type.js';
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
