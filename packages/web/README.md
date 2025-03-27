# Web (design.elvia.io)

[Design.elvia.io](https://design.elvia.io/) is meant to be the main source of information for all users of
Elvia design system.

[![Netlify Status](https://api.netlify.com/api/v1/badges/a7c263fb-8570-458d-8d9e-4fb84fbb2f8e/deploy-status)](https://app.netlify.com/sites/elvis-designsystem/deploys)

## 💻 Development

Everything connected to the documentation page is located in the **packages/web** folder. The website is built
and deployed at [Elvia's Netlify](https://app.netlify.com/sites/elvis-designsystem/overview).

### Technology

- We use **Angular** for the main documentation page and **Netlify** to host the site.

### Running project

- The project can be ran from root with `yarn start`. Read more about
  [running the main project here](https://github.com/3lvia/designsystem#setup).

### Documenting components

The web project is meant to serve the documentation for all the components. Read about developing and
documenting [components](https://github.com/3lvia/designsystem/blob/master/packages/components/README.md) and
[the CSS library](https://github.com/3lvia/designsystem/blob/master/packages/elvis/README.md).

### CEG (Code Example Generator)

`packages/web/src/app/`

The CEG component is responsible for everything connected to the code examples we show at the top of each
component page, where you can filter on type and many different options to be able to see and retrieve the
version of an component you need.

- Find the code for the CEG at `shared/component-documentation/ceg`.
- Using the CEG component involves creating a CEG component for your component, e.g. `chips-ceg.component.ts`.
- This component should implement the `ExampleComponent` interface and be wrapped by the `<app-ceg>`
  component.
