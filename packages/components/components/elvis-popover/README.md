# Elvia Popover

Popover is a non-modal dialog that appears over the content on the screen. Popover is used with a clickable
trigger element and should position itself relative to where there is free space on the screen.

## Props

- Title (string) - Title of content
- Description (string) [required] - Description
- Trigger element (HTMLElement) [required] - The element triggering opening of popover (pass in as slot, in
  react as prop)
- PosX (string) - Position horizontally (left, right, center(default))
- PosY (string) - Position vertically (bottom, top(default))
- noClose (boolean) - Determines if the close button in the upper right corner should be removed (true,
  false(default))

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
