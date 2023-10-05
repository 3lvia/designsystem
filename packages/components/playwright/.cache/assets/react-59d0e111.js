import { r as reactExports, R as React } from './index-c3e2bc00.js';
import {
  H as He,
  x,
  E,
  C as Ce,
  o as outlineListener,
  u as useSlot,
  I as IconWrapper,
} from './index-ff053e39.js';

var bezierCurve = 'cubic-bezier(0.71, 0, 0.31, 1)';
var AccordionArea = He.div.withConfig({
  displayName: 'styledComponents__AccordionArea',
  componentId: 'sc-nszrkq-0',
})(['display:flex;flex-direction:column;width:100%;']);
var decideLabelPosition = function (a) {
  return 'center' === a ? 'center' : 'right' === a ? 'flex-end' : 'left' === a ? 'start' : 'flex-start';
};
var AccordionButtonArea = He.div.withConfig({
  displayName: 'styledComponents__AccordionButtonArea',
  componentId: 'sc-nszrkq-1',
})(['display:flex;justify-content:', ';flex-direction:row;width:100%;'], function (a) {
  var b = a.labelPosition;
  return decideLabelPosition(b);
});
var decideButtonFontSize = function (a) {
  switch (a) {
    case 'small':
      return '14';
    case 'large':
      return '20';
    case 'medium':
    default:
      return '16';
  }
};
var AccordionButton = He.button.withConfig({
  displayName: 'styledComponents__AccordionButton',
  componentId: 'sc-nszrkq-2',
})(
  [
    "border:none;background:transparent;display:flex;padding:0;font-family:'Red Hat Display',Verdana,sans-serif;font-weight:",
    ';font-size:',
    ';line-height:',
    ';',
    ' text-align:left;cursor:pointer;color:',
    ';width:',
    ';justify-content:',
    ';align-items:center;svg{transform:rotate(0deg);transition:transform 0.2s ease-out;',
    ';}',
  ],
  function (a) {
    var b = a.hasBoldLabel,
      c = a.openDetailText;
    return b || c !== void 0 ? '500' : '400';
  },
  function (a) {
    var b = a.size;
    return ''.concat(decideButtonFontSize(b), 'px');
  },
  function (a) {
    var b = a.size;
    return 'small' === b ? '16px' : '24px';
  },
  function (a) {
    var b = a.typography;
    return b && x(b);
  },
  E('text-1'),
  function (a) {
    var b = a.isFullWidth,
      c = a.currType;
    return b && 'normal' === c ? '100%' : 'auto';
  },
  function (a) {
    var b = a.isFullWidth,
      c = a.currType;
    return b && 'normal' === c ? 'space-between' : 'inherit';
  },
  function (a) {
    var b = a.isOpenState;
    return b && Ce(['transform:rotate(180deg);']);
  },
);
var AccordionLabel = He.div.withConfig({
  displayName: 'styledComponents__AccordionLabel',
  componentId: 'sc-nszrkq-3',
})(
  ['display:', ';flex-direction:row;align-items:baseline;margin-left:', ';margin-right:', ';'],
  function (a) {
    var b = a.hasLabel;
    return b ? 'flex' : 'none';
  },
  function (a) {
    var b = a.isStartAligned,
      c = a.isFullWidth;
    return b && !c ? '8px' : '0';
  },
  function (a) {
    var b = a.isStartAligned,
      c = a.isFullWidth;
    return b && !c ? '0' : '8px';
  },
);
var AccordionLabelText = He.div.withConfig({
  displayName: 'styledComponents__AccordionLabelText',
  componentId: 'sc-nszrkq-4',
})(['display:flex;']);
var decideDetailTextSize = function (a) {
  return 'small' === a ? x('text-micro') : 'large' === a ? x('text-md') : x('text-sm');
};
var AccordionDetailText = He.div.withConfig({
  displayName: 'styledComponents__AccordionDetailText',
  componentId: 'sc-nszrkq-5',
})(
  ['', ';display:flex;text-align:left;color:', ';margin-left:', ';'],
  function (a) {
    var b = a.size;
    return decideDetailTextSize(b);
  },
  E('text-1'),
  function (a) {
    var b = a.openDetailText;
    return b === void 0 ? '0;' : '8px;';
  },
);
var decideContentMarginTop = function (a, b, c) {
    return 'overflow' !== a && b ? c : '0';
  },
  decideContentMaxHeight = function (a, b, c, d) {
    return a ? ''.concat(c, 'px') : 'overflow' === b ? (d ? ''.concat(d, 'px') : 'calc(2em * 1.3)') : '0';
  },
  decideContentOpacity = function (a, b) {
    return a || 'overflow' === b ? '1' : '0';
  },
  decideContentTransitionDuration = function (a) {
    return ''.concat(Math.max(0.2, Math.min(a / 1e3, 0.7)), 's');
  };
