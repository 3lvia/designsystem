# Elvia Popover

Popover is a non-modal dialog that appears over the content on the screen. Popover is used with a clickable
trigger element and should position itself relative to where there is free space on the screen.

## Props

- title (string) - Title of content
- description (string) - Text content
- customContent (HTMLElement) - If content that is not only text (text, images, tables etc.)
- trigger (HTMLElement) [required] - The element the user clicks to open the popover (pass in as slot, in
  react as prop)
- posX (string) - Position horizontally (left, right, center(default))
- posY (string) - Position vertically (bottom, top(default))
- noClose (boolean) - Determines if the close button in the upper right corner should be removed (true,
  false(default))
- width (string) - For setting a custom width

## REACT COMPONENT

```
import { Popover } from '@elvia/elvis-popover/react';
```

```
<Popover
    title="title"
    description="description"
    trigger={<button>trigger</button>}
    posX="posX"
    posY="posY"
></Popover>
```

## WEB COMPONENT (Angular, Vue, etc)

```
import { Popover } from '@elvia/elvis-popover';
```

```
<Popover
    title="title"
    description="description"
    posX="posX"
    posY="posY"
>
    <button slot="trigger">trigger</button>
</Popover>
```
