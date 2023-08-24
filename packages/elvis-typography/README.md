# Elvia typography

**This package is meant for internal use only. All typographies are available through
[Elvis](https://www.npmjs.com/package/@elvia/elvis). This package should not be imported by an end-user
directly.**

Available typography reflect the typography classes availabe at
[design.elvia.io](https://design.elvia.io/brand/typography).

## Usage SCSS

### Recommended @Use

Insert at top of your scss file :<br>

```scss
@use '@elvia/elvis-typography/src/elviaTypography.scss';
```

Remember to also import the correct typographies from the Google font api. If you are using the @elvia/elvis
package you don't have to do this, because they are already imported there.

```scss
@import url('https://fonts.googleapis.com/css?family=Red+Hat+Display:400,400i,500,500i,700,900&display=swap');
@import url('https://fonts.googleapis.com/css?family=Red+Hat+Text:400,400i,500,500i,600,700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Mono:ital,wght@0,400;0,500;1,400&display=swap');
```

## Usage Typescript/Javascript

To use this package you can import the function `getTypography()`. It takes the name of the requested
typography as input, and returns an object containing the typography's attributes if it exists.

```js
import { getTypography } from '@elvia/elvis-typography';
const typography = getTypography('text-md');
```

It is also possible to use the function `getTypographyCss()`. It takes the name of the requested typography as
input, and returns a string containing all the css for the typography, including a breakpoint for mobile font
properties if there are any.

```js
import { getTypographyCss } from '@elvia/elvis-typography';
const typography = getTypographyCss('text-md');
```

## Maintaining

All typographies are built from the `ElviaTypography`-object in `./src/elviaTypography.js` through Gulp.
Remember to run `yarn build` if you make any changes. `Elvis` may also need to be rebuilt to include any
changes made to the typographies.
