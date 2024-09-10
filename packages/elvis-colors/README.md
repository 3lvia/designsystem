# Elvia colors

Available colors reflect the colors illustrated at https://design.elvia.io/brand/color#Overview.

All Color variables are named Elvia< Name > in CamelCase. Eg ElviaBlack, ElviaOrangeMango.

## Usage SCSS

### Recommended @Use

Insert at top of your scss file :<br>

- ```scss
  @use '@elvia/elvis-colors';
  ```

If this does not work for you, you may need to specify:

- ```scss
  @use '@elvia/elvis-colors/dist/elviaColors.scss';
  ```

Example: <br>

- ```scss
  border: 1px solid elviaColors.$ElviaBlack;
  ```

## Usage Typescript/Javascript

To use this package you can import the function `getThemeColor()`. It takes the label of the requested color
as input, and returns a css variable with a fallback to its its hex value if it exists in the Elvia colors.
<br>

- ```typescript
  import { getThemeColor } from '@elvia/elvis-colors';

  const color = getThemeColor('state-on');
  ```

Likewise, the function `getThemeColorContrast()` is provided to get a contrast text color corresponding to the
requested color.

A previous version of this package provided the function `getColor()`. This function is now deprecated and
will be removed in a future version. It takes the label of the requested color as input, and returns its hex
value.

- ```typescript
  import { getColor } from '@elvia/elvis-colors';

  const color = getColor('elvia-charge');
  ```

## Maintaining

The json and scss-files are generated from the colors object in the ts file. When making changes, remember to
run `yarn build` afterwards.
