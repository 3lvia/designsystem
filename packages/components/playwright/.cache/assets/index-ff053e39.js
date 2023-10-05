import {
  g as getDefaultExportFromCjs,
  R as React,
  r as reactExports,
  a as reactDomExports,
} from './index-c3e2bc00.js';

var isSsr = function () {
  return 'undefined' == typeof window || 'undefined' == typeof navigator;
};

var outlineListener = function (a, b) {
  if (a) {
    var c = function (b2) {
        'Tab' === b2.key &&
          a.classList.contains('ewc-no-outline') &&
          (a.classList.remove('ewc-no-outline'), a.addEventListener('mousedown', d, false));
      },
      d = function () {
        a.classList.contains('ewc-no-outline') ||
          (a.classList.add('ewc-no-outline'), a.removeEventListener('mousedown', d, false));
      };
    return b
      ? (a.removeEventListener('keydown', c), void a.removeEventListener('mousedown', d, false))
      : void (a.addEventListener('keydown', c), a.addEventListener('mousedown', d, false));
  }
};

var consoleWarnDeprecatedProp = function (a, b) {
    var c = a.propName,
      d = a.componentName,
      e = a.deprecatedDetails;
    if (void 0 !== e) {
      var f = e.isCallbackFunction ? 'callback function' : b ? 'slot' : 'prop',
        g = e.version ? ' from version '.concat(e.version) : '',
        h = e.newProp ? "\nSee prop '".concat(e.newProp, "' for replacement.") : '',
        i = e.isDirectReplacement ? '\nThis prop can be directly replaced by the new prop name.' : '',
        j = e.explanation ? '\n'.concat(e.explanation) : '';
      console.warn(
        'Deprecation warning in '
          .concat(d, ':\nThe ')
          .concat(f, " '")
          .concat(c, "' is deprecated")
          .concat(g, '.')
          .concat(h)
          .concat(i)
          .concat(j),
      );
    }
  },
  isDeprecatedProp = function (a, b) {
    return b.some(function (b2) {
      return b2.name === a;
    });
  },
  getPropInfo = function (a, b, c) {
    var d = b
        .map(function (a2) {
          return a2.name;
        })
        .indexOf(a),
      e = 'elvia' + c.name.replace(/([A-Z])/g, '-$1').toLowerCase(),
      f = b[d].deprecatedDetails;
    return { propName: a, componentName: e, deprecatedDetails: f };
  };
var warnDeprecatedProps = function (a, b) {
  var c, d;
  if (!(isSsr() || -1 === window.location.href.indexOf('localhost'))) {
    var e = a.attributes.filter(function (a2) {
        return a2.deprecatedDetails;
      }),
      f = [];
    for (var g in b) {
      isDeprecatedProp(g, e) && consoleWarnDeprecatedProp(getPropInfo(g, e, a), false);
      var h = b.webcomponent;
      if (h) {
        if ('_slots' in h)
          for (var i in h._slots)
            isDeprecatedProp(i, e) && consoleWarnDeprecatedProp(getPropInfo(i, e, a), true);
        for (var j in h)
          if (/^__zone_symbol__.*false/.test(j)) {
            var k =
              null === (d = null === (c = h[j]) || void 0 === c ? void 0 : c[0]) || void 0 === d
                ? void 0
                : d.eventName;
            k &&
              isDeprecatedProp(k, e) &&
              !f.includes(k) &&
              (consoleWarnDeprecatedProp(getPropInfo(k, e, a), false), f.push(k));
          }
        if ('_vei' in h)
          for (var l in h._vei) {
            var m = l.charAt(2).toLowerCase() + l.substring(3);
            isDeprecatedProp(m, e) &&
              !f.includes(m) &&
              (consoleWarnDeprecatedProp(getPropInfo(m, e, a), false), f.push(m));
          }
      }
    }
  }
};

var device = {
  gtMobile: '(min-width: 768px)',
  gtTablet: '(min-width: 1024px)',
  gtDesktop: '(min-width: 1440px)',
};

var reactIs$4 = { exports: {} };

var reactIs_production_min$1 = {};

('use strict');
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b$3 = Symbol.for('react.element'),
  c$1 = Symbol.for('react.portal'),
  d$2 = Symbol.for('react.fragment'),
  e$1 = Symbol.for('react.strict_mode'),
  f$2 = Symbol.for('react.profiler'),
  g$2 = Symbol.for('react.provider'),
  h$2 = Symbol.for('react.context'),
  k$2 = Symbol.for('react.server_context'),
  l$1 = Symbol.for('react.forward_ref'),
  m$2 = Symbol.for('react.suspense'),
  n$1 = Symbol.for('react.suspense_list'),
  p$2 = Symbol.for('react.memo'),
  q$2 = Symbol.for('react.lazy'),
  t$1 = Symbol.for('react.offscreen'),
  u;
u = Symbol.for('react.module.reference');
function v$3(a) {
  if ('object' === typeof a && null !== a) {
    var r = a.$$typeof;
    switch (r) {
      case b$3:
        switch (((a = a.type), a)) {
          case d$2:
          case f$2:
          case e$1:
          case m$2:
          case n$1:
            return a;
          default:
            switch (((a = a && a.$$typeof), a)) {
              case k$2:
              case h$2:
              case l$1:
              case q$2:
              case p$2:
              case g$2:
                return a;
              default:
                return r;
            }
        }
      case c$1:
        return r;
    }
  }
}
var ContextConsumer$1 = (reactIs_production_min$1.ContextConsumer = h$2);
var ContextProvider$1 = (reactIs_production_min$1.ContextProvider = g$2);
var Element$1 = (reactIs_production_min$1.Element = b$3);
var ForwardRef$1 = (reactIs_production_min$1.ForwardRef = l$1);
var Fragment$1 = (reactIs_production_min$1.Fragment = d$2);
var Lazy$1 = (reactIs_production_min$1.Lazy = q$2);
var Memo$1 = (reactIs_production_min$1.Memo = p$2);
var Portal$1 = (reactIs_production_min$1.Portal = c$1);
var Profiler$1 = (reactIs_production_min$1.Profiler = f$2);
var StrictMode$1 = (reactIs_production_min$1.StrictMode = e$1);
var Suspense$1 = (reactIs_production_min$1.Suspense = m$2);
var SuspenseList = (reactIs_production_min$1.SuspenseList = n$1);
var isAsyncMode$1 = (reactIs_production_min$1.isAsyncMode = function () {
  return false;
});
var isConcurrentMode$1 = (reactIs_production_min$1.isConcurrentMode = function () {
  return false;
});
var isContextConsumer$1 = (reactIs_production_min$1.isContextConsumer = function (a) {
  return v$3(a) === h$2;
});
var isContextProvider$1 = (reactIs_production_min$1.isContextProvider = function (a) {
  return v$3(a) === g$2;
});
var isElement$1 = (reactIs_production_min$1.isElement = function (a) {
  return 'object' === typeof a && null !== a && a.$$typeof === b$3;
});
var isForwardRef$1 = (reactIs_production_min$1.isForwardRef = function (a) {
  return v$3(a) === l$1;
});
var isFragment$1 = (reactIs_production_min$1.isFragment = function (a) {
  return v$3(a) === d$2;
});
var isLazy$1 = (reactIs_production_min$1.isLazy = function (a) {
  return v$3(a) === q$2;
});
var isMemo$1 = (reactIs_production_min$1.isMemo = function (a) {
  return v$3(a) === p$2;
});
var isPortal$1 = (reactIs_production_min$1.isPortal = function (a) {
  return v$3(a) === c$1;
});
var isProfiler$1 = (reactIs_production_min$1.isProfiler = function (a) {
  return v$3(a) === f$2;
});
var isStrictMode$1 = (reactIs_production_min$1.isStrictMode = function (a) {
  return v$3(a) === e$1;
});
var isSuspense$1 = (reactIs_production_min$1.isSuspense = function (a) {
  return v$3(a) === m$2;
});
var isSuspenseList = (reactIs_production_min$1.isSuspenseList = function (a) {
  return v$3(a) === n$1;
});
var isValidElementType$1 = (reactIs_production_min$1.isValidElementType = function (a) {
  return 'string' === typeof a ||
    'function' === typeof a ||
    a === d$2 ||
    a === f$2 ||
    a === e$1 ||
    a === m$2 ||
    a === n$1 ||
    a === t$1 ||
    ('object' === typeof a &&
      null !== a &&
      (a.$$typeof === q$2 ||
        a.$$typeof === p$2 ||
        a.$$typeof === g$2 ||
        a.$$typeof === h$2 ||
        a.$$typeof === l$1 ||
        a.$$typeof === u ||
        void 0 !== a.getModuleId))
    ? true
    : false;
});
var typeOf$1 = (reactIs_production_min$1.typeOf = v$3);

var reactIs$3 = reactIs$4.exports;

('use strict');
if ('production' === 'production') {
  reactIs$4.exports = reactIs_production_min$1;
} else {
  module.exports = require('./cjs/react-is.development.js');
}

var reactIsExports$1 = reactIs$4.exports;
const index$1 = /*@__PURE__*/ getDefaultExportFromCjs(reactIsExports$1);

var shallowequal = function shallowEqual(objA, objB, compare, compareContext) {
  var ret = compare ? compare.call(compareContext, objA, objB) : void 0;
  if (ret !== void 0) {
    return !!ret;
  }
  if (objA === objB) {
    return true;
  }
  if (typeof objA !== 'object' || !objA || typeof objB !== 'object' || !objB) {
    return false;
  }
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (var idx = 0; idx < keysA.length; idx++) {
    var key = keysA[idx];
    if (!bHasOwnProperty(key)) {
      return false;
    }
    var valueA = objA[key];
    var valueB = objB[key];
    ret = compare ? compare.call(compareContext, valueA, valueB, key) : void 0;
    if (ret === false || (ret === void 0 && valueA !== valueB)) {
      return false;
    }
  }
  return true;
};

const h$1 = /*@__PURE__*/ getDefaultExportFromCjs(shallowequal);

