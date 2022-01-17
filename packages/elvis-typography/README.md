# Elvia typography

Available typography reflect the typography classes availabe at https://design.elvia.io/brand/typography

## Usage SCSS

### Recommended @Use

Insert at top of your scss file :<br>

- @use '@elvia/elvis-typography/src/elviaTypography.scss';

Remember to also import the correct typographies from the Google font api. If you are using the @elvia/elvis
package you don't have to do this, because they are already imported there.

- @import url('https://fonts.googleapis.com/css?family=Red+Hat+Display:400,400i,500,700,900&display=swap');
- @import url('https://fonts.googleapis.com/css?family=Red+Hat+Text:400,400i,500,600,700&display=swap');
- @import
  url('https://fonts.googleapis.com/css2?family=Red+Hat+Mono:ital,wght@0,400;0,500;1,400&display=swap');

## Maintaining

Remember to update all three elviaTypography files (js, json and scss), when adding a new typography or
updating an existing typography.
