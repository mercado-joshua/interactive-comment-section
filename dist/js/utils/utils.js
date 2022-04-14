"use strict";

// @ts-check

/**
 * Delays the execution of a function in milliseconds.
 * @param {function} fn - target function
 * @param {number} delay - number in ms (milliseconds)
 */
var debounce = function debounce(fn) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1500;
  var id;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (id) clearTimeout(id);
    id = setTimeout(function () {
      return fn.apply(void 0, args);
    }, delay);
  };
};