function stylis_min(W) {
  function M(d, c, e, h, a) {
    for (
      var m = 0,
        b = 0,
        v = 0,
        n = 0,
        q,
        g,
        x = 0,
        K = 0,
        k,
        u = (k = q = 0),
        l = 0,
        r = 0,
        I = 0,
        t = 0,
        B2 = e.length,
        J = B2 - 1,
        y,
        f = '',
        p = '',
        F2 = '',
        G2 = '',
        C;
      l < B2;

    ) {
      g = e.charCodeAt(l);
      l === J && 0 !== b + n + v + m && (0 !== b && (g = 47 === b ? 10 : 47), (n = v = m = 0), B2++, J++);
      if (0 === b + n + v + m) {
        if (l === J && (0 < r && (f = f.replace(N, '')), 0 < f.trim().length)) {
          switch (g) {
            case 32:
            case 9:
            case 59:
            case 13:
            case 10:
              break;
            default:
              f += e.charAt(l);
          }
          g = 59;
        }
        switch (g) {
          case 123:
            f = f.trim();
            q = f.charCodeAt(0);
            k = 1;
            for (t = ++l; l < B2; ) {
              switch ((g = e.charCodeAt(l))) {
                case 123:
                  k++;
                  break;
                case 125:
                  k--;
                  break;
                case 47:
                  switch ((g = e.charCodeAt(l + 1))) {
                    case 42:
                    case 47:
                      a: {
                        for (u = l + 1; u < J; ++u) {
                          switch (e.charCodeAt(u)) {
                            case 47:
                              if (42 === g && 42 === e.charCodeAt(u - 1) && l + 2 !== u) {
                                l = u + 1;
                                break a;
                              }
                              break;
                            case 10:
                              if (47 === g) {
                                l = u + 1;
                                break a;
                              }
                          }
                        }
                        l = u;
                      }
                  }
                  break;
                case 91:
                  g++;
                case 40:
                  g++;
                case 34:
                case 39:
                  for (; l++ < J && e.charCodeAt(l) !== g; ) {}
              }
              if (0 === k) break;
              l++;
            }
            k = e.substring(t, l);
            0 === q && (q = (f = f.replace(ca, '').trim()).charCodeAt(0));
            switch (q) {
              case 64:
                0 < r && (f = f.replace(N, ''));
                g = f.charCodeAt(1);
                switch (g) {
                  case 100:
                  case 109:
                  case 115:
                  case 45:
                    r = c;
                    break;
                  default:
                    r = O;
                }
                k = M(c, r, k, g, a + 1);
                t = k.length;
                0 < A &&
                  ((r = X(O, f, I)),
                  (C = H(3, k, r, c, D, z, t, g, a, h)),
                  (f = r.join('')),
                  void 0 !== C && 0 === (t = (k = C.trim()).length) && ((g = 0), (k = '')));
                if (0 < t)
                  switch (g) {
                    case 115:
                      f = f.replace(da, ea);
                    case 100:
                    case 109:
                    case 45:
                      k = f + '{' + k + '}';
                      break;
                    case 107:
                      f = f.replace(fa, '$1 $2');
                      k = f + '{' + k + '}';
                      k = 1 === w || (2 === w && L('@' + k, 3)) ? '@-webkit-' + k + '@' + k : '@' + k;
                      break;
                    default:
                      (k = f + k), 112 === h && (k = ((p += k), ''));
                  }
                else k = '';
                break;
              default:
                k = M(c, X(c, f, I), k, h, a + 1);
            }
            F2 += k;
            k = I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
            break;
          case 125:
          case 59:
            f = (0 < r ? f.replace(N, '') : f).trim();
            if (1 < (t = f.length))
              switch (
                (0 === u &&
                  ((q = f.charCodeAt(0)), 45 === q || (96 < q && 123 > q)) &&
                  (t = (f = f.replace(' ', ':')).length),
                0 < A &&
                  void 0 !== (C = H(1, f, c, d, D, z, p.length, h, a, h)) &&
                  0 === (t = (f = C.trim()).length) &&
                  (f = '\0\0'),
                (q = f.charCodeAt(0)),
                (g = f.charCodeAt(1)),
                q)
              ) {
                case 0:
                  break;
                case 64:
                  if (105 === g || 99 === g) {
                    G2 += f + e.charAt(l);
                    break;
                  }
                default:
                  58 !== f.charCodeAt(t - 1) && (p += P(f, q, g, f.charCodeAt(2)));
              }
            I = r = u = q = 0;
            f = '';
            g = e.charCodeAt(++l);
        }
      }
      switch (g) {
        case 13:
        case 10:
          47 === b ? (b = 0) : 0 === 1 + q && 107 !== h && 0 < f.length && ((r = 1), (f += '\0'));
          0 < A * Y && H(0, f, c, d, D, z, p.length, h, a, h);
          z = 1;
          D++;
          break;
        case 59:
        case 125:
          if (0 === b + n + v + m) {
            z++;
            break;
          }
        default:
          z++;
          y = e.charAt(l);
          switch (g) {
            case 9:
            case 32:
              if (0 === n + m + b)
                switch (x) {
                  case 44:
                  case 58:
                  case 9:
                  case 32:
                    y = '';
                    break;
                  default:
                    32 !== g && (y = ' ');
                }
              break;
            case 0:
              y = '\\0';
              break;
            case 12:
              y = '\\f';
              break;
            case 11:
              y = '\\v';
              break;
            case 38:
              0 === n + b + m && ((r = I = 1), (y = '\f' + y));
              break;
            case 108:
              if (0 === n + b + m + E && 0 < u)
                switch (l - u) {
                  case 2:
                    112 === x && 58 === e.charCodeAt(l - 3) && (E = x);
                  case 8:
                    111 === K && (E = K);
                }
              break;
            case 58:
              0 === n + b + m && (u = l);
              break;
            case 44:
              0 === b + v + n + m && ((r = 1), (y += '\r'));
              break;
            case 34:
            case 39:
              0 === b && (n = n === g ? 0 : 0 === n ? g : n);
              break;
            case 91:
              0 === n + b + v && m++;
              break;
            case 93:
              0 === n + b + v && m--;
              break;
            case 41:
              0 === n + b + m && v--;
              break;
            case 40:
              if (0 === n + b + m) {
                if (0 === q)
                  switch (2 * x + 3 * K) {
                    case 533:
                      break;
                    default:
                      q = 1;
                  }
                v++;
              }
              break;
            case 64:
              0 === b + v + n + m + u + k && (k = 1);
              break;
            case 42:
            case 47:
              if (!(0 < n + m + v))
                switch (b) {
                  case 0:
                    switch (2 * g + 3 * e.charCodeAt(l + 1)) {
                      case 235:
                        b = 47;
                        break;
                      case 220:
                        (t = l), (b = 42);
                    }
                    break;
                  case 42:
                    47 === g &&
                      42 === x &&
                      t + 2 !== l &&
                      (33 === e.charCodeAt(t + 2) && (p += e.substring(t, l + 1)), (y = ''), (b = 0));
                }
          }
          0 === b && (f += y);
      }
      K = x;
      x = g;
      l++;
    }
    t = p.length;
    if (0 < t) {
      r = c;
      if (0 < A && ((C = H(2, p, r, d, D, z, t, h, a, h)), void 0 !== C && 0 === (p = C).length))
        return G2 + p + F2;
      p = r.join(',') + '{' + p + '}';
      if (0 !== w * E) {
        2 !== w || L(p, 2) || (E = 0);
        switch (E) {
          case 111:
            p = p.replace(ha, ':-moz-$1') + p;
            break;
          case 112:
            p =
              p.replace(Q, '::-webkit-input-$1') +
              p.replace(Q, '::-moz-$1') +
              p.replace(Q, ':-ms-input-$1') +
              p;
        }
        E = 0;
      }
    }
    return G2 + p + F2;
  }
  function X(d, c, e) {
    var h = c.trim().split(ia);
    c = h;
    var a = h.length,
      m = d.length;
    switch (m) {
      case 0:
      case 1:
        var b = 0;
        for (d = 0 === m ? '' : d[0] + ' '; b < a; ++b) {
          c[b] = Z(d, c[b], e).trim();
        }
        break;
      default:
        var v = (b = 0);
        for (c = []; b < a; ++b) {
          for (var n = 0; n < m; ++n) {
            c[v++] = Z(d[n] + ' ', h[b], e).trim();
          }
        }
    }
    return c;
  }
  function Z(d, c, e) {
    var h = c.charCodeAt(0);
    33 > h && (h = (c = c.trim()).charCodeAt(0));
    switch (h) {
      case 38:
        return c.replace(F, '$1' + d.trim());
      case 58:
        return d.trim() + c.replace(F, '$1' + d.trim());
      default:
        if (0 < 1 * e && 0 < c.indexOf('\f'))
          return c.replace(F, (58 === d.charCodeAt(0) ? '' : '$1') + d.trim());
    }
    return d + c;
  }
  function P(d, c, e, h) {
    var a = d + ';',
      m = 2 * c + 3 * e + 4 * h;
    if (944 === m) {
      d = a.indexOf(':', 9) + 1;
      var b = a.substring(d, a.length - 1).trim();
      b = a.substring(0, d).trim() + b + ';';
      return 1 === w || (2 === w && L(b, 1)) ? '-webkit-' + b + b : b;
    }
    if (0 === w || (2 === w && !L(a, 1))) return a;
    switch (m) {
      case 1015:
        return 97 === a.charCodeAt(10) ? '-webkit-' + a + a : a;
      case 951:
        return 116 === a.charCodeAt(3) ? '-webkit-' + a + a : a;
      case 963:
        return 110 === a.charCodeAt(5) ? '-webkit-' + a + a : a;
      case 1009:
        if (100 !== a.charCodeAt(4)) break;
      case 969:
      case 942:
        return '-webkit-' + a + a;
      case 978:
        return '-webkit-' + a + '-moz-' + a + a;
      case 1019:
      case 983:
        return '-webkit-' + a + '-moz-' + a + '-ms-' + a + a;
      case 883:
        if (45 === a.charCodeAt(8)) return '-webkit-' + a + a;
        if (0 < a.indexOf('image-set(', 11)) return a.replace(ja, '$1-webkit-$2') + a;
        break;
      case 932:
        if (45 === a.charCodeAt(4))
          switch (a.charCodeAt(5)) {
            case 103:
              return (
                '-webkit-box-' +
                a.replace('-grow', '') +
                '-webkit-' +
                a +
                '-ms-' +
                a.replace('grow', 'positive') +
                a
              );
            case 115:
              return '-webkit-' + a + '-ms-' + a.replace('shrink', 'negative') + a;
            case 98:
              return '-webkit-' + a + '-ms-' + a.replace('basis', 'preferred-size') + a;
          }
        return '-webkit-' + a + '-ms-' + a + a;
      case 964:
        return '-webkit-' + a + '-ms-flex-' + a + a;
      case 1023:
        if (99 !== a.charCodeAt(8)) break;
        b = a.substring(a.indexOf(':', 15)).replace('flex-', '').replace('space-between', 'justify');
        return '-webkit-box-pack' + b + '-webkit-' + a + '-ms-flex-pack' + b + a;
      case 1005:
        return ka.test(a) ? a.replace(aa, ':-webkit-') + a.replace(aa, ':-moz-') + a : a;
      case 1e3:
        b = a.substring(13).trim();
        c = b.indexOf('-') + 1;
        switch (b.charCodeAt(0) + b.charCodeAt(c)) {
          case 226:
            b = a.replace(G, 'tb');
            break;
          case 232:
            b = a.replace(G, 'tb-rl');
            break;
          case 220:
            b = a.replace(G, 'lr');
            break;
          default:
            return a;
        }
        return '-webkit-' + a + '-ms-' + b + a;
      case 1017:
        if (-1 === a.indexOf('sticky', 9)) break;
      case 975:
        c = (a = d).length - 10;
        b = (33 === a.charCodeAt(c) ? a.substring(0, c) : a).substring(d.indexOf(':', 7) + 1).trim();
        switch ((m = b.charCodeAt(0) + (b.charCodeAt(7) | 0))) {
          case 203:
            if (111 > b.charCodeAt(8)) break;
          case 115:
            a = a.replace(b, '-webkit-' + b) + ';' + a;
            break;
          case 207:
          case 102:
            a =
              a.replace(b, '-webkit-' + (102 < m ? 'inline-' : '') + 'box') +
              ';' +
              a.replace(b, '-webkit-' + b) +
              ';' +
              a.replace(b, '-ms-' + b + 'box') +
              ';' +
              a;
        }
        return a + ';';
      case 938:
        if (45 === a.charCodeAt(5))
          switch (a.charCodeAt(6)) {
            case 105:
              return (b = a.replace('-items', '')), '-webkit-' + a + '-webkit-box-' + b + '-ms-flex-' + b + a;
            case 115:
              return '-webkit-' + a + '-ms-flex-item-' + a.replace(ba, '') + a;
            default:
              return (
                '-webkit-' + a + '-ms-flex-line-pack' + a.replace('align-content', '').replace(ba, '') + a
              );
          }
        break;
      case 973:
      case 989:
        if (45 !== a.charCodeAt(3) || 122 === a.charCodeAt(4)) break;
      case 931:
      case 953:
        if (true === la.test(d))
          return 115 === (b = d.substring(d.indexOf(':') + 1)).charCodeAt(0)
            ? P(d.replace('stretch', 'fill-available'), c, e, h).replace(':fill-available', ':stretch')
            : a.replace(b, '-webkit-' + b) + a.replace(b, '-moz-' + b.replace('fill-', '')) + a;
        break;
      case 962:
        if (
          ((a = '-webkit-' + a + (102 === a.charCodeAt(5) ? '-ms-' + a : '') + a),
          211 === e + h && 105 === a.charCodeAt(13) && 0 < a.indexOf('transform', 10))
        )
          return a.substring(0, a.indexOf(';', 27) + 1).replace(ma, '$1-webkit-$2') + a;
    }
    return a;
  }
  function L(d, c) {
    var e = d.indexOf(1 === c ? ':' : '{'),
      h = d.substring(0, 3 !== c ? e : 10);
    e = d.substring(e + 1, d.length - 1);
    return R(2 !== c ? h : h.replace(na, '$1'), e, c);
  }
  function ea(d, c) {
    var e = P(c, c.charCodeAt(0), c.charCodeAt(1), c.charCodeAt(2));
    return e !== c + ';' ? e.replace(oa, ' or ($1)').substring(4) : '(' + c + ')';
  }
  function H(d, c, e, h, a, m, b, v, n, q) {
    for (var g = 0, x = c, w2; g < A; ++g) {
      switch ((w2 = S[g].call(B, d, x, e, h, a, m, b, v, n, q))) {
        case void 0:
        case false:
        case true:
        case null:
          break;
        default:
          x = w2;
      }
    }
    if (x !== c) return x;
  }
  function T(d) {
    switch (d) {
      case void 0:
      case null:
        A = S.length = 0;
        break;
      default:
        if ('function' === typeof d) S[A++] = d;
        else if ('object' === typeof d)
          for (var c = 0, e = d.length; c < e; ++c) {
            T(d[c]);
          }
        else Y = !!d | 0;
    }
    return T;
  }
  function U(d) {
    d = d.prefix;
    void 0 !== d && ((R = null), d ? ('function' !== typeof d ? (w = 1) : ((w = 2), (R = d))) : (w = 0));
    return U;
  }
  function B(d, c) {
    var e = d;
    33 > e.charCodeAt(0) && (e = e.trim());
    V = e;
    e = [V];
    if (0 < A) {
      var h = H(-1, c, e, e, D, z, 0, 0, 0, 0);
      void 0 !== h && 'string' === typeof h && (c = h);
    }
    var a = M(O, e, c, 0, 0);
    0 < A && ((h = H(-2, a, e, e, D, z, a.length, 0, 0, 0)), void 0 !== h && (a = h));
    V = '';
    E = 0;
    z = D = 1;
    return a;
  }
  var ca = /^\0+/g,
    N = /[\0\r\f]/g,
    aa = /: */g,
    ka = /zoo|gra/,
    ma = /([,: ])(transform)/g,
    ia = /,\r+?/g,
    F = /([\t\r\n ])*\f?&/g,
    fa = /@(k\w+)\s*(\S*)\s*/,
    Q = /::(place)/g,
    ha = /:(read-only)/g,
    G = /[svh]\w+-[tblr]{2}/,
    da = /\(\s*(.*)\s*\)/g,
    oa = /([\s\S]*?);/g,
    ba = /-self|flex-/g,
    na = /[^]*?(:[rp][el]a[\w-]+)[^]*/,
    la = /stretch|:\s*\w+\-(?:conte|avail)/,
    ja = /([^-])(image-set\()/,
    z = 1,
    D = 1,
    E = 0,
    w = 1,
    O = [],
    S = [],
    A = 0,
    R = null,
    Y = 0,
    V = '';
  B.use = T;
  B.set = U;
  void 0 !== W && U(W);
  return B;
}

var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1,
};

function memoize(fn) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function (arg) {
    if (cache[arg] === void 0) cache[arg] = fn(arg);
    return cache[arg];
  };
}

var reactPropsRegex =
  /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize(
  function (prop) {
    return (
      reactPropsRegex.test(prop) ||
      (prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91)
    );
  },
  /* Z+1 */
);

var reactIs$2 = { exports: {} };

var reactIs_production_min = {};

('use strict');
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b$2 = 'function' === typeof Symbol && Symbol.for,
  c = b$2 ? Symbol.for('react.element') : 60103,
  d$1 = b$2 ? Symbol.for('react.portal') : 60106,
  e = b$2 ? Symbol.for('react.fragment') : 60107,
  f$1 = b$2 ? Symbol.for('react.strict_mode') : 60108,
  g$1 = b$2 ? Symbol.for('react.profiler') : 60114,
  h = b$2 ? Symbol.for('react.provider') : 60109,
  k$1 = b$2 ? Symbol.for('react.context') : 60110,
  l = b$2 ? Symbol.for('react.async_mode') : 60111,
  m$1 = b$2 ? Symbol.for('react.concurrent_mode') : 60111,
  n = b$2 ? Symbol.for('react.forward_ref') : 60112,
  p$1 = b$2 ? Symbol.for('react.suspense') : 60113,
  q$1 = b$2 ? Symbol.for('react.suspense_list') : 60120,
  r$2 = b$2 ? Symbol.for('react.memo') : 60115,
  t = b$2 ? Symbol.for('react.lazy') : 60116,
  v$2 = b$2 ? Symbol.for('react.block') : 60121,
  w$1 = b$2 ? Symbol.for('react.fundamental') : 60117,
  x$2 = b$2 ? Symbol.for('react.responder') : 60118,
  y$2 = b$2 ? Symbol.for('react.scope') : 60119;
function z$1(a) {
  if ('object' === typeof a && null !== a) {
    var u = a.$$typeof;
    switch (u) {
      case c:
        switch (((a = a.type), a)) {
          case l:
          case m$1:
          case e:
          case g$1:
          case f$1:
          case p$1:
            return a;
          default:
            switch (((a = a && a.$$typeof), a)) {
              case k$1:
              case n:
              case t:
              case r$2:
              case h:
                return a;
              default:
                return u;
            }
        }
      case d$1:
        return u;
    }
  }
}
function A$1(a) {
  return z$1(a) === m$1;
}
var AsyncMode = (reactIs_production_min.AsyncMode = l);
var ConcurrentMode = (reactIs_production_min.ConcurrentMode = m$1);
var ContextConsumer = (reactIs_production_min.ContextConsumer = k$1);
var ContextProvider = (reactIs_production_min.ContextProvider = h);
var Element = (reactIs_production_min.Element = c);
var ForwardRef = (reactIs_production_min.ForwardRef = n);
var Fragment = (reactIs_production_min.Fragment = e);
var Lazy = (reactIs_production_min.Lazy = t);
var Memo = (reactIs_production_min.Memo = r$2);
var Portal = (reactIs_production_min.Portal = d$1);
var Profiler = (reactIs_production_min.Profiler = g$1);
var StrictMode = (reactIs_production_min.StrictMode = f$1);
var Suspense = (reactIs_production_min.Suspense = p$1);
var isAsyncMode = (reactIs_production_min.isAsyncMode = function (a) {
  return A$1(a) || z$1(a) === l;
});
var isConcurrentMode = (reactIs_production_min.isConcurrentMode = A$1);
var isContextConsumer = (reactIs_production_min.isContextConsumer = function (a) {
  return z$1(a) === k$1;
});
var isContextProvider = (reactIs_production_min.isContextProvider = function (a) {
  return z$1(a) === h;
});
var isElement = (reactIs_production_min.isElement = function (a) {
  return 'object' === typeof a && null !== a && a.$$typeof === c;
});
var isForwardRef = (reactIs_production_min.isForwardRef = function (a) {
  return z$1(a) === n;
});
var isFragment = (reactIs_production_min.isFragment = function (a) {
  return z$1(a) === e;
});
var isLazy = (reactIs_production_min.isLazy = function (a) {
  return z$1(a) === t;
});
var isMemo = (reactIs_production_min.isMemo = function (a) {
  return z$1(a) === r$2;
});
var isPortal = (reactIs_production_min.isPortal = function (a) {
  return z$1(a) === d$1;
});
var isProfiler = (reactIs_production_min.isProfiler = function (a) {
  return z$1(a) === g$1;
});
var isStrictMode = (reactIs_production_min.isStrictMode = function (a) {
  return z$1(a) === f$1;
});
var isSuspense = (reactIs_production_min.isSuspense = function (a) {
  return z$1(a) === p$1;
});
var isValidElementType = (reactIs_production_min.isValidElementType = function (a) {
  return (
    'string' === typeof a ||
    'function' === typeof a ||
    a === e ||
    a === m$1 ||
    a === g$1 ||
    a === f$1 ||
    a === p$1 ||
    a === q$1 ||
    ('object' === typeof a &&
      null !== a &&
      (a.$$typeof === t ||
        a.$$typeof === r$2 ||
        a.$$typeof === h ||
        a.$$typeof === k$1 ||
        a.$$typeof === n ||
        a.$$typeof === w$1 ||
        a.$$typeof === x$2 ||
        a.$$typeof === y$2 ||
        a.$$typeof === v$2))
  );
});
var typeOf = (reactIs_production_min.typeOf = z$1);

var reactIs$1 = reactIs$2.exports;

('use strict');
if ('production' === 'production') {
  reactIs$2.exports = reactIs_production_min;
} else {
  module.exports = require('./cjs/react-is.development.js');
}

var reactIsExports = reactIs$2.exports;
const index = /*@__PURE__*/ getDefaultExportFromCjs(reactIsExports);

('use strict');
var reactIs = reactIsExports;
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true,
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true,
};
var FORWARD_REF_STATICS = {
  $$typeof: true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
};
var MEMO_STATICS = {
  $$typeof: true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true,
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
function getStatics(component) {
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  }
  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }
    var keys = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }
    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);
    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];
      if (
        !KNOWN_STATICS[key] &&
        !(blacklist && blacklist[key]) &&
        !(sourceStatics && sourceStatics[key]) &&
        !(targetStatics && targetStatics[key])
      ) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }
  return targetComponent;
}
var hoistNonReactStatics_cjs = hoistNonReactStatics;

const y$1 = /*@__PURE__*/ getDefaultExportFromCjs(hoistNonReactStatics_cjs);

function v$1() {
  return (v$1 =
    Object.assign ||
    function (e2) {
      for (var t2 = 1; t2 < arguments.length; t2++) {
        var n2 = arguments[t2];
        for (var r2 in n2) Object.prototype.hasOwnProperty.call(n2, r2) && (e2[r2] = n2[r2]);
      }
      return e2;
    }).apply(this, arguments);
}
var g = function (e2, t2) {
    for (var n2 = [e2[0]], r2 = 0, o2 = t2.length; r2 < o2; r2 += 1) n2.push(t2[r2], e2[r2 + 1]);
    return n2;
  },
  S = function (t2) {
    return (
      null !== t2 &&
      'object' == typeof t2 &&
      '[object Object]' === (t2.toString ? t2.toString() : Object.prototype.toString.call(t2)) &&
      !reactIsExports$1.typeOf(t2)
    );
  },
  w = Object.freeze([]),
  E$1 = Object.freeze({});
