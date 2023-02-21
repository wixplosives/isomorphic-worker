/**
 * This a polyfill for safari, which does not support the `new Worker` constructor in a worker scope.
 * We use this flag to detect if we are in a safari.
 *
 * We chose using this flag over feature detection, because we have to extend the `Worker` class,
 * which we prefer not to do if we don't have to.
 */
export const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