var AccordionContent = He.div.withConfig({
  displayName: 'styledComponents__AccordionContent',
  componentId: 'sc-nszrkq-6',
})(
  [
    'display:',
    ';visibility:',
    ';background:transparent;font-size:16px;line-height:inherit;margin-top:',
    ';margin-bottom:',
    ';pointer-events:',
    ';max-height:',
    ';width:100%;opacity:',
    ';overflow-y:hidden;transition:all ',
    ' ',
    ';transition-property:opacity,max-height,visibility;-ms-overflow-style:none;scrollbar-width:none;&::-webkit-scrollbar{display:none;}position:relative;',
  ],
  function (a) {
    var b = a.hasContent;
    return b ? 'block' : 'none';
  },
  function (a) {
    var b = a.type,
      c = a.isOpenState;
    return 'normal' !== b || c ? 'visible' : 'hidden';
  },
  function (a) {
    var b = a.type,
      c = a.hasContent,
      d = a.spacingAboveContent;
    return decideContentMarginTop(b, c, d);
  },
  function (a) {
    var b = a.type,
      c = a.spacingBelowContent;
    return 'overflow' === b ? c : 0;
  },
  function (a) {
    var b = a.isOpenState;
    return b ? 'auto' : 'none';
  },
  function (a) {
    var b = a.isOpenState,
      c = a.type,
      d = a.contentHeight,
      e = a.overflowHeight;
    return decideContentMaxHeight(b, c, d, e);
  },
  function (a) {
    var b = a.isOpenState,
      c = a.type;
    return decideContentOpacity(b, c);
  },
  function (a) {
    var b = a.contentHeight;
    return decideContentTransitionDuration(b);
  },
  'cubic-bezier(0.71, 0, 0.31, 1)',
);