function b$1(e2) {
  return 'function' == typeof e2;
}
function _(e2) {
  return (
    ('production' !== 'production' && 'string' == typeof e2 && e2) || e2.displayName || e2.name || 'Component'
  );
}
function N$1(e2) {
  return e2 && 'string' == typeof e2.styledComponentId;
}
var A = ('undefined' != typeof process && ({}.REACT_APP_SC_ATTR || {}.SC_ATTR)) || 'data-styled',
  C = '5.3.6',
  I = 'undefined' != typeof window && 'HTMLElement' in window,
  P = Boolean(
    'boolean' == typeof SC_DISABLE_SPEEDY
      ? SC_DISABLE_SPEEDY
      : 'undefined' != typeof process &&
        void 0 !== {}.REACT_APP_SC_DISABLE_SPEEDY &&
        '' !== {}.REACT_APP_SC_DISABLE_SPEEDY
      ? 'false' !== {}.REACT_APP_SC_DISABLE_SPEEDY && {}.REACT_APP_SC_DISABLE_SPEEDY
      : 'undefined' != typeof process && void 0 !== {}.SC_DISABLE_SPEEDY && '' !== {}.SC_DISABLE_SPEEDY
      ? 'false' !== {}.SC_DISABLE_SPEEDY && {}.SC_DISABLE_SPEEDY
      : 'production' !== 'production',
  ),
  O = {},
  R =
    'production' !== 'production'
      ? {
          1: 'Cannot create styled-component for component: %s.\n\n',
          2: "Can't collect styles once you've consumed a `ServerStyleSheet`'s styles! `ServerStyleSheet` is a one off instance for each server-side render cycle.\n\n- Are you trying to reuse it across renders?\n- Are you accidentally calling collectStyles twice?\n\n",
          3: 'Streaming SSR is only supported in a Node.js environment; Please do not try to call this method in the browser.\n\n',
          4: 'The `StyleSheetManager` expects a valid target or sheet prop!\n\n- Does this error occur on the client and is your target falsy?\n- Does this error occur on the server and is the sheet falsy?\n\n',
          5: 'The clone method cannot be used on the client!\n\n- Are you running in a client-like environment on the server?\n- Are you trying to run SSR on the client?\n\n',
          6: "Trying to insert a new style tag, but the given Node is unmounted!\n\n- Are you using a custom target that isn't mounted?\n- Does your document not have a valid head element?\n- Have you accidentally removed a style tag manually?\n\n",
          7: 'ThemeProvider: Please return an object from your "theme" prop function, e.g.\n\n```js\ntheme={() => ({})}\n```\n\n',
          8: 'ThemeProvider: Please make your "theme" prop an object.\n\n',
          9: 'Missing document `<head>`\n\n',
          10: 'Cannot find a StyleSheet instance. Usually this happens if there are multiple copies of styled-components loaded at once. Check out this issue for how to troubleshoot and fix the common cases where this situation can happen: https://github.com/styled-components/styled-components/issues/1941#issuecomment-417862021\n\n',
          11: '_This error was replaced with a dev-time warning, it will be deleted for v4 final._ [createGlobalStyle] received children which will not be rendered. Please use the component without passing children elements.\n\n',
          12: 'It seems you are interpolating a keyframe declaration (%s) into an untagged string. This was supported in styled-components v3, but is not longer supported in v4 as keyframes are now injected on-demand. Please wrap your string in the css\\`\\` helper which ensures the styles are injected correctly. See https://www.styled-components.com/docs/api#css\n\n',
          13: '%s is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.\n\n',
          14: 'ThemeProvider: "theme" prop is required.\n\n',
          15: "A stylis plugin has been supplied that is not named. We need a name for each plugin to be able to prevent styling collisions between different stylis configurations within the same app. Before you pass your plugin to `<StyleSheetManager stylisPlugins={[]}>`, please make sure each plugin is uniquely-named, e.g.\n\n```js\nObject.defineProperty(importedPlugin, 'name', { value: 'some-unique-name' });\n```\n\n",
          16: "Reached the limit of how many styled components may be created at group %s.\nYou may only create up to 1,073,741,824 components. If you're creating components dynamically,\nas for instance in your render method then you may be running into this limitation.\n\n",
          17: "CSSStyleSheet could not be found on HTMLStyleElement.\nHas styled-components' style tag been unmounted or altered by another script?\n",
        }
      : {};
function D$1() {
  for (
    var e2 = arguments.length <= 0 ? void 0 : arguments[0], t2 = [], n2 = 1, r2 = arguments.length;
    n2 < r2;
    n2 += 1
  )
    t2.push(n2 < 0 || arguments.length <= n2 ? void 0 : arguments[n2]);
  return (
    t2.forEach(function (t3) {
      e2 = e2.replace(/%[a-z]/, t3);
    }),
    e2
  );
}
function j(e2) {
  for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++)
    n2[r2 - 1] = arguments[r2];
  throw 'production' === 'production'
    ? new Error(
        'An error occurred. See https://git.io/JUIaE#' +
          e2 +
          ' for more information.' +
          (n2.length > 0 ? ' Args: ' + n2.join(', ') : ''),
      )
    : new Error(D$1.apply(void 0, [R[e2]].concat(n2)).trim());
}
var T$1 = (function () {
    function e2(e3) {
      (this.groupSizes = new Uint32Array(512)), (this.length = 512), (this.tag = e3);
    }
    var t2 = e2.prototype;
    return (
      (t2.indexOfGroup = function (e3) {
        for (var t3 = 0, n2 = 0; n2 < e3; n2++) t3 += this.groupSizes[n2];
        return t3;
      }),
      (t2.insertRules = function (e3, t3) {
        if (e3 >= this.groupSizes.length) {
          for (var n2 = this.groupSizes, r2 = n2.length, o2 = r2; e3 >= o2; )
            (o2 <<= 1) < 0 && j(16, '' + e3);
          (this.groupSizes = new Uint32Array(o2)), this.groupSizes.set(n2), (this.length = o2);
          for (var s2 = r2; s2 < o2; s2++) this.groupSizes[s2] = 0;
        }
        for (var i2 = this.indexOfGroup(e3 + 1), a2 = 0, c2 = t3.length; a2 < c2; a2++)
          this.tag.insertRule(i2, t3[a2]) && (this.groupSizes[e3]++, i2++);
      }),
      (t2.clearGroup = function (e3) {
        if (e3 < this.length) {
          var t3 = this.groupSizes[e3],
            n2 = this.indexOfGroup(e3),
            r2 = n2 + t3;
          this.groupSizes[e3] = 0;
          for (var o2 = n2; o2 < r2; o2++) this.tag.deleteRule(n2);
        }
      }),
      (t2.getGroup = function (e3) {
        var t3 = '';
        if (e3 >= this.length || 0 === this.groupSizes[e3]) return t3;
        for (var n2 = this.groupSizes[e3], r2 = this.indexOfGroup(e3), o2 = r2 + n2, s2 = r2; s2 < o2; s2++)
          t3 += this.tag.getRule(s2) + '/*!sc*/\n';
        return t3;
      }),
      e2
    );
  })(),
  x$1 = /* @__PURE__ */ new Map(),
  k = /* @__PURE__ */ new Map(),
  V = 1,
  B = function (e2) {
    if (x$1.has(e2)) return x$1.get(e2);
    for (; k.has(V); ) V++;
    var t2 = V++;
    return (
      'production' !== 'production' && ((0 | t2) < 0 || t2 > 1 << 30) && j(16, '' + t2),
      x$1.set(e2, t2),
      k.set(t2, e2),
      t2
    );
  },
  z = function (e2) {
    return k.get(e2);
  },
  M = function (e2, t2) {
    t2 >= V && (V = t2 + 1), x$1.set(e2, t2), k.set(t2, e2);
  },
  G = 'style[' + A + '][data-styled-version="5.3.6"]',
  L$1 = new RegExp('^' + A + '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)'),
  F = function (e2, t2, n2) {
    for (var r2, o2 = n2.split(','), s2 = 0, i2 = o2.length; s2 < i2; s2++)
      (r2 = o2[s2]) && e2.registerName(t2, r2);
  },
  Y = function (e2, t2) {
    for (var n2 = (t2.textContent || '').split('/*!sc*/\n'), r2 = [], o2 = 0, s2 = n2.length; o2 < s2; o2++) {
      var i2 = n2[o2].trim();
      if (i2) {
        var a2 = i2.match(L$1);
        if (a2) {
          var c2 = 0 | parseInt(a2[1], 10),
            u2 = a2[2];
          0 !== c2 && (M(u2, c2), F(e2, u2, a2[3]), e2.getTag().insertRules(c2, r2)), (r2.length = 0);
        } else r2.push(i2);
      }
    }
  },
  q = function () {
    return 'undefined' != typeof __webpack_nonce__ ? __webpack_nonce__ : null;
  },
  H = function (e2) {
    var t2 = document.head,
      n2 = e2 || t2,
      r2 = document.createElement('style'),
      o2 = (function (e3) {
        for (var t3 = e3.childNodes, n3 = t3.length; n3 >= 0; n3--) {
          var r3 = t3[n3];
          if (r3 && 1 === r3.nodeType && r3.hasAttribute(A)) return r3;
        }
      })(n2),
      s2 = void 0 !== o2 ? o2.nextSibling : null;
    r2.setAttribute(A, 'active'), r2.setAttribute('data-styled-version', '5.3.6');
    var i2 = q();
    return i2 && r2.setAttribute('nonce', i2), n2.insertBefore(r2, s2), r2;
  },
  $ = (function () {
    function e2(e3) {
      var t3 = (this.element = H(e3));
      t3.appendChild(document.createTextNode('')),
        (this.sheet = (function (e4) {
          if (e4.sheet) return e4.sheet;
          for (var t4 = document.styleSheets, n2 = 0, r2 = t4.length; n2 < r2; n2++) {
            var o2 = t4[n2];
            if (o2.ownerNode === e4) return o2;
          }
          j(17);
        })(t3)),
        (this.length = 0);
    }
    var t2 = e2.prototype;
    return (
      (t2.insertRule = function (e3, t3) {
        try {
          return this.sheet.insertRule(t3, e3), this.length++, true;
        } catch (e4) {
          return false;
        }
      }),
      (t2.deleteRule = function (e3) {
        this.sheet.deleteRule(e3), this.length--;
      }),
      (t2.getRule = function (e3) {
        var t3 = this.sheet.cssRules[e3];
        return void 0 !== t3 && 'string' == typeof t3.cssText ? t3.cssText : '';
      }),
      e2
    );
  })(),
  W = (function () {
    function e2(e3) {
      var t3 = (this.element = H(e3));
      (this.nodes = t3.childNodes), (this.length = 0);
    }
    var t2 = e2.prototype;
    return (
      (t2.insertRule = function (e3, t3) {
        if (e3 <= this.length && e3 >= 0) {
          var n2 = document.createTextNode(t3),
            r2 = this.nodes[e3];
          return this.element.insertBefore(n2, r2 || null), this.length++, true;
        }
        return false;
      }),
      (t2.deleteRule = function (e3) {
        this.element.removeChild(this.nodes[e3]), this.length--;
      }),
      (t2.getRule = function (e3) {
        return e3 < this.length ? this.nodes[e3].textContent : '';
      }),
      e2
    );
  })(),
  U = (function () {
    function e2(e3) {
      (this.rules = []), (this.length = 0);
    }
    var t2 = e2.prototype;
    return (
      (t2.insertRule = function (e3, t3) {
        return e3 <= this.length && (this.rules.splice(e3, 0, t3), this.length++, true);
      }),
      (t2.deleteRule = function (e3) {
        this.rules.splice(e3, 1), this.length--;
      }),
      (t2.getRule = function (e3) {
        return e3 < this.length ? this.rules[e3] : '';
      }),
      e2
    );
  })(),
  J = I,
  X = { isServer: !I, useCSSOMInjection: !P },
  Z = (function () {
    function e2(e3, t3, n2) {
      void 0 === e3 && (e3 = E$1),
        void 0 === t3 && (t3 = {}),
        (this.options = v$1({}, X, {}, e3)),
        (this.gs = t3),
        (this.names = new Map(n2)),
        (this.server = !!e3.isServer),
        !this.server &&
          I &&
          J &&
          ((J = false),
          (function (e4) {
            for (var t4 = document.querySelectorAll(G), n3 = 0, r2 = t4.length; n3 < r2; n3++) {
              var o2 = t4[n3];
              o2 &&
                'active' !== o2.getAttribute(A) &&
                (Y(e4, o2), o2.parentNode && o2.parentNode.removeChild(o2));
            }
          })(this));
    }
    e2.registerId = function (e3) {
      return B(e3);
    };
    var t2 = e2.prototype;
    return (
      (t2.reconstructWithOptions = function (t3, n2) {
        return (
          void 0 === n2 && (n2 = true),
          new e2(v$1({}, this.options, {}, t3), this.gs, (n2 && this.names) || void 0)
        );
      }),
      (t2.allocateGSInstance = function (e3) {
        return (this.gs[e3] = (this.gs[e3] || 0) + 1);
      }),
      (t2.getTag = function () {
        return (
          this.tag ||
          (this.tag =
            ((n2 = (t3 = this.options).isServer),
            (r2 = t3.useCSSOMInjection),
            (o2 = t3.target),
            (e3 = n2 ? new U(o2) : r2 ? new $(o2) : new W(o2)),
            new T$1(e3)))
        );
        var e3, t3, n2, r2, o2;
      }),
      (t2.hasNameForId = function (e3, t3) {
        return this.names.has(e3) && this.names.get(e3).has(t3);
      }),
      (t2.registerName = function (e3, t3) {
        if ((B(e3), this.names.has(e3))) this.names.get(e3).add(t3);
        else {
          var n2 = /* @__PURE__ */ new Set();
          n2.add(t3), this.names.set(e3, n2);
        }
      }),
      (t2.insertRules = function (e3, t3, n2) {
        this.registerName(e3, t3), this.getTag().insertRules(B(e3), n2);
      }),
      (t2.clearNames = function (e3) {
        this.names.has(e3) && this.names.get(e3).clear();
      }),
      (t2.clearRules = function (e3) {
        this.getTag().clearGroup(B(e3)), this.clearNames(e3);
      }),
      (t2.clearTag = function () {
        this.tag = void 0;
      }),
      (t2.toString = function () {
        return (function (e3) {
          for (var t3 = e3.getTag(), n2 = t3.length, r2 = '', o2 = 0; o2 < n2; o2++) {
            var s2 = z(o2);
            if (void 0 !== s2) {
              var i2 = e3.names.get(s2),
                a2 = t3.getGroup(o2);
              if (i2 && a2 && i2.size) {
                var c2 = A + '.g' + o2 + '[id="' + s2 + '"]',
                  u2 = '';
                void 0 !== i2 &&
                  i2.forEach(function (e4) {
                    e4.length > 0 && (u2 += e4 + ',');
                  }),
                  (r2 += '' + a2 + c2 + '{content:"' + u2 + '"}/*!sc*/\n');
              }
            }
          }
          return r2;
        })(this);
      }),
      e2
    );
  })(),
  K = /(a)(d)/gi,
  Q = function (e2) {
    return String.fromCharCode(e2 + (e2 > 25 ? 39 : 97));
  };
function ee(e2) {
  var t2,
    n2 = '';
  for (t2 = Math.abs(e2); t2 > 52; t2 = (t2 / 52) | 0) n2 = Q(t2 % 52) + n2;
  return (Q(t2 % 52) + n2).replace(K, '$1-$2');
}
var te = function (e2, t2) {
    for (var n2 = t2.length; n2; ) e2 = (33 * e2) ^ t2.charCodeAt(--n2);
    return e2;
  },
  ne = function (e2) {
    return te(5381, e2);
  };
function re(e2) {
  for (var t2 = 0; t2 < e2.length; t2 += 1) {
    var n2 = e2[t2];
    if (b$1(n2) && !N$1(n2)) return false;
  }
  return true;
}
var oe = ne('5.3.6'),
  se = (function () {
    function e2(e3, t2, n2) {
      (this.rules = e3),
        (this.staticRulesId = ''),
        (this.isStatic = 'production' === 'production' && (void 0 === n2 || n2.isStatic) && re(e3)),
        (this.componentId = t2),
        (this.baseHash = te(oe, t2)),
        (this.baseStyle = n2),
        Z.registerId(t2);
    }
    return (
      (e2.prototype.generateAndInjectStyles = function (e3, t2, n2) {
        var r2 = this.componentId,
          o2 = [];
        if (
          (this.baseStyle && o2.push(this.baseStyle.generateAndInjectStyles(e3, t2, n2)),
          this.isStatic && !n2.hash)
        )
          if (this.staticRulesId && t2.hasNameForId(r2, this.staticRulesId)) o2.push(this.staticRulesId);
          else {
            var s2 = Ne(this.rules, e3, t2, n2).join(''),
              i2 = ee(te(this.baseHash, s2) >>> 0);
            if (!t2.hasNameForId(r2, i2)) {
              var a2 = n2(s2, '.' + i2, void 0, r2);
              t2.insertRules(r2, i2, a2);
            }
            o2.push(i2), (this.staticRulesId = i2);
          }
        else {
          for (var c2 = this.rules.length, u2 = te(this.baseHash, n2.hash), l2 = '', d2 = 0; d2 < c2; d2++) {
            var h2 = this.rules[d2];
            if ('string' == typeof h2) (l2 += h2), 'production' !== 'production' && (u2 = te(u2, h2 + d2));
            else if (h2) {
              var p2 = Ne(h2, e3, t2, n2),
                f2 = Array.isArray(p2) ? p2.join('') : p2;
              (u2 = te(u2, f2 + d2)), (l2 += f2);
            }
          }
          if (l2) {
            var m2 = ee(u2 >>> 0);
            if (!t2.hasNameForId(r2, m2)) {
              var y2 = n2(l2, '.' + m2, void 0, r2);
              t2.insertRules(r2, m2, y2);
            }
            o2.push(m2);
          }
        }
        return o2.join(' ');
      }),
      e2
    );
  })(),
  ie = /^\s*\/\/.*$/gm,
  ae = [':', '[', '.', '#'];
