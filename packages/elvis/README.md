# Elvis CSS library

[![npm version](https://badge.fury.io/js/%40elvia%2Felvis.svg)](https://badge.fury.io/js/%40elvia%2Felvis)

Elvis CSS library offers classes and variables for styling components as well other styling utilties like
layout and typography classes.

## 📚 How to use

Read our [get started guide](https://design.elvia.io/about/get-started) at design.elvia.io to get started
using our CSS library and components.

**Usage example:**

```html
<button class="e-btn">Button</button>
```

## 💻 Development

Read about the
[philosophy behind Elvis here](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/311690311/Teknisk+filosofi+for+stilbiblioteket+Elvis).

### Technology

- We use **SCSS** for our classes.
- We use **Percy** for visual regression testing for our CSS library.
- We use **Figma** for sketching the components. Use
  [Elvia figma](https://www.figma.com/files/880078299274452916/project/5995782/%F0%9F%92%9A-Designsystemet?fuid=911220117114249697)
  to get sketches of how the component should be styled and work.

### Running project

0. Navigate to `packages/elvis`
1. Run `yarn build` to build the classes
2. Run `yarn watch` to watch for changes while developing
3. Test your changes by [running the main project](https://github.com/3lvia/designsystem#setup) at the same
   time and using the classes in the doc-pages in `packages/web`. E.g.
   `packages/web/src/app/doc-pages/components/button-doc`

### Rules

- Follow the
  [naming conventions](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/309464209/Navnekonvensjoner#Klasser)
  for all classes.
- Update Percy tests for the classes at `packages/elvis/percy/components`.
  [How Percy works](https://percy.io/how-it-works)
- Follow the
  [versioning guidelines](<https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/10421994468/Retningslinjer+for+versjonering#Stilbiblitoeket-(Elvis)>)
  for publishing to NPM.

### Document the classes

The classes should be documented in the `packages/web` folder so that users of the design system can find
information on how to use them.

- Navigate to `packages/web/src/app/doc-pages/components` and find the component you want to add documentation
  to or create a new module (like the ones existing allready).

### Pull request and publish

> NOTE! You will need to set up two-factor authentication with NPM to publish your changes.
> [Elvia NPM](https://www.npmjs.com/org/elvia).

1. **Update version**: When doing updates to Elvis remember to alway update the version in
   `packages/elvis/package.json`.
2. **Document**: the changes / removal or new classes in the `CHANGELOG.md` file as well as at the correct
   documentation-page. E.g. `packages/web/src/app/doc-pages/components/button-doc`
3. **Commit & push**: to your branch. Husky should run scripts before you are able to commit or push to ensure
   everything is built and all tests are running. If you are doing just documentation updates skip these
   scripts with `--no-verify`.
4. **Pull request**: Create a pull request with all the changes at the
   [Design system Github repo](https://github.com/3lvia/designsystem/pulls).
5. **Merge branch**: When the branch has been approved from one other member of the team, merge the changes
   into master.
6. **Publish to NPM**: by navigating to `packages/elvis` in master (after pulling the updates) and use the
   command `npm publish --otp=<code>`.
