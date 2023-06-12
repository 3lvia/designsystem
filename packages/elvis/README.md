# Elvis CSS library

[![npm version](https://badge.fury.io/js/%40elvia%2Felvis.svg)](https://badge.fury.io/js/%40elvia%2Felvis)

Elvis CSS library offers classes and variables for styling components as well other styling utilities like
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

- We use **SCSS** for our classes. With [ABEM](https://css-tricks.com/abem-useful-adaptation-bem/) as our
  class naming convention.
- We use **Percy** for visual regression testing for our CSS library.
- We use **Figma** for sketching the components. Use
  [Elvia Figma](https://www.figma.com/files/880078299274452916/project/5995782/%F0%9F%92%9A-Designsystemet?fuid=911220117114249697)
  to get sketches of how the component should be styled and work.

### Create or change the CSS library

> NOTE! The web project will not work properly before the
> [setup in main project](https://github.com/3lvia/designsystem/blob/master/README.md) has been done.

#### Rules

- Follow the
  [naming conventions](https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/309464209/Navnekonvensjoner#Klasser)
  for all classes.
- Update Percy tests for the classes at `packages/elvis/percy/components`.
  [How Percy works](https://percy.io/how-it-works)
- Follow the
  [versioning guidelines](<https://elvia.atlassian.net/wiki/spaces/TEAMATOM/pages/10421994468/Retningslinjer+for+versjonering#Stilbiblitoeket-(Elvis)>)
  for publishing to NPM.
- For colors always use our color tokens. If something custom is needed define a new CSS variable at root with
  the naming convention: --e-color-componentName-purpose':

```css
:root,
.e-theme-light {
  --e-thumbnail-color-border: var(--e-grey-10);
}
.e-theme-dark {
  --e-thumbnail-color-border: var(--e-grey-20);
}
```

#### Good to know

- **Figma**: Use the
  [Elvia Figma](https://www.figma.com/files/880078299274452916/project/5995782/%F0%9F%92%9A-Designsystemet?fuid=911220117114249697)
  to get sketches of how the component should be styled and work.
- **Deprecating outdated classes**:

  To deprecate an Elvis class, add it to the `deprecated-classes.json` file located at
  `packages/elvis/.internal/deprecated-classes.json`. <br/>Do not remove the class from the library before the
  sunset date. <br/>Do not include the period in the deprecated class name.

  To get started quickly, copy an existing entry and change the values. Place new additions as the first
  element within the JSON object.

  ```json
      "e-deprecated-class": {
          "deprecateChildren": true, // optional
          "requiredAncestor": "e-deprecated-class-ancestor", // optional
          "version": "2.0.0",
          "replacement": {  // optional
      	    "name": "e-better-replacement",
      	    "type": "class",
      	    "documentation": "https://design.elvia.io/e-better-replacement"
          },
          "sunset": "March 2023"  // optional
      }
  ```

````

Glossary:

- `deprecateChildren`: If true, all other Elvis classes that include the name specified above will be
  deprecated (optional).

- `requiredAncestor`: If specified, the requiredAncestor class will only cause a warning if the specified
  'requiredAncestor' class is present as an ancestor in the DOM (optional).

- `sunset`: An approximate date of when classes will be removed from Elvis (optional).

#### **Step 0 - Before you begin**

1. Make sure you have done the
   [main project setup](https://github.com/3lvia/designsystem/blob/master/README.md).
2. Navigate to `packages/elvis`

#### **Step 1 - Running project**

1. Run `yarn build` to build the classes
2. Run `yarn start` to start/watch for changes while developing
3. Test your changes by [running the main project](https://github.com/3lvia/designsystem#setup) at the same
   time and using the classes in the doc-pages in `packages/web`. E.g.
   `packages/web/src/app/doc-pages/components/button-doc`

#### **Step 2 - Create the classes / component**

1. In `packages/elvis/src` choose between the `components`, `utilities` and `variables` folders depending on
   what you are creating.
2. Create your classes, utilities, or variables with the rules explained over in mind.

#### **Step 3 - Document the classes**

The classes should be documented in the `packages/web` folder so that users of the design system can find
information on how to use them.

- Navigate to `packages/web/src/app/doc-pages/components` and find the component you want to add documentation
  to or create a new module (like the ones existing already).

#### **Step 4 - Pull request and publish**

> NOTE! You will need to set up two-factor authentication with NPM to manually publish your changes.
> [Elvia NPM](https://www.npmjs.com/org/elvia).

1. **Update version**: When doing updates to Elvis remember to always update the version in
   `packages/elvis/package.json`.
2. **Document**: the changes / removal or new classes in the `CHANGELOG.json` file as well as at the correct
   documentation-page. E.g. `packages/web/src/app/doc-pages/components/button-doc`. Example of an update in
   CHANGELOG.json:

   ```json
   {
      "version": "8.3.1",
      "date": "April 20, 2022",
      "changelog": [
         {
         "type": "breaking_changes",
         "changes": ["Fixed a class not working properly."],
         "fixes": [
            "Change something to fix something",
            "Another step"
            ],
         "components": [{ "displayName": "Table", "url": "https://design.elvia.io/components/table" }],
         "pages": []
         }
      ]
   },
   ```

   The type should be "breaking_changes", "bug_fix", "new_feature" or "patch". Changes describes what changes
   have been done, while fixes describes steps the user has to do to fix their code to be up to date.
   Components links to all related components, and pages links to all related pages.

3. **Commit & push**: to your branch. Husky should run scripts before you can commit or push to ensure
   everything is built and all tests are running. If you are doing just documentation updates skip these
   scripts with `--no-verify`.
4. **Pull request**: Create a pull request with all the changes at the
   [Design system Github repo](https://github.com/3lvia/designsystem/pulls).
5. **Preview**: Netlify will generate a preview link when the pull request is created. The link can be used to
   send a preview of the changes e.g. to designers or other developers. Find the link at the bottom of the
   checkpoint-list in the pull request.
6. **Merge branch**: When the branch has been approved by one other member of the team, merge the changes into
   master.
7. **Publish to NPM**: Whenever something is merged or pushed to master, any packages with a new version in
   their `package.json` will be automatically published to NPM. If you for some reason need to manually
   publish a version (e.g. publishing a beta-version) this can be done by navigating to `packages/elvis` and
   running the command `npm publish --otp=<OTP-code>`.
````
