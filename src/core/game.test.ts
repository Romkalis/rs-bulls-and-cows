import { describe, expect, it } from 'vitest';
import {
  createDigitValidator,
  isValidGuess,
  evaluateGuess,
  generateSecret,
} from './game.js';

describe('createDigitValidator', () => {
  describe('base 10', () => {
    it('accepts only 0-9 digits in base 10', () => {
      const validator = createDigitValidator(10);
      expect(validator('0')).toBe(true);
      expect(validator('5')).toBe(true);
      expect(validator('9')).toBe(true);
      expect(validator('a')).toBe(false);
      expect(validator('A')).toBe(false);
      expect(validator('g')).toBe(false);
      expect(validator('G')).toBe(false);
      expect(validator('12')).toBe(false);
    });
    it('not accepted "", " ", "-" in base 10', () => {
      const validator = createDigitValidator(10);
      expect(validator('')).toBe(false);
      expect(validator(' ')).toBe(false);
      expect(validator('-')).toBe(false);
    });
  });
  describe('base 16', () => {
    it('accepts only 0-F digits in base 16', () => {
      const validator = createDigitValidator(16);

      expect(validator('0')).toBe(true);
      expect(validator('5')).toBe(true);
      expect(validator('9')).toBe(true);
      expect(validator('a')).toBe(true);
      expect(validator('A')).toBe(true);
      expect(validator('f')).toBe(true);
      expect(validator('F')).toBe(true);
    });
    it('not accepted "", " ", "-" in base 16', () => {
      const validator = createDigitValidator(16);

      expect(validator('')).toBe(false);
      expect(validator('12')).toBe(false);
      expect(validator(' ')).toBe(false);
      expect(validator('-')).toBe(false);
      expect(validator('g')).toBe(false);
      expect(validator('G')).toBe(false);
      expect(validator('z')).toBe(false);
      expect(validator('Z')).toBe(false);
    });
  });
  describe('base 2', () => {
    it('accepts only 0-1 digits in base 2', () => {
      const validator = createDigitValidator(2);

      expect(validator('0')).toBe(true);
      expect(validator('1')).toBe(true);
    });
    it('not accepted "", " ", "-" in base 2', () => {
      const validator = createDigitValidator(2);

      expect(validator('01')).toBe(false);
      expect(validator('')).toBe(false);
      expect(validator(' ')).toBe(false);
      expect(validator('-')).toBe(false);
      expect(validator('2')).toBe(false);
    });
  });
  describe('base 8', () => {
    it('accepts only 0-7 digits in base 8', () => {
      const validator = createDigitValidator(8);

      expect(validator('0')).toBe(true);
      expect(validator('5')).toBe(true);
      expect(validator('7')).toBe(true);
    });
    it('not accepted "", " ", "-" in base 8', () => {
      const validator = createDigitValidator(8);
      expect(validator('12')).toBe(false);
      expect(validator('8')).toBe(false);
      expect(validator('')).toBe(false);
      expect(validator(' ')).toBe(false);
      expect(validator('-')).toBe(false);
    });
  });
});

describe('isValidGuess', () => {
  it('inputed symbols are uniq', () => {
    expect(isValidGuess('0123', 4, 10)).toBe(true);
    expect(isValidGuess('0113', 4, 10)).toBe(false);
    expect(isValidGuess('aA019', 5, 16)).toBe(false);
    expect(isValidGuess('Ab', 2, 16)).toBe(true);
  });
  it('inputed values not shorter or longer', () => {
    expect(isValidGuess('0123', 4, 10)).toBe(true);
    expect(isValidGuess('012345', 4, 10)).toBe(false);
    expect(isValidGuess('0', 4, 10)).toBe(false);
    expect(isValidGuess('', 4, 10)).toBe(false);
  });
  it('inputed values are valid', () => {
    expect(isValidGuess('23456', 5, 10)).toBe(true);
    expect(isValidGuess('23456', 5, 8)).toBe(true);
    expect(isValidGuess('235aF', 5, 16)).toBe(true);
    expect(isValidGuess('01', 2, 2)).toBe(true);
    expect(isValidGuess('03', 2, 2)).toBe(false);
    expect(isValidGuess('01af2', 5, 10)).toBe(false);
    expect(isValidGuess('01459', 5, 8)).toBe(false);
  });
});

describe('evaluateGuess', () => {
  it('counts cows and bulls', () => {
    expect(evaluateGuess('1234', '1243')).toEqual({ bulls: 2, cows: 2 });
  });
  it('counts cows and bulls in mixed case', () => {
    expect(evaluateGuess('1234', '1543')).toEqual({ bulls: 1, cows: 2 });
  });
  it('return zero counts if havent any cows and bulls', () => {
    expect(evaluateGuess('1234', '5678')).toEqual({ bulls: 0, cows: 0 });
  });
  it('returns only cows', () => {
    expect(evaluateGuess('12ab', 'ba21')).toEqual({ bulls: 0, cows: 4 });
  });
  it('returns only bulls', () => {
    expect(evaluateGuess('1234', '1234')).toEqual({ bulls: 4, cows: 0 });
  });
  it('should operating with any register', () => {
    expect(evaluateGuess('abcd', 'ABDC')).toEqual({ bulls: 2, cows: 2 });
  });
});

// Детерминированный источник случайности: по кругу отдаёт заданные значения.
function sequence(values: number[]): () => number {
  let index = 0;
  return () => values[index++ % values.length] ?? 0;
}

describe('generateSecret', () => {
  it('picks the first available digit each time when random returns 0', () => {
    expect(generateSecret(4, 10, () => 0)).toBe('0123');
  });

  it('picks the last available digit each time when random is close to 1', () => {
    expect(generateSecret(4, 10, () => 0.999)).toBe('9876');
  });

  it('removes picked digits from the pool', () => {
    // 0.5 -> index 5 of 0..9 = '5'; 0 -> '0'; 0.99 -> last of the rest = '9'
    expect(generateSecret(3, 10, sequence([0.5, 0, 0.99]))).toBe('509');
  });

  it('uses lowercase hex letters', () => {
    expect(generateSecret(2, 16, () => 0.999)).toBe('fe');
  });

  it('builds a two-digit binary secret', () => {
    expect(generateSecret(2, 2, () => 0)).toBe('01');
    expect(generateSecret(2, 2, () => 0.999)).toBe('10');
  });

  it.each([
    [2, 2],
    [4, 8],
    [6, 10],
    [6, 16],
  ] as const)(
    'returns a valid secret of length %i in base %i',
    (length, base) => {
      const secret = generateSecret(length, base, sequence([0.3, 0.7, 0.1]));
      expect(isValidGuess(secret, length, base)).toBe(true);
    },
  );

  it('throws when length is greater than base', () => {
    expect(() => generateSecret(3, 2, () => 0)).toThrow(RangeError);
  });
});
