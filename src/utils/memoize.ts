export function memoize<Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
): (...args: Args) => Result {
  const cache = new Map<string, Result>();

  return (...args) => {
    const key = JSON.stringify(args);
    const cached = cache.get(key);
    if (cached !== undefined) return cached;

    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
