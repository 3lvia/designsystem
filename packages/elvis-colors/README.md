# Elvia colors

Available colors reflect the colors illustrated at https://design.elvia.io/brand/color#Overview.

All Color variables are named Elvia< Name > in CamelCase. Eg ElviaBlack, ElviaOrangeMango.

## Usage SCSS

### Recommended @Use

Insert at top of your scss file :<br>

- @use '@elvia/elvis-colors/src/elviaColors.scss';

Example: <br>

- border: 1px solid elviaColors.$ElviaBlack;

### Alternative @Import

For making all variables accessible throughout your project you can use @Import. This function will be
deprecated by sass in the future and we therefore recommend applying @use instead.

Add colors file from package to scss file like: <br>

- @import '~@elvia/elvis-colors/src/colors.scss';

Example: <br>

- border: 1px solid $ElviaBlack;

## Usage Typescript/Javascript

To use this package you can import the function getColor(). It takes the name of the requested color as input,
and returns its hex value if it exists in the Elvia colors. <br>

- import { getColor } from '@elvia/elvis-colors';
- const color = getColor('elvia-charge');

Likewise, the function getContrastText() is provided to get a contrast text color corresponding to the
requested color.

## Maintaining

Remember to update all three elviaColor files (js, json and scss), when adding a new color or updating an
existing color.
