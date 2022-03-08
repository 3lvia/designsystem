import kebabCase from 'lodash.kebabcase';

const colors = {
  'primary-colors': {
    white: {
      color: '#fff',
      contrastText: '#000',
      'alt-labels': ['elvis-on', 'elvia-on', 'font-color-light', 'elvia-inverted'],
    },
    black: {
      color: '#000',
      contrastText: '#fff',
      'alt-labels': ['elvis-off', 'elvia-off', 'font-color'],
    },
    grey: {
      color: '#262626',
      contrastText: '#fff',
      'alt-labels': ['elvia-dark'],
    },
    green: {
      color: '#29d305',
      contrastText: '#000',
      'alt-labels': ['elvia-charge'],
    },
  },
  'signal-colors': {
    yellow: {
      color: '#ffff00',
      rgb: 'rgb(255, 255, 0',
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

export default colors;

const getColorObject = (colorName) => {
  // Iterate through every color category in colors
  for (const category in colors) {
    // Then iterate through every color in a category
    for (const colorLabel in colors[category]) {
      // If the requested color is found, return the color object
      if (colorLabel === kebabCase(colorName)) {
        return colors[category][colorLabel];
        // If not, check if a given color has any alt-labels
      } else if (colors[category][colorLabel]['alt-labels']) {
        // Iterate through alt-labels
        for (const altLabel in colors[category][colorLabel]['alt-labels']) {
          // If an alt-label corresponds to the requested color, return the color object
          if (colors[category][colorLabel]['alt-labels'][altLabel] === kebabCase(colorName)) {
            return colors[category][colorLabel];
          }
        }
      }
    }
  }
  console.error(`Cannot get color ${colorName} from elvis-colors.`);
};

export const getColor = (colorName) => {
  return getColorObject(colorName).color;
};

export const getContrastText = (colorName) => {
  return getColorObject(colorName).contrastText;
};
