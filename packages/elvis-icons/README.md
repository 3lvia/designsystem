# Elvis Icon

This package provides a way to use Elvia icons as web components in a tree-shakable way.

This package does not provide the icons themselves, but rather a way of easily integrating SVGs from
<code>@elvia/elvis-assets-icons</code> in an application.

## How to use

To use icons, follow these steps:

1. Install this package (e.g. `npm add @elvia/elvis-icons`) and the
   [icon assets package](https://www.npmjs.com/package/@elvia/elvis-assets-icons) (e.g.
   `npm add @elvia/elvis-assets-icons`). Must be done one time. This package provides the wrapper element used
   to show the icons in the DOM, whereas the assets package provides the actual icon data.
2. Register the wanted icons in the `@elvia/elvis-icons` icon store. This should be done somewhere near the
   root of the application, and each icon only needs to be registered once.

```ts
import { clock, download } from '@elvia/elvis-assets-icons';
import { addIcons } from '@elvia/elvis-icons';

addIcons({
  download: { svg: download.getIcon() },
  clock: { svg: clock.getIcon() },
});
```

3. The `<elvia-icon>` custom element is registered when any import from `@elvia/elvis-icons` is done. The
   element can now be used anywhere in the application. Note that the name corresponds to the name registered
   in the `addIcons`-object.

```html
<div>
  <elvia-icon name="download"></elvia-icon>
  <elvia-icon name="clock"></elvia-icon>
</div>
```

3. It is possible to change sizes of the icon with the `size` attribute. The available sizes range from `xxs`
   to `xxl`.

```html
<div>
  <elvia-icon name="download" size="xl"></elvia-icon>
  <elvia-icon name="clock" size="sm"></elvia-icon>
</div>
```

# **NB**: Should this be changed?

4. The `<elvia-icon>` respects the icon-related size and color classes from the `@elvia/elvis` package. It is
   therefore possible to set colors and sizes through the `.e-icon--color-COLOR` and `.e-icon--SIZE` classes.

```html
<div>
  <elvia-icon name="download" class="e-icon--xs"></elvia-icon>
  <elvia-icon name="clock" class="e-icon--lg e-icon--color-positive"></elvia-icon>
</div>
```

## Use with React

To use this package in React, instead import from `@elvia/elvis-icons/react`, and use the
`<Icon />`-component.

```tsx
import { addIcons, Icon } from '@elvia/elvis-icons/react';
import { download, clock } from '@elvia/elvis-assets-icons';

addIcons({
    download: { svg: download.getIcon() },
    clock: { svg: clock.getIcon() }
});

export default App = () => {
    ...
    return (
        <div>
            <Icon name="download" />
            <Icon name="clock" />
        </div>
    )
}
```
