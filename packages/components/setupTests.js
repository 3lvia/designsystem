// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import 'jsdom-global/register';
import '@testing-library/jest-dom';

global.ResizeObserver = require('resize-observer-polyfill');
global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

global.FocusEvent = class {
  constructor(callback) {}
};

// JSDOM does not implement the scrollTo() function
global.Element.prototype.scrollTo = () => {
  return;
};