function ce(e2) {
  var t2,
    n2,
    r2,
    o2,
    s2 = void 0 === e2 ? E$1 : e2,
    i2 = s2.options,
    a2 = void 0 === i2 ? E$1 : i2,
    c2 = s2.plugins,
    u2 = void 0 === c2 ? w : c2,
    l2 = new stylis_min(a2),
    d2 = [],
    h2 = (function (e3) {
      function t3(t4) {
        if (t4)
          try {
            e3(t4 + '}');
          } catch (e4) {}
      }
      return function (n3, r3, o3, s3, i3, a3, c3, u3, l3, d3) {
        switch (n3) {
          case 1:
            if (0 === l3 && 64 === r3.charCodeAt(0)) return e3(r3 + ';'), '';
            break;
          case 2:
            if (0 === u3) return r3 + '/*|*/';
            break;
          case 3:
            switch (u3) {
              case 102:
              case 112:
                return e3(o3[0] + r3), '';
              default:
                return r3 + (0 === d3 ? '/*|*/' : '');
            }
          case -2:
            r3.split('/*|*/}').forEach(t3);
        }
      };
    })(function (e3) {
      d2.push(e3);
    }),
    f2 = function (e3, r3, s3) {
      return (0 === r3 && -1 !== ae.indexOf(s3[n2.length])) || s3.match(o2) ? e3 : '.' + t2;
    };
  function m2(e3, s3, i3, a3) {
    void 0 === a3 && (a3 = '&');
    var c3 = e3.replace(ie, ''),
      u3 = s3 && i3 ? i3 + ' ' + s3 + ' { ' + c3 + ' }' : c3;
    return (
      (t2 = a3),
      (n2 = s3),
      (r2 = new RegExp('\\' + n2 + '\\b', 'g')),
      (o2 = new RegExp('(\\' + n2 + '\\b){2,}')),
      l2(i3 || !s3 ? '' : s3, u3)
    );
  }
  return (
    l2.use(
      [].concat(u2, [
        function (e3, t3, o3) {
          2 === e3 && o3.length && o3[0].lastIndexOf(n2) > 0 && (o3[0] = o3[0].replace(r2, f2));
        },
        h2,
        function (e3) {
          if (-2 === e3) {
            var t3 = d2;
            return (d2 = []), t3;
          }
        },
      ]),
    ),
    (m2.hash = u2.length
      ? u2
          .reduce(function (e3, t3) {
            return t3.name || j(15), te(e3, t3.name);
          }, 5381)
          .toString()
      : ''),
    m2
  );
}
var ue = React.createContext(),
  le = ue.Consumer,
  de = React.createContext(),
  he = (de.Consumer, new Z()),
  pe = ce();
function fe() {
  return reactExports.useContext(ue) || he;
}
function me() {
  return reactExports.useContext(de) || pe;
}
function ye(e2) {
  var t2 = reactExports.useState(e2.stylisPlugins),
    n2 = t2[0],
    s2 = t2[1],
    c2 = fe(),
    u2 = reactExports.useMemo(
      function () {
        var t3 = c2;
        return (
          e2.sheet
            ? (t3 = e2.sheet)
            : e2.target && (t3 = t3.reconstructWithOptions({ target: e2.target }, false)),
          e2.disableCSSOMInjection && (t3 = t3.reconstructWithOptions({ useCSSOMInjection: false })),
          t3
        );
      },
      [e2.disableCSSOMInjection, e2.sheet, e2.target],
    ),
    l2 = reactExports.useMemo(
      function () {
        return ce({ options: { prefix: !e2.disableVendorPrefixes }, plugins: n2 });
      },
      [e2.disableVendorPrefixes, n2],
    );
  return (
    reactExports.useEffect(
      function () {
        h$1(n2, e2.stylisPlugins) || s2(e2.stylisPlugins);
      },
      [e2.stylisPlugins],
    ),
    React.createElement(
      ue.Provider,
      { value: u2 },
      React.createElement(
        de.Provider,
        { value: l2 },
        'production' !== 'production' ? React.Children.only(e2.children) : e2.children,
      ),
    )
  );
}
var ve = (function () {
    function e2(e3, t2) {
      var n2 = this;
      (this.inject = function (e4, t3) {
        void 0 === t3 && (t3 = pe);
        var r2 = n2.name + t3.hash;
        e4.hasNameForId(n2.id, r2) || e4.insertRules(n2.id, r2, t3(n2.rules, r2, '@keyframes'));
      }),
        (this.toString = function () {
          return j(12, String(n2.name));
        }),
        (this.name = e3),
        (this.id = 'sc-keyframes-' + e3),
        (this.rules = t2);
    }
    return (
      (e2.prototype.getName = function (e3) {
        return void 0 === e3 && (e3 = pe), this.name + e3.hash;
      }),
      e2
    );
  })(),
  ge = /([A-Z])/,
  Se = /([A-Z])/g,
  we = /^ms-/,
  Ee = function (e2) {
    return '-' + e2.toLowerCase();
  };
function be(e2) {
  return ge.test(e2) ? e2.replace(Se, Ee).replace(we, '-ms-') : e2;
}
var _e = function (e2) {
  return null == e2 || false === e2 || '' === e2;
};
function Ne(e2, n2, r2, o2) {
  if (Array.isArray(e2)) {
    for (var s2, i2 = [], a2 = 0, c2 = e2.length; a2 < c2; a2 += 1)
      '' !== (s2 = Ne(e2[a2], n2, r2, o2)) && (Array.isArray(s2) ? i2.push.apply(i2, s2) : i2.push(s2));
    return i2;
  }
  if (_e(e2)) return '';
  if (N$1(e2)) return '.' + e2.styledComponentId;
  if (b$1(e2)) {
    if ('function' != typeof (l2 = e2) || (l2.prototype && l2.prototype.isReactComponent) || !n2) return e2;
    var u2 = e2(n2);
    return (
      'production' !== 'production' &&
        reactIsExports$1.isElement(u2) &&
        console.warn(
          _(e2) +
            ' is not a styled component and cannot be referred to via component selector. See https://www.styled-components.com/docs/advanced#referring-to-other-components for more details.',
        ),
      Ne(u2, n2, r2, o2)
    );
  }
  var l2;
  return e2 instanceof ve
    ? r2
      ? (e2.inject(r2, o2), e2.getName(o2))
      : e2
    : S(e2)
    ? (function e3(t2, n3) {
        var r3,
          o3,
          s3 = [];
        for (var i3 in t2)
          t2.hasOwnProperty(i3) &&
            !_e(t2[i3]) &&
            ((Array.isArray(t2[i3]) && t2[i3].isCss) || b$1(t2[i3])
              ? s3.push(be(i3) + ':', t2[i3], ';')
              : S(t2[i3])
              ? s3.push.apply(s3, e3(t2[i3], i3))
              : s3.push(
                  be(i3) +
                    ': ' +
                    ((r3 = i3),
                    null == (o3 = t2[i3]) || 'boolean' == typeof o3 || '' === o3
                      ? ''
                      : 'number' != typeof o3 || 0 === o3 || r3 in unitlessKeys
                      ? String(o3).trim()
                      : o3 + 'px') +
                    ';',
                ));
        return n3 ? [n3 + ' {'].concat(s3, ['}']) : s3;
      })(e2)
    : e2.toString();
}
var Ae = function (e2) {
  return Array.isArray(e2) && (e2.isCss = true), e2;
};
function Ce(e2) {
  for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++)
    n2[r2 - 1] = arguments[r2];
  return b$1(e2) || S(e2)
    ? Ae(Ne(g(w, [e2].concat(n2))))
    : 0 === n2.length && 1 === e2.length && 'string' == typeof e2[0]
    ? e2
    : Ae(Ne(g(e2, n2)));
}
var Ie = /invalid hook call/i,
  Pe = /* @__PURE__ */ new Set(),
  Oe = function (e2, t2) {
    if ('production' !== 'production') {
      var n2 =
          'The component ' +
          e2 +
          (t2 ? ' with the id of "' + t2 + '"' : '') +
          " has been created dynamically.\nYou may see this warning because you've called styled inside another component.\nTo resolve this only create new StyledComponents outside of any render method and function component.",
        r2 = console.error;
      try {
        var o2 = true;
        (console.error = function (e3) {
          if (Ie.test(e3)) (o2 = false), Pe.delete(n2);
          else {
            for (var t3 = arguments.length, s2 = new Array(t3 > 1 ? t3 - 1 : 0), i2 = 1; i2 < t3; i2++)
              s2[i2 - 1] = arguments[i2];
            r2.apply(void 0, [e3].concat(s2));
          }
        }),
          reactExports.useRef(),
          o2 && !Pe.has(n2) && (console.warn(n2), Pe.add(n2));
      } catch (e3) {
        Ie.test(e3.message) && Pe.delete(n2);
      } finally {
        console.error = r2;
      }
    }
  },
  Re = function (e2, t2, n2) {
    return void 0 === n2 && (n2 = E$1), (e2.theme !== n2.theme && e2.theme) || t2 || n2.theme;
  },
  De = /[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,
  je = /(^-|-$)/g;
function Te(e2) {
  return e2.replace(De, '-').replace(je, '');
}
var xe = function (e2) {
  return ee(ne(e2) >>> 0);
};
function ke(e2) {
  return (
    'string' == typeof e2 && ('production' === 'production' || e2.charAt(0) === e2.charAt(0).toLowerCase())
  );
}
var Ve = function (e2) {
    return 'function' == typeof e2 || ('object' == typeof e2 && null !== e2 && !Array.isArray(e2));
  },
  Be = function (e2) {
    return '__proto__' !== e2 && 'constructor' !== e2 && 'prototype' !== e2;
  };
function ze(e2, t2, n2) {
  var r2 = e2[n2];
  Ve(t2) && Ve(r2) ? Me(r2, t2) : (e2[n2] = t2);
}
function Me(e2) {
  for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++)
    n2[r2 - 1] = arguments[r2];
  for (var o2 = 0, s2 = n2; o2 < s2.length; o2++) {
    var i2 = s2[o2];
    if (Ve(i2)) for (var a2 in i2) Be(a2) && ze(e2, i2[a2], a2);
  }
  return e2;
}
var Ge = React.createContext(),
  Le = Ge.Consumer;
function Fe(e2) {
  var t2 = reactExports.useContext(Ge),
    n2 = reactExports.useMemo(
      function () {
        return (function (e3, t3) {
          if (!e3) return j(14);
          if (b$1(e3)) {
            var n3 = e3(t3);
            return 'production' === 'production' ||
              (null !== n3 && !Array.isArray(n3) && 'object' == typeof n3)
              ? n3
              : j(7);
          }
          return Array.isArray(e3) || 'object' != typeof e3 ? j(8) : t3 ? v$1({}, t3, {}, e3) : e3;
        })(e2.theme, t2);
      },
      [e2.theme, t2],
    );
  return e2.children ? React.createElement(Ge.Provider, { value: n2 }, e2.children) : null;
}
var Ye = {};
function qe(e2, t2, n2) {
  var o2 = N$1(e2),
    i2 = !ke(e2),
    a2 = t2.attrs,
    c2 = void 0 === a2 ? w : a2,
    d2 = t2.componentId,
    h2 =
      void 0 === d2
        ? (function (e3, t3) {
            var n3 = 'string' != typeof e3 ? 'sc' : Te(e3);
            Ye[n3] = (Ye[n3] || 0) + 1;
            var r2 = n3 + '-' + xe('5.3.6' + n3 + Ye[n3]);
            return t3 ? t3 + '-' + r2 : r2;
          })(t2.displayName, t2.parentComponentId)
        : d2,
    p2 = t2.displayName,
    f2 =
      void 0 === p2
        ? (function (e3) {
            return ke(e3) ? 'styled.' + e3 : 'Styled(' + _(e3) + ')';
          })(e2)
        : p2,
    g2 = t2.displayName && t2.componentId ? Te(t2.displayName) + '-' + t2.componentId : t2.componentId || h2,
    S2 = o2 && e2.attrs ? Array.prototype.concat(e2.attrs, c2).filter(Boolean) : c2,
    A2 = t2.shouldForwardProp;
  o2 &&
    e2.shouldForwardProp &&
    (A2 = t2.shouldForwardProp
      ? function (n3, r2, o3) {
          return e2.shouldForwardProp(n3, r2, o3) && t2.shouldForwardProp(n3, r2, o3);
        }
      : e2.shouldForwardProp);
  var C2,
    I2 = new se(n2, g2, o2 ? e2.componentStyle : void 0),
    P2 = I2.isStatic && 0 === c2.length,
    O2 = function (e3, t3) {
      return (function (e4, t4, n3, r2) {
        var o3 = e4.attrs,
          i3 = e4.componentStyle,
          a3 = e4.defaultProps,
          c3 = e4.foldedComponentIds,
          d3 = e4.shouldForwardProp,
          h3 = e4.styledComponentId,
          p3 = e4.target;
        'production' !== 'production' && reactExports.useDebugValue(h3);
        var f3 = (function (e5, t5, n4) {
            void 0 === e5 && (e5 = E$1);
            var r3 = v$1({}, t5, { theme: e5 }),
              o4 = {};
            return (
              n4.forEach(function (e6) {
                var t6,
                  n5,
                  s2,
                  i4 = e6;
                for (t6 in (b$1(i4) && (i4 = i4(r3)), i4))
                  r3[t6] = o4[t6] =
                    'className' === t6
                      ? ((n5 = o4[t6]), (s2 = i4[t6]), n5 && s2 ? n5 + ' ' + s2 : n5 || s2)
                      : i4[t6];
              }),
              [r3, o4]
            );
          })(Re(t4, reactExports.useContext(Ge), a3) || E$1, t4, o3),
          y2 = f3[0],
          g3 = f3[1],
          S3 = (function (e5, t5, n4, r3) {
            var o4 = fe(),
              s2 = me(),
              i4 = t5 ? e5.generateAndInjectStyles(E$1, o4, s2) : e5.generateAndInjectStyles(n4, o4, s2);
            return (
              'production' !== 'production' && reactExports.useDebugValue(i4),
              'production' !== 'production' && !t5 && r3 && r3(i4),
              i4
            );
          })(i3, r2, y2, 'production' !== 'production' ? e4.warnTooManyClasses : void 0),
          w2 = n3,
          _2 = g3.$as || t4.$as || g3.as || t4.as || p3,
          N2 = ke(_2),
          A3 = g3 !== t4 ? v$1({}, t4, {}, g3) : t4,
          C3 = {};
        for (var I3 in A3)
          '$' !== I3[0] &&
            'as' !== I3 &&
            ('forwardedAs' === I3
              ? (C3.as = A3[I3])
              : (d3 ? d3(I3, isPropValid, _2) : !N2 || isPropValid(I3)) && (C3[I3] = A3[I3]));
        return (
          t4.style && g3.style !== t4.style && (C3.style = v$1({}, t4.style, {}, g3.style)),
          (C3.className = Array.prototype
            .concat(c3, h3, S3 !== h3 ? S3 : null, t4.className, g3.className)
            .filter(Boolean)
            .join(' ')),
          (C3.ref = w2),
          reactExports.createElement(_2, C3)
        );
      })(C2, e3, t3, P2);
    };
  return (
    (O2.displayName = f2),
    ((C2 = React.forwardRef(O2)).attrs = S2),
    (C2.componentStyle = I2),
    (C2.displayName = f2),
    (C2.shouldForwardProp = A2),
    (C2.foldedComponentIds = o2 ? Array.prototype.concat(e2.foldedComponentIds, e2.styledComponentId) : w),
    (C2.styledComponentId = g2),
    (C2.target = o2 ? e2.target : e2),
    (C2.withComponent = function (e3) {
      var r2 = t2.componentId,
        o3 = (function (e4, t3) {
          if (null == e4) return {};
          var n3,
            r3,
            o4 = {},
            s3 = Object.keys(e4);
          for (r3 = 0; r3 < s3.length; r3++) (n3 = s3[r3]), t3.indexOf(n3) >= 0 || (o4[n3] = e4[n3]);
          return o4;
        })(t2, ['componentId']),
        s2 = r2 && r2 + '-' + (ke(e3) ? e3 : Te(_(e3)));
      return qe(e3, v$1({}, o3, { attrs: S2, componentId: s2 }), n2);
    }),
    Object.defineProperty(C2, 'defaultProps', {
      get: function () {
        return this._foldedDefaultProps;
      },
      set: function (t3) {
        this._foldedDefaultProps = o2 ? Me({}, e2.defaultProps, t3) : t3;
      },
    }),
    'production' !== 'production' &&
      (Oe(f2, g2),
      (C2.warnTooManyClasses = (function (e3, t3) {
        var n3 = {},
          r2 = false;
        return function (o3) {
          if (!r2 && ((n3[o3] = true), Object.keys(n3).length >= 200)) {
            var s2 = t3 ? ' with the id of "' + t3 + '"' : '';
            console.warn(
              'Over 200 classes were generated for component ' +
                e3 +
                s2 +
                '.\nConsider using the attrs method, together with a style object for frequently changed styles.\nExample:\n  const Component = styled.div.attrs(props => ({\n    style: {\n      background: props.background,\n    },\n  }))`width: 100%;`\n\n  <Component />',
            ),
              (r2 = true),
              (n3 = {});
          }
        };
      })(f2, g2))),
    (C2.toString = function () {
      return '.' + C2.styledComponentId;
    }),
    i2 &&
      y$1(C2, e2, {
        attrs: true,
        componentStyle: true,
        displayName: true,
        foldedComponentIds: true,
        shouldForwardProp: true,
        styledComponentId: true,
        target: true,
        withComponent: true,
      }),
    C2
  );
}
var He = function (e2) {
  return (function e3(t2, r2, o2) {
    if ((void 0 === o2 && (o2 = E$1), !reactIsExports$1.isValidElementType(r2))) return j(1, String(r2));
    var s2 = function () {
      return t2(r2, o2, Ce.apply(void 0, arguments));
    };
    return (
      (s2.withConfig = function (n2) {
        return e3(t2, r2, v$1({}, o2, {}, n2));
      }),
      (s2.attrs = function (n2) {
        return e3(t2, r2, v$1({}, o2, { attrs: Array.prototype.concat(o2.attrs, n2).filter(Boolean) }));
      }),
      s2
    );
  })(qe, e2);
};
[
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'big',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'marquee',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
  'circle',
  'clipPath',
  'defs',
  'ellipse',
  'foreignObject',
  'g',
  'image',
  'line',
  'linearGradient',
  'marker',
  'mask',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'stop',
  'svg',
  'text',
  'textPath',
  'tspan',
].forEach(function (e2) {
  He[e2] = He(e2);
});
var $e = (function () {
  function e2(e3, t3) {
    (this.rules = e3), (this.componentId = t3), (this.isStatic = re(e3)), Z.registerId(this.componentId + 1);
  }
  var t2 = e2.prototype;
  return (
    (t2.createStyles = function (e3, t3, n2, r2) {
      var o2 = r2(Ne(this.rules, t3, n2, r2).join(''), ''),
        s2 = this.componentId + e3;
      n2.insertRules(s2, s2, o2);
    }),
    (t2.removeStyles = function (e3, t3) {
      t3.clearRules(this.componentId + e3);
    }),
    (t2.renderStyles = function (e3, t3, n2, r2) {
      e3 > 2 && Z.registerId(this.componentId + e3),
        this.removeStyles(e3, n2),
        this.createStyles(e3, t3, n2, r2);
    }),
    e2
  );
})();
function We(e2) {
  for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), o2 = 1; o2 < t2; o2++)
    n2[o2 - 1] = arguments[o2];
  var i2 = Ce.apply(void 0, [e2].concat(n2)),
    a2 = 'sc-global-' + xe(JSON.stringify(i2)),
    u2 = new $e(i2, a2);
  function l2(e3) {
    var t3 = fe(),
      n3 = me(),
      o3 = reactExports.useContext(Ge),
      l3 = reactExports.useRef(t3.allocateGSInstance(a2)).current;
    return (
      'production' !== 'production' &&
        React.Children.count(e3.children) &&
        console.warn(
          'The global style component ' +
            a2 +
            ' was given child JSX. createGlobalStyle does not render children.',
        ),
      'production' !== 'production' &&
        i2.some(function (e4) {
          return 'string' == typeof e4 && -1 !== e4.indexOf('@import');
        }) &&
        console.warn(
          'Please do not use @import CSS syntax in createGlobalStyle at this time, as the CSSOM APIs we use in production do not handle it well. Instead, we recommend using a library such as react-helmet to inject a typical <link> meta tag to the stylesheet, or simply embedding it manually in your index.html <head> section for a simpler app.',
        ),
      t3.server && h2(l3, e3, t3, o3, n3),
      reactExports.useLayoutEffect(
        function () {
          if (!t3.server)
            return (
              h2(l3, e3, t3, o3, n3),
              function () {
                return u2.removeStyles(l3, t3);
              }
            );
        },
        [l3, e3, t3, o3, n3],
      ),
      null
    );
  }
  function h2(e3, t3, n3, r2, o3) {
    if (u2.isStatic) u2.renderStyles(e3, O, n3, o3);
    else {
      var s2 = v$1({}, t3, { theme: Re(t3, r2, l2.defaultProps) });
      u2.renderStyles(e3, s2, n3, o3);
    }
  }
  return 'production' !== 'production' && Oe(a2), React.memo(l2);
}
function Ue(e2) {
  'production' !== 'production' &&
    'undefined' != typeof navigator &&
    'ReactNative' === navigator.product &&
    console.warn(
      '`keyframes` cannot be used on ReactNative, only on the web. To do animation in ReactNative please use Animated.',
    );
  for (var t2 = arguments.length, n2 = new Array(t2 > 1 ? t2 - 1 : 0), r2 = 1; r2 < t2; r2++)
    n2[r2 - 1] = arguments[r2];
  var o2 = Ce.apply(void 0, [e2].concat(n2)).join(''),
    s2 = xe(o2);
  return new ve(s2, o2);
}
var Je = (function () {
    function e2() {
      var e3 = this;
      (this._emitSheetCSS = function () {
        var t3 = e3.instance.toString();
        if (!t3) return '';
        var n2 = q();
        return (
          '<style ' +
          [n2 && 'nonce="' + n2 + '"', A + '="true"', 'data-styled-version="5.3.6"']
            .filter(Boolean)
            .join(' ') +
          '>' +
          t3 +
          '</style>'
        );
      }),
        (this.getStyleTags = function () {
          return e3.sealed ? j(2) : e3._emitSheetCSS();
        }),
        (this.getStyleElement = function () {
          var t3;
          if (e3.sealed) return j(2);
          var n2 =
              (((t3 = {})[A] = ''),
              (t3['data-styled-version'] = '5.3.6'),
              (t3.dangerouslySetInnerHTML = { __html: e3.instance.toString() }),
              t3),
            o2 = q();
          return o2 && (n2.nonce = o2), [React.createElement('style', v$1({}, n2, { key: 'sc-0-0' }))];
        }),
        (this.seal = function () {
          e3.sealed = true;
        }),
        (this.instance = new Z({ isServer: true })),
        (this.sealed = false);
    }
    var t2 = e2.prototype;
    return (
      (t2.collectStyles = function (e3) {
        return this.sealed ? j(2) : React.createElement(ye, { sheet: this.instance }, e3);
      }),
      (t2.interleaveWithNodeStream = function (e3) {
        return j(3);
      }),
      e2
    );
  })(),
  Xe = function (e2) {
    var t2 = React.forwardRef(function (t3, n2) {
      var o2 = reactExports.useContext(Ge),
        i2 = e2.defaultProps,
        a2 = Re(t3, o2, i2);
      return (
        'production' !== 'production' &&
          void 0 === a2 &&
          console.warn(
            '[withTheme] You are not using a ThemeProvider nor passing a theme prop or a theme in defaultProps in component class "' +
              _(e2) +
              '"',
          ),
        React.createElement(e2, v$1({}, t3, { theme: a2, ref: n2 }))
      );
    });
    return y$1(t2, e2), (t2.displayName = 'WithTheme(' + _(e2) + ')'), t2;
  },
  Ze = function () {
    return reactExports.useContext(Ge);
  },
  Ke = { StyleSheet: Z, masterSheet: he };
