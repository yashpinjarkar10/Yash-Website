/**
 * Read JSON from localStorage safely.
 * @template T
 * @param {string} key
 * @returns {T|null}
 */
export const readCache = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (_) {
    return null;
  }
};

/**
 * Write JSON to localStorage safely.
 * @param {string} key
 * @param {unknown} value
 */
export const writeCache = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (_) {
    // Ignore storage write failures (private mode / quota / disabled storage)
  }
};
