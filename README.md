# Elvia design system

![Decorative image of the design system](https://design.elvia.io/assets/HomeIllustration.png)

Read our documentation at: [Design.elvia.io](https://design.elvia.io/)

[![Netlify Status](https://api.netlify.com/api/v1/badges/a7c263fb-8570-458d-8d9e-4fb84fbb2f8e/deploy-status)](https://app.netlify.com/sites/elvis-designsystem/deploys)

Elvia’s design system is a scalable system of visual language, components and design assets which enables us
to work together towards an ultimate brand experience.

## ✨ Features

- 🌈 Style guide and CSS library (Elvis) with lots of classes and utilities
- 📦 Components built in TypeScript and React (Supported in all JavaScript frameworks)
- 💚 Elvia’s brand guide
- 🛠 Design and development tools
- 📑 Patterns to solve common user flow to ensure consistent experience across applications

## ✅ Environment support

- Chrome latest
- Safari latest
- Firefox latest
- Edge latest

## 📚 How to use

Read our [get started guide](https://design.elvia.io/about/get-started) at design.elvia.io to get started
using our CSS library and components. The CSS library and the components can be used through both NPM packages
and CDN.

### CSS library (Elvis)

**CSS library usage example:**

```html
<button class="e-btn">Button</button>
```

### Components

**Component usage example:**

```html
<elvia-progress-linear [value]="20"></elvia-progress-linear>
```

### Using icons

Our icon library is based on Streamline icons. The icons that are from Streamline is not made accessible under
the same license as this npm package. Those icons are still the property of Webablys LLC. Elvia has bought a
license for the use of these icons in the organization. They can also be used in open source projects as long
as you follow their license.

[Streamline license information](https://help.streamlineicons.com/license-premium)

## 💻 Development

- [Design system Architecture](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/64486539701/Designsystem+v2).
  Find more information about the CSS library and Components library in the Confluence folder
  [Development / Architecture](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/309562041/Utvikling+og+arkitektur).

### Technology

- We use **Yarn**, NPM will probably not work as expected.
- We use a monorepo structure with **Yarn workspaces**.
- We use **Angular** for the main documentation page and **Netlify** to host the site.
- We use **React** to build our components and wrap them as
  **[Custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)** to
  make them accessible for multiple JavaScript frameworks.
- We use **Jest** for unit testing of our components.
- **[Styled components](https://styled-components.com/)**,
  **[classnames](https://www.npmjs.com/package/classnames)** and **SCSS** for styling our components.
- We use **[Percy](https://percy.io/)** for visual regression testing for our CSS library.
- We use **Figma** for sketching the components. The
  [Elvia figma](https://www.figma.com/files/880078299274452916/project/5995782/%F0%9F%92%9A-Designsystemet?fuid=911220117114249697)
  has all the sketches for our components.
- We use **Contentful** as content management system for a lot of our documentation.
- We use **SonarCloud** for automatic code quality checks.
- We use [husky](https://www.npmjs.com/package/husky) to run build, tests and linting before committing or
  pushing.

### How we work

Read more about how we work inside the team e.g. with our backlog in Jira, or our component flow (creating new
components from start to finish) in this Confluence folder:
[Team Atom - Workflow](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/64486736397/Arbeidsflyt).

### Setup

Setup for development environment:

0. Clone repository, checkout new branch from master, and run `yarn`.
1. Navigate to `packages/web/contentful` and follow the instructions in the `.env.template` file.
2. Building projects:
   1. Run `yarn build` to build all projects for productions. This commando will run on push.
   1. Run `yarn build:web` to build the web project.
   1. Run `yarn build:components` to build the components (includes more steps than start:components like
      testing).
   1. Run `yarn build:tokens` at root to build the two token packages. These are also built once (not watched)
      when using `yarn start:components`.
3. Running projects:
   1. Run `yarn start:web` at root to run the main documentation page (design.elvia.io).
   2. Run `yarn start:components` at root to watch for the components (every time components are changed).
   3. Run `yarn start:elvis` at root to watch for the style-library components (every time elvis-components
      are changed).
   4. Run `yarn start:react` at root to run the react test-project (testing components).
   5. Run `yarn start:vue` at root to run the vue test-project (testing components).
4. Useful extensions:
   1. Angular Language Service
   2. ESLint
   3. Prettier
   4. vscode-styled-components
   5. Volar
   6. Angular Files
5. Less useful, but still nice extensions:
   1. Color Highlight
   2. Auto Rename Tag
   3. GitLense
   4. npm Intellisense
   5. Template string converter
   6. Angular Snippets

### Start developing

To start developing components and styling follow the guides below:

- To start development for the CSS library Elvis follow the
  [Elvis README guide](https://github.com/3lvia/designsystem/blob/master/packages/elvis/README.md).
- To start development for Components (JavaScript) follow the
  [Components README guide](https://github.com/3lvia/designsystem/blob/master/packages/components/README.md).
- Read more about working on our documentation page here:
  [Web (design.elvia.io)](https://github.com/3lvia/designsystem/blob/master/packages/web/README.md).
- Our CDN which publish all our NPM packages to [Elvia CDN](https://cdn.elvia.io/) can be read more about
  here: [CDN resources](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/64471957894/CDN+-+Ressurser).

### Publish

All packages that are merged to the master branch with a new version in their `package.json` will
automatically be published to npm. If you wish to publish beta versions of packages that can be done manually.

If for some reason a package publishing fails, you can publish all the packages to npm at once by using
`yarn publish --otp <INSERT_OTP>` from root. It will publish all packages where the version number is updated
from what is currently published and the package is not marked as private in the `package.json`.

### Updating Yarn

We use Yarn 3 (berry) for this project. To update Yarn, run `yarn set version stable`. This will update the
Yarn version in the `.yarn/releases`-folder, as well as the `.yarnrc.yml` and `package.json` files. If the
`netlify.toml` doesn't automatically update the `[build.environment] YARN_VERSION`, this must be changed too.
Commit the changes (including the `yarn-3.x.x.cjs`-file) and push to the repository.

## 🤝 Contribute

Feedback from everyone in Elvia is welcomed and developers and designers are urged to contribute where they
can. Read more about how to request component features and contribute
[here](https://design.elvia.io/about/contribute).
