declare const __debug: string;

/**
 * to be used only in test related code
 */
// eslint-disable-next-line no-console
export const log = __debug ? console.log : () => {};
export const logMessage = (who: string, what: unknown) => log(`worker "${who}" got message: "${what as string}"`);
