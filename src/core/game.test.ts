import { describe, expect, it } from 'vitest';
import { createDigitValidator } from './game.js';

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
