# Elvia Accordion

An accordion lets the user show and hide a section of content. It let us organize information and deliver a
large amount of content in a small place.

## Props

- content (string | HTMLElement) [required] - Header of content
- label (string | string[]) - Label for the accordion. Index 0 refers to label while accordion is closed,
  index 1 refers to label when the accordion is open. Pass "none" to remove label.
- position (string) - Horizontal positon of opening button, “left”, “center” or “right”, defualt is "center"
- size (string) - Size of accordion label & button, “small”, “medium” or “large”, defualt is "medium".
- type (string) - Variants of accordion, "normal" or "overflow", defualt is "normal"

## REACT COMPONENT

```
import { Accordion } from '@elvia/elvis-accordion/react';
```

```
// content as string
<Accordion
  type="overflow"
  position="center"
  content="text string of your choice."
></Accordion>

// content as HTML element
<Accordion
  type="normal"
  position="center"
  content={
    <div>
      <h2>A heading</h2>
      <p>A paragraph</p>
    </div>
  }
></Accordion>

```

## WEB COMPONENT (Angular, Vue, etc)

```
import '@elvia/elvis-accordion';
```

```
// in .ts
accordionLabels = ['Vis mer', 'Lukk'];

// html
<elvia-accordion
  content="any text of your choice"
  [label]="accordionLabels"
  type="normal"
>
</elvia-accordion>

// content as html element

<elvia-accordion type="normal">
  <div slot="content">
    <h2>A heading</h2>
    <p>A paragraph</p>
  </div>
</elvia-accordion>
```
