import { r as reactExports, R as React } from './index-c3e2bc00.js';
import {
  E as E$1,
  H as He,
  x,
  C as Ce,
  b as IconButton,
  I as IconWrapper,
  O as Overlay,
  T as TertiaryButton,
  F as FormFieldInput,
  c as FormFieldErrorContainer,
  d as FormFieldError,
  e as useFocusTrap,
  f as useConnectedOverlay,
  g as FormFieldContainer,
  h as FormFieldLabel,
  i as FormFieldInputContainer,
} from './index-ff053e39.js';

const calendar = {
  getIcon: function (color) {
    const icon =
      '<svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="19.5" width="6" height="1.5" rx=".75" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path d="M2.25 24A2.252 2.252 0 0 1 0 21.75V5.25A2.252 2.252 0 0 1 2.25 3H6V.75a.75.75 0 0 1 1.5 0V3h9V.75a.75.75 0 0 1 1.5 0V3h3.75A2.252 2.252 0 0 1 24 5.25v16.5A2.252 2.252 0 0 1 21.75 24H2.25Zm-.75-2.25c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75V10.5h-21v11.25ZM22.5 9V5.25a.75.75 0 0 0-.75-.75H18V6a.75.75 0 0 1-1.5 0V4.5h-9V6A.75.75 0 0 1 6 6V4.5H2.25a.75.75 0 0 0-.75.75V9h21Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>';
    if (!color) {
      return icon;
    }
    if (!color.startsWith('#') && !color.startsWith('var(--')) {
      return icon
        .replaceAll(
          'fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"',
          'fill="' + E$1(color) + '"',
        )
        .replaceAll(
          'fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"',
          'fill="' + E$1(color) + '"',
        );
    }
    return icon
      .replaceAll(
        'fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"',
        'fill="' + color + '"',
      )
      .replaceAll(
        'fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"',
        'fill="' + color + '"',
      );
  },
};

var isBefore = function (a, b) {
  return !!a && !!b && a.getTime() < b.getTime();
};
var isAfter = function (a, b) {
  return !!a && !!b && a.getTime() > b.getTime();
};
var dateIsWithinMinMaxBoundary = function (a, b, c) {
  var d = isBefore(a, b),
    e = isAfter(a, c);
  return !d && !e;
};
var isSameDay = function (a, b) {
  return (
    !!(a && b) &&
    formatDate(a, { year: 'numeric', month: 'numeric', day: 'numeric' }) ===
      formatDate(b, { year: 'numeric', month: 'numeric', day: 'numeric' })
  );
};
var getDayName = function (a) {
  return a.toLocaleDateString('nb-NO', { weekday: 'short' }).substring(0, 2);
};
var getWeekDayNames = function () {
  var a = new Date(2022, 9, 10);
  return Array(7)
    .fill('')
    .map(function () {
      var b = getDayName(a);
      return a.setDate(a.getDate() + 1), b;
    });
};
var formatDate = function (a, b) {
  return a ? a.toLocaleString('nb-NO', b) : '';
};
var isValidDate = function (a) {
  return !isNaN(a) && a instanceof Date;
};
var copyDay = function (a, b) {
  var c = new Date(b);
  return c.setFullYear(a.getFullYear(), a.getMonth(), a.getDate()), c;
};
var localISOTime = function (a) {
  var b = 6e4 * a.getTimezoneOffset(),
    c = new Date(a.getTime() - b).toISOString();
  return c;
};

var o = {
    'primary-colors': {
      white: { color: '#FFFFFF', contrastText: '#000000' },
      green: { color: '#29D305', contrastText: '#000000' },
      black: { color: '#000000', contrastText: '#FFFFFF' },
      grey: { color: '#262626', contrastText: '#FFFFFF' },
    },
    'signal-colors': {
      yellow: { color: '#FFFF00', contrastText: '#000000' },
      orange: { color: '#FFA000', contrastText: '#000000' },
      red: { color: '#EE0701', contrastText: '#FFFFFF' },
    },
    'data-colors': {
      'green-apple': { color: '#21AC04', contrastText: '#000000' },
      'violet-grape': { color: '#490192', contrastText: '#FFFFFF' },
      'blue-berry': { color: '#006DDB', contrastText: '#FFFFFF' },
      'purple-plum': { color: '#B66DFF', contrastText: '#000000' },
      'orange-mango': { color: '#DB6D00', contrastText: '#000000' },
      'red-tomato': { color: '#B90202', contrastText: '#FFFFFF' },
    },
    'grey-colors': {
      'grey-90': { color: '#3B3B3B', contrastText: '#FFFFFF' },
      'grey-80': { color: '#515151', contrastText: '#FFFFFF' },
      'grey-70': { color: '#676767', contrastText: '#FFFFFF' },
      'grey-60': { color: '#7C7C7C', contrastText: '#000000' },
      'grey-50': { color: '#929292', contrastText: '#000000' },
      'grey-40': { color: '#A8A8A8', contrastText: '#000000' },
      'grey-30': { color: '#BDBDBD', contrastText: '#000000' },
      'grey-20': { color: '#D3D3D3', contrastText: '#000000' },
      'grey-10': { color: '#E9E9E9', contrastText: '#000000' },
      'grey-05': { color: '#F4F4F4', contrastText: '#000000' },
      'grey-02': { color: '#FAFAFA', contrastText: '#000000' },
    },
    'internal-colors': { 'focus-outline': { color: '#0064FA' } },
  },
  y = {
    text: {
      'text-1': { hex: o['primary-colors'].black.color, contrast: o['primary-colors'].black.contrastText },
      'text-2': {
        hex: o['grey-colors']['grey-80'].color,
        contrast: o['grey-colors']['grey-80'].contrastText,
      },
      'text-3': { hex: o['primary-colors'].white.color, contrast: o['primary-colors'].white.contrastText },
      'text-4': { hex: o['primary-colors'].white.color, contrast: o['primary-colors'].white.contrastText },
      'text-disabled-1': {
        hex: o['grey-colors']['grey-30'].color,
        contrast: o['grey-colors']['grey-30'].contrastText,
      },
      'text-disabled-2': {
        hex: o['grey-colors']['grey-05'].color,
        contrast: o['grey-colors']['grey-05'].contrastText,
      },
      'text-placeholder-1': {
        hex: o['grey-colors']['grey-70'].color,
        contrast: o['grey-colors']['grey-70'].contrastText,
      },
    },
    background: {
      'background-1': {
        hex: o['primary-colors'].white.color,
        contrast: o['primary-colors'].white.contrastText,
      },
      'background-2': {
        hex: o['grey-colors']['grey-02'].color,
        contrast: o['grey-colors']['grey-02'].contrastText,
      },
      'background-3': {
        hex: o['primary-colors'].grey.color,
        contrast: o['primary-colors'].grey.contrastText,
      },
      'background-element-1': {
        hex: o['primary-colors'].white.color,
        contrast: o['primary-colors'].white.contrastText,
      },
      'background-element-2': {
        hex: o['grey-colors']['grey-02'].color,
        contrast: o['grey-colors']['grey-02'].contrastText,
      },
      'background-element-3': {
        hex: o['grey-colors']['grey-10'].color,
        contrast: o['grey-colors']['grey-10'].contrastText,
      },
      'background-element-4': {
        hex: o['primary-colors'].white.color,
        contrast: o['primary-colors'].white.contrastText,
      },
      'background-element-5': {
        hex: o['primary-colors'].black.color,
        contrast: o['primary-colors'].black.contrastText,
      },
      'background-element-6': {
        hex: o['primary-colors'].white.color,
        contrast: o['primary-colors'].white.contrastText,
      },
      'background-overlay-1': {
        hex: o['primary-colors'].white.color,
        contrast: o['primary-colors'].white.contrastText,
      },
      'background-overlay-2': {
        hex: o['grey-colors']['grey-80'].color,
        contrast: o['grey-colors']['grey-80'].contrastText,
      },
      'background-overlay-3': {
        hex: o['primary-colors'].white.color,
        contrast: o['primary-colors'].white.contrastText,
      },
      'background-disabled-1': {
        hex: o['grey-colors']['grey-05'].color,
        contrast: o['grey-colors']['grey-05'].contrastText,
      },
      'background-disabled-2': {
        hex: o['grey-colors']['grey-30'].color,
        contrast: o['grey-colors']['grey-30'].contrastText,
      },
      'background-hover-1': {
        hex: o['primary-colors'].green.color,
        contrast: o['primary-colors'].green.contrastText,
      },
      'background-hover-2': {
        hex: o['grey-colors']['grey-05'].color,
        contrast: o['grey-colors']['grey-05'].contrastText,
      },
      'background-selected-1': {
        hex: o['primary-colors'].green.color,
        contrast: o['primary-colors'].green.contrastText,
      },
      'background-selected-2': {
        hex: o['grey-colors']['grey-10'].color,
        contrast: o['grey-colors']['grey-10'].contrastText,
      },
    },
    border: {
      'border-1': { hex: o['primary-colors'].black.color, contrast: o['primary-colors'].black.contrastText },
      'border-2': {
        hex: o['grey-colors']['grey-10'].color,
        contrast: o['grey-colors']['grey-10'].contrastText,
      },
      'border-3': {
        hex: o['grey-colors']['grey-20'].color,
        contrast: o['grey-colors']['grey-20'].contrastText,
      },
      'border-4': {
        hex: o['grey-colors']['grey-05'].color,
        contrast: o['grey-colors']['grey-05'].contrastText,
      },
      'border-5': {
        hex: o['grey-colors']['grey-05'].color,
        contrast: o['grey-colors']['grey-05'].contrastText,
      },
      'border-6': {
        hex: o['grey-colors']['grey-60'].color,
        contrast: o['grey-colors']['grey-60'].contrastText,
      },
      'border-disabled-1': {
        hex: o['grey-colors']['grey-30'].color,
        contrast: o['grey-colors']['grey-30'].contrastText,
      },
      'border-hover-1': {
        hex: o['primary-colors'].green.color,
        contrast: o['primary-colors'].green.contrastText,
      },
      'border-selected-1': {
        hex: o['primary-colors'].green.color,
        contrast: o['primary-colors'].green.contrastText,
      },
      'border-selected-2': {
        hex: o['primary-colors'].black.color,
        contrast: o['primary-colors'].black.contrastText,
      },
    },
    signal: {
      'signal-positive': {
        hex: o['primary-colors'].green.color,
        contrast: o['primary-colors'].green.contrastText,
      },
      'signal-caution': {
        hex: o['signal-colors'].yellow.color,
        contrast: o['signal-colors'].yellow.contrastText,
      },
      'signal-warning': {
        hex: o['signal-colors'].orange.color,
        contrast: o['signal-colors'].orange.contrastText,
      },
      'signal-danger': { hex: o['signal-colors'].red.color, contrast: o['signal-colors'].red.contrastText },
      'signal-info': {
        hex: o['primary-colors'].black.color,
        contrast: o['primary-colors'].black.contrastText,
      },
    },
    data: {
      'data-1': {
        hex: o['data-colors']['green-apple'].color,
        contrast: o['data-colors']['green-apple'].contrastText,
      },
      'data-2': {
        hex: o['data-colors']['violet-grape'].color,
        contrast: o['data-colors']['violet-grape'].contrastText,
      },
      'data-3': {
        hex: o['data-colors']['blue-berry'].color,
        contrast: o['data-colors']['blue-berry'].contrastText,
      },
      'data-4': {
        hex: o['data-colors']['purple-plum'].color,
        contrast: o['data-colors']['purple-plum'].contrastText,
      },
      'data-5': {
        hex: o['data-colors']['orange-mango'].color,
        contrast: o['data-colors']['orange-mango'].contrastText,
      },
      'data-6': {
        hex: o['data-colors']['red-tomato'].color,
        contrast: o['data-colors']['red-tomato'].contrastText,
      },
    },
    icon: {
      'icon-stroke-1': {
        hex: o['primary-colors'].black.color,
        contrast: o['primary-colors'].black.contrastText,
      },
      'icon-filled-foreground-1': {
        hex: o['primary-colors'].white.color,
        contrast: o['primary-colors'].white.contrastText,
      },
      'icon-filled-background-1': {
        hex: o['primary-colors'].black.color,
        contrast: o['primary-colors'].black.contrastText,
      },
      'icon-positive': {
        hex: o['primary-colors'].green.color,
        contrast: o['primary-colors'].green.contrastText,
      },
      'icon-caution': {
        hex: o['signal-colors'].yellow.color,
        contrast: o['signal-colors'].yellow.contrastText,
      },
      'icon-warning': {
        hex: o['signal-colors'].orange.color,
        contrast: o['signal-colors'].orange.contrastText,
      },
      'icon-danger': { hex: o['signal-colors'].red.color, contrast: o['signal-colors'].red.contrastText },
      'icon-info': { hex: o['primary-colors'].black.color, contrast: o['primary-colors'].black.contrastText },
    },
    assorted: {
      'static-white': {
        hex: o['primary-colors'].white.color,
        contrast: o['primary-colors'].white.contrastText,
      },
      'static-black': {
        hex: o['primary-colors'].black.color,
        contrast: o['primary-colors'].black.contrastText,
      },
      'brand-accent': {
        hex: o['primary-colors'].green.color,
        contrast: o['primary-colors'].green.contrastText,
      },
      'focus-outline': { hex: o['internal-colors']['focus-outline'].color },
    },
  };
