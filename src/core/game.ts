import type { Base, Score } from '../types/core.type.js';

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

export function checkGuess(answer: string, secret: string): Score {
  console.log(answer, secret);
  throw new Error('Function was not implement yet');
}