'production' !== 'production' &&
  'undefined' != typeof navigator &&
  'ReactNative' === navigator.product &&
  console.warn(
    "It looks like you've imported 'styled-components' on React Native.\nPerhaps you're looking to import 'styled-components/native'?\nRead more about this at https://www.styled-components.com/docs/basics#react-native",
  ),
  'production' !== 'production' &&
    'test' !== 'production' &&
    'undefined' != typeof window &&
    ((window['__styled-components-init__'] = window['__styled-components-init__'] || 0),
    1 === window['__styled-components-init__'] &&
      console.warn(
        "It looks like there are several instances of 'styled-components' initialized in this application. This may cause dynamic styles to not render properly, errors during the rehydration process, a missing theme prop, and makes your application bigger without good reason.\n\nSee https://s-c.sh/2BAXzed for more info.",
      ),
    (window['__styled-components-init__'] += 1));

var Backdrop = He.div.withConfig({ displayName: 'backdrop__Backdrop', componentId: 'sc-1q73cmu-0' })([
  'top:0;right:0;bottom:0;left:0;position:fixed;z-index:99999;',
]);

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
var r$1 = {
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
      'grey-60': { color: '#333333', contrastText: '#EDEDED' },
      'grey-50': { color: '#424242', contrastText: '#EDEDED' },
      'grey-40': { color: '#5E5E5E', contrastText: '#EDEDED' },
      'grey-20': { color: '#A1A1A1', contrastText: '#171717' },
      'grey-10': { color: '#C4C4C4', contrastText: '#171717' },
    },
    'internal-colors': { 'focus-outline': { color: '#0064fa' } },
  },
  d = {
    text: {
      'text-1': {
        hex: r$1['primary-colors'].white.color,
        contrast: r$1['primary-colors'].white.contrastText,
      },
      'text-2': {
        hex: r$1['grey-colors']['grey-10'].color,
        contrast: r$1['grey-colors']['grey-10'].contrastText,
      },
      'text-3': {
        hex: r$1['primary-colors'].white.color,
        contrast: r$1['primary-colors'].white.contrastText,
      },
      'text-4': {
        hex: r$1['primary-colors'].black.color,
        contrast: r$1['primary-colors'].black.contrastText,
      },
      'text-disabled-1': {
        hex: r$1['grey-colors']['grey-40'].color,
        contrast: r$1['grey-colors']['grey-40'].contrastText,
      },
      'text-disabled-2': {
        hex: r$1['grey-colors']['grey-60'].color,
        contrast: r$1['grey-colors']['grey-60'].contrastText,
      },
      'text-placeholder-1': {
        hex: r$1['grey-colors']['grey-20'].color,
        contrast: r$1['grey-colors']['grey-20'].contrastText,
      },
    },
    background: {
      'background-1': {
        hex: r$1['primary-colors'].grey.color,
        contrast: r$1['primary-colors'].grey.contrastText,
      },
      'background-2': {
        hex: r$1['primary-colors'].grey.color,
        contrast: r$1['primary-colors'].grey.contrastText,
      },
      'background-3': {
        hex: r$1['grey-colors']['grey-70'].color,
        contrast: r$1['grey-colors']['grey-70'].contrastText,
      },
      'background-element-1': { hex: 'transparent' },
      'background-element-2': {
        hex: r$1['grey-colors']['grey-70'].color,
        contrast: r$1['grey-colors']['grey-70'].contrastText,
      },
      'background-element-3': {
        hex: r$1['grey-colors']['grey-60'].color,
        contrast: r$1['grey-colors']['grey-60'].contrastText,
      },
      'background-element-4': {
        hex: r$1['grey-colors']['grey-70'].color,
        contrast: r$1['grey-colors']['grey-70'].contrastText,
      },
      'background-element-5': {
        hex: r$1['primary-colors'].white.color,
        contrast: r$1['primary-colors'].white.contrastText,
      },
      'background-element-6': {
        hex: r$1['primary-colors'].black.color,
        contrast: r$1['primary-colors'].black.contrastText,
      },
      'background-overlay-1': {
        hex: r$1['grey-colors']['grey-70'].color,
        contrast: r$1['grey-colors']['grey-70'].contrastText,
      },
      'background-overlay-2': {
        hex: r$1['grey-colors']['grey-60'].color,
        contrast: r$1['grey-colors']['grey-60'].contrastText,
      },
      'background-overlay-3': {
        hex: r$1['primary-colors'].black.color,
        contrast: r$1['primary-colors'].black.contrastText,
      },
      'background-disabled-1': {
        hex: r$1['grey-colors']['grey-60'].color,
        contrast: r$1['grey-colors']['grey-60'].contrastText,
      },
      'background-disabled-2': {
        hex: r$1['grey-colors']['grey-40'].color,
        contrast: r$1['grey-colors']['grey-40'].contrastText,
      },
      'background-hover-1': {
        hex: r$1['primary-colors'].green.color,
        contrast: r$1['primary-colors'].green.contrastText,
      },
      'background-hover-2': {
        hex: r$1['grey-colors']['grey-60'].color,
        contrast: r$1['grey-colors']['grey-60'].contrastText,
      },
      'background-selected-1': {
        hex: r$1['primary-colors'].green.color,
        contrast: r$1['primary-colors'].green.contrastText,
      },
      'background-selected-2': {
        hex: r$1['grey-colors']['grey-50'].color,
        contrast: r$1['grey-colors']['grey-50'].contrastText,
      },
    },
    border: {
      'border-1': {
        hex: r$1['primary-colors'].white.color,
        contrast: r$1['primary-colors'].white.contrastText,
      },
      'border-2': {
        hex: r$1['grey-colors']['grey-50'].color,
        contrast: r$1['grey-colors']['grey-50'].contrastText,
      },
      'border-3': {
        hex: r$1['grey-colors']['grey-50'].color,
        contrast: r$1['grey-colors']['grey-50'].contrastText,
      },
      'border-4': {
        hex: r$1['grey-colors']['grey-60'].color,
        contrast: r$1['grey-colors']['grey-60'].contrastText,
      },
      'border-5': { hex: 'transparent' },
      'border-6': {
        hex: r$1['grey-colors']['grey-20'].color,
        contrast: r$1['grey-colors']['grey-20'].contrastText,
      },
      'border-disabled-1': {
        hex: r$1['grey-colors']['grey-40'].color,
        contrast: r$1['grey-colors']['grey-40'].contrastText,
      },
      'border-hover-1': {
        hex: r$1['primary-colors'].green.color,
        contrast: r$1['primary-colors'].green.contrastText,
      },
      'border-selected-1': {
        hex: r$1['primary-colors'].green.color,
        contrast: r$1['primary-colors'].green.contrastText,
      },
      'border-selected-2': {
        hex: r$1['primary-colors'].white.color,
        contrast: r$1['primary-colors'].white.contrastText,
      },
    },
    signal: {
      'signal-positive': {
        hex: r$1['primary-colors'].green.color,
        contrast: r$1['primary-colors'].green.contrastText,
      },
      'signal-caution': {
        hex: r$1['signal-colors'].yellow.color,
        contrast: r$1['signal-colors'].yellow.contrastText,
      },
      'signal-warning': {
        hex: r$1['signal-colors'].orange.color,
        contrast: r$1['signal-colors'].orange.contrastText,
      },
      'signal-danger': {
        hex: r$1['signal-colors'].red.color,
        contrast: r$1['signal-colors'].red.contrastText,
      },
      'signal-info': {
        hex: r$1['primary-colors'].white.color,
        contrast: r$1['primary-colors'].white.contrastText,
      },
    },
    data: {
      'data-1': {
        hex: r$1['data-colors']['green-apple'].color,
        contrast: r$1['data-colors']['green-apple'].contrastText,
      },
      'data-2': {
        hex: r$1['data-colors']['violet-grape'].color,
        contrast: r$1['data-colors']['violet-grape'].contrastText,
      },
      'data-3': {
        hex: r$1['data-colors']['blue-berry'].color,
        contrast: r$1['data-colors']['blue-berry'].contrastText,
      },
      'data-4': {
        hex: r$1['data-colors']['purple-plum'].color,
        contrast: r$1['data-colors']['purple-plum'].contrastText,
      },
      'data-5': {
        hex: r$1['data-colors']['orange-mango'].color,
        contrast: r$1['data-colors']['orange-mango'].contrastText,
      },
      'data-6': {
        hex: r$1['data-colors']['red-tomato'].color,
        contrast: r$1['data-colors']['red-tomato'].contrastText,
      },
    },
    icon: {
      'icon-stroke-1': {
        hex: r$1['primary-colors'].white.color,
        contrast: r$1['primary-colors'].white.contrastText,
      },
      'icon-filled-foreground-1': {
        hex: r$1['primary-colors'].black.color,
        contrast: r$1['primary-colors'].black.contrastText,
      },
      'icon-filled-background-1': {
        hex: r$1['primary-colors'].white.color,
        contrast: r$1['primary-colors'].white.contrastText,
      },
      'icon-positive': {
        hex: r$1['primary-colors'].green.color,
        contrast: r$1['primary-colors'].green.contrastText,
      },
      'icon-caution': {
        hex: r$1['signal-colors'].yellow.color,
        contrast: r$1['signal-colors'].yellow.contrastText,
      },
      'icon-warning': {
        hex: r$1['signal-colors'].orange.color,
        contrast: r$1['signal-colors'].orange.contrastText,
      },
      'icon-danger': { hex: r$1['signal-colors'].red.color, contrast: r$1['signal-colors'].red.contrastText },
      'icon-info': {
        hex: r$1['primary-colors'].white.color,
        contrast: r$1['primary-colors'].white.contrastText,
      },
    },
    assorted: {
      'static-white': {
        hex: r$1['primary-colors'].white.color,
        contrast: r$1['primary-colors'].white.contrastText,
      },
      'static-black': {
        hex: r$1['primary-colors'].black.color,
        contrast: r$1['primary-colors'].black.contrastText,
      },
      'brand-accent': {
        hex: r$1['primary-colors'].green.color,
        contrast: r$1['primary-colors'].green.contrastText,
      },
      'focus-outline': { hex: r$1['internal-colors']['focus-outline'].color },
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
        return r$1;
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
  N = (e) => `var(--e-shadow-${e}, ${b[e].boxShadow})`;

var getTypography = function (a) {
    return 'small' === a || 'sm' === a
      ? Ce([
          "font-family:'Red Hat Display',Verdana,sans-serif;font-style:normal;font-weight:500;font-size:14px;line-height:115%;",
        ])
      : 'medium' === a || 'md' === a
      ? Ce([
          "font-family:'Red Hat Display',Verdana,sans-serif;font-style:normal;font-weight:500;font-size:16px;line-height:125%;",
        ])
      : Ce([
          "font-family:'Red Hat Display',Verdana,sans-serif;font-style:normal;font-weight:500;font-size:18px;line-height:24px;",
        ]);
  },
  ButtonBase = He.button
    .attrs({ type: 'button' })
    .withConfig({ displayName: 'button__ButtonBase', componentId: 'sc-1tqgdb-0' })(
    [
      '',
      ';font-weight:500;display:flex;align-items:center;justify-content:center;gap:8px;margin:0;white-space:nowrap;&:disabled{cursor:default;}&:not(:disabled){cursor:pointer;&::selection{background-color:',
      ';}}',
    ],
    function (a) {
      var b = a.size;
      return getTypography(null !== b && void 0 !== b ? b : 'md');
    },
    E('background-selected-1'),
  ),
  getButtonHeight = function (a) {
    return 'large' === a || 'lg' === a ? '48px' : 'medium' === a || 'md' === a ? '40px' : '32px';
  },
  getButtonPadding = function (a) {
    return 'large' === a || 'lg' === a
      ? '0 calc(32px - 1px)'
      : 'medium' === a || 'md' === a
      ? '0 calc(24px - 1px)'
      : '0 calc(16px - 1px)';
  };
var PrimaryButton = He(ButtonBase).withConfig({
  displayName: 'button__PrimaryButton',
  componentId: 'sc-1tqgdb-1',
})(
  [
    'height:',
    ';border:1px solid ',
    ';padding:',
    ';background-color:',
    ';color:',
    ';transition:transform 100ms;border-radius:99px;&:not(:disabled){&:hover{background-color:',
    ';border-color:',
    ';color:',
    ';}&:active{border-color:transparent;background-clip:padding-box;}}&:disabled{border-color:transparent;background-color:',
    ';cursor:not-allowed;color:',
    ';}',
  ],
  function (a) {
    var b = a.size;
    return getButtonHeight(null !== b && void 0 !== b ? b : 'md');
  },
  function (a) {
    var b = a.isActive;
    return b ? E('border-selected-1') : E('text-1');
  },
  function (a) {
    var b = a.size;
    return getButtonPadding(null !== b && void 0 !== b ? b : 'md');
  },
  function (a) {
    var b = a.isActive;
    return b ? E('background-selected-1') : E('text-1');
  },
  function (a) {
    var b = a.isActive;
    return b ? E('text-1') : D('text-1');
  },
  E('background-hover-1'),
  E('border-hover-1'),
  D('background-hover-1'),
  E('background-disabled-2'),
  E('text-disabled-2'),
);
var SecondaryButton = He(PrimaryButton).withConfig({
  displayName: 'button__SecondaryButton',
  componentId: 'sc-1tqgdb-2',
})(
  ['background-color:', ';color:', ';&:disabled{background-color:transparent;border-color:', ';color:', ';}'],
  function (a) {
    var b = a.isActive;
    return b ? E('background-selected-1') : 'transparent';
  },
  E('text-1'),
  E('border-disabled-1'),
  E('text-disabled-1'),
);
var TertiaryButton = He(ButtonBase).withConfig({
  displayName: 'button__TertiaryButton',
  componentId: 'sc-1tqgdb-3',
})(
  [
    'border:none;background:transparent;position:relative;padding:0;height:',
    ';color:',
    ";&:after{content:'';display:block;position:absolute;bottom:0;left:0;right:0;height:2px;background-color:",
    ';transform:scaleY(1);transform-origin:center bottom;transition:background-color 60ms,transform 100ms;}&:not(:disabled){&:hover:after{background-color:',
    ';}&:active:after{transform:scaleY(0.5);}}&:disabled{color:',
    ';}',
  ],
  function (a) {
    var b = a.size;
    return 'sm' === b || 'small' === b ? '1.5rem' : '2rem';
  },
  E('text-1'),
  function (a) {
    var b = a.isActive;
    return b ? E('background-selected-1') : 'transparent';
  },
  E('background-hover-1'),
  E('background-disabled-1'),
);

var VisuallyHidden = He.div.withConfig({
  displayName: 'visuallyHidden__VisuallyHidden',
  componentId: 'sc-xjmmkg-0',
})([
  'position:absolute !important;overflow:hidden !important;width:1px !important;height:1px !important;padding:0 !important;border:0 !important;margin:-1px !important;clip:rect(1px,1px,1px,1px) !important;clip-path:inset(50%) !important;white-space:nowrap !important;',
]);

var getSize = function (a) {
  return 'small' === a || 'sm' === a
    ? Ce(['width:32px;height:32px;'])
    : 'medium' === a || 'md' === a
    ? Ce(['width:40px;height:40px;'])
    : Ce(['width:48px;height:48px;']);
};
var IconButton = He.button
  .attrs({ type: 'button' })
  .withConfig({ displayName: 'iconButton__IconButton', componentId: 'sc-19waflf-0' })(
  [
    'flex:none;display:grid;place-items:center;',
    ';border:1px solid transparent;background-color:',
    ';border-radius:99px;padding:0;margin:0;',
    ' &:disabled{cursor:not-allowed;}&:not(:disabled){cursor:pointer;&:hover{background-color:',
    ';border-color:',
    ';--e-color-icon-stroke-1:',
    ';--e-color-icon-filled-background-1:',
    ';}&:active{border-color:transparent;background-clip:padding-box;--e-color-icon-stroke-1:',
    ';--e-color-icon-filled-background-1:',
    ';}}',
  ],
  function (a) {
    var b = a.size;
    return getSize(null !== b && void 0 !== b ? b : 'md');
  },
  function (a) {
    var b = a.isActive;
    return b ? E('background-selected-1') : 'transparent';
  },
  function (a) {
    var b = a.isActive;
    return (
      b &&
      Ce(
        ['--e-color-icon-stroke-1:', ';--e-color-icon-filled-background-1:', ';'],
        D('background-hover-1'),
        D('background-hover-1'),
      )
    );
  },
  E('background-hover-1'),
  E('border-hover-1'),
  D('background-hover-1'),
  D('background-hover-1'),
  D('background-hover-1'),
  D('background-hover-1'),
);

var a = {
    'title-lg': {
      altLabels: ['title-large'],
      fontFamily: '"Red Hat Display", Verdana, sans-serif',
      fontSize: '44px',
      fontSizeMobile: '32px',
      fontWeight: '900',
      lineHeight: '53px',
      lineHeightMobile: '34px',
      letterSpacing: 'unset',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'inherit',
    },
    'title-md': {
      altLabels: ['title-medium'],
      fontFamily: '"Red Hat Display", Verdana, sans-serif',
      fontSize: '30px',
      fontSizeMobile: '24px',
      fontWeight: '700',
      lineHeight: '36px',
      lineHeightMobile: '29px',
      letterSpacing: 'unset',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'inherit',
    },
    'title-sm': {
      altLabels: ['title-small'],
      fontFamily: '"Red Hat Display", Verdana, sans-serif',
      fontSize: '24px',
      fontSizeMobile: '20px',
      fontWeight: '700',
      lineHeight: '29px',
      lineHeightMobile: '24px',
      letterSpacing: 'unset',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'inherit',
    },
    'title-xs': {
      altLabels: ['title-xsmall'],
      fontFamily: '"Red Hat Display", Verdana, sans-serif',
      fontSize: '18px',
      fontSizeMobile: '16px',
      fontWeight: '700',
      lineHeight: '22px',
      letterSpacing: 'unset',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'inherit',
    },
    'title-caps': {
      altLabels: ['text-caps'],
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '17px',
      letterSpacing: '0.8px',
      fontStyle: 'unset',
      textTransform: 'uppercase',
      color: 'inherit',
    },
    'text-lead': {
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '24px',
      fontSizeMobile: '22px',
      fontWeight: '400',
      lineHeight: '39px',
      lineHeightMobile: '36px',
      letterSpacing: 'unset',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'inherit',
    },
    'text-lg': {
      altLabels: ['text-large', 'text-body'],
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '20px',
      fontSizeMobile: '18px',
      fontWeight: '400',
      lineHeight: '32px',
      lineHeightMobile: '29px',
      letterSpacing: 'unset',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'inherit',
    },
    'text-lg-strong': {
      altLabels: ['text-large-strong'],
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '20px',
      fontSizeMobile: '18px',
      fontWeight: '500',
      lineHeight: '32px',
      lineHeightMobile: '29px',
      letterSpacing: 'unset',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'inherit',
    },
    'text-lg-light': {
      altLabels: ['text-large-light'],
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '20px',
      fontSizeMobile: '18px',
      fontWeight: '400',
      lineHeight: '32px',
      lineHeightMobile: '29px',
      letterSpacing: 'unset',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'var(--e-color-text-2)',
    },
    'text-md': {
      altLabels: ['text-medium', 'text-description'],
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '28px',
      lineHeightMobile: '160%',
      letterSpacing: 'unset',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'inherit',
    },
    'text-md-strong': {
      altLabels: ['text-medium-strong'],
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '28px',
      letterSpacing: 'unset',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'inherit',
    },
    'text-md-light': {
      altLabels: ['text-medium-light'],
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '28px',
      letterSpacing: 'unset',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'var(--e-color-text-2)',
    },
    'text-sm': {
      altLabels: ['text-small', 'text-info'],
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '22px',
      letterSpacing: 'unset',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'inherit',
    },
    'text-sm-strong': {
      altLabels: ['text-small-strong'],
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '14px',
      fontWeight: '500',
      lineHeight: '22px',
      letterSpacing: 'unset',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'inherit',
    },
    'text-sm-light': {
      altLabels: ['text-small-light'],
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '22px',
      letterSpacing: 'unset',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'var(--e-color-text-2)',
    },
    'text-micro': {
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '11px',
      fontWeight: '400',
      lineHeight: '14px',
      letterSpacing: '0.2px',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'inherit',
    },
    'text-micro-strong': {
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '11px',
      fontWeight: '500',
      lineHeight: '14px',
      letterSpacing: '0.2px',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'inherit',
    },
    'text-micro-light': {
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '11px',
      fontWeight: '400',
      lineHeight: '14px',
      letterSpacing: '0.2px',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'var(--e-color-text-2)',
    },
    'text-quote': {
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '26px',
      fontSizeMobile: '20px',
      fontWeight: '400',
      lineHeight: '42px',
      lineHeightMobile: '32px',
      letterSpacing: 'unset',
      fontStyle: 'italic',
      textTransform: 'unset',
      color: 'inherit',
    },
    'text-img': {
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '18px',
      fontSizeMobile: '16px',
      fontWeight: '400',
      lineHeight: '29px',
      lineHeightMobile: '26px',
      letterSpacing: 'unset',
      fontStyle: 'italic',
      textTransform: 'unset',
      color: 'inherit',
      textAlign: 'center',
    },
    'text-label': {
      deprecated: '1.0.0',
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '16px',
      fontWeight: '500',
      lineHeight: '23px',
      letterSpacing: 'unset',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'inherit',
    },
    'text-option': {
      deprecated: '1.0.0',
      fontFamily: '"Red Hat Text", Verdana, sans-serif',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '22px',
      letterSpacing: 'unset',
      fontStyle: 'unset',
      textTransform: 'unset',
      color: 'inherit',
    },
  },
  f = a,
  s = (e) => (a[e] ? a[e] : (console.error(`Cannot get typography ${e} from elvis-typography.`), null)),
  r = (e) => e.replace(/([A-Z])/g, (n) => `-${n.toLowerCase()}`),
  x = (e) => {
    let n = s(e);
    if (!n) return console.error(`Cannot get typography ${e} from elvis-typography.`), '';
    let i = '';
    for (let t in n) {
      let l = n[t];
      !t.endsWith('Mobile') &&
        t !== 'altLabels' &&
        (i += `${r(t)}: ${l};
`);
    }
    let o = Object.fromEntries(Object.entries(n).filter(([t]) => t.endsWith('Mobile')));
    if (Object.keys(o).length > 0) {
      i += `@media (max-width: 767px) {
`;
      for (let t in o) {
        let l = o[t];
        i += `	${r(t.slice(0, -6))}: ${l};
`;
      }
      i += `}
`;
    }
    return i;
  };

var fadeIn = Ue(['from{opacity:0;transform:translateY(-10px);}to{opacity:1;transform:translateY(0);}']);
var FormFieldErrorContainer = He.div.withConfig({
  displayName: 'errorStyles__FormFieldErrorContainer',
  componentId: 'sc-1hdjx4l-0',
})(['position:absolute;bottom:0;display:flex;gap:8px;align-items:center;animation:', ' 200ms;'], fadeIn);
var FormFieldError = He.span.withConfig({
  displayName: 'errorStyles__FormFieldError',
  componentId: 'sc-1hdjx4l-1',
})(['', ' white-space:nowrap;'], x('text-sm'));

var setActiveBorder = function (a) {
  return Ce(
    ['border:2px solid ', ';padding:', ';'],
    E('border-selected-1'),
    'small' === a ? '0 3px 0 7px' : '0 7px 0 15px',
  );
};
var FormFieldInputContainer = He.div.withConfig({
  displayName: 'formFieldStyles__FormFieldInputContainer',
  componentId: 'sc-1655b3q-0',
})(
  [
    'display:inline-flex;align-items:center;gap:8px;padding:0 8px 0 16px;color:',
    ';border:1px solid ',
    ';background:',
    ';height:48px;border-radius:4px;cursor:text;transition:border-color 150ms;.e-table &&{border:1px solid ',
    ';background:transparent;}',
  ],
  E('text-1'),
  E('border-1'),
  E('background-element-1'),
  E('border-6'),
);
var FormFieldContainer = He.label.withConfig({
  displayName: 'formFieldStyles__FormFieldContainer',
  componentId: 'sc-1655b3q-1',
})(
  [
    'display:inline-block;position:relative;box-sizing:border-box;text-align:left;line-height:1;font-size:16px;',
    ' ',
    ' ',
    ' ',
    ';',
    ';',
    ' ',
    ':focus-within{',
    '}',
  ],
  function (a) {
    var b = a.hasErrorPlaceholder;
    return b && Ce(['padding-bottom:1.5rem;']);
  },
  function (a) {
    var b = a.isFullWidth;
    return b && Ce(['width:100%;', ',', '{width:100%;}'], FormFieldInput, FormFieldInputContainer);
  },
  function (a) {
    var b = a.size;
    return 'small' === b
      ? Ce(
          [
            '',
            '{',
            ' margin-bottom:4px;}',
            '{gap:4px;padding:0 4px 0 8px;height:32px;}',
            '{font-size:0.875rem;}',
            '{',
            '}',
            '{',
            ' color:',
            ';margin-right:4px;}',
          ],
          FormFieldLabel,
          x('text-sm-strong'),
          FormFieldInputContainer,
          FormFieldInput,
          FormFieldError,
          x('text-micro'),
          FormFieldInputSuffixText,
          x('text-sm-light'),
          E('color-text-2'),
        )
      : Ce(['padding-top:0;']);
  },
  function (a) {
    var b = a.isDisabled;
    return (
      b &&
      Ce(
        ['&& ', '{{cursor:not-allowed;border-color:', ';}}', '{color:', ';-webkit-text-fill-color:', ';}'],
        FormFieldInputContainer,
        E('border-disabled-1'),
        FormFieldInputSuffixText,
        E('text-disabled-1'),
        E('text-disabled-1'),
      )
    );
  },
  function (a) {
    var b = a.isInvalid,
      c = a.size;
    return (
      b &&
      Ce(['', '{', ';border-color:', ';}'], FormFieldInputContainer, setActiveBorder(c), E('signal-danger'))
    );
  },
  function (a) {
    var b = a.isActive,
      c = a.size;
    return b && Ce(['', '{', '}'], FormFieldInputContainer, setActiveBorder(c));
  },
  FormFieldInputContainer,
  function (a) {
    var b = a.size;
    return setActiveBorder(b);
  },
);
var FormFieldLabel = He.div.withConfig({
  displayName: 'formFieldStyles__FormFieldLabel',
  componentId: 'sc-1655b3q-2',
})(['', ' margin-bottom:5px;', ''], x('text-label'), function (a) {
  var b = a.hasOptionalText;
  return b && Ce(["&::after{content:' (valgfri)';font-weight:400;}"]);
});
var FormFieldInputSuffixText = He.span.withConfig({
  displayName: 'formFieldStyles__FormFieldInputSuffixText',
  componentId: 'sc-1655b3q-3',
})(
  ['', ' color:', ';user-select:none;white-space:nowrap;margin-right:8px;'],
  x('text-md-light'),
  E('color-text-2'),
);
var FormFieldInput = He.input.withConfig({
  displayName: 'formFieldStyles__FormFieldInput',
  componentId: 'sc-1655b3q-4',
})(
  [
    '',
    ' min-width:0;padding:0;margin:0;border:none;background-color:transparent;cursor:inherit;&:disabled{color:',
    ';-webkit-text-fill-color:',
    ';}',
  ],
  x('text-md'),
  E('text-disabled-1'),
  E('text-disabled-1'),
);

function _slicedToArray$6(a, b) {
  return (
    _arrayWithHoles$6(a) ||
    _iterableToArrayLimit$6(a, b) ||
    _unsupportedIterableToArray$6(a, b) ||
    _nonIterableRest$6()
  );
}
function _nonIterableRest$6() {
  throw new TypeError(
    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.',
  );
}
function _unsupportedIterableToArray$6(a, b) {
  if (a) {
    if ('string' == typeof a) return _arrayLikeToArray$6(a, b);
    var c = Object.prototype.toString.call(a).slice(8, -1);
    return (
      'Object' === c && a.constructor && (c = a.constructor.name),
      'Map' === c || 'Set' === c
        ? Array.from(a)
        : 'Arguments' === c || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)
        ? _arrayLikeToArray$6(a, b)
        : void 0
    );
  }
}
function _arrayLikeToArray$6(a, b) {
  (null == b || b > a.length) && (b = a.length);
  for (var c = 0, d = Array(b); c < b; c++) d[c] = a[c];
  return d;
}
function _iterableToArrayLimit$6(a, b) {
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
function _arrayWithHoles$6(a) {
  if (Array.isArray(a)) return a;
}
var useCurrentTheme = function (a) {
  var b = reactExports.useState('e-theme-light'),
    c = _slicedToArray$6(b, 2),
    d = c[0],
    e = c[1],
    f = reactExports.useMemo(
      function () {
        return 'e-theme-dark' === d ? 'dark' : 'light';
      },
      [d],
    ),
    g = reactExports.useCallback(
      function () {
        var b2,
          c2 =
            null === (b2 = a.current) || void 0 === b2 ? void 0 : b2.closest('.e-theme-dark, .e-theme-light');
        if (c2) {
          var d2 = Array.from(c2.classList).find(function (a2) {
            return a2.match(/e-theme-(dark|light)/);
          });
          e(d2);
        }
      },
      [a],
    );
  return (
    reactExports.useLayoutEffect(
      function () {
        g();
      },
      [a],
    ),
    { currentTheme: f, themeClass: d, updateCurrentTheme: g }
  );
};

var exitDuration = 200;
var fadeInAnimation = Ue(['0%{opacity:0;translate:0 -4px;}100%{opacity:1;translate:0 0;}']),
  fadeOutAnimation = Ue(['0%{opacity:1;transform:scale(1);}100%{transform:scale(0.9);opacity:0;}']);
var OverlayContainer = He.div.withConfig({
  displayName: 'overlayStyles__OverlayContainer',
  componentId: 'sc-1cbz0ax-0',
})(
  ['position:absolute;z-index:99999;animation:', ' 300ms ease;max-width:calc(100% - 16px);', ';', ';'],
  fadeInAnimation,
  function (a) {
    var b = a.fadeOut;
    return b && Ce(['animation:', ' ', 'ms ease forwards;'], fadeOutAnimation, exitDuration);
  },
  function (a) {
    var b = a.noAnimation;
    return b && Ce(['animation-duration:0ms;']);
  },
);
var OverlayDOMPosition = He.div.withConfig({
  displayName: 'overlayStyles__OverlayDOMPosition',
  componentId: 'sc-1cbz0ax-1',
})(['display:none;']);

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
var Overlay = reactExports.forwardRef(function (a, b) {
  var c = a.onClose,
    d = a.startFade,
    e = void 0 !== d && d,
    f = a.hasBackdrop,
    g = a.hasAnimation,
    h = void 0 === g || g,
    i = a.useGlobalTheme,
    j = a.children,
    k = reactExports.useState(false),
    l = _slicedToArray$5(k, 2),
    m = l[0],
    n = l[1],
    o = reactExports.useRef(false),
    p = reactExports.useRef(null),
    q = useCurrentTheme(p),
    r = q.themeClass,
    s = function () {
      n(true),
        setTimeout(
          function () {
            o.current ||
              reactDomExports.flushSync(function () {
                return c();
              });
          },
          h ? exitDuration : 0,
        );
    };
  return (
    reactExports.useEffect(
      function () {
        e && s();
      },
      [e],
    ),
    reactExports.useEffect(function () {
      o.current = false;
      var a2 = function (a3) {
        return 'Escape' === a3.code && s();
      };
      return (
        window.addEventListener('keydown', a2),
        function () {
          window.removeEventListener('keydown', a2), (o.current = true);
        }
      );
    }, []),
    React.createElement(
      OverlayDOMPosition,
      { ref: p },
      reactDomExports.createPortal(
        React.createElement(
          React.Fragment,
          null,
          (void 0 === f || f) &&
            React.createElement(Backdrop, {
              onClick: function onClick() {
                return s();
              },
              'data-testid': 'backdrop',
            }),
          React.createElement(
            OverlayContainer,
            { ref: b, fadeOut: m, noAnimation: !h, className: i ? '' : r },
            j,
          ),
        ),
        document.body,
      ),
    )
  );
});
Overlay.displayName = 'OverlayComponent';

var arrowSize = 6,
  TooltipFadeIn = Ue(['from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}']),
  TooltipFadeOut = Ue(['from{opacity:1;transform:scale(1)}to{opacity:0;transform:scale(0.7)}']);
var TooltipPopup = He.div.withConfig({ displayName: 'tooltip__TooltipPopup', componentId: 'sc-rfvn76-0' })(
  [
    '',
    ' white-space:pre-wrap;color:',
    ';background:',
    ';display:grid;place-items:center;padding:8px 10px;border-radius:4px;position:absolute;animation:',
    " 200ms 1ms forwards;max-width:min(350px,calc(100% - 8px));width:max-content;opacity:0;z-index:99999;pointer-events:none;&::after{content:'';position:absolute;width:0;height:0;}",
    ' ',
    '',
  ],
  x('text-sm'),
  E('text-3'),
  E('background-overlay-2'),
  TooltipFadeIn,
  function (a) {
    var b = a.position;
    return 'top' === b
      ? Ce(
          [
            'transform-origin:center bottom;&::after{border-left:',
            'px solid transparent;border-right:',
            'px solid transparent;border-top:',
            'px solid ',
            ';top:100%;}',
          ],
          arrowSize,
          arrowSize,
          arrowSize,
          E('background-overlay-2'),
        )
      : 'left' === b
      ? Ce(
          [
            'transform-origin:right center;&::after{border-top:',
            'px solid transparent;border-bottom:',
            'px solid transparent;border-left:',
            'px solid ',
            ';left:100%;}',
          ],
          arrowSize,
          arrowSize,
          arrowSize,
          E('background-overlay-2'),
        )
      : 'right' === b
      ? Ce(
          [
            'transform-origin:left center;&::after{border-top:',
            'px solid transparent;border-bottom:',
            'px solid transparent;border-right:',
            'px solid ',
            ';right:100%;}',
          ],
          arrowSize,
          arrowSize,
          arrowSize,
          E('background-overlay-2'),
        )
      : Ce(
          [
            'transform-origin:center top;&::after{border-left:',
            'px solid transparent;border-right:',
            'px solid transparent;border-bottom:',
            'px solid ',
            ';bottom:100%;}',
          ],
          arrowSize,
          arrowSize,
          arrowSize,
          E('background-overlay-2'),
        );
  },
  function (a) {
    var b = a.fadeOut;
    return b ? Ce(['animation:', ' 200ms ease;'], TooltipFadeOut) : '';
  },
);

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function (d, b) {
  extendStatics =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function (d, b) {
        d.__proto__ = b;
      }) ||
    function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== 'function' && b !== null)
    throw new TypeError('Class extends value ' + String(b) + ' is not a constructor or null');
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
}

