import * as icons from '@elvia/elvis-assets-icons';
import { addIcons } from '@elvia/elvis-icons';

// Uncomment to test old icon system
// import '@elvia/elvis/elvis.js';

// This adds all the icons from the icons package, with the names from the package
const iconObj = Object.entries(icons).reduce(
  (acc, [name, icon]) => {
    acc[name] = { svg: icon.getIcon() };
    return acc;
  },
  {} as Parameters<typeof addIcons>[0],
);

addIcons(iconObj);
