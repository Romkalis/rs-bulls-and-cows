import { memoize } from '../utils/memoize.js';
import { normalize } from '../utils/normalize.js';
const DIGITS = '0123456789abcdef';
export function createDigitValidator(base) {
    const availableValues = DIGITS.slice(0, base);
    return (digit) => {
        if (digit.length !== 1) {
            return false;
        }
        return availableValues.includes(digit.toLowerCase());
    };
}
export function isValidGuess(input, length, base) {
    const lowerInput = input.toLowerCase();
    const isUniq = new Set(lowerInput.split('')).size === input.length;
    const validator = createDigitValidator(base);
    const isValid = lowerInput
        .split('')
        .every((char) => validator(char));
    if (!isUniq || input.length !== length || !isValid)
        return false;
    return true;
}
export function evaluateGuess(secret, guess) {
    const secretChars = normalize(secret);
    const guessChars = normalize(guess);
    const secretDigits = new Set(secretChars);
    const bulls = guessChars.filter((ch, i) => ch === secretChars[i]).length;
    const common = guessChars.filter((ch) => secretDigits.has(ch)).length;
    return { bulls, cows: common - bulls };
}
export function generateSecret(length, base, random = Math.random) {
    if (length > base) {
        throw new RangeError(`Cannot build ${length} unique digits in base ${base}`);
    }
    const digits = DIGITS.slice(0, base).split('');
    const addDigit = (secret) => {
        if (secret.length === length)
            return secret;
        const unused = digits.filter((digit) => !secret.includes(digit));
        const index = Math.floor(random() * unused.length);
        return addDigit(secret + (unused[index] ?? ''));
    };
    return addDigit('');
}
export const countPossibleSecrets = memoize((length, base) => {
    if (length === 0)
        return 1;
    return base * countPossibleSecrets(length - 1, base - 1);
});
//# sourceMappingURL=game.js.map