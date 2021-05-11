# How to create a new Elvia component (v2):

## Step 0 - Before you begin

- Make sure you have the latest packages: `yarn`
- Pull latest version from master, and branch from master

## Step 1 - Copy existing component

- Copy a existing component under the /components catalog, for instance `elvis-testing`
- Rename all occurences of `testing` to `component-name`.
- Remember to also update the package.json

Example: `elvis-testing` -> `elvis-dropdown` `elvia-testing`-> `elvia-dropdown`

## Step 2 - Add entry to config

The build system uses a file called elvia-components.config.js to build the components according to
specifications.

See comment in elvia-components.config.js for description on the meaning of the different props.

```
{
    name: 'elvis-testing',
    elementName: 'elvia-testing',
    attributes: ['value'],
    reactName: 'TestingComponent',
  },

```

## Step 3 - Run the building tools

The build tools should watch for file changes automatically

`yarn run build`

> [!IMPORTANT] This has to be started before the Angular and React apps (dev servers), otherwise you will get
> a lot of errors. If this happens, restart the local dev servers (Angular and React).

## Step 3 - Run dev servers

### 3.1 - React

Go to `/frameworks/react` and run `yarn start`

### 3.2 - Angular

Go to `../web` and run `yarn start` (In the title of the page there should be a "DEV" where you can preview
the v2 components)

## Step 4 - Import your new component to the projects

Import your components into the ../web && /frameworks/react projects

The easiest way is to just look at how this is done for existing components, such as elvis-testing,
elvis-dropdown etc.

## Good to know

- @elvia/elvis-COMPONENT-NAME is the name of the component, but the DOM element will be named
  <elvia-COMPONENT-NAME>
- Custom elements do not support anything but strings as attributes as according to the custom elements
  specifications. Custom HTML elements do however support setting it as properties. This is what angular does
  in the background with the `[value]=""` instead of `value=""` syntax. For native JS uses we solve this with
  the .setProps({}) function. In practice all you have to know is that you might have to support both `string`
  & `boolean` in the react component in some cases.