var r = {
    'primary-colors': {
      white: { color: '#EDEDED', contrastText: '#171717' },
      green: { color: '#35BB18', contrastText: '#171717' },
      black: { color: '#171717', contrastText: '#EDEDED' },
      grey: { color: '#1F1F1F', contrastText: '#EDEDED' },
    },
    'signal-colors': {
      yellow: { color: '#EBEB18', contrastText: '#171717' },
      orange: { color: '#E59712', contrastText: '#171717' },
      red: { color: '#C82520', contrastText: '#EDEDED' },
    },
    'data-colors': {
      'green-apple': { color: '#2d9f15', contrastText: '#171717' },
      'violet-grape': { color: '#692CA5', contrastText: '#EDEDED' },
      'blue-berry': { color: '#0967C6', contrastText: '#EDEDED' },
      'purple-plum': { color: '#9963CF', contrastText: '#171717' },
      'orange-mango': { color: '#C5670C', contrastText: '#171717' },
      'red-tomato': { color: '#9E1111', contrastText: '#EDEDED' },
    },
    'grey-colors': {
      'grey-70': { color: '#262626', contrastText: '#EDEDED' },
      'grey-60': { color: '#2B2B2B', contrastText: '#EDEDED' },
      'grey-50': { color: '#333333', contrastText: '#EDEDED' },
      'grey-40': { color: '#424242', contrastText: '#EDEDED' },
      'grey-30': { color: '#5E5E5E', contrastText: '#EDEDED' },
      'grey-20': { color: '#A1A1A1', contrastText: '#171717' },
      'grey-10': { color: '#C4C4C4', contrastText: '#171717' },
    },
    'internal-colors': { 'focus-outline': { color: '#0064fa' } },
  },
  d = {
    text: {
      'text-1': { hex: r['primary-colors'].white.color, contrast: r['primary-colors'].white.contrastText },
      'text-2': {
        hex: r['grey-colors']['grey-10'].color,
        contrast: r['grey-colors']['grey-10'].contrastText,
      },
      'text-3': { hex: r['primary-colors'].white.color, contrast: r['primary-colors'].white.contrastText },
      'text-4': { hex: r['primary-colors'].black.color, contrast: r['primary-colors'].black.contrastText },
      'text-disabled-1': {
        hex: r['grey-colors']['grey-30'].color,
        contrast: r['grey-colors']['grey-30'].contrastText,
      },
      'text-disabled-2': {
        hex: r['grey-colors']['grey-50'].color,
        contrast: r['grey-colors']['grey-50'].contrastText,
      },
      'text-placeholder-1': {
        hex: r['grey-colors']['grey-20'].color,
        contrast: r['grey-colors']['grey-20'].contrastText,
      },
    },
    background: {
      'background-1': {
        hex: r['primary-colors'].grey.color,
        contrast: r['primary-colors'].grey.contrastText,
      },
      'background-2': {
        hex: r['primary-colors'].grey.color,
        contrast: r['primary-colors'].grey.contrastText,
      },
      'background-3': {
        hex: r['grey-colors']['grey-70'].color,
        contrast: r['grey-colors']['grey-70'].contrastText,
      },
      'background-element-1': { hex: 'transparent' },
      'background-element-2': {
        hex: r['grey-colors']['grey-70'].color,
        contrast: r['grey-colors']['grey-70'].contrastText,
      },
      'background-element-3': {
        hex: r['grey-colors']['grey-50'].color,
        contrast: r['grey-colors']['grey-50'].contrastText,
      },
      'background-element-4': {
        hex: r['grey-colors']['grey-70'].color,
        contrast: r['grey-colors']['grey-70'].contrastText,
      },
      'background-element-5': {
        hex: r['primary-colors'].white.color,
        contrast: r['primary-colors'].white.contrastText,
      },
      'background-element-6': {
        hex: r['primary-colors'].black.color,
        contrast: r['primary-colors'].black.contrastText,
      },
      'background-overlay-1': {
        hex: r['grey-colors']['grey-60'].color,
        contrast: r['grey-colors']['grey-60'].contrastText,
      },
      'background-overlay-2': {
        hex: r['grey-colors']['grey-50'].color,
        contrast: r['grey-colors']['grey-50'].contrastText,
      },
      'background-overlay-3': {
        hex: r['primary-colors'].black.color,
        contrast: r['primary-colors'].black.contrastText,
      },
      'background-disabled-1': {
        hex: r['grey-colors']['grey-50'].color,
        contrast: r['grey-colors']['grey-50'].contrastText,
      },
      'background-disabled-2': {
        hex: r['grey-colors']['grey-30'].color,
        contrast: r['grey-colors']['grey-30'].contrastText,
      },
      'background-hover-1': {
        hex: r['primary-colors'].green.color,
        contrast: r['primary-colors'].green.contrastText,
      },
      'background-hover-2': {
        hex: r['grey-colors']['grey-50'].color,
        contrast: r['grey-colors']['grey-50'].contrastText,
      },
      'background-selected-1': {
        hex: r['primary-colors'].green.color,
        contrast: r['primary-colors'].green.contrastText,
      },
      'background-selected-2': {
        hex: r['grey-colors']['grey-40'].color,
        contrast: r['grey-colors']['grey-40'].contrastText,
      },
    },
    border: {
      'border-1': { hex: r['primary-colors'].white.color, contrast: r['primary-colors'].white.contrastText },
      'border-2': {
        hex: r['grey-colors']['grey-40'].color,
        contrast: r['grey-colors']['grey-40'].contrastText,
      },
      'border-3': {
        hex: r['grey-colors']['grey-40'].color,
        contrast: r['grey-colors']['grey-40'].contrastText,
      },
      'border-4': {
        hex: r['grey-colors']['grey-50'].color,
        contrast: r['grey-colors']['grey-50'].contrastText,
      },
      'border-5': { hex: 'transparent' },
      'border-6': {
        hex: r['grey-colors']['grey-20'].color,
        contrast: r['grey-colors']['grey-20'].contrastText,
      },
      'border-disabled-1': {
        hex: r['grey-colors']['grey-30'].color,
        contrast: r['grey-colors']['grey-30'].contrastText,
      },
      'border-hover-1': {
        hex: r['primary-colors'].green.color,
        contrast: r['primary-colors'].green.contrastText,
      },
      'border-selected-1': {
        hex: r['primary-colors'].green.color,
        contrast: r['primary-colors'].green.contrastText,
      },
      'border-selected-2': {
        hex: r['primary-colors'].white.color,
        contrast: r['primary-colors'].white.contrastText,
      },
    },
    signal: {
      'signal-positive': {
        hex: r['primary-colors'].green.color,
        contrast: r['primary-colors'].green.contrastText,
      },
      'signal-caution': {
        hex: r['signal-colors'].yellow.color,
        contrast: r['signal-colors'].yellow.contrastText,
      },
      'signal-warning': {
        hex: r['signal-colors'].orange.color,
        contrast: r['signal-colors'].orange.contrastText,
      },
      'signal-danger': { hex: r['signal-colors'].red.color, contrast: r['signal-colors'].red.contrastText },
      'signal-info': {
        hex: r['primary-colors'].white.color,
        contrast: r['primary-colors'].white.contrastText,
      },
    },
    data: {
      'data-1': {
        hex: r['data-colors']['green-apple'].color,
        contrast: r['data-colors']['green-apple'].contrastText,
      },
      'data-2': {
        hex: r['data-colors']['violet-grape'].color,
        contrast: r['data-colors']['violet-grape'].contrastText,
      },
      'data-3': {
        hex: r['data-colors']['blue-berry'].color,
        contrast: r['data-colors']['blue-berry'].contrastText,
      },
      'data-4': {
        hex: r['data-colors']['purple-plum'].color,
        contrast: r['data-colors']['purple-plum'].contrastText,
      },
      'data-5': {
        hex: r['data-colors']['orange-mango'].color,
        contrast: r['data-colors']['orange-mango'].contrastText,
      },
      'data-6': {
        hex: r['data-colors']['red-tomato'].color,
        contrast: r['data-colors']['red-tomato'].contrastText,
      },
    },
    icon: {
      'icon-stroke-1': {
        hex: r['primary-colors'].white.color,
        contrast: r['primary-colors'].white.contrastText,
      },
      'icon-filled-foreground-1': {
        hex: r['primary-colors'].black.color,
        contrast: r['primary-colors'].black.contrastText,
      },
      'icon-filled-background-1': {
        hex: r['primary-colors'].white.color,
        contrast: r['primary-colors'].white.contrastText,
      },
      'icon-positive': {
        hex: r['primary-colors'].green.color,
        contrast: r['primary-colors'].green.contrastText,
      },
      'icon-caution': {
        hex: r['signal-colors'].yellow.color,
        contrast: r['signal-colors'].yellow.contrastText,
      },
      'icon-warning': {
        hex: r['signal-colors'].orange.color,
        contrast: r['signal-colors'].orange.contrastText,
      },
      'icon-danger': { hex: r['signal-colors'].red.color, contrast: r['signal-colors'].red.contrastText },
      'icon-info': { hex: r['primary-colors'].white.color, contrast: r['primary-colors'].white.contrastText },
    },
    assorted: {
      'static-white': {
        hex: r['primary-colors'].white.color,
        contrast: r['primary-colors'].white.contrastText,
      },
      'static-black': {
        hex: r['primary-colors'].black.color,
        contrast: r['primary-colors'].black.contrastText,
      },
      'brand-accent': {
        hex: r['primary-colors'].green.color,
        contrast: r['primary-colors'].green.contrastText,
      },
      'focus-outline': { hex: r['internal-colors']['focus-outline'].color },
    },
  };
