import type { GameRecord } from '../types/core.type.js';

export function compareRecords(a: GameRecord, b: GameRecord): number {
  void a;
  void b;
  throw new Error('Not implemented');
}

export function addRecord(
  records: readonly GameRecord[],
  record: GameRecord,
): GameRecord[] {
  void records;
  void record;
  throw new Error('Not implemented');
}
