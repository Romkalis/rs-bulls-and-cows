import { countPossibleSecrets } from '../core/game.js';
import { el } from './dom.js';
const BASES = [
    { label: 'bin (2)', value: 2 },
    { label: 'oct (8)', value: 8 },
    { label: 'dec (10)', value: 10 },
    { label: 'hex (16)', value: 16 },
];
const LENGTHS = [2, 3, 4, 5, 6];
export function renderSettings({ settings, locked, onChange, onStart, }) {
    const baseSelect = el('select', {
        disabled: locked,
        onchange: () => {
            const base = Number(baseSelect.value);
            onChange({ base, length: base === 2 ? 2 : settings.length });
        },
    }, ...BASES.map(({ label, value }) => el('option', { value: String(value), selected: value === settings.base }, label)));
    const lengthSelect = el('select', {
        disabled: locked,
        onchange: () => onChange({ ...settings, length: Number(lengthSelect.value) }),
    }, ...LENGTHS.map((length) => el('option', {
        value: String(length),
        selected: length === settings.length,
        disabled: settings.base === 2 && length > 2,
    }, String(length))));
    const total = countPossibleSecrets(settings.length, settings.base);
    return el('section', {}, el('h2', {}, 'Настройки'), el('label', {}, 'Система счисления: ', baseSelect), el('label', {}, 'Длина: ', lengthSelect), el('p', {}, `Возможных секретов: ${total}`), locked ? '' : el('button', { onclick: onStart }, 'Начать игру'));
}
//# sourceMappingURL=settings-view.js.map