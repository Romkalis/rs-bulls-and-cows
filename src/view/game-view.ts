import type { GameState } from '../types/core.type.js';
import { createDigitValidator } from '../core/game.js';
import { el } from './dom.js';

type Props = {
  game: GameState;
  message: string;
  onGuess: (guess: string) => void;
  onNewGame: () => void;
};

function formatTime(ms: number): string {
  return `${(ms / 1000).toFixed(1)} с`;
}

export function renderGame({
  game,
  message,
  onGuess,
  onNewGame,
}: Props): HTMLElement {
  const isDigit = createDigitValidator(game.settings.base);

  const isOver = game.status === 'won';

  // Отдельное поле на каждую цифру
  const cells = Array.from({ length: game.settings.length }, () =>
    el('input', {
      className: 'cell',
      maxLength: 1,
      autocomplete: 'off',
      disabled: isOver,
    }),
  );

  cells.forEach((cell, index) => {
    // Пропускаем только одну цифру выбранной системы счисления
    cell.addEventListener('beforeinput', (event) => {
      if (event.data !== null && !isDigit(event.data)) event.preventDefault();
    });

    // После ввода цифры переходим к следующему полю
    cell.addEventListener('input', () => {
      if (cell.value) cells[index + 1]?.focus();
    });

    // Backspace в пустом поле возвращает к предыдущему
    cell.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && !cell.value) cells[index - 1]?.focus();
    });

    // При фокусе выделяем цифру, чтобы новая сразу её заменила
    cell.addEventListener('focus', () => cell.select());
  });

  const form = el(
    'form',
    {
      className: 'guess-form',
      onsubmit: (event: SubmitEvent) => {
        event.preventDefault();
        onGuess(cells.map((cell) => cell.value).join(''));
      },
    },
    el('div', { className: 'cells' }, ...cells),
    el('button', { type: 'submit', disabled: isOver }, 'Проверить'),
  );

  const history = el(
    'ol',
    {},
    ...game.history.map(({ guess, score }) =>
      el(
        'li',
        {},
        `${guess.toUpperCase()} — быки: ${score.bulls}, коровы: ${score.cows}`,
      ),
    ),
  );

  const result =
    game.status === 'won' && game.finishedAt !== null
      ? el(
          'p',
          { className: 'win' },
          `Угадано! Попыток: ${game.history.length}, время: ${formatTime(game.finishedAt - game.startedAt)}`,
        )
      : el('p', { className: 'message' }, message);

  queueMicrotask(() => cells[0]?.focus());

  return el(
    'section',
    {},
    el('h2', {}, 'Игра'),
    form,
    result,
    history,
    el('button', { onclick: onNewGame }, 'Новая игра'),
  );
}
