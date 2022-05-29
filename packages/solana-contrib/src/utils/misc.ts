export * from "@saberhq/option-utils";

const noop = () => {
  // noop
};

/**
 * Hide the console.error because @solana/web3.js often emits noisy errors as a
 * side effect.
 */
export const suppressConsoleErrorAsync = async <T>(
  fn: () => Promise<T>
): Promise<T> => {
  const oldConsoleError = console.error;
  console.error = noop;
  try {
    const result = await fn();
    console.error = oldConsoleError;
    return result;
  } catch (e) {
    console.error = oldConsoleError;
    throw e;
  }
};

/**
 * Hide the console.error because @solana/web3.js often emits noisy errors as a
 * side effect.
 */
export const suppressConsoleError = <T>(fn: () => T): T => {
  const oldConsoleError = console.error;
  console.error = noop;
  try {
    const result = fn();
    console.error = oldConsoleError;
    return result;
  } catch (e) {
    console.error = oldConsoleError;
    throw e;
  }
};

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Promise or its inner value.
 */
export type PromiseOrValue<T> = Promise<T> | T;

/**
 * Awaits for a promise or value.
 */
export const valueAsPromise = async <T>(
  awaitable: PromiseOrValue<T>
): Promise<T> => {
  if ("then" in awaitable) {
    return await awaitable;
  }
  return awaitable;
};