const expandCircleColor = {
  getIcon: function (color) {
    const icon =
      '<svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.813 15.393a1.149 1.149 0 0 1-1.626 0L6.95 11.157A.853.853 0 1 1 8.157 9.95L12 13.793l3.843-3.843a.853.853 0 0 1 1.207 1.207l-4.237 4.236Z" fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"/></svg>';
    if (!color) {
      return icon;
    }
    if (!color.startsWith('#') && !color.startsWith('var(--')) {
      return icon
        .replaceAll(
          'fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"',
          'fill="' + E(color) + '"',
        )
        .replaceAll(
          'fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"',
          'fill="' + E(color) + '"',
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

const expandCircleFilledColor = {
  getIcon: function (color) {
    const icon =
      '<svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12Z" fill="var(--e-color-brand-accent, var(--e-color-brand-accent, #29D305))"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12.813 15.393a1.149 1.149 0 0 1-1.626 0L6.95 11.157A.853.853 0 1 1 8.157 9.95L12 13.793l3.843-3.843a.853.853 0 0 1 1.207 1.207l-4.237 4.236Z" fill="#000"/></svg>';
    if (!color) {
      return icon;
    }
    if (!color.startsWith('#') && !color.startsWith('var(--')) {
      return icon
        .replaceAll(
          'fill="var(--e-color-icon-stroke-1, var(--e-color-icon-stroke-1, #000000))"',
          'fill="' + E(color) + '"',
        )
        .replaceAll(
          'fill="var(--e-color-icon-filled-background-1, var(--e-color-icon-filled-background-1, #000000))"',
          'fill="' + E(color) + '"',
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

var _excluded = [
  'content',
  'isOpen',
  'isHovering',
  'isFullWidth',
  'openLabel',
  'closeLabel',
  'openDetailText',
  'closeDetailText',
  'openAriaLabel',
  'closeAriaLabel',
  'isStartAligned',
  'hasBoldLabel',
  'labelPosition',
  'size',
  'type',
  'spacingAboveContent',
  'spacingBelowContent',
  'overflowHeight',
  'typography',
  'onOpen',
  'onClose',
  'className',
  'inlineStyle',
  'webcomponent',
];
function _extends() {
  return (
    (_extends = Object.assign
      ? Object.assign.bind()
      : function (a) {
          for (var b, c = 1; c < arguments.length; c++)
            for (var d in ((b = arguments[c]), b))
              Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
          return a;
        }),
    _extends.apply(this, arguments)
  );
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
function _objectWithoutProperties(a, b) {
  if (null == a) return {};
  var c,
    d,
    e = _objectWithoutPropertiesLoose(a, b);
  if (Object.getOwnPropertySymbols) {
    var f = Object.getOwnPropertySymbols(a);
    for (d = 0; d < f.length; d++)
      (c = f[d]), 0 <= b.indexOf(c) || (Object.prototype.propertyIsEnumerable.call(a, c) && (e[c] = a[c]));
  }
  return e;
}
function _objectWithoutPropertiesLoose(a, b) {
  if (null == a) return {};
  var c,
    d,
    e = {},
    f = Object.keys(a);
  for (d = 0; d < f.length; d++) (c = f[d]), 0 <= b.indexOf(c) || (e[c] = a[c]);
  return e;
}
var Accordion = function (a) {
  var b = a.content,
    c = a.isOpen,
    d = void 0 !== c && c,
    e = a.isHovering,
    f = void 0 !== e && e,
    g = a.isFullWidth,
    h = void 0 !== g && g,
    i = a.openLabel,
    j = a.closeLabel,
    k = a.openDetailText,
    l = a.closeDetailText,
    m = a.openAriaLabel,
    n = a.closeAriaLabel,
    o = a.isStartAligned,
    p = void 0 !== o && o,
    q = a.hasBoldLabel,
    r = a.labelPosition,
    s = void 0 === r ? 'center' : r,
    t = a.size,
    u = void 0 === t ? 'medium' : t,
    v = a.type,
    w = void 0 === v ? 'normal' : v,
    x = a.spacingAboveContent,
    y = void 0 === x ? '8px' : x,
    z = a.spacingBelowContent,
    A = void 0 === z ? '16px' : z,
    B = a.overflowHeight,
    C = a.typography,
    D = a.onOpen,
    E = a.onClose,
    F = a.className,
    G = a.inlineStyle,
    H = a.webcomponent,
    I = _objectWithoutProperties(a, _excluded),
    J = reactExports.useState(d),
    K = _slicedToArray(J, 2),
    L = K[0],
    M = K[1],
    N = reactExports.useState(false),
    O = _slicedToArray(N, 2),
    P = O[0],
    Q = O[1],
    R = reactExports.useState(false),
    S = _slicedToArray(R, 2),
    T = S[0],
    U = S[1],
    V = reactExports.useState(0),
    W = _slicedToArray(V, 2),
    X = W[0],
    Y = W[1],
    Z = reactExports.useRef(null);
  reactExports.useEffect(function () {
    return (
      Z && Z.current && outlineListener(Z.current),
      function () {
        Z && Z.current && outlineListener(Z.current, true);
      }
    );
  }, []);
  var $ = useSlot('openLabel', H, {
      useEffectDependencies: reactExports.useMemo(
        function () {
          return [L];
        },
        [L],
      ),
    }),
    _ = $.ref,
    aa = useSlot('closeLabel', H, {
      useEffectDependencies: reactExports.useMemo(
        function () {
          return [L];
        },
        [L],
      ),
    }),
    ba = aa.ref,
    ca = useSlot('content', H, {
      callback: reactExports.useCallback(function (a2) {
        return U(a2);
      }, []),
      useEffectDependencies: reactExports.useMemo(
        function () {
          return [w];
        },
        [w],
      ),
    }),
    da = ca.ref;
  reactExports.useEffect(
    function () {
      M(d);
    },
    [d],
  ),
    reactExports.useEffect(
      function () {
        'single' === w ? U(false) : U(true);
      },
      [w],
    ),
    reactExports.useEffect(
      function () {
        b && U(true);
      },
      [b],
    ),
    reactExports.useEffect(
      function () {
        var a2 = da.current;
        if (a2) {
          var b2 = function () {
              var b3 = 2 * Math.ceil(a2.scrollHeight / 2);
              Y(function (a3) {
                return 2 === Math.abs(a3 - b3) ? a3 : b3;
              });
            },
            c2 = new MutationObserver(b2),
            d2 = new ResizeObserver(b2);
          return (
            c2.observe(a2, { childList: true, subtree: true }),
            d2.observe(a2),
            b2(),
            function () {
              c2.disconnect(), d2.disconnect();
            }
          );
        }
      },
      [da, da.current],
    );
  var ea = function () {
    'single' === w ||
      (L
        ? (null === E || void 0 === E ? void 0 : E(),
          null === H || void 0 === H ? void 0 : H.triggerEvent('onClose'))
        : (null === D || void 0 === D ? void 0 : D(),
          null === H || void 0 === H ? void 0 : H.triggerEvent('onOpen')),
      M(function (a2) {
        return !a2;
      }));
  };
  return /* @__PURE__ */ React.createElement(
    AccordionArea,
    _extends({ className: F, style: G, 'data-testid': 'accordion-area', ref: Z }, I),
    'overflow' === w
      ? /* @__PURE__ */ React.createElement(
          AccordionContent,
          {
            type: w,
            spacingAboveContent: y,
            spacingBelowContent: A,
            isOpenState: L,
            overflowHeight: B,
            contentHeight: X,
            hasContent: T,
            ref: da,
            'data-testid': 'accordion-content-overflow',
          },
          b,
        )
      : null,
    /* @__PURE__ */ React.createElement(
      AccordionButtonArea,
      { labelPosition: s, type: w },
      /* @__PURE__ */ React.createElement(
        AccordionButton,
        {
          'aria-expanded': L,
          size: u,
          currType: w,
          isFullWidth: h,
          isOpenState: L,
          hasBoldLabel: !(void 0 !== q) || q,
          openDetailText: k,
          typography: C,
          onClick: function onClick() {
            return ea();
          },
          onMouseEnter: function onMouseEnter() {
            return Q(true);
          },
          onMouseLeave: function onMouseLeave() {
            return Q(false);
          },
          'data-testid': 'accordion-button-label',
          'aria-label': (function decideButtonAriaLabel() {
            if (L) {
              var a2;
              return null !== (a2 = null !== n && void 0 !== n ? n : j) && void 0 !== a2 ? a2 : 'Lukk';
            }
            var b2;
            return null !== (b2 = null !== m && void 0 !== m ? m : i) && void 0 !== b2 ? b2 : 'Åpne';
          })(),
        },
        (function shouldShowLeftIcon() {
          return p && !h;
        })() &&
          /* @__PURE__ */ React.createElement(IconWrapper, {
            icon: P || f ? expandCircleFilledColor : expandCircleColor,
            size: 'small' === u ? 'xs' : 'sm',
          }),
        /* @__PURE__ */ React.createElement(
          AccordionLabel,
          { hasLabel: 'single' !== w, isStartAligned: p, isFullWidth: h },
          L
            ? /* @__PURE__ */ React.createElement(AccordionLabelText, { ref: ba }, j)
            : /* @__PURE__ */ React.createElement(AccordionLabelText, { ref: _ }, i),
          /* @__PURE__ */ React.createElement(AccordionDetailText, { size: u, openDetailText: k }, L ? l : k),
        ),
        (function shouldShowRightIcon() {
          return (p && h) || !p;
        })() &&
          /* @__PURE__ */ React.createElement(IconWrapper, {
            icon: P || f ? expandCircleFilledColor : expandCircleColor,
            size: 'small' === u ? 'xs' : 'sm',
          }),
      ),
    ),
    'normal' === w
      ? /* @__PURE__ */ React.createElement(
          AccordionContent,
          {
            type: w,
            spacingAboveContent: y,
            spacingBelowContent: A,
            isOpenState: L,
            hasContent: T,
            contentHeight: X,
            overflowHeight: B,
            'data-testid': 'accordion-content-normal',
            ref: da,
          },
          b,
        )
      : null,
  );
};
const Accordion$1 = Accordion;

export { Accordion$1 as Accordion };
//# sourceMappingURL=react-59d0e111.js.map
