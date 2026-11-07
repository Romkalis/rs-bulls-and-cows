import type { Base } from '../types/core.type.js';

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