var p = (e) => {
    switch (e) {
      case 'dark':
        return d;
      case 'light':
        return y;
      default:
        return y;
    }
  },
  m = (e, a) => {
    var s, l, n, g, i, x, h;
    let t = p(a),
      c =
        (h =
          (x =
            (i =
              (g =
                (n = (l = (s = t.text[e]) != null ? s : t.background[e]) != null ? l : t.border[e]) != null
                  ? n
                  : t.signal[e]) != null
                ? g
                : t.data[e]) != null
              ? i
              : t.icon[e]) != null
            ? x
            : t.assorted[e]) != null
          ? h
          : null;
    return c || null;
  };
function E(e, a) {
  let t = a != null && a.isInverted ? 'dark' : 'light',
    c = e.replace(/^color-/, ''),
    s = m(c, t);
  if (!s) throw new Error(`Color '${e}' not found.`);
  return a != null && a.isInverted ? s.hex : `var(--e-color-${c}, ${s.hex})`;
}
var D = (e, a = 'light') => {
    let t = e.replace(/^color-/, ''),
      c = m(t, a);
    if (!c) throw new Error(`Color '${e}' not found.`);
    if (!('contrast' in c)) throw new Error(`Color '${e}' does not have a contrast color.`);
    return `var(--e-color-${t}--contrast, ${c.contrast})`;
  },
  T = (e) => {
    switch (e) {
      case 'dark':
        return r;
      case 'light':
        return o;
      default:
        return o;
    }
  },
  v = (e, a) => {
    var l, n, g;
    let t = T(a),
      c = e[a],
      s =
        (g =
          (n = (l = t['primary-colors'][c]) != null ? l : t['signal-colors'][c]) != null
            ? n
            : t['data-colors'][c]) != null
          ? g
          : t['grey-colors'][c];
    if (!s) throw new Error(`Color '${c}' for theme '${a}' not found.`);
    return s.color;
  };
function L(e, a = 'light') {
  var s, l, n, g;
  let t = T(a),
    c =
      (g =
        (n =
          (l = (s = t['primary-colors'][e]) != null ? s : t['signal-colors'][e]) != null
            ? l
            : t['data-colors'][e]) != null
          ? n
          : t['grey-colors'][e]) != null
        ? g
        : t['internal-colors'][e];
  if (!c) throw new Error(`Color '${e}' for theme '${a}' not found.`);
  return c.color;
}
var b = {
    none: { boxShadow: 'none' },
    soft: { boxShadow: '0 0 50px rgba(0, 0, 0, 0.03)' },
    medium: { boxShadow: '0 0 40px rgba(0, 0, 0, 0.06)' },
    hard: { boxShadow: '0 0 30px rgba(0, 0, 0, 0.08)' },
  },
  $ = (e) => `var(--e-shadow-${e}, ${b[e].boxShadow})`;

var Container = He.div.withConfig({ displayName: 'calendarStyles__Container', componentId: 'sc-b47d5s-0' })([
  'padding:0 16px;',
]);
var CalendarHeader = He.div.withConfig({
  displayName: 'calendarStyles__CalendarHeader',
  componentId: 'sc-b47d5s-1',
})(['display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;']);
var MonthName = He.span.withConfig({ displayName: 'calendarStyles__MonthName', componentId: 'sc-b47d5s-2' })(
  ['', ';text-align:center;text-transform:capitalize;'],
  x('text-sm-strong'),
);
var GridContainer = He.div.withConfig({
  displayName: 'calendarStyles__GridContainer',
  componentId: 'sc-b47d5s-3',
})([
  "display:grid;grid-template-columns:repeat(7,1fr);grid-auto-rows:1fr;margin:0 -4px;&:before{content:'';width:0;padding-bottom:100%;grid-row:1 / 1;grid-column:1 / 1;}*:first-child{grid-row:1 / 1;grid-column:1 / 1;}",
]);
var DayName = He.div.withConfig({ displayName: 'calendarStyles__DayName', componentId: 'sc-b47d5s-4' })(
  ['', ';color:', ';text-align:center;'],
  x('text-sm'),
  E('text-placeholder-1'),
);
var DayButton = He.button.withConfig({
  displayName: 'calendarStyles__DayButton',
  componentId: 'sc-b47d5s-5',
})(
  [
    '',
    ';width:2rem;height:2rem;border-radius:999px;border:1px solid transparent;background:transparent;padding:0;position:relative;cursor:inherit;&:disabled{color:',
    ';&::after{background-color:',
    ';}}',
    ' ',
    ';',
  ],
  x('text-sm'),
  E('text-disabled-1'),
  E('background-disabled-1'),
  function (a) {
    return (
      a.isActive &&
      Ce(
        ['color:', ';background-color:', ';font-weight:500;'],
        D('background-selected-1'),
        E('background-selected-1'),
      )
    );
  },
  function (a) {
    return (
      a.isToday &&
      Ce(
        [
          "&::after{content:'';position:absolute;width:4px;height:4px;background-color:",
          ';bottom:0;border-radius:50%;left:50%;transform:translateX(-50%);}',
        ],
        E('background-selected-1'),
      )
    );
  },
);

var getBorderRadius = function (a) {
    return a.isStart && a.isEnd
      ? '999px'
      : a.isStart
      ? '999px 0 0 999px'
      : a.isEnd
      ? '0 999px 999px 0'
      : '0px';
  },
  getWidth = function (a) {
    return a.isStart && a.isEnd ? 'calc(100% - 8px)' : a.isStart || a.isEnd ? 'calc(100% - 4px)' : '100%';
  },
  getDateRangeBackground = function (a) {
    return Ce(
      [
        "&:after{content:'';position:absolute;width:",
        ';height:calc(100% - 8px);z-index:-1;top:4px;left:',
        ';border-radius:',
        ';background-color:',
        ';}',
      ],
      getWidth(a),
      a.isStart ? '4px' : '0px',
      getBorderRadius(a),
      E('background-hover-2'),
    );
  };
var DateRangeDayContainer = He.div.withConfig({
  displayName: 'dateRangeStyles__DateRangeDayContainer',
  componentId: 'sc-10cadlj-0',
})(
  [
    'position:relative;display:flex;align-items:center;justify-content:center;width:2.5rem;height:2.5rem;isolation:isolate;',
    ';',
    ';',
    ';',
  ],
  function (a) {
    return a.invisible || a.disabled
      ? Ce(['cursor:default;'])
      : Ce(
          ['cursor:pointer;&:hover ', '{border-color:', ';}', '{border-color:', ';}'],
          DayButton,
          E('border-hover-1'),
          DayButton,
          a.isFocused ? E('border-selected-1') : 'transparent',
        );
  },
  function (a) {
    return a.rangeIsValid && (a.isStartPiece || a.isMiddlePiece || a.isEndPiece)
      ? getDateRangeBackground({ isStart: a.isStartPiece, isMiddle: a.isMiddlePiece, isEnd: a.isEndPiece })
      : '';
  },
  function (a) {
    return a.isOtherSelectedDate && Ce(['', '{border-color:', ';}'], DayButton, E('text-1'));
  },
);

