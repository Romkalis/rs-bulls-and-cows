export function memoize<Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
): (...args: Args) => Result {
  void fn;
  throw new Error('Not implemented');
}