var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === 'function')
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
    }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
    d;
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) {
    if (f !== void 0 && typeof f !== 'function') throw new TypeError('Function expected');
    return f;
  }
  var kind = contextIn.kind,
    key = kind === 'getter' ? 'get' : kind === 'setter' ? 'set' : 'value';
  var target = !descriptorIn && ctor ? (contextIn['static'] ? ctor : ctor.prototype) : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _,
    done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
    var context = {};
    for (var p in contextIn) context[p] = p === 'access' ? {} : contextIn[p];
    for (var p in contextIn.access) context.access[p] = contextIn.access[p];
    context.addInitializer = function (f) {
      if (done) throw new TypeError('Cannot add initializers after decoration has completed');
      extraInitializers.push(accept(f || null));
    };
    var result = (0, decorators[i])(
      kind === 'accessor' ? { get: descriptor.get, set: descriptor.set } : descriptor[key],
      context,
    );
    if (kind === 'accessor') {
      if (result === void 0) continue;
      if (result === null || typeof result !== 'object') throw new TypeError('Object expected');
      if ((_ = accept(result.get))) descriptor.get = _;
      if ((_ = accept(result.set))) descriptor.set = _;
      if ((_ = accept(result.init))) initializers.unshift(_);
    } else if ((_ = accept(result))) {
      if (kind === 'field') initializers.unshift(_);
      else descriptor[key] = _;
    }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
}

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
    value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
}

