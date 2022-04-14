// @ts-check

/**
 * Delays the execution of a function in milliseconds.
 * @param {function} fn - target function
 * @param {number} delay - number in ms (milliseconds)
 */
const debounce = (fn, delay = 1500) => {
    let id;
    return function(...args) {

        if (id) clearTimeout(id);

        id = setTimeout(() => fn(...args), delay);
    };
};
