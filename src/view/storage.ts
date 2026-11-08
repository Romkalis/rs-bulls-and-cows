import type { GameRecord } from '../types/core.type.js';

const STORAGE_KEY = 'bulls-and-cows-records';

export function loadRecords(): GameRecord[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export function saveRecords(records: readonly GameRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}
