/**
 * Select one or more DOM elements by selector.
 * @param {string} el
 * @param {boolean} [all=false]
 * @returns {Element|Element[]|null}
 */
export const select = (el, all = false) => {
  const selector = el.trim();
  return all ? [...document.querySelectorAll(selector)] : document.querySelector(selector);
};

/**
 * Attach event listener(s) to selected element(s).
 * @param {string} type
 * @param {string} el
 * @param {(event: Event) => void} listener
 * @param {boolean} [all=false]
 */
export const on = (type, el, listener, all = false) => {
  const selected = select(el, all);
  if (!selected) return;

  if (all) {
    selected.forEach((item) => item.addEventListener(type, listener));
    return;
  }

  selected.addEventListener(type, listener);
};

/**
 * Attach a scroll listener.
 * @param {EventTarget} el
 * @param {(event: Event) => void} listener
 */
export const onscroll = (el, listener) => {
  el.addEventListener('scroll', listener);
};
