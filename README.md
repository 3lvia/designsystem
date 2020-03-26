# Elvis - Elvia Designsystem

Elvis is a design system developed mainly for developers and designers at Elvia, supplying them with ready to use css classes for internal and external services provided by Elvia. 

Visit the documentation page to see all style components available: [Elvis Doc page](https://elvis-designsystem.netlify.com/)

- [Get Started](#get-started)
  - [Installing Elvis](#installing-elvis)
  - [Use components](#use-components)
  - [Use CSS-variables](#use-css-variables)
- [Contributing](#contributing)
  - [Contribution Model](#contribution-model)
  - [How to start making a suggention](how-to-start-making-a-suggestion)
  - [Development](#development)
    - [Run project locally](#run-project-locally)
    - [Build](#build)
    - [Running unit tests](#running-unit-tests)
    - [Running end-to-end tests](#running-end-to-end-tests)
---
## Get Started
Elvis is the design library Elvia use for external and internal systems. Elvis provides classes and variables for styling components, as well as templates, accessibility rules and design principles for all developers and designers at Elvia to follow. This guide provides you how to install the project and how to use the classes and variables provided.

### Installing Elvis

Install the npm package:

``$ npm install @hafslundnett/elvis --save``

Import main.sass in your stylesheet:
``@import '~@hafslundnett/elvis/src/main.scss';``

Elvis links:
- [Elvis npm package](https://www.npmjs.com/package/@elvia/elvis)
- [Give feedback](https://github.com/hafslundnett/elvia-designsystem/issues/new/choose)


### Use Components
All components consists of classes that are available through the Elvis style library. Which classes to use is documented for each component. The syntax for classes: ``class = "e-name-of-class"``

### Use CSS-variables
For most of the utilities like colors, shadows and spacing CSS-variables are also provided. All these variables are available when importing the main.scss file in your stylesheet, meaning you don't need to import any specific files to use them.
The syntax for CSS-variables: ``var(--e-name-of-class)``

#### IE Support
[Ponyfill documentation](https://jhildenbiddle.github.io/css-vars-ponyfill/#/)

The CSS-variables are not supported by IE11 and a ponyfill is therefore added as a dependency. But this library is offered as a ponyfill, not a polyfill, meaning that the code below needs to be added to your project, in your main.js/ts file, for processing to take place:

```
/* main.js/ts - file */
  
import cssVars from 'css-vars-ponyfill';

cssVars({
  include: 'style',
  onlyLegacy: true,
  watch: true,
});
```
---
## Contributing
🚧👷🚧 Work in Progess, coming soon 🚧👷🚧

### Contribution Model
🚧👷🚧 Work in Progess, coming soon 🚧👷🚧

## How to start making a suggention
🚧👷🚧 Work in Progess, coming soon 🚧👷🚧

## Development
🚧👷🚧 Work in Progess, coming soon 🚧👷🚧
  

### Run project locally
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `npm run cypress` to execute the end-to-end tests via [Cypress](https://www.cypress.io/).
