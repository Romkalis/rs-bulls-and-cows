import { generateSecret, isValidGuess } from './core/game.js';
import { applyGuess, startGame } from './core/state.js';
import { addRecord } from './core/records.js';
import { el } from './view/dom.js';
import { renderSettings } from './view/settings-view.js';
import { renderGame } from './view/game-view.js';
import { renderRecords } from './view/records-view.js';
import { loadRecords, saveRecords } from './view/storage.js';
// Единственное изменяемое состояние приложения — живёт только здесь
let screen = { kind: 'settings', settings: { length: 4, base: 10 } };
let records = loadRecords();
const app = el('main');
document.body.append(app);
function handleStart(settings) {
    const secret = generateSecret(settings.length, settings.base);
    screen = {
        kind: 'game',
        game: startGame(settings, secret, Date.now()),
        message: '',
    };
    render();
}
function handleGuess(game, guess) {
    const { length, base } = game.settings;
    if (!isValidGuess(guess, length, base)) {
        screen = { kind: 'game', game, message: `Нужно ${length} разных цифр` };
        render();
        return;
    }
    const next = applyGuess(game, guess, Date.now());
    if (next === game) {
        screen = { kind: 'game', game, message: 'Такая попытка уже была' };
        render();
        return;
    }
    if (next.status === 'won' && next.finishedAt !== null) {
        records = addRecord(records, {
            attempts: next.history.length,
            time: next.finishedAt - next.startedAt,
            settings: next.settings,
        });
        saveRecords(records);
    }
    screen = { kind: 'game', game: next, message: '' };
    render();
}
function handleNewGame(settings) {
    screen = { kind: 'settings', settings };
    render();
}
function render() {
    const current = screen;
    if (current.kind === 'settings') {
        app.replaceChildren(el('h1', {}, 'Быки и коровы'), renderSettings({
            settings: current.settings,
            locked: false,
            onChange: (settings) => {
                screen = { kind: 'settings', settings };
                render();
            },
            onStart: () => handleStart(current.settings),
        }), renderRecords(records));
        return;
    }
    app.replaceChildren(el('h1', {}, 'Быки и коровы'), renderSettings({
        settings: current.game.settings,
        locked: true,
        onChange: () => { },
        onStart: () => { },
    }), renderGame({
        game: current.game,
        message: current.message,
        onGuess: (guess) => handleGuess(current.game, guess),
        onNewGame: () => handleNewGame(current.game.settings),
    }), renderRecords(records));
}
render();
//# sourceMappingURL=main.js.map