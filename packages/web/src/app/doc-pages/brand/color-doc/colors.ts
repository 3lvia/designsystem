/**
 * Everything in this file should later come from `@elvia/elvis-colors@^2.0.0`.
 */

export const contrasts = {
  'primary-colors': {
    white: {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    green: {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    black: {
      contrasts: {
        white: 'AAA',
        black: '',
      },
    },
    grey: {
      contrasts: {
        white: 'AAA',
        black: '',
      },
    },
  },
  'signal-colors': {
    yellow: {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    orange: {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    red: {
      contrasts: {
        white: 'AA',
        black: 'AA',
      },
    },
  },
  'data-colors': {
    'green-apple': {
      contrasts: {
        white: '',
        black: 'AA',
      },
    },
    'violet-grape': {
      contrasts: {
        white: 'AAA',
        black: '',
      },
    },
    'blue-berry': {
      contrasts: {
        white: 'AA',
        black: '',
      },
    },
    'purple-plum': {
      contrasts: {
        white: '',
        black: 'AA',
      },
    },
    'orange-mango': {
      contrasts: {
        white: '',
        black: 'AA',
      },
    },
    'red-tomato': {
      contrasts: {
        white: 'AAA',
        black: '',
      },
    },
  },
  'grey-colors': {
    'grey-90': {
      contrasts: {
        white: 'AAA',
        black: '',
      },
    },
    'grey-80': {
      contrasts: {
        white: 'AAA',
        black: '',
      },
    },
    'grey-70': {
      contrasts: {
        white: 'AA',
        black: '',
      },
    },
    'grey-60': {
      contrasts: {
        white: '',
        black: 'AA',
      },
    },
    'grey-50': {
      contrasts: {
        white: '',
        black: 'AA',
      },
    },
    'grey-40': {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    'grey-30': {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    'grey-20': {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    'grey-10': {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    'grey-05': {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    'grey-02': {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
  },
};

export const colors = {
  'primary-colors': {
    white: {
      color: '#fff',
      contrastText: '#000',
      'alt-labels': ['elvis-on', 'elvia-on', 'font-color-light', 'elvia-inverted'],
    },
    green: {
      color: '#29d305',
      contrastText: '#000',
      'alt-labels': ['elvia-charge'],
    },
    black: {
      color: '#000',
      contrastText: '#fff',
      'alt-labels': ['elvis-off', 'elvia-off', 'font-color', 'text'],
    },
    grey: {
      color: '#262626',
      contrastText: '#fff',
      'alt-labels': ['elvia-dark'],
    },
  },
  'signal-colors': {
    yellow: {
      color: '#ffff00',
      rgb: 'rgb(255, 255, 0)',
      contrastText: '#000',
    },
    orange: {
      color: '#ffa000',
      rgb: 'rgb(255, 160, 0)',
      contrastText: '#000',
      'alt-labels': ['warning'],
    },
    red: {
      color: '#ee0701',
      rgb: 'rgb(255, 0, 0)',
      contrastText: '#000',
      'alt-labels': ['error'],
    },
  },
  'data-colors': {
    'green-apple': {
      color: '#21ac04',
      rgb: 'rgb(33, 172, 4)',
      contrastText: '#000',
    },
    'violet-grape': {
      color: '#490192',
      rgb: 'rgb(73, 1, 146)',
      contrastText: '#fff',
    },
    'blue-berry': {
      color: '#006ddb',
      rgb: 'rgb(0, 109, 219)',
      contrastText: '#fff',
    },
    'purple-plum': {
      color: '#b66dff',
      rgb: 'rgb(182, 109, 255)',
      contrastText: '#000',
    },
    'orange-mango': {
      color: '#db6d00',
      rgb: 'rgb(219, 109, 0)',
      contrastText: '#000',
    },
    'red-tomato': {
      color: '#b90202',
      rgb: 'rgb(185, 2, 2)',
      contrastText: '#fff',
    },
  },
  'grey-colors': {
    'grey-90': {
      color: '#3b3b3b',
      contrastText: '#fff',
    },
    'grey-80': {
      color: '#515151',
      contrastText: '#fff',
      'alt-labels': ['font-grey', 'text-light'],
    },
    'grey-70': {
      color: '#676767',
      contrastText: '#fff',
      'alt-labels': ['placeholder'],
    },
    'grey-60': {
      color: '#7c7c7c',
      contrastText: '#000',
    },
    'grey-50': {
      color: '#929292',
      contrastText: '#000',
    },
    'grey-40': {
      color: '#a8a8a8',
      contrastText: '#000',
    },
    'grey-30': {
      color: '#bdbdbd',
      contrastText: '#000',
      'alt-labels': ['disabled', 'light-inverted'],
    },
    'grey-20': {
      color: '#d3d3d3',
      contrastText: '#000',
    },
    'grey-10': {
      color: '#e9e9e9',
      contrastText: '#000',
    },
    'grey-05': {
      color: '#f4f4f4',
      contrastText: '#000',
      'alt-labels': ['disabled-light'],
    },
    'grey-02': {
      color: '#fafafa',
      contrastText: '#000',
    },
  },
  'internal-colors': {
    'focus-outline': {
      color: '#0064fa',
    },
  },
};
