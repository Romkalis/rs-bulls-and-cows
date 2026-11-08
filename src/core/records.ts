import type { GameRecord } from '../types/core.type.js';

const MAX_RECORDS = 10;

export function compareRecords(a: GameRecord, b: GameRecord): number {
  return a.attempts - b.attempts || a.time - b.time;
}

export function addRecord(
  records: readonly GameRecord[],
  record: GameRecord,
): GameRecord[] {
  return [...records, record].sort(compareRecords).slice(0, MAX_RECORDS);
}
