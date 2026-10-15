- [Box (`<elvia-box>`)](#box-elvia-box)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [content](#content)
    - [heading](#heading)
    - [isColored](#iscolored)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Box (`<elvia-box>`)

## Reference

https://design.elvia.io/components/box

`<elvia-box>` is a web component.

## Installation

This web component requires the `@elvia/elvis-box` package. If it is not already installed, follow the
[Installation reference](./installation.md).

## Use

Provide box content with the `content` attribute or slot. Add an optional heading with the `heading` attribute
or slot.

```html
<elvia-box>
  <div slot="content">Innholdet ditt her</div>
</elvia-box>
```

## Attributes

### content

Set `content` to text, or provide an element in the `content` slot for structured content such as grouped
information and controls.

```html
<elvia-box content="Kontodetaljer"></elvia-box>
```

### heading

Set `heading` to text, or provide an element in the `heading` slot for formatted content.

```html
<elvia-box heading="Kontodetaljer" content="Kontoinformasjon"></elvia-box>
```

### isColored

Boolean. The default is `false`. Set to `true` to show the green line.

```html
<elvia-box isColored="true" content="Viktig informasjon"></elvia-box>
```

## Guidelines

### When to use

- Group related content.
- Separate information from the rest of the page.

### When not to use

- Avoid the colored line on multiple boxes on the same page.

## Examples

**Input:** Group related details and an action in one box.

**Output:**

```html
<elvia-box heading="Detaljer">
  <div slot="content">
    <p><strong>Navn:</strong> Eksempel</p>
    <p><strong>Status:</strong> <span class="e-tag e-tag--positive">Aktiv</span></p>
    <button type="button" class="e-btn">
      <span class="e-btn__title">Rediger</span>
    </button>
  </div>
</elvia-box>
```