var DateRangeHighlighter = function (a) {
  var b = a.date,
    c = a.dateRange,
    d = a.hoveredDate,
    e = a.whichPicker,
    f = a.isFocused,
    g = a.disabled,
    h = a.setHoveredDate,
    i = a.onClick,
    j = a.children,
    k = reactExports.useMemo(
      function () {
        return isSameDay(null === c || void 0 === c ? void 0 : c.start, b);
      },
      [c, b],
    ),
    l = reactExports.useMemo(
      function () {
        return isSameDay(null === c || void 0 === c ? void 0 : c.end, b);
      },
      [c, b],
    );
  return /* @__PURE__ */ React.createElement(
    DateRangeDayContainer,
    {
      isStartPiece: k,
      isMiddlePiece: (function isBetweenDates() {
        var a2 = dateIsWithinMinMaxBoundary(
          b,
          null === c || void 0 === c ? void 0 : c.start,
          null === c || void 0 === c ? void 0 : c.end,
        );
        return (
          !!b && !!(null !== c && void 0 !== c && c.start) && !!(null !== c && void 0 !== c && c.end) && a2
        );
      })(),
      isEndPiece: l,
      isOtherSelectedDate: (function isOtherSelectedDate() {
        return ('start' === e && l) || ('end' === e && k);
      })(),
      isHoveredDate: isSameDay(b, d) && !!(null !== c && void 0 !== c && c.start),
      rangeIsValid: (function rangeIsValid() {
        return (
          !!(null !== c && void 0 !== c && c.start) &&
          !!(null !== c && void 0 !== c && c.end) &&
          (c.start.getTime() < c.end.getTime() || isSameDay(c.start, c.end))
        );
      })(),
      onMouseEnter: function onMouseEnter() {
        return b && !g && h(b);
      },
      onMouseLeave: function onMouseLeave() {
        return h(void 0);
      },
      invisible: !b,
      isFocused: f,
      disabled: g,
      onClick: function onClick() {
        return i();
      },
    },
    j,
  );
};

const arrowLongLeftBold = {
  getIcon: function (color) {
    const icon =
      '<svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12c0-.69.557-1.25 1.243-1.25h21.514c.686 0 1.243.56 1.243 1.25s-.556 1.25-1.243 1.25H1.243C.557 13.25 0 12.69 0 12Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.162 1.355a1.19 1.19 0 0 1 0 1.714L3 12l9.16 8.931a1.19 1.19 0 0 1 0 1.714 1.266 1.266 0 0 1-1.757 0L.364 12.857a1.19 1.19 0 0 1 0-1.714l10.04-9.788a1.266 1.266 0 0 1 1.758 0Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>';
    if (!color) {
      return icon;
    }
    if (!color.startsWith('#') && !color.startsWith('var(--')) {
      return icon
        .replaceAll(
          'fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"',
          'fill="' + E$1(color) + '"',
        )
        .replaceAll(
          'fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"',
          'fill="' + E$1(color) + '"',
        );
    }
    return icon
      .replaceAll(
        'fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"',
        'fill="' + color + '"',
      )
      .replaceAll(
        'fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"',
        'fill="' + color + '"',
      );
  },
};

const arrowLongRightBold = {
  getIcon: function (color) {
    const icon =
      '<svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 11.999c0-.69.545-1.25 1.217-1.25h21.066c.672 0 1.217.56 1.217 1.25s-.545 1.25-1.217 1.25H1.217c-.672 0-1.217-.56-1.217-1.25Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.191 1.355a1.204 1.204 0 0 1 1.707 0l9.748 9.788c.472.473.472 1.24 0 1.714l-9.748 9.788a1.204 1.204 0 0 1-1.707 0 1.216 1.216 0 0 1 0-1.714L21.086 12l-8.895-8.931a1.215 1.215 0 0 1 0-1.714Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>';
    if (!color) {
      return icon;
    }
    if (!color.startsWith('#') && !color.startsWith('var(--')) {
      return icon
        .replaceAll(
          'fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"',
          'fill="' + E$1(color) + '"',
        )
        .replaceAll(
          'fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"',
          'fill="' + E$1(color) + '"',
        );
    }
    return icon
      .replaceAll(
        'fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"',
        'fill="' + color + '"',
      )
      .replaceAll(
        'fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"',
        'fill="' + color + '"',
      );
  },
};