function __propKey(x) {
  return typeof x === 'symbol' ? x : ''.concat(x);
}

function __setFunctionName(f, name, prefix) {
  if (typeof name === 'symbol') name = name.description ? '['.concat(name.description, ']') : '';
  return Object.defineProperty(f, 'name', {
    configurable: true,
    value: prefix ? ''.concat(prefix, ' ', name) : name,
  });
}

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
    return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P
      ? value
      : new P(function (resolve) {
          resolve(value);
        });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator['throw'](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1];
        return t[1];
      },
      trys: [],
      ops: [],
    },
    f,
    y,
    t,
    g;
  return (
    (g = { next: verb(0), throw: verb(1), return: verb(2) }),
    typeof Symbol === 'function' &&
      (g[Symbol.iterator] = function () {
        return this;
      }),
    g
  );
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError('Generator is already executing.');
    while ((g && ((g = 0), op[0] && (_ = 0)), _))
      try {
        if (
          ((f = 1),
          y &&
            (t =
              op[0] & 2 ? y['return'] : op[0] ? y['throw'] || ((t = y['return']) && t.call(y), 0) : y.next) &&
            !(t = t.call(y, op[1])).done)
        )
          return t;
        if (((y = 0), t)) op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!((t = _.trys), (t = t.length > 0 && t[t.length - 1])) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2]) _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5) throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create
  ? function (o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
          enumerable: true,
          get: function () {
            return m[k];
          },
        };
      }
      Object.defineProperty(o, k2, desc);
    }
  : function (o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
    };

function __exportStar(m, o) {
  for (var p in m)
    if (p !== 'default' && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === 'function' && Symbol.iterator,
    m = s && o[s],
    i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === 'number')
    return {
      next: function () {
        if (o && i >= o.length) o = void 0;
        return { value: o && o[i++], done: !o };
      },
    };
  throw new TypeError(s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.');
}

function __read(o, n) {
  var m = typeof Symbol === 'function' && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
    r,
    ar = [],
    e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = { error: error };
  } finally {
    try {
      if (r && !r.done && (m = i['return'])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i);
        ar[i] = from[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? ((this.v = v), this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
  var g = generator.apply(thisArg, _arguments || []),
    i,
    q = [];
  return (
    (i = {}),
    verb('next'),
    verb('throw'),
    verb('return'),
    (i[Symbol.asyncIterator] = function () {
      return this;
    }),
    i
  );
  function verb(n) {
    if (g[n])
      i[n] = function (v) {
        return new Promise(function (a, b) {
          q.push([n, v, a, b]) > 1 || resume(n, v);
        });
      };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume('next', value);
  }
  function reject(value) {
    resume('throw', value);
  }
  function settle(f, v) {
    if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1]);
  }
}

function __asyncDelegator(o) {
  var i, p;
  return (
    (i = {}),
    verb('next'),
    verb('throw', function (e) {
      throw e;
    }),
    verb('return'),
    (i[Symbol.iterator] = function () {
      return this;
    }),
    i
  );
  function verb(n, f) {
    i[n] = o[n]
      ? function (v) {
          return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v;
        }
      : f;
  }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError('Symbol.asyncIterator is not defined.');
  var m = o[Symbol.asyncIterator],
    i;
  return m
    ? m.call(o)
    : ((o = typeof __values === 'function' ? __values(o) : o[Symbol.iterator]()),
      (i = {}),
      verb('next'),
      verb('throw'),
      verb('return'),
      (i[Symbol.asyncIterator] = function () {
        return this;
      }),
      i);
  function verb(n) {
    i[n] =
      o[n] &&
      function (v) {
        return new Promise(function (resolve, reject) {
          (v = o[n](v)), settle(resolve, reject, v.done, v.value);
        });
      };
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({ value: v, done: d });
    }, reject);
  }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, 'raw', { value: raw });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}

var __setModuleDefault = Object.create
  ? function (o, v) {
      Object.defineProperty(o, 'default', { enumerable: true, value: v });
    }
  : function (o, v) {
      o['default'] = v;
    };

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null)
    for (var k in mod)
      if (k !== 'default' && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return mod && mod.__esModule ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a getter');
  if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError('Cannot read private member from an object whose class did not declare it');
  return kind === 'm' ? f : kind === 'a' ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === 'm') throw new TypeError('Private method is not writable');
  if (kind === 'a' && !f) throw new TypeError('Private accessor was defined without a setter');
  if (typeof state === 'function' ? receiver !== state || !f : !state.has(receiver))
    throw new TypeError('Cannot write private member to an object whose class did not declare it');
  return kind === 'a' ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== 'object' && typeof receiver !== 'function'))
    throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === 'function' ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== 'object' && typeof value !== 'function') throw new TypeError('Object expected.');
    var dispose;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError('Symbol.asyncDispose is not defined.');
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError('Symbol.dispose is not defined.');
      dispose = value[Symbol.dispose];
    }
    if (typeof dispose !== 'function') throw new TypeError('Object not disposable.');
    env.stack.push({ value: value, dispose: dispose, async: async });
  } else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError =
  typeof SuppressedError === 'function'
    ? SuppressedError
    : function (error, suppressed, message) {
        var e = new Error(message);
        return (e.name = 'SuppressedError'), (e.error = error), (e.suppressed = suppressed), e;
      };

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError
      ? new _SuppressedError(e, env.error, 'An error was suppressed during disposal.')
      : e;
    env.hasError = true;
  }
  function next() {
    while (env.stack.length) {
      var rec = env.stack.pop();
      try {
        var result = rec.dispose && rec.dispose.call(rec.value);
        if (rec.async)
          return Promise.resolve(result).then(next, function (e) {
            fail(e);
            return next();
          });
      } catch (e) {
        fail(e);
      }
    }
    if (env.hasError) throw env.error;
  }
  return next();
}

const tslib_es6 = {
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
};

