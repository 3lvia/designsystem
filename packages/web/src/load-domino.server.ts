// Hacky implementation of support for SSR, should probably be slimmed down to minimum


import { existsSync } from 'fs';
import { join } from 'path';
const distFolder = join(process.cwd(), 'dist/elvia-designsystem/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

const domino = require('domino');
const win = domino.createWindow(indexHtml);
win.customElements = {};
win.customElements.define = function () { };
global['window'] = win;
global['document'] = win.document;
global['navigator'] = win.navigator;

Object.assign(global, require('domino').impl);