# Elvia Popover

Popover is a non-modal dialog that appears over the content on the screen. Popover is used with a clickable
trigger element and should position itself relative to where there is free space on the screen.

## Props

- title (string) - Title of content
- content (string | HTMLElement) [required] - Text, images, tables or any other content (use slot in angular
  if not just text)
- trigger (HTMLElement) [required] - The element the user clicks to open the popover (pass in as slot, in
  react as prop)
- posX (string) - Position horizontally (left, right, center(default))
- posY (string) - Position vertically (bottom, top(default))
- hasCloseBth (boolean) - Determines if the close button in the upper right corner should be visible (true
  (default), false)

## REACT COMPONENT

```
import { Popover } from '@elvia/elvis-popover/react';
```

```
<Popover
    title="title"
    content="content"
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
    content="content"
    posX="posX"
    posY="posY"
>
    <button slot="trigger">trigger</button>
</Popover>
```
