# Elvis Icon

This package provides a way to use Elvia icons as web components in a tree-shakable way. 
<div style="border-left: solid 3px rgb(68, 147, 248); padding-left: 16px;">
    <div style="display: flex; align-items: center; color: rgb(68, 147, 248)">
        <svg style="margin-right: 8px; fill: rgb(68, 147, 248)" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>
        Note
    </div>
    This package does not provide the icons themselves, but rather a way of easily integrating SVGs from <code>@elvia/elvis-assets-icons</code> in an application.
</div>

## How to use

To use icons, follow these steps:

1. Install this package (e.g. `npm add @elvia/elvis-icons`) and the [icon assets package](https://www.npmjs.com/package/@elvia/elvis-assets-icons) (e.g. `npm add @elvia/elvis-assets-icons`). Must be done one time. 
This package provides the wrapper element used to show the icons in the DOM, whereas the assets package provides the actual icon data.
2. Register the wanted icons in the `@elvia/elvis-icons` icon store. This should be done somewhere near the root of the application, and each icon only needs to be registered once.
```ts
import { addIcons } from '@elvia/elvis-icons';
import { download, clock } from '@elvia/elvis-assets-icons';

addIcons({
    download: { svg: download.getIcon() },
    clock: { svg: clock.getIcon() }
});
```

3. The `<elvia-icon>` custom element is registered when any import from `@elvia/elvis-icons` is done. The element can now be used anywhere in the application. Note that the name corresponds to the name registered in the `addIcons`-object.
```html
<div>
    <elvia-icon name="download"></elvia-icon>
    <elvia-icon name="clock"></elvia-icon>
</div>
```

## Use with React

To use this package in React, instead import from `@elvia/elvis-icons/react`, and use the `<Icon />`-component.
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