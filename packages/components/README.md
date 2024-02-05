# Components (React & Custom elements)

Our components are built in React and then wrapped as Custom elements to
[support multiple JavaScript frameworks](https://custom-elements-everywhere.com/).

## 📚 How to use

Read our [get started guide](https://design.elvia.io/about/get-started) at design.elvia.io to get started
using our CSS library and components.

**Usage example:**

```html
<elvia-progress-linear [value]="20"></elvia-progress-linear>
```

## 💻 Development

Read about the
[the component library architecture](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/309562124/Komponentbibliotek+v2).

### Technology

- We use **React** to build our components and wrap them as
  **[Custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)** to
  make them accessible for multiple JavaScript frameworks.
- We use **Jest** for unit testing of our components, and **Playwright** for visual component tests.
- **[Styled components](https://styled-components.com/)**,
  **[classnames](https://www.npmjs.com/package/classnames)** and **SCSS** for styling our components.
- We use **Figma** for sketching the components. Use
  [Elvia figma](https://www.figma.com/files/880078299274452916/project/5995782/%F0%9F%92%9A-Designsystemet?fuid=911220117114249697)
  to get sketches of how the component should be styled and work.

### Create a new Elvia component

> NOTE! The web project will not work properly before the
> [setup in main project](https://github.com/3lvia/designsystem/blob/master/README.md) has been done.

#### Rules

- Follow
  [naming conventions](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/309464209/Navnekonvensjoner) for
  all props.
- Write Jest unit tests for the component. The tests should primarily test the properties that can be sent
  into the component. Where applicable, write Playwright component tests.
- When adding a new component make sure all points in the
  [review process doc](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/10427498683/Review+prosess) has
  been addressed.
- Follow the
  [versioning guidelines](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/10421994468/Retningslinjer+for+versjonering)
  for publishing to NPM.
- If a package, published to NPM, has errors making the component stop working, follow the
  [deprecating packages guide](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/71257653542/NPM+-+Deprecating+pakker).

#### Good to know

- `@elvia/elvis-COMPONENT-NAME` is the name of the component, but the DOM element will be
  `<elvia-COMPONENT-NAME>`
- Custom elements do not support anything but strings as attributes as according to the custom elements
  specifications. Custom HTML elements do however support setting it as properties. This is what angular does
  in the background with the `[value]=""` instead of `value=""` syntax. For native JS uses we solve this with
  the .setProps({}) function. In practice all you have to know is that you might have to support both `string`
  & `boolean` in the react component in some cases.
- **Styling** the components:
  - We don't use Elvis CSS library inside our components to minimize the size of each component. This means
    that when needing classes from Elvis to style e.g. a button, you need to copy the styling you need
    directly from the Elvis library.
  - We use our token packages for easy access to colors, typography and icons. These packages are locates at
    `packages/elvis-assets-icons`, `packages/elvis-colors` and `packages/elvis-typography`.
- **Figma**: Use the
  [Elvia figma](https://www.figma.com/files/880078299274452916/project/5995782/%F0%9F%92%9A-Designsystemet?fuid=911220117114249697)
  to get sketches of how the component should be styled and work.

#### Step 0 - Before you begin

- Pull latest version from master, and branch from master. Branch name format is
  `LEGO-[task-number]-[name-of-task]` if you are working from the team Atom backlog.
- Make sure you have the latest packages by running `yarn`.
- Make sure you have done the
  [main project setup](https://github.com/3lvia/designsystem/blob/master/README.md).

#### Step 1 - Create the component

`packages/components/components/elvis-divider`

- Copy a existing component under the /components catalog, for instance `elvis-divider`
- Rename all occurrences of `divider` to `component-name`, e.g. `elvis-divider` -> `elvis-dropdown`. Every
  file has something that needs to be renamed.
- Create the component following the rules and tips above.

#### Step 2 - Add entry to config

`packages/components/elvia-components.config.js`

The build system uses a file called `elvia-components.config.js` to build the custom element according to
specifications. The file explains how to add the props and the meaning of the each field.

**Divider in config example**

```javascript
{
    name: 'Divider',
    attributes: [
      { name: 'type', type: 'string' },
      { name: 'title', type: 'string' },
    ],
},

```

#### Step 3 - Run the building tools

Test the component by running the build and dev tools and adding the component to the test projects. We have
one test project for each framework; Angular, Vue and React. When running `yarn start` in
`packages/components` the projects should be updated every time a change has been saved.

> NOTE! The first time you run the project you will need to run `yarn start` or `yarn build` before starting
> the Angular, Vue and React apps (dev servers). Otherwise you will get errors because the components deletes
> everything in the dist folder before building the components again when running start. If this happens,
> restart the local dev servers (Angular, Vue and React).

1. Run `yarn start:components` from root or go to `packages/components` and run `yarn start` so that the
   projects are updated every time a change is saved.
2. Run dev servers:
   - **React**: Run `yarn start:react` from root or go to `packages/react-test` and run `yarn start`,
   - **Vue**: Run `yarn start:vue` from root or go to `packages/vue-test` and run `yarn start`.
   - **Angular**: Run `yarn start:web` from root or go to `/packages/web` and run `yarn start`. In the title
     of the page there should be a "DEV" where you can preview the v2 components. The code is at path
     `../web/src/app/dev/v2-playground`.

#### Step 4 - Import your new component to the projects

1. Add your components to the package.json files: `web/package.json`, `vue-test/package.json` and
   `react-test/package.json`.

   ```
   "dependencies": {
     "@elvia/elvis-dropdown": "*",
   }
   ```

2. Import the component in the test projects. This is done differently for each framework

   **Angular** - in `v2-playground.module.ts`

   ```
   import '@elvia/elvis-divider';
   ```

   **Vue** - in `main.ts`

   ```
   import '@elvia/elvis-divider';
   ```

   **React** - in `App.js`

   ```
   import '@elvia/elvis-divider/react';
   ```

#### Step 5 - Document the component

The component should be documented in the `packages/web` folder so that users of the design system can find
information on how to use it.

- Navigate to `packages/web/src/app/doc-pages/components` and find the component you want to add documentation
  to or create a new module (like the ones existing already). You will find the standard setup in any of the
  other component modules.
- Remember to add the Angular route for the new component module in the `app-routing.module.ts` file.
- Lastly you also need to add the route in Contentful for the page to appear in the menu on `design.elvia.io`
  if it is not an existing page. To do this you have to login to Contentful, navigate to the 'Components'
  submenu entry and add the page with the correct title and path there. The new component also needs an icon
  that will appear on the landing-page for the Components menu. Navigate to the 'Component' landing page and
  add a new card here with the new icon.

#### Step 6 - Update changelog

Remember to update `CHANGELOG.json` in `packages/components/components/elvis-my-component`. The format is
checked with json-schema. When the component is built the changelog will be copied to assets in the
web-project and the format will be verified again with typescript. Remember do define the change type with one
of the following types:

- new_feature
- bug_fix
- patch
- breaking_changes

Example of an update

```json
 {
      "date": "31.03.22",
      "version": "2.3.2 ",
      "changelog": [
        {
          "type": "new_feature",
          "changes": [
            "Added new property to my-component",
            "Added another new property to my-component"
          ]
        },
        {
          "type": "bug_fix",
          "changes": [
            "Minor bug fix for my-component"
          ]
        }
      ]
    },
```

#### Step 7 - Deprecating old classes

If the component you have created is a replacement for an component that already existed in elvis (the style
library), this class needs to be deprecated.

- To deprecate the class read the guidelines in the
  [Elvis README](https://github.com/3lvia/designsystem/blob/master/packages/elvis/README.md#good-to-know).

#### Step 8 - Pull request and publish

> NOTE! You will need to set up two-factor authentication with NPM to manually publish your changes.
> [Elvia NPM](https://www.npmjs.com/org/elvia).

1. **Update version**: When doing updates remember to alway update the version for that component
   `packages/components/components/your-component/package.json`.
2. **Document**: the changes in the `CHANGELOG.json` file for that component. See step 7 for more information.
3. **Review**: Review the
   [review process doc](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/10427498683/Review+prosess) to
   make sure all points have been addressed.
4. **Commit & push**: to your branch. Husky should run scripts before you are able to commit or push to ensure
   everything is built and all tests are running. If you are doing just documentation updates skip these
   scripts with `--no-verify`.
5. **Pull request**: Create a pull request with all the changes at the
   [Design system Github repo](https://github.com/3lvia/designsystem/pulls).
6. **Preview**: Netlify will generate a preview link when the pull request is created. The link can be used to
   send a preview of the changes e.g. to designers or other developers. Find the link at the bottom of the
   checkpoint-list in the pull request.
7. **Merge branch**: When the branch has been approved from one other member of the team, merge the changes
   into master.
8. **Publish to NPM**: Whenever something is merged or pushed to master, any packages with a new version in
   their `package.json` will be automatically published to NPM. If you for some reason need to manually
   publish a version (e.g. publishing a beta-version) this can be done by navigating to
   `packages/components/components/your-component` and running the command `npm publish --otp=<OTP-code>`.

### Deprecating props

To deprecate a prop on a component you must define it in the component's `config.ts` located in
`your-component/src/react/config.ts`. You should also refer to the relevant rule from the
[naming convensions](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/309464209/Navnekonvensjoner). This
can for instance look like:

```typescript
import { ComponentConfig } from '@elvia/elvis-toolbox';

const config: ComponentConfig = {
  componentName: 'Card',
  attributes: [
    { name: 'icon', type: 'string' },
    // Deprecated attributes
    {
      name: 'header',
      type: 'string',
      deprecatedDetails: { version: '2.0.0', newProp: 'heading', isDirectReplacement: true },
    },
  ],
};

export default config;
```

Furthermore, the deprecated prop should be marked with JSDoc as `@deprecated` in the components prop
interface. This can look like:

```typescript
export interface CardProps {
  icon: string | HTMLElement;
  iconHover?: string | HTMLElement;
  /**
   * @deprecated Deprecated in version 1.4.0. Use heading instead.
   */
  header: string;
  shape: CardShape;
  /**
   * @deprecated Deprecated in version 1.6.0. Use theme instead.
   */
  hasBorder?: boolean;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}
```

The function `warnDeprecatedProps(config, props)` from `@elvia/elvis-toolbox` must be called inside the
component in order to `console.warn()` about the use of deprecated props. For information on how to use this
function, see it's JSDoc for an example.

## Playwright tests

To run Playwright tests locally you need to install the corresponding Playwright browsers. To do so, you need
to run the command

```
npx playwright install
```

See [the Playwright docs](https://playwright.dev/docs/browsers) for more information. This will install the
latest versions of Chromium, Safari, and Firefox to be used by Playwright. The versions installed must
correspond to the version of Playwright that is defined in `packages/components/package.json` (e.g.
`"@playwright/test": "^1.39.0"`) and the Docker image used in the `Playwright.yml` Github action workflow.

**NB:** Note that the sensitivity of changes in the snapshot images Playwright captures is different in the
Github action vs. running the tests locally. It is more sensitive to changes on your local machine.

Once the browsers have been installed, you can run the tests with the command `yarn test-ct`. If you need to
update the snapshots because there are intentional changes to a component, tun `yarn test-ct:update`.