function _toConsumableArray(a) {
  return (
    _arrayWithoutHoles(a) || _iterableToArray(a) || _unsupportedIterableToArray$5(a) || _nonIterableSpread()
  );
}
function _nonIterableSpread() {
  throw new TypeError(
    'Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _iterableToArray(a) {
  if (('undefined' != typeof Symbol && null != a[Symbol.iterator]) || null != a['@@iterator'])
    return Array.from(a);
}
function _arrayWithoutHoles(a) {
  if (Array.isArray(a)) return _arrayLikeToArray$5(a);
}
function _slicedToArray$5(a, b) {
  return (
    _arrayWithHoles$5(a) ||
    _iterableToArrayLimit$5(a, b) ||
    _unsupportedIterableToArray$5(a, b) ||
    _nonIterableRest$5()
  );
}
function _nonIterableRest$5() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _unsupportedIterableToArray$5(a, b) {
  if (a) {
    if ('string' == typeof a) return _arrayLikeToArray$5(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return (
      'Object' === c && a.constructor && (c = a.constructor.name),
      'Map' === c || 'Set' === c
        ? Array.from(a)
        : 'Arguments' === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)
        ? _arrayLikeToArray$5(a, b)
        : void 0
    );
  }
}
function _arrayLikeToArray$5(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}
function _iterableToArrayLimit$5(a, b) {
  var c = null == a ? null : ('undefined' != typeof Symbol && a[Symbol.iterator]) || a['@@iterator'];
  if (null != c) {
    var d,
      e,
      f,
      g,
      h = [],
      i = true,
      j = false;
    try {
      if (((f = (c = c.call(a)).next), 0 === b)) {
        if (Object(c) !== c) return;
        i = false;
      } else for (; !(i = (d = f.call(c)).done) && (h.push(d.value), h.length !== b); i = true);
    } catch (a2) {
      (j = true), (e = a2);
    } finally {
      try {
        if (!i && null != c.return && ((g = c.return()), Object(g) !== g)) return;
      } finally {
        if (j) throw e;
      }
    }
    return h;
  }
}
function _arrayWithHoles$5(a) {
  if (Array.isArray(a)) return a;
}
var Calendar = function (a) {
  var b = a.selectedDate,
    c = a.viewedDate,
    d = a.onDateChange,
    e = a.setViewedDate,
    f = a.minDate,
    g = a.maxDate,
    h = a.disableDate,
    i = a.dateRangeProps,
    j = reactExports.useState(false),
    k = _slicedToArray$5(j, 2),
    l = k[0],
    m = k[1],
    n = reactExports.useState(),
    o = _slicedToArray$5(n, 2),
    p = o[0],
    q = o[1],
    r = reactExports.useState(),
    s = _slicedToArray$5(r, 2),
    t = s[0],
    u = s[1],
    v = function () {
      var a2 = new Date(c.getFullYear(), c.getMonth() + 1, 0).getDate(),
        b2 = getWeekDayNames().findIndex(function (a3) {
          var b3 = getDayName(new Date(c.getFullYear(), c.getMonth(), 1));
          return a3 === b3;
        }),
        d2 = [].concat(
          _toConsumableArray(Array(b2).fill(null)),
          _toConsumableArray(
            Array(a2)
              .fill(null)
              .map(function (a3, b3) {
                return new Date(c.getFullYear(), c.getMonth(), b3 + 1, 0, 0, 0, 0);
              }),
          ),
        );
      return d2;
    },
    w = reactExports.useState(v),
    x = _slicedToArray$5(w, 2),
    y = x[0],
    z = x[1],
    A = function (a2) {
      var b2 = new Date(c);
      b2.setMonth(b2.getMonth() + a2), e(b2);
    },
    B = function (a2) {
      var b2 = formatDate(a2, { day: 'numeric' });
      return b2.substring(0, b2.length - 1);
    },
    C = function (a2) {
      var b2 = 0;
      return (
        'ArrowRight' === a2.key
          ? (b2 = 1)
          : 'ArrowLeft' === a2.key
          ? (b2 = -1)
          : 'ArrowUp' === a2.key
          ? (b2 = -7)
          : 'ArrowDown' === a2.key && (b2 = 7),
        b2
      );
    },
    D = function (a2) {
      var b2 = C(a2);
      if (0 !== b2) {
        a2.preventDefault();
        var d2 = new Date(c ? c : /* @__PURE__ */ new Date());
        for (d2.setDate(d2.getDate() + b2); dateIsWithinMinMaxBoundary(d2, f, g) && F(d2); )
          d2.setDate(d2.getDate() + b2);
        F(d2) || (e(d2), q(d2));
      }
    },
    E = function (a2) {
      ('Enter' !== a2.key && 'Space' !== a2.key) || F(c)
        ? D(a2)
        : (a2.preventDefault(), d(new Date(c || /* @__PURE__ */ new Date())));
    },
    F = function (a2) {
      if (!a2) return true;
      var b2 = !!h && h(a2);
      return !dateIsWithinMinMaxBoundary(a2, f, g) || b2;
    };
  return (
    reactExports.useEffect(
      function () {
        return z(v());
      },
      [c],
    ),
    reactExports.useEffect(
      function () {
        u(null === i || void 0 === i ? void 0 : i.selectedDateRange);
      },
      [i],
    ),
    reactExports.useEffect(
      function () {
        p && t
          ? 'start' === (null === i || void 0 === i ? void 0 : i.whichRangePicker)
            ? u({ start: p, end: t.end })
            : 'end' === (null === i || void 0 === i ? void 0 : i.whichRangePicker) &&
              u({ start: t.start, end: p })
          : u(null === i || void 0 === i ? void 0 : i.selectedDateRange);
      },
      [p],
    ),
    /* @__PURE__ */ React.createElement(
      Container,
      null,
      /* @__PURE__ */ React.createElement(
        CalendarHeader,
        null,
        /* @__PURE__ */ React.createElement(
          IconButton,
          {
            onClick: function onClick() {
              return A(-1);
            },
            'aria-label': 'Forrige måned',
            'data-testid': 'prev-month-btn',
            size: 'sm',
          },
          /* @__PURE__ */ React.createElement(IconWrapper, { icon: arrowLongLeftBold, size: 'xs' }),
        ),
        /* @__PURE__ */ React.createElement(
          MonthName,
          { 'data-testid': 'month-name', 'aria-live': 'polite' },
          formatDate(c, { month: 'long', year: 'numeric' }),
        ),
        /* @__PURE__ */ React.createElement(
          IconButton,
          {
            onClick: function onClick() {
              return A(1);
            },
            'aria-label': 'Neste måned',
            'data-testid': 'next-month-btn',
            size: 'sm',
          },
          /* @__PURE__ */ React.createElement(IconWrapper, { icon: arrowLongRightBold, size: 'xs' }),
        ),
      ),
      /* @__PURE__ */ React.createElement(
        GridContainer,
        null,
        getWeekDayNames().map(function (a2) {
          return /* @__PURE__ */ React.createElement(DayName, { key: a2 }, a2);
        }),
      ),
      /* @__PURE__ */ React.createElement(
        GridContainer,
        {
          tabIndex: 0,
          onKeyDown: function onKeyDown(a2) {
            return E(a2);
          },
          onFocus: function onFocus() {
            return m(true);
          },
          onBlur: function onBlur() {
            return m(false);
          },
          'aria-activedescendant': 'date-'.concat(
            formatDate(c, { day: '2-digit', month: '2-digit', year: 'numeric' }),
          ),
          'aria-label': 'Kalender. Bruk piltaster for navigasjon.',
        },
        y.map(function (a2, f2) {
          return /* @__PURE__ */ React.createElement(
            DateRangeHighlighter,
            {
              key: f2,
              setHoveredDate: function setHoveredDate(a3) {
                a3 && e(a3), q(a3);
              },
              date: a2,
              dateRange: t,
              whichPicker: null === i || void 0 === i ? void 0 : i.whichRangePicker,
              hoveredDate: p,
              disabled: F(a2),
              onClick: function onClick() {
                return a2 && !F(a2) && d(a2, true);
              },
              isFocused: isSameDay(a2, c) && l,
            },
            /* @__PURE__ */ React.createElement(
              DayButton,
              {
                tabIndex: -1,
                'aria-label': formatDate(a2, { day: 'numeric', month: 'long', year: 'numeric' }),
                isToday: isSameDay(a2, /* @__PURE__ */ new Date()),
                isActive: isSameDay(a2, b),
                disabled: F(a2),
                type: 'button',
                'aria-current': isSameDay(a2, b) ? 'date' : void 0,
                id: 'date-'.concat(formatDate(a2, { day: '2-digit', month: '2-digit', year: 'numeric' })),
              },
              B(a2),
            ),
          );
        }),
      ),
    )
  );
};

var OverlayContainer$1 = He.div.withConfig({
  displayName: 'popupStyles__OverlayContainer',
  componentId: 'sc-1t81h29-0',
})(
  ['background-color:', ';border-radius:4px;box-shadow:', ';min-width:304px;'],
  E('background-overlay-1'),
  $('medium'),
);
var PopoverHeader = He.div.withConfig({
  displayName: 'popupStyles__PopoverHeader',
  componentId: 'sc-1t81h29-1',
})(
  [
    'display:flex;justify-content:space-between;padding:8px 24px;border-bottom:1px solid ',
    ';margin-bottom:8px;',
  ],
  E('border-2'),
);
var SelectedDateName = He.div.withConfig({
  displayName: 'popupStyles__SelectedDateName',
  componentId: 'sc-1t81h29-2',
})(['', ';white-space:nowrap;&::first-letter{text-transform:capitalize;}'], x('text-md'));
var PopoverBody = He.div.withConfig({ displayName: 'popupStyles__PopoverBody', componentId: 'sc-1t81h29-3' })(
  ['position:relative;'],
);
var PopoverFooter = He.div.withConfig({
  displayName: 'popupStyles__PopoverFooter',
  componentId: 'sc-1t81h29-4',
})(['display:flex;justify-content:flex-end;padding:16px 24px;']);
var RotatingContainer = He.div.withConfig({
  displayName: 'popupStyles__RotatingContainer',
  componentId: 'sc-1t81h29-5',
})(['transition:transform 250ms ease;', ''], function (a) {
  return a.isRotated && Ce(['transform:rotate(180deg);']);
});

var buttonHeight = 48;
var YearPickerContainer = He.div.withConfig({
  displayName: 'yearPickerStyles__YearPickerContainer',
  componentId: 'sc-1syxwd7-0',
})(['background-color:', ';width:100%;'], E('background-overlay-1'));
var ScrollContainer = He.div.withConfig({
  displayName: 'yearPickerStyles__ScrollContainer',
  componentId: 'sc-1syxwd7-1',
})(['overflow-y:auto;overflow-x:hidden;position:relative;height:306px;']);
var YearButton = He.button.withConfig({
  displayName: 'yearPickerStyles__YearButton',
  componentId: 'sc-1syxwd7-2',
})(
  [
    '',
    ';display:flex;align-items:center;justify-content:center;padding:0;height:',
    'px;cursor:pointer;background-color:',
    ';border:none;width:100%;&:hover:not(:disabled){background-color:',
    ';}&:disabled{cursor:default;color:',
    ';}',
    ';',
    ';',
  ],
  x('text-md'),
  48,
  E('background-overlay-1'),
  E('background-hover-2'),
  E('text-disabled-1'),
  function (a) {
    var b = a.isFocused;
    return b && Ce(['background-color:', ';'], E('background-hover-2'));
  },
  function (a) {
    var b = a.isActive;
    return b && Ce(['background-color:', ';'], E('background-selected-2'));
  },
);

function _slicedToArray$4(a, b) {
  return (
    _arrayWithHoles$4(a) ||
    _iterableToArrayLimit$4(a, b) ||
    _unsupportedIterableToArray$4(a, b) ||
    _nonIterableRest$4()
  );
}
function _nonIterableRest$4() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _unsupportedIterableToArray$4(a, b) {
  if (a) {
    if ('string' == typeof a) return _arrayLikeToArray$4(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return (
      'Object' === c && a.constructor && (c = a.constructor.name),
      'Map' === c || 'Set' === c
        ? Array.from(a)
        : 'Arguments' === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)
        ? _arrayLikeToArray$4(a, b)
        : void 0
    );
  }
}
function _arrayLikeToArray$4(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}
function _iterableToArrayLimit$4(a, b) {
  var c = null == a ? null : ('undefined' != typeof Symbol && a[Symbol.iterator]) || a['@@iterator'];
  if (null != c) {
    var d,
      e,
      f,
      g,
      h = [],
      i = true,
      j = false;
    try {
      if (((f = (c = c.call(a)).next), 0 === b)) {
        if (Object(c) !== c) return;
        i = false;
      } else for (; !(i = (d = f.call(c)).done) && (h.push(d.value), h.length !== b); i = true);
    } catch (a2) {
      (j = true), (e = a2);
    } finally {
      try {
        if (!i && null != c.return && ((g = c.return()), Object(g) !== g)) return;
      } finally {
        if (j) throw e;
      }
    }
    return h;
  }
}
function _arrayWithHoles$4(a) {
  if (Array.isArray(a)) return a;
}
var YearPicker = function (a) {
  var b = a.selectedDate,
    c = a.onYearChange,
    d = a.minDate,
    e = a.maxDate,
    f = reactExports.useRef(null),
    g = reactExports.useState(
      Array(150)
        .fill('')
        .map(function (a2, b2) {
          return { year: 1950 + b2, isActive: false, isDisabled: false };
        }),
    ),
    h = _slicedToArray$4(g, 2),
    i = h[0],
    j = h[1],
    k = reactExports.useState(0),
    l = _slicedToArray$4(k, 2),
    m = l[0],
    n = l[1],
    o = function (a2) {
      var b2;
      null === (b2 = f.current) || void 0 === b2 ? void 0 : b2.scrollTo({ top: buttonHeight * (a2 - 1) });
    },
    p = function (a2) {
      var b2 = m;
      for (
        'ArrowUp' === a2.key
          ? (a2.preventDefault(), 0 <= m - 1 && (b2 = m - 1))
          : 'ArrowDown' === a2.key && (a2.preventDefault(), m + 1 <= i.length - 1 && (b2 = m + 1));
        0 < b2 && b2 < i.length - 1 && i[b2].isDisabled;

      )
        0 < b2 ? b2++ : b2--;
      return b2;
    },
    q = function (a2) {
      var b2 = !d || a2 >= d.getFullYear(),
        c2 = !e || a2 <= e.getFullYear();
      return b2 && c2;
    };
  return (
    reactExports.useEffect(
      function () {
        (function setActiveYear() {
          var a2 = i.slice(),
            c2 = b
              ? null === b || void 0 === b
                ? void 0
                : b.getFullYear()
              : /* @__PURE__ */ new Date().getFullYear();
          a2.forEach(function (a3) {
            return (a3.isActive = a3.year === c2);
          });
          var d2 = a2.findIndex(function (a3) {
            return a3.isActive;
          });
          -1 !== d2 && (n(d2), o(d2)), j(a2);
        })();
      },
      [b],
    ),
    reactExports.useEffect(
      function () {
        var a2 = i.slice();
        a2.forEach(function (a3) {
          return (a3.isDisabled = !q(a3.year));
        });
      },
      [d, e],
    ),
    /* @__PURE__ */ React.createElement(
      YearPickerContainer,
      { 'data-testid': 'year-picker' },
      /* @__PURE__ */ React.createElement(
        ScrollContainer,
        {
          ref: f,
          tabIndex: 0,
          onKeyDown: function handleKeyDown(a2) {
            if ('Enter' === a2.key) a2.preventDefault(), c(i[m].year);
            else {
              var b2 = p(a2);
              i[b2].isDisabled || (n(b2), o(b2));
            }
          },
        },
        i.map(function (a2, b2) {
          return /* @__PURE__ */ React.createElement(
            YearButton,
            {
              tabIndex: -1,
              key: a2.year,
              isActive: a2.isActive,
              isFocused: m === b2,
              onClick: function onClick() {
                return c(a2.year);
              },
              disabled: a2.isDisabled,
            },
            a2.year,
          );
        }),
      ),
    )
  );
};

const arrowDown = {
  getIcon: function (color) {
    const icon =
      '<svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M.476 5.994a.75.75 0 0 1 1.06.012L12 16.707 22.464 6.006a.75.75 0 0 1 1.072 1.048l-10.481 10.72A1.483 1.483 0 0 1 12 18.22a1.469 1.469 0 0 1-1.055-.445L.464 7.054a.75.75 0 0 1 .012-1.061Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>';
    if (!color) {
      return icon;
    }
    if (!color.startsWith('#') && !color.startsWith('var(--')) {
      return icon
        .replaceAll(
          'fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"',
          'fill="' + E$1(color) + '"',
        )
        .replaceAll(
          'fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"',
          'fill="' + E$1(color) + '"',
        );
    }
    return icon
      .replaceAll(
        'fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"',
        'fill="' + color + '"',
      )
      .replaceAll(
        'fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"',
        'fill="' + color + '"',
      );
  },
};

const reset = {
  getIcon: function (color) {
    const icon =
      '<svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M.75 12.739c0-1.493.301-2.886.904-4.28.1-.199.2-.398.402-.398.2-.1.402-.1.602 0 .302.1.503.398.503.697 0 .1 0 .199-.1.299-.503 1.194-.704 2.388-.704 3.682 0 2.488.904 4.777 2.712 6.568 1.808 1.792 4.219 2.887 6.73 2.986 2.612.1 5.022-.896 6.93-2.687 1.91-1.792 3.014-4.28 3.014-6.867 0-2.488-.904-4.777-2.712-6.569-1.707-1.691-4.018-2.786-6.328-2.985-2.11-.1-4.219.398-6.027 1.592H9.59c.402 0 .804.398.804.796s-.402.796-.804.796H4.768c-.402 0-.804-.398-.804-.796V.796c0-.398.302-.796.804-.796s.803.398.803.796v2.787c1.909-1.294 4.32-2.09 6.63-1.99.2 0 .502 0 .803.099H13.306c2.712.298 5.022 1.493 6.83 3.384a11.196 11.196 0 0 1 3.114 7.762c0 1.493-.301 2.887-.904 4.28 0 .1-.1.199-.2.298-.604 1.294-1.407 2.488-2.512 3.484-4.52 4.28-11.652 4.08-15.971-.299C1.855 18.411.75 15.625.75 12.74Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>';
    if (!color) {
      return icon;
    }
    if (!color.startsWith('#') && !color.startsWith('var(--')) {
      return icon
        .replaceAll(
          'fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"',
          'fill="' + E$1(color) + '"',
        )
        .replaceAll(
          'fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"',
          'fill="' + E$1(color) + '"',
        );
    }
    return icon
      .replaceAll(
        'fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"',
        'fill="' + color + '"',
      )
      .replaceAll(
        'fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"',
        'fill="' + color + '"',
      );
  },
};

function _slicedToArray$3(a, b) {
  return (
    _arrayWithHoles$3(a) ||
    _iterableToArrayLimit$3(a, b) ||
    _unsupportedIterableToArray$3(a, b) ||
    _nonIterableRest$3()
  );
}
function _nonIterableRest$3() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _unsupportedIterableToArray$3(a, b) {
  if (a) {
    if ('string' == typeof a) return _arrayLikeToArray$3(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return (
      'Object' === c && a.constructor && (c = a.constructor.name),
      'Map' === c || 'Set' === c
        ? Array.from(a)
        : 'Arguments' === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)
        ? _arrayLikeToArray$3(a, b)
        : void 0
    );
  }
}
function _arrayLikeToArray$3(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}
function _iterableToArrayLimit$3(a, b) {
  var c = null == a ? null : ('undefined' != typeof Symbol && a[Symbol.iterator]) || a['@@iterator'];
  if (null != c) {
    var d,
      e,
      f,
      g,
      h = [],
      i = true,
      j = false;
    try {
      if (((f = (c = c.call(a)).next), 0 === b)) {
        if (Object(c) !== c) return;
        i = false;
      } else for (; !(i = (d = f.call(c)).done) && (h.push(d.value), h.length !== b); i = true);
    } catch (a2) {
      (j = true), (e = a2);
    } finally {
      try {
        if (!i && null != c.return && ((g = c.return()), Object(g) !== g)) return;
      } finally {
        if (j) throw e;
      }
    }
    return h;
  }
}
function _arrayWithHoles$3(a) {
  if (Array.isArray(a)) return a;
}
var OverlayContainer = React.forwardRef(function (a, b) {
  var c = a.onClose,
    d = a.onChange,
    e = a.onCalendarViewToggle,
    f = a.onReset,
    g = a.selectedDate,
    h = a.clearButtonText,
    i = a.minDate,
    j = a.maxDate,
    k = a.disableDate,
    l = a.dateRangeProps,
    m = reactExports.useState(false),
    n = _slicedToArray$3(m, 2),
    o = n[0],
    p = n[1],
    q = reactExports.useState(false),
    r = _slicedToArray$3(q, 2),
    s = r[0],
    t = r[1],
    u = reactExports.useState(/* @__PURE__ */ new Date()),
    v = _slicedToArray$3(u, 2),
    w = v[0],
    x = v[1],
    y = function () {
      t(!s), e();
    };
  return (
    reactExports.useEffect(
      function () {
        g && x(g);
      },
      [g],
    ),
    reactExports.useEffect(function () {
      (function initializeViewedDate() {
        g ? x(g) : i && isBefore(w, i) ? x(i) : j && isAfter(w, j) && x(j);
      })();
    }, []),
    /* @__PURE__ */ React.createElement(
      Overlay,
      { onClose: c, ref: b, startFade: o },
      /* @__PURE__ */ React.createElement(
        OverlayContainer$1,
        { 'data-testid': 'popover', role: 'dialog', 'aria-label': 'Datovelger popup', 'aria-modal': 'true' },
        /* @__PURE__ */ React.createElement(
          PopoverHeader,
          null,
          /* @__PURE__ */ React.createElement(
            SelectedDateName,
            null,
            formatDate(g, { weekday: 'long', day: 'numeric', month: 'long' }),
          ),
          /* @__PURE__ */ React.createElement(
            TertiaryButton,
            {
              size: 'sm',
              onClick: function onClick() {
                return y();
              },
              'aria-label': 'Endre år',
              'data-testid': 'year-view-toggle',
            },
            formatDate(w, { year: 'numeric' }),
            /* @__PURE__ */ React.createElement(
              RotatingContainer,
              { isRotated: s },
              /* @__PURE__ */ React.createElement(IconWrapper, { icon: arrowDown, size: 'xs' }),
            ),
          ),
        ),
        /* @__PURE__ */ React.createElement(
          PopoverBody,
          null,
          s
            ? /* @__PURE__ */ React.createElement(YearPicker, {
                selectedDate: g,
                onYearChange: function onYearChange(a2) {
                  var b2 = new Date(w);
                  b2.setFullYear(a2), x(b2), t(false);
                },
                minDate: i,
                maxDate: j,
              })
            : /* @__PURE__ */ React.createElement(
                React.Fragment,
                null,
                /* @__PURE__ */ React.createElement(Calendar, {
                  selectedDate: g,
                  viewedDate: w,
                  onDateChange: function onDateChange(a2, b2) {
                    d(a2), b2 && p(true);
                  },
                  setViewedDate: x,
                  minDate: i,
                  maxDate: j,
                  disableDate: k,
                  dateRangeProps: l,
                }),
                /* @__PURE__ */ React.createElement(
                  PopoverFooter,
                  null,
                  /* @__PURE__ */ React.createElement(
                    TertiaryButton,
                    {
                      onClick: function resetDate() {
                        d(null), f(), x(/* @__PURE__ */ new Date());
                      },
                      'aria-label': 'Nullstill dato',
                      size: 'sm',
                    },
                    /* @__PURE__ */ React.createElement(IconWrapper, { icon: reset, size: 'xs' }),
                    h,
                  ),
                ),
              ),
        ),
      ),
    )
  );
});
OverlayContainer.displayName = 'DatepickerOverlayContainer';

var Input = He(FormFieldInput).withConfig({
  displayName: 'styledComponents__Input',
  componentId: 'sc-19uixjl-0',
})(['width:5.4rem;']);

function _slicedToArray$2(a, b) {
  return (
    _arrayWithHoles$2(a) ||
    _iterableToArrayLimit$2(a, b) ||
    _unsupportedIterableToArray$2(a, b) ||
    _nonIterableRest$2()
  );
}
function _nonIterableRest$2() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _unsupportedIterableToArray$2(a, b) {
  if (a) {
    if ('string' == typeof a) return _arrayLikeToArray$2(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return (
      'Object' === c && a.constructor && (c = a.constructor.name),
      'Map' === c || 'Set' === c
        ? Array.from(a)
        : 'Arguments' === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)
        ? _arrayLikeToArray$2(a, b)
        : void 0
    );
  }
}
function _arrayLikeToArray$2(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}
function _iterableToArrayLimit$2(a, b) {
  var c = null == a ? null : ('undefined' != typeof Symbol && a[Symbol.iterator]) || a['@@iterator'];
  if (null != c) {
    var d,
      e,
      f,
      g,
      h = [],
      i = true,
      j = false;
    try {
      if (((f = (c = c.call(a)).next), 0 === b)) {
        if (Object(c) !== c) return;
        i = false;
      } else for (; !(i = (d = f.call(c)).done) && (h.push(d.value), h.length !== b); i = true);
    } catch (a2) {
      (j = true), (e = a2);
    } finally {
      try {
        if (!i && null != c.return && ((g = c.return()), Object(g) !== g)) return;
      } finally {
        if (j) throw e;
      }
    }
    return h;
  }
}
function _arrayWithHoles$2(a) {
  if (Array.isArray(a)) return a;
}
var DatepickerInput = function (a) {
  var b = a.disabled,
    c = a.required,
    d = a.date,
    e = a.minDate,
    f = a.maxDate,
    g = a.placeholder,
    h = a.onChange,
    i = a.onFocus,
    j = a.currentError,
    k = a.onErrorChange,
    l = reactExports.useRef(null),
    m = reactExports.useState(''),
    n = _slicedToArray$2(m, 2),
    o = n[0],
    p = n[1],
    q = reactExports.useState(false),
    r = _slicedToArray$2(q, 2),
    s = r[0],
    t = r[1],
    u = reactExports.useState(0),
    v = _slicedToArray$2(u, 2),
    w = v[0],
    x = v[1],
    y = reactExports.useState(false),
    z = _slicedToArray$2(y, 2),
    A = z[0],
    B = z[1],
    C = function (a2) {
      return /^\d+$/.test(a2);
    },
    D = function (a2, b2) {
      switch (w) {
        case 0:
        case 3:
        case 6:
        case 7:
        case 8:
        case 9: {
          C(b2) && p(a2);
          break;
        }
        case 1:
        case 4: {
          [2, 5].includes(a2.length) && C(b2) ? p(''.concat(a2, '.')) : C(b2) && p(a2);
          break;
        }
        case 2:
        case 5: {
          '.' === b2 && p(a2);
          break;
        }
      }
    },
    E = function (a2) {
      isSameDay(a2, d) || h(a2);
    },
    F = function (a2, b2, g2) {
      var h2 = new Date(''.concat(g2, '/').concat(b2, '/').concat(a2));
      d && h2.setHours(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
      var i2 = !a2 && !b2 && !g2;
      return !c && i2
        ? (k(void 0), true)
        : c && i2
        ? (k('required'), false)
        : a2 && b2 && g2 && !(1800 > g2) && isValidDate(h2)
        ? e && h2.getTime() < e.getTime()
          ? (k('beforeMinDate'), false)
          : f && h2.getTime() > f.getTime()
          ? (k('afterMaxDate'), false)
          : (j && // Don't emit undefined error every time the value changes
              k(void 0),
            true)
        : (k('invalidDate'), false);
    },
    G = function (a2) {
      return a2 ? formatDate(a2, { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
    };
  return (
    reactExports.useEffect(
      function () {
        p(G(d)),
          A &&
            G(d) !== o &&
            F(
              null === d || void 0 === d ? void 0 : d.getDate(),
              d ? d.getMonth() + 1 : void 0,
              null === d || void 0 === d ? void 0 : d.getFullYear(),
            );
      },
      [d],
    ),
    reactExports.useEffect(
      function () {
        if (A) {
          var a2 = o.split('.'),
            b2 = _slicedToArray$2(a2, 3),
            c2 = b2[0],
            d2 = b2[1],
            e2 = b2[2];
          F(+c2, +d2, +e2);
        }
      },
      [c],
    ),
    reactExports.useEffect(
      function () {
        var a2,
          b2 = function () {
            var a3, b3;
            null === (a3 = l.current) || void 0 === a3 ? void 0 : a3.focus(),
              null === (b3 = l.current) || void 0 === b3 ? void 0 : b3.select();
          };
        return (
          null === (a2 = l.current) || void 0 === a2 || null === (a2 = a2.parentElement) || void 0 === a2
            ? void 0
            : a2.addEventListener('dblclick', b2),
          function () {
            var a3;
            null === (a3 = l.current) || void 0 === a3 || null === (a3 = a3.parentElement) || void 0 === a3
              ? void 0
              : a3.removeEventListener('dblclick', b2);
          }
        );
      },
      [l],
    ),
    /* @__PURE__ */ React.createElement(Input, {
      ref: l,
      disabled: b,
      placeholder: g,
      value: o,
      onKeyDown: function onKeyDown() {
        var a2,
          b2,
          c2 = (null === (a2 = l.current) || void 0 === a2 ? void 0 : a2.selectionStart) || 0,
          d2 = (null === (b2 = l.current) || void 0 === b2 ? void 0 : b2.selectionEnd) || 0;
        x(c2), t(0 < d2 - c2);
      },
      onChange: function parseInput(a2) {
        var b2 = ['deleteContentBackward', 'deleteContentForward'].includes(a2.nativeEvent.inputType),
          c2 = a2.target.value;
        if (b2) p(c2);
        else {
          if (10 === o.length && !s) return;
          var d2 = a2.nativeEvent.data || '';
          D(c2, d2);
        }
      },
      onBlur: function onBlur() {
        if (!o.length) return E(null), void F();
        var a2 = o.split('.'),
          b2 = _slicedToArray$2(a2, 3),
          c2 = b2[0],
          e2 = b2[1],
          f2 = b2[2],
          g2 = F(+c2, +e2, +f2);
        if (g2) {
          var h2 = new Date(d ? d : /* @__PURE__ */ new Date());
          h2.setFullYear(+f2, +e2 - 1, +c2), E(h2);
        }
      },
      onFocus: function onInputFocus() {
        B(true), i();
      },
      'data-testid': 'input',
      'aria-live': 'polite',
      required: c,
    })
  );
};

const removeCircle = {
  getIcon: function (color) {
    const icon =
      '<svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.97 17.03a.746.746 0 0 0 1.06.001.752.752 0 0 0 0-1.061L13.06 12l3.97-3.97a.743.743 0 0 0 .22-.53c0-.2-.078-.389-.22-.53a.744.744 0 0 0-1.06 0L12 10.94 8.03 6.97a.743.743 0 0 0-.53-.22c-.2 0-.389.078-.53.22a.743.743 0 0 0-.22.53c0 .2.078.389.22.53L10.94 12l-3.97 3.97a.752.752 0 0 0 .53 1.281c.2 0 .388-.078.53-.22l3.97-3.97 3.97 3.969Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0 12c0 6.617 5.383 12 12 12s12-5.383 12-12S18.617 0 12 0 0 5.383 0 12Zm1.5 0C1.5 6.21 6.21 1.5 12 1.5S22.5 6.21 22.5 12 17.79 22.5 12 22.5 1.5 17.79 1.5 12Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>';
    if (!color) {
      return icon;
    }
    if (!color.startsWith('#') && !color.startsWith('var(--')) {
      return icon
        .replaceAll(
          'fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"',
          'fill="' + E$1(color) + '"',
        )
        .replaceAll(
          'fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"',
          'fill="' + E$1(color) + '"',
        );
    }
    return icon
      .replaceAll(
        'fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"',
        'fill="' + color + '"',
      )
      .replaceAll(
        'fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"',
        'fill="' + color + '"',
      );
  },
};

function _slicedToArray$1(a, b) {
  return (
    _arrayWithHoles$1(a) ||
    _iterableToArrayLimit$1(a, b) ||
    _unsupportedIterableToArray$1(a, b) ||
    _nonIterableRest$1()
  );
}
function _nonIterableRest$1() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _unsupportedIterableToArray$1(a, b) {
  if (a) {
    if ('string' == typeof a) return _arrayLikeToArray$1(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return (
      'Object' === c && a.constructor && (c = a.constructor.name),
      'Map' === c || 'Set' === c
        ? Array.from(a)
        : 'Arguments' === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)
        ? _arrayLikeToArray$1(a, b)
        : void 0
    );
  }
}
function _arrayLikeToArray$1(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}
function _iterableToArrayLimit$1(a, b) {
  var c = null == a ? null : ('undefined' != typeof Symbol && a[Symbol.iterator]) || a['@@iterator'];
  if (null != c) {
    var d,
      e,
      f,
      g,
      h = [],
      i = true,
      j = false;
    try {
      if (((f = (c = c.call(a)).next), 0 === b)) {
        if (Object(c) !== c) return;
        i = false;
      } else for (; !(i = (d = f.call(c)).done) && (h.push(d.value), h.length !== b); i = true);
    } catch (a2) {
      (j = true), (e = a2);
    } finally {
      try {
        if (!i && null != c.return && ((g = c.return()), Object(g) !== g)) return;
      } finally {
        if (j) throw e;
      }
    }
    return h;
  }
}
function _arrayWithHoles$1(a) {
  if (Array.isArray(a)) return a;
}
var DatepickerError = function (a) {
  var b = a.errorText,
    c = a.customText,
    d = reactExports.useState(''),
    e = _slicedToArray$1(d, 2),
    f = e[0],
    g = e[1];
  return (
    reactExports.useEffect(
      function () {
        c ? g(c) : b && g(b);
      },
      [b, c],
    ),
    /* @__PURE__ */ React.createElement(
      FormFieldErrorContainer,
      null,
      /* @__PURE__ */ React.createElement(IconWrapper, {
        icon: removeCircle,
        color: 'icon-danger',
        size: 'xs',
      }),
      /* @__PURE__ */ React.createElement(FormFieldError, { 'data-testid': 'error' }, f),
    )
  );
};

var getErrorText = function (a, b, c, d) {
  return 'invalidDate' === a
    ? 'Ugyldig dato'
    : 'required' === a
    ? 'Velg dato'
    : 'beforeMinDate' === a
    ? 'Tidligste dato er '.concat(getFormattedDate(b, d))
    : 'afterMaxDate' === a
    ? 'Seneste dato er '.concat(getFormattedDate(c, d))
    : '';
};
var getFormattedDate = function (a, b) {
  var c = formatDate(a, { day: '2-digit', month: '2-digit', year: 'numeric' }),
    d = ''.concat(formatDate(a, { hour: '2-digit', minute: '2-digit' }));
  return b ? ''.concat(c, ' kl. ').concat(d) : c;
};

function _typeof(a) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (a2) {
            return typeof a2;
          }
        : function (a2) {
            return a2 && 'function' == typeof Symbol && a2.constructor === Symbol && a2 !== Symbol.prototype
              ? 'symbol'
              : typeof a2;
          }),
    _typeof(a)
  );
}
function ownKeys(a, b) {
  var c = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var d = Object.getOwnPropertySymbols(a);
    b &&
      (d = d.filter(function (b2) {
        return Object.getOwnPropertyDescriptor(a, b2).enumerable;
      })),
      c.push.apply(c, d);
  }
  return c;
}
function _objectSpread(a) {
  for (var b, c = 1; c < arguments.length; c++)
    (b = null == arguments[c] ? {} : arguments[c]),
      c % 2
        ? ownKeys(Object(b), true).forEach(function (c2) {
            _defineProperty(a, c2, b[c2]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(b))
        : ownKeys(Object(b)).forEach(function (c2) {
            Object.defineProperty(a, c2, Object.getOwnPropertyDescriptor(b, c2));
          });
  return a;
}
function _defineProperty(a, b, c) {
  return (
    (b = _toPropertyKey(b)),
    b in a
      ? Object.defineProperty(a, b, { value: c, enumerable: true, configurable: true, writable: true })
      : (a[b] = c),
    a
  );
}
function _toPropertyKey(a) {
  var b = _toPrimitive(a, 'string');
  return 'symbol' === _typeof(b) ? b : b + '';
}
function _toPrimitive(a, b) {
  if ('object' !== _typeof(a) || null === a) return a;
  var c = a[Symbol.toPrimitive];
  if (c !== void 0) {
    var d = c.call(a, b || 'default');
    if ('object' !== _typeof(d)) return d;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return ('string' === b ? String : Number)(a);
}
function _slicedToArray(a, b) {
  return (
    _arrayWithHoles(a) ||
    _iterableToArrayLimit(a, b) ||
    _unsupportedIterableToArray(a, b) ||
    _nonIterableRest()
  );
}
function _nonIterableRest() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _unsupportedIterableToArray(a, b) {
  if (a) {
    if ('string' == typeof a) return _arrayLikeToArray(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return (
      'Object' === c && a.constructor && (c = a.constructor.name),
      'Map' === c || 'Set' === c
        ? Array.from(a)
        : 'Arguments' === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)
        ? _arrayLikeToArray(a, b)
        : void 0
    );
  }
}
function _arrayLikeToArray(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}
function _iterableToArrayLimit(a, b) {
  var c = null == a ? null : ('undefined' != typeof Symbol && a[Symbol.iterator]) || a['@@iterator'];
  if (null != c) {
    var d,
      e,
      f,
      g,
      h = [],
      i = true,
      j = false;
    try {
      if (((f = (c = c.call(a)).next), 0 === b)) {
        if (Object(c) !== c) return;
        i = false;
      } else for (; !(i = (d = f.call(c)).done) && (h.push(d.value), h.length !== b); i = true);
    } catch (a2) {
      (j = true), (e = a2);
    } finally {
      try {
        if (!i && null != c.return && ((g = c.return()), Object(g) !== g)) return;
      } finally {
        if (j) throw e;
      }
    }
    return h;
  }
}
function _arrayWithHoles(a) {
  if (Array.isArray(a)) return a;
}
var defaultErrorOptions = { hideText: false, isErrorState: false, hasErrorPlaceholder: true };
var Datepicker = function (a) {
  var b = a.clearButtonText,
    c = void 0 === b ? 'Nullstill' : b,
    e = a.dateRangeProps,
    f = a.onFocus,
    g = a.disableDate,
    h = a.errorOptions,
    i = a.hasOptionalText,
    j = a.hasSelectDateOnOpen,
    k = a.size,
    l = void 0 === k ? 'medium' : k,
    m = a.isDisabled,
    n = void 0 !== m && m,
    o = a.isFullWidth,
    p = a.isOpen,
    q = void 0 !== p && p,
    r = a.isRequired,
    s = void 0 !== r && r,
    t = a.label,
    u = void 0 === t ? 'Velg dato' : t,
    v = a.maxDate,
    w = a.minDate,
    x = a.onClose,
    y = a.onOpen,
    z = a.onReset,
    A = a.placeholder,
    B = void 0 === A ? 'dd.mm.åååå' : A,
    C = a.resetTime,
    D = a.value,
    E = a.valueOnChange,
    F = a.valueOnChangeISOString,
    G = a.errorOnChange,
    H = a.className,
    I = a.inlineStyle,
    J = a.webcomponent,
    K = reactExports.useState(D || null),
    L = _slicedToArray(K, 2),
    M = L[0],
    N = L[1],
    O = reactExports.useState(),
    P = _slicedToArray(O, 2),
    Q = P[0],
    R = P[1],
    S = reactExports.useState(w),
    T = _slicedToArray(S, 2),
    U = T[0],
    V = T[1],
    W = reactExports.useState(v),
    X = _slicedToArray(W, 2),
    Y = X[0],
    Z = X[1],
    $ = reactExports.useRef(null),
    _ = reactExports.useRef(null),
    aa = reactExports.useRef(null),
    ba = useFocusTrap(),
    ca = ba.trapFocus,
    da = ba.releaseFocusTrap,
    ea = reactExports.useState(false),
    fa = _slicedToArray(ea, 2),
    ga = fa[0],
    ha = fa[1],
    ia = useConnectedOverlay($, _, {
      offset: 8,
      horizontalPosition: 'right-inside',
      verticalPosition: 'bottom',
      alignWidths: false,
    }),
    ja = ia.isShowing,
    ka = ia.setIsShowing,
    la = _objectSpread(_objectSpread({}, defaultErrorOptions), h),
    ma = function (a2) {
      var b2 = null;
      (b2 = a2 && isValidDate(a2) ? localISOTime(a2) : null === a2 ? null : 'Invalid Date'),
        null === F || void 0 === F ? void 0 : F(b2),
        null === J || void 0 === J ? void 0 : J.triggerEvent('valueOnChangeISOString', b2);
    },
    na = function (a2) {
      var b2 = !(1 < arguments.length && void 0 !== arguments[1]) || arguments[1];
      C
        ? null === a2 || void 0 === a2
          ? void 0
          : a2.setHours(0, 0, 0, 0)
        : !C &&
          M &&
          (null === a2 || void 0 === a2
            ? void 0
            : a2.setHours(M.getHours(), M.getMinutes(), M.getSeconds(), M.getMilliseconds())),
        N(a2),
        b2 &&
          (ma(a2),
          null === E || void 0 === E ? void 0 : E(a2),
          null === J || void 0 === J ? void 0 : J.setProps({ value: a2 }, true),
          null === J || void 0 === J ? void 0 : J.triggerEvent('valueOnChange', a2));
    },
    oa = function () {
      null === x || void 0 === x ? void 0 : x(),
        null === J || void 0 === J ? void 0 : J.triggerEvent('onClose');
    },
    pa = function () {
      null === y || void 0 === y ? void 0 : y(),
        null === J || void 0 === J ? void 0 : J.triggerEvent('onOpen');
    },
    qa = function () {
      U && /* @__PURE__ */ new Date().getTime() < U.getTime()
        ? na(copyDay(U, /* @__PURE__ */ new Date()))
        : Y && /* @__PURE__ */ new Date().getTime() > Y.getTime()
        ? na(copyDay(Y, /* @__PURE__ */ new Date()))
        : na(/* @__PURE__ */ new Date());
    },
    ra = function (a2) {
      if ((ka(a2), !a2)) {
        var b2;
        null === (b2 = aa.current) || void 0 === b2 ? void 0 : b2.focus(),
          s && !M ? R('required') : M && ta(M),
          oa(),
          da();
      } else pa(), (void 0 === j || j) && !M && qa();
    };
  reactExports.useEffect(
    function () {
      return (
        ja && _.current && ca(_),
        function () {
          return da();
        }
      );
    },
    [ja],
  );
  var sa = function (a2) {
      if (a2 !== Q) {
        R(a2);
        var b2 = getErrorText(a2, w, v, null === e || void 0 === e ? void 0 : e.showTimeInError);
        null === G || void 0 === G ? void 0 : G(b2),
          null === J || void 0 === J ? void 0 : J.triggerEvent('errorOnChange', b2);
      }
    },
    ta = function (a2) {
      if (!a2) return void sa();
      if (1800 > a2.getFullYear() || !isValidDate(a2)) return void sa('invalidDate');
      var b2 = null !== e && void 0 !== e && e.showTimeInError ? w : U;
      if (w && isBefore(a2, b2)) return void sa('beforeMinDate');
      var c2 = null !== e && void 0 !== e && e.showTimeInError ? v : Y;
      return c2 && isAfter(a2, c2) ? void sa('afterMaxDate') : void sa();
    };
  return (
    reactExports.useEffect(
      function () {
        M && !D && s && ga && sa('required'), N(D);
      },
      [D],
    ),
    reactExports.useEffect(
      function () {
        ga && ta(D);
      },
      [D, Y, U],
    ),
    reactExports.useEffect(
      function () {
        ja !== q &&
          setTimeout(function () {
            ra(q);
          });
      },
      [q],
    ),
    reactExports.useEffect(
      function () {
        if (w) {
          var a2 = new Date(w);
          a2.setHours(0, 0, 0, 0), V(a2);
        } else V(void 0);
      },
      [w],
    ),
    reactExports.useEffect(
      function () {
        if (v) {
          var a2 = new Date(v);
          a2.setHours(23, 59, 59, 59), Z(a2);
        } else Z(void 0);
      },
      [v],
    ),
    reactExports.useEffect(function () {
      return ha(true);
    }, []),
    /* @__PURE__ */ React.createElement(
      React.Fragment,
      null,
      /* @__PURE__ */ React.createElement(
        FormFieldContainer,
        {
          size: l,
          className: null !== H && void 0 !== H ? H : '',
          style: _objectSpread({}, I),
          isFullWidth: void 0 !== o && o,
          isDisabled: n,
          hasErrorPlaceholder: !!Q || !!la.hasErrorPlaceholder || !!la.text,
          isActive: ja,
          isInvalid: !!Q || !!la.text || !!la.isErrorState,
          'data-testid': 'wrapper',
        },
        !!u &&
          /* @__PURE__ */ React.createElement(
            FormFieldLabel,
            { 'data-testid': 'label', hasOptionalText: i },
            u,
          ),
        /* @__PURE__ */ React.createElement(
          FormFieldInputContainer,
          { ref: $, 'data-testid': 'input-container' },
          /* @__PURE__ */ React.createElement(DatepickerInput, {
            date: M,
            disabled: n,
            placeholder: B,
            onChange: na,
            onFocus: function onFocus() {
              return null === f || void 0 === f ? void 0 : f();
            },
            required: s,
            currentError: Q,
            onErrorChange: sa,
            minDate: U,
            maxDate: Y,
          }),
          /* @__PURE__ */ React.createElement(
            IconButton,
            {
              disabled: n,
              isActive: ja,
              onClick: function onClick() {
                null === f || void 0 === f ? void 0 : f(), ra(!ja);
              },
              ref: aa,
              size: l,
              'data-testid': 'popover-toggle',
              'aria-label': 'Åpne datovelger',
              'aria-haspopup': 'dialog',
            },
            /* @__PURE__ */ React.createElement(IconWrapper, {
              icon: calendar,
              color: n ? 'text-disabled-1' : void 0,
              size: 'small' === l ? 'xs' : 'sm',
            }),
          ),
        ),
        ((Q && !la.hideText) || la.text) &&
          /* @__PURE__ */ React.createElement(DatepickerError, {
            customText: la.text,
            errorText: getErrorText(Q, w, v, null === e || void 0 === e ? void 0 : e.showTimeInError),
          }),
      ),
      ja &&
        /* @__PURE__ */ React.createElement(OverlayContainer, {
          ref: _,
          onClose: function () {
            return ra(false);
          },
          onChange: function onChange(a2) {
            return na(a2);
          },
          onCalendarViewToggle: function reinitiateFocusTrap() {
            da(), ca(_);
          },
          onReset: function triggerResetEvent() {
            null === z || void 0 === z ? void 0 : z(),
              null === J || void 0 === J ? void 0 : J.triggerEvent('onReset');
          },
          selectedDate: M,
          clearButtonText: c,
          minDate: U,
          maxDate: Y,
          disableDate: g,
          dateRangeProps: e,
        }),
    )
  );
};
const Datepicker$1 = Datepicker;

export { Datepicker$1 as Datepicker };
//# sourceMappingURL=react-b750fe8c.js.map
