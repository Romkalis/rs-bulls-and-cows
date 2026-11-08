import type { GameRecord } from '../types/core.type.js';
import { el } from './dom.js';

const BASE_NAMES: Record<number, string> = {
  2: 'bin',
  8: 'oct',
  10: 'dec',
  16: 'hex',
};

export function renderRecords(records: readonly GameRecord[]): HTMLElement {
  const content =
    records.length === 0
      ? el('p', {}, 'Пока нет результатов')
      : el(
          'ol',
          {},
          ...records.map(({ attempts, time, settings }) =>
            el(
              'li',
              {},
              `Попыток: ${attempts}, время: ${(time / 1000).toFixed(1)} с (${BASE_NAMES[settings.base]}, ${settings.length} цифры)`,
            ),
          ),
        );

  return el('section', {}, el('h2', {}, 'Лучшие результаты'), content);
}
