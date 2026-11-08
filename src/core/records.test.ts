import { describe, expect, it } from 'vitest';
import { addRecord, compareRecords } from './records.js';
import type { GameRecord } from '../types/core.type.js';

const settings = { length: 4, base: 10 } as const;
const record = (attempts: number, time: number): GameRecord => ({
  attempts,
  time,
  settings,
});

describe('compareRecords', () => {
  it('puts the record with fewer attempts first', () => {
    expect(compareRecords(record(3, 900), record(5, 100))).toBeLessThan(0);
  });

  it('compares time when attempts are equal', () => {
    expect(compareRecords(record(4, 200), record(4, 100))).toBeGreaterThan(0);
  });
});

describe('addRecord', () => {
  it('inserts the record in sorted order', () => {
    const records = [record(2, 100), record(6, 100)];

    expect(addRecord(records, record(4, 100))).toEqual([
      record(2, 100),
      record(4, 100),
      record(6, 100),
    ]);
  });

  it('keeps only the 10 best records', () => {
    const records = Array.from({ length: 10 }, (_, i) => record(i + 1, 100));
    const result = addRecord(records, record(20, 100));

    expect(result).toHaveLength(10);
    expect(result).not.toContainEqual(record(20, 100));
  });

  it('does not change the original list', () => {
    const records = [record(5, 100)];
    addRecord(records, record(1, 100));

    expect(records).toEqual([record(5, 100)]);
  });
});
