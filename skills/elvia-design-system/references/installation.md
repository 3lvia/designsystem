- [Elvis Installation](#elvis-installation)
  - [1. Install the CSS package](#1-install-the-css-package)
  - [2. Register the required CSS](#2-register-the-required-css)
  - [3. Add the optional CSS reset](#3-add-the-optional-css-reset)
  - [4. Install a web component](#4-install-a-web-component)
  - [5. Register the web component](#5-register-the-web-component)

# Elvis Installation

Follow this checklist and check off each step as it is completed:

```markdown
- [ ] Install `@elvia/elvis`
- [ ] Import `@elvia/elvis/css/elvis.min.css` in the global stylesheet
- [ ] If needed, import the optional CSS reset
- [ ] If needed, install the required Elvis web-components
- [ ] If needed, import the web component from the application entry point
- [ ] Verify the component renders correctly
```

## 1. Install the CSS package

Install the CSS component library as an external dependency:

```sh
npm install @elvia/elvis
```

## 2. Register the required CSS

Import the stylesheet once in your application's global stylesheet:

```css
@import '@elvia/elvis/css/elvis.min.css';
```

## 3. Add the optional CSS reset

If you want a generic CSS reset, add it to your application's global stylesheet:

```css
@import '@elvia/elvis/css/css-reset.css';
```

Be aware that importing the reset in an existing application may break styles that rely on browser defaults.

## 4. Install a web component

If you need an Elvis web component, choose it from the [component catalog](https://design.elvia.io/components)
and install its package as an external dependency:

```sh
npm install @elvia/elvis-<component>
```

## 5. Register the web component

Import the component once from your application's entry point. This registers the custom element:

```ts
import '@elvia/elvis-<component>';
```

If your framework requires custom elements to be enabled explicitly, follow its custom-element configuration
guidance. The component itself is framework agnostic and can be used wherever web components are supported.
