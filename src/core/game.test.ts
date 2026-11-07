import { describe, expect, it } from 'vitest';
import { createDigitValidator, isValidGuess } from './game.js';

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
  // надо описать  и проверить - длинну введенную юзером, валидность символов для системы счисления, и непвоторяемость символов

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
    expect(isValidGuess('01af9', 5, 8)).toBe(false);
  });
});