var IconWrapper = function (a) {
  var b = a.icon,
    c = a.color,
    d = a.size,
    e = void 0 === d ? 'sm' : d,
    f = __rest(a, ['icon', 'color', 'size']),
    g = reactExports.useMemo(
      function () {
        return 'xxs' === e
          ? '8px'
          : 'xs' === e
          ? '16px'
          : 'sm' === e || 'small' === e
          ? '24px'
          : 'md' === e || 'medium' === e
          ? '32px'
          : 'lg' === e || 'large' === e
          ? '40px'
          : 'xl' === e
          ? '48px'
          : 'xxl' === e
          ? '56px'
          : e;
      },
      [e],
    ),
    h = reactExports.useMemo(
      function () {
        return b.getIcon(c);
      },
      [b, c],
    ),
    i = reactExports.useMemo(
      function () {
        return h
          .replace(/width="([^"]*)"/, 'width="'.concat(g, '"'))
          .replace(/height="([^"]*)"/, 'height="'.concat(g, '"'));
      },
      [h, g],
    );
  return React.createElement(
    'i',
    Object.assign({ dangerouslySetInnerHTML: { __html: i }, 'aria-hidden': 'true' }, f, {
      style: Object.assign({ display: 'flex' }, f.style),
    }),
  );
};

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
var useBreakpoint = function (a) {
  var b,
    c = reactExports.useState(false),
    d = _slicedToArray$4(c, 2),
    e = d[0],
    f = d[1];
  return (
    reactExports.useEffect(function () {
      var c2 = function (a2) {
        f(a2.matches);
      };
      if (!isSsr()) {
        var d2 = 'gt-mobile' === a ? '(min-width: 768px)' : '(min-width: 1024px)';
        (b = window.matchMedia(d2)), f(b.matches), b.addEventListener('change', c2);
      }
      return function () {
        null === b || void 0 === b ? void 0 : b.removeEventListener('change', c2);
      };
    }, []),
    e
  );
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
var defaultOptions = {
  offset: 8,
  alignWidths: true,
  verticalPosition: 'bottom',
  horizontalPosition: 'center',
};
var useConnectedOverlay = function (a, b, c) {
  var d = Object.assign(Object.assign({}, defaultOptions), c),
    e = reactExports.useState(d.verticalPosition),
    f = _slicedToArray$3(e, 2),
    g = f[0],
    h = f[1],
    i = reactExports.useState(d.horizontalPosition),
    j = _slicedToArray$3(i, 2),
    k = j[0],
    l = j[1],
    m = reactExports.useState(false),
    n = _slicedToArray$3(m, 2),
    o = n[0],
    p = n[1],
    q = function () {
      return isSsr()
        ? null
        : navigator.userAgent.toLowerCase().includes('android') && window.visualViewport
        ? {
            height: window.visualViewport.height,
            width: window.visualViewport.width,
            innerWidth: window.visualViewport.width,
            scrollX: window.scrollX,
            scrollY: window.scrollY,
          }
        : {
            height: window.innerHeight,
            width: window.innerWidth,
            innerWidth: document.body.clientWidth,
            scrollX: window.scrollX,
            scrollY: window.scrollY,
          };
    },
    r = function (a2, b2, c2, e2) {
      var f2 = function (a3) {
          return a3 <= 8 + e2.scrollY
            ? Math.min(8 + e2.scrollY, b2.top + e2.scrollY)
            : a3 + c2.height >= e2.height + e2.scrollY - 8
            ? Math.max(e2.height + e2.scrollY - c2.height - 8, b2.bottom + e2.scrollY - c2.height)
            : a3;
        },
        g2 = function (b3) {
          (a2.top = ''.concat(b3, 'px')), (a2.bottom = 'unset');
        },
        i2 = function (b3) {
          (a2.top = 'unset'), (a2.bottom = ''.concat(b3, 'px'));
        },
        j2 = function () {
          i2(e2.height - b2.top + d.offset - e2.scrollY), h('top');
        },
        k2 = function () {
          g2(b2.bottom + d.offset + e2.scrollY), h('bottom');
        },
        l2 = function () {
          var a3 = b2.top - d.offset - c2.height,
            f3 = e2.height - (b2.bottom + d.offset + c2.height);
          f3 < a3 ? j2() : k2();
        };
      'top' === d.verticalPosition
        ? 0 < b2.top - d.offset - c2.height
          ? j2()
          : l2()
        : 'top-inside' === d.verticalPosition
        ? (function alignTopInside() {
            var a3 = b2.top + e2.scrollY;
            g2(f2(a3)), h('top-inside');
          })()
        : 'center' === d.verticalPosition
        ? (function alignCenter() {
            var a3 = b2.top + (b2.height - c2.height) / 2 + e2.scrollY;
            g2(f2(a3)), h('center');
          })()
        : 'bottom-inside' === d.verticalPosition
        ? (function alignBottomInside() {
            var a3 = b2.bottom - c2.height + e2.scrollY;
            g2(f2(a3)), h('bottom');
          })()
        : b2.bottom + d.offset + c2.height < e2.height
        ? k2()
        : l2();
    },
    s = function (a2, b2, c2, e2) {
      var f2 = function (a3) {
          return a3 <= 8 + e2.scrollX
            ? Math.min(8 + e2.scrollX, b2.left + e2.scrollX)
            : a3 + c2 >= e2.innerWidth + e2.scrollX - 8
            ? Math.max(e2.innerWidth + e2.scrollX - c2 - 8, b2.right + e2.scrollX - c2)
            : a3;
        },
        g2 = function (b3) {
          (a2.left = ''.concat(b3, 'px')), (a2.right = 'unset');
        },
        h2 = function (b3) {
          (a2.left = 'unset'), (a2.right = ''.concat(b3, 'px'));
        },
        i2 = function () {
          h2(e2.innerWidth - b2.left + d.offset - e2.scrollX), l('left');
        },
        j2 = function () {
          g2(b2.right + d.offset + e2.scrollX), l('right');
        },
        k2 = function () {
          var a3 = b2.left - d.offset - c2,
            f3 = e2.width - (b2.right + d.offset + c2);
          f3 < a3 ? i2() : j2();
        };
      'left' === d.horizontalPosition
        ? 0 < b2.left - d.offset - c2
          ? i2()
          : k2()
        : 'left-inside' === d.horizontalPosition
        ? (function alignLeftInside() {
            var a3 = b2.left + e2.scrollX;
            g2(f2(a3)), l('left-inside');
          })()
        : 'center' === d.horizontalPosition
        ? (function alignCenter() {
            var a3 = b2.left + (b2.width - c2) / 2 + e2.scrollX;
            g2(f2(a3)), l('center');
          })()
        : 'right-inside' === d.horizontalPosition
        ? (function alignRightInside() {
            var a3 = b2.right - c2 + e2.scrollX;
            g2(f2(a3)), l('right-inside');
          })()
        : b2.right + d.offset + c2 < e2.width
        ? j2()
        : k2();
    },
    t = function () {
      var c2,
        e2,
        f2,
        g2 = null === (c2 = b.current) || void 0 === c2 ? void 0 : c2.style,
        h2 = null === (e2 = b.current) || void 0 === e2 ? void 0 : e2.getBoundingClientRect(),
        i2 = null === (f2 = a.current) || void 0 === f2 ? void 0 : f2.getBoundingClientRect(),
        j2 = q();
      g2 &&
        h2 &&
        i2 &&
        j2 &&
        (d.alignWidths && (g2.width = ''.concat(i2.width, 'px')),
        r(g2, i2, h2, j2),
        s(g2, i2, d.alignWidths ? i2.width : h2.width, j2));
    };
  return (
    reactExports.useEffect(
      function () {
        if (o) {
          var a2 = function () {
            o && t();
          };
          if ((a2(), !isSsr()))
            return (
              window.addEventListener('resize', a2),
              window.addEventListener('scroll', a2),
              function () {
                window.removeEventListener('resize', a2), window.removeEventListener('scroll', a2);
              }
            );
        }
      },
      [o],
    ),
    {
      isShowing: o,
      setIsShowing: p,
      verticalPosition: g,
      horizontalPosition: k,
      updatePreferredPosition: function updatePreferredPosition(a2, b2) {
        a2 && (d.verticalPosition = a2), b2 && (d.horizontalPosition = b2), t();
      },
    }
  );
};

var useFocusTrap = function () {
  var a,
    b,
    c = function handleFirstItemTab(a2) {
      'Tab' === a2.key && a2.shiftKey && (b && b.focus(), a2.preventDefault());
    },
    d = function handleLastItemTab(b2) {
      'Tab' !== b2.key || b2.shiftKey || (a && a.focus(), b2.preventDefault());
    };
  return {
    trapFocus: function trapFocus(e) {
      setTimeout(function () {
        if (e.current) {
          var f = Array.from(
            e.current.querySelectorAll(
              'a[href], button, textarea, input, select, details, [tabindex]:not([tabindex="-1"])',
            ),
          ).filter(function (a2) {
            var b2;
            return (
              !a2.hasAttribute('disabled') &&
              'true' !== a2.getAttribute('aria-hidden') &&
              0 <= parseInt(null !== (b2 = a2.getAttribute('tabindex')) && void 0 !== b2 ? b2 : '0')
            );
          });
          (a = f[0]),
            (b = f[f.length - 1]),
            a && (a.focus(), a.addEventListener('keydown', c)),
            b && b.addEventListener('keydown', d);
        }
      });
    },
    releaseFocusTrap: function releaseFocusTrap() {
      a && a.removeEventListener('keydown', c), b && b.removeEventListener('keydown', d);
    },
  };
};

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
var useInputModeDetection = function (a) {
  var b = reactExports.useState('mouse'),
    c = _slicedToArray$2(b, 2),
    d = c[0],
    e = c[1];
  return (
    reactExports.useEffect(
      function () {
        var b2,
          c2 = function (a2) {
            ['Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(a2.code) && e('keyboard');
          },
          d2 = function (a2) {
            1 === a2.detail && e('mouse');
          },
          f = function () {
            return e('touch');
          },
          g =
            null !== (b2 = null === a || void 0 === a ? void 0 : a.current) && void 0 !== b2
              ? b2
              : document.body;
        return (
          g.addEventListener('click', d2),
          g.addEventListener('keydown', c2),
          g.addEventListener('touchstart', f),
          function () {
            g.removeEventListener('click', d2),
              g.removeEventListener('keydown', c2),
              g.removeEventListener('touchstart', f);
          }
        );
      },
      [a],
    ),
    { inputMode: d, isMouse: 'mouse' === d }
  );
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
var useIsOverflowing = function (a) {
  var b = reactExports.useState({ horizontal: false, vertical: false }),
    c = _slicedToArray$1(b, 2),
    d = c[0],
    e = c[1],
    f = reactExports.useRef(null),
    g = null !== a && void 0 !== a ? a : f;
  return (
    reactExports.useLayoutEffect(
      function () {
        var a2 = g.current;
        if (a2) {
          var b2 = function () {
              var b3 = a2.scrollHeight - 1 > a2.clientHeight,
                c3 = a2.scrollWidth - 1 > a2.clientWidth;
              e({ horizontal: c3, vertical: b3 });
            },
            c2 = new ResizeObserver(b2);
          return (
            c2.observe(a2),
            b2(),
            function () {
              c2.disconnect();
            }
          );
        }
      },
      [g, g.current],
    ),
    { isOverflowing: d, ref: g }
  );
};

function _typeof$1(a) {
  '@babel/helpers - typeof';
  return (
    (_typeof$1 =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (a2) {
            return typeof a2;
          }
        : function (a2) {
            return a2 && 'function' == typeof Symbol && a2.constructor === Symbol && a2 !== Symbol.prototype
              ? 'symbol'
              : typeof a2;
          }),
    _typeof$1(a)
  );
}
function _defineProperty$1(a, b, c) {
  return (
    (b = _toPropertyKey$1(b)),
    b in a
      ? Object.defineProperty(a, b, { value: c, enumerable: true, configurable: true, writable: true })
      : (a[b] = c),
    a
  );
}
function _toPropertyKey$1(a) {
  var b = _toPrimitive$1(a, 'string');
  return 'symbol' === _typeof$1(b) ? b : b + '';
}
function _toPrimitive$1(a, b) {
  if ('object' !== _typeof$1(a) || null === a) return a;
  var c = a[Symbol.toPrimitive];
  if (c !== void 0) {
    var d = c.call(a, b || 'default');
    if ('object' !== _typeof$1(d)) return d;
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
var useWebComponentState = function (a, b, c, d) {
  var e = reactExports.useState(a),
    f = _slicedToArray(e, 2),
    g = f[0],
    h = f[1];
  reactExports.useEffect(
    function () {
      h(a);
    },
    [a],
  );
  var i = function (a2) {
    c
      ? c && (c.setProps(_defineProperty$1({}, b, a2), true), c.triggerEvent(''.concat(b, 'OnChange'), a2))
      : null === d || void 0 === d
      ? void 0
      : d(a2);
  };
  return [
    g,
    function updateValue(a2) {
      'function' == typeof a2
        ? h(function (b2) {
            var c2 = a2(b2);
            return i(c2), c2;
          })
        : (h(a2), i(a2));
    },
  ];
};

var useSlot = function (a, b, c) {
  var d,
    e = reactExports.useRef(null),
    f = null !== (d = null === c || void 0 === c ? void 0 : c.ref) && void 0 !== d ? d : e;
  return (
    reactExports.useEffect(
      function () {
        var d2, e2, g;
        return b
          ? void (f.current && b.getSlot(a)
              ? (null === (e2 = null === c || void 0 === c ? void 0 : c.callback) || void 0 === e2
                  ? void 0
                  : e2.call(c, true),
                (f.current.innerHTML = ''),
                f.current.appendChild(b.getSlot(a)))
              : null === (g = null === c || void 0 === c ? void 0 : c.callback) || void 0 === g
              ? void 0
              : g.call(c, false))
          : void (null === (d2 = null === c || void 0 === c ? void 0 : c.callback) || void 0 === d2
              ? void 0
              : d2.call(c, false));
      },
      [
        f,
        a,
        b,
        null === b || void 0 === b ? void 0 : b.getSlot(a),
        null === c || void 0 === c ? void 0 : c.callback,
        null === c || void 0 === c ? void 0 : c.useEffectDependencies,
      ],
    ),
    { ref: f }
  );
};

var useRovingFocus = function (a) {
  var b,
    c = reactExports.useRef(null),
    d = null !== (b = null === a || void 0 === a ? void 0 : a.elementRef) && void 0 !== b ? b : c,
    e = Object.assign({ dir: 'both', observableAttributes: ['aria-hidden', 'style', 'class'] }, a),
    f = reactExports.useRef(),
    g = reactExports.useRef(0),
    h = reactExports.useRef(),
    i = reactExports.useRef(false),
    j = function (a2) {
      return a2
        ? Array.from(
            a2.querySelectorAll(
              'a[href], button, textarea, input, select, details, [tabindex]:not([tabindex=“-1”])',
            ),
          ).filter(function (a3) {
            return !a3.hasAttribute('disabled') && 'true' !== a3.getAttribute('aria-hidden');
          })
        : [];
    },
    k = function () {
      if ('both' === e.dir) return ['ArrowUp', 'ArrowLeft'];
      return 'horizontal' === e.dir ? ['ArrowLeft'] : ['ArrowUp'];
    },
    l = function () {
      if ('both' === e.dir) return ['ArrowDown', 'ArrowRight'];
      return 'horizontal' === e.dir ? ['ArrowRight'] : ['ArrowDown'];
    },
    m = function (a2, b2, c2) {
      return k().includes(a2.code)
        ? (a2.preventDefault(), 0 === c2 ? b2 - 1 : c2 - 1)
        : l().includes(a2.code)
        ? (a2.preventDefault(), c2 === b2 - 1 ? 0 : c2 + 1)
        : 'Home' === a2.code
        ? (a2.preventDefault(), 0)
        : 'End' === a2.code
        ? (a2.preventDefault(), b2 - 1)
        : c2;
    },
    n = function (a2, b2) {
      return a2.findIndex(function (a3) {
        return !!b2 && (a3.isEqualNode(b2) || (a3.textContent && a3.textContent === b2.textContent));
      });
    },
    o = function (a2) {
      var b2 = n(a2, f.current);
      -1 === b2 && (-1 === g.current ? (b2 = 0) : (b2 = Math.min(a2.length - 1, g.current))),
        (g.current = b2),
        (f.current = a2[b2]),
        i.current && f.current.focus();
    },
    p = function (a2) {
      f.current
        ? a2.forEach(function (a3) {
            return (a3.tabIndex = a3 === f.current ? 0 : -1);
          })
        : a2.forEach(function (a3, b2) {
            return (a3.tabIndex = 0 === b2 ? 0 : -1);
          });
    };
  reactExports.useEffect(
    function () {
      var a2 = d.current;
      if (a2) {
        var b2 = function () {
            var b3;
            null === (b3 = h.current) || void 0 === b3 ? void 0 : b3.call(h);
            var c3 = j(a2);
            f.current && o(c3), p(c3), (h.current = q(a2, c3));
          },
          c2 = new MutationObserver(b2);
        return (
          c2.observe(a2, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: e.observableAttributes,
          }),
          b2(),
          function () {
            return c2.disconnect();
          }
        );
      }
    },
    [d.current],
  );
  var q = function (a2, b2) {
    var c2 = function (a3) {
        var c3;
        -1 !== a3 &&
          a3 !== g.current &&
          ((b2[g.current].tabIndex = -1),
          (b2[a3].tabIndex = 0),
          null === (c3 = b2[a3]) || void 0 === c3 ? void 0 : c3.focus(),
          (f.current = b2[a3]),
          (g.current = a3));
      },
      d2 = function (a3) {
        var d3,
          h3 = g.current,
          i2 = m(a3, b2.length, g.current);
        c2(i2),
          f.current &&
            h3 !== i2 &&
            (null === (d3 = e.onKeyDown) || void 0 === d3 ? void 0 : d3.call(e, f.current, g.current));
      },
      h2 = function (a3) {
        var d3 = b2.findIndex(function (b3) {
          return b3 === a3.target;
        });
        c2(d3);
      },
      j2 = function (a3) {
        i.current = -1 !== n(b2, a3.target);
      };
    return (
      document.addEventListener('focus', j2, true),
      a2.addEventListener('keydown', d2),
      a2.addEventListener('click', h2),
      function () {
        document.removeEventListener('focus', j2, true),
          a2.removeEventListener('keydown', d2),
          a2.removeEventListener('click', h2);
      }
    );
  };
  return { ref: d };
};

var useFirstMountState = function () {
  var a = reactExports.useRef(true);
  return (
    reactExports.useEffect(function () {
      a.current = false;
    }, []),
    a.current
  );
};
var useUpdateEffect = function (a, b) {
  var c = useFirstMountState();
  reactExports.useEffect(function () {
    return c ? void 0 : a();
  }, b);
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
var usePrevious = function (a, b) {
  var c = reactExports.useRef(b);
  return (
    reactExports.useEffect(function () {
      c.current = a;
    }),
    c.current
  );
};
var useEffectDebugger = function (a, b) {
  var c = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : [],
    d = usePrevious(b, []),
    e = b.reduce(function (a2, b2, e2) {
      var f;
      if (b2 !== (null === d || void 0 === d ? void 0 : d[e2])) {
        var g = null !== (f = c[e2]) && void 0 !== f ? f : e2;
        return Object.assign(
          Object.assign({}, a2),
          _defineProperty({}, g, { before: null === d || void 0 === d ? void 0 : d[e2], after: b2 }),
        );
      }
      return a2;
    }, {});
  Object.keys(e).length && console.table(e), reactExports.useEffect(a, b);
};

export {
  Ce as C,
  E,
  FormFieldInput as F,
  He as H,
  IconWrapper as I,
  L,
  Overlay as O,
  TertiaryButton as T,
  Ue as U,
  useWebComponentState as a,
  IconButton as b,
  FormFieldErrorContainer as c,
  FormFieldError as d,
  useFocusTrap as e,
  useConnectedOverlay as f,
  FormFieldContainer as g,
  FormFieldLabel as h,
  FormFieldInputContainer as i,
  outlineListener as o,
  useSlot as u,
  x,
};
//# sourceMappingURL=index-ff053e39.js.map
