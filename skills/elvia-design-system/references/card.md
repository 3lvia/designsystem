- [Card (`<elvia-card>`)](#card-elvia-card)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [icon](#icon)
    - [iconHover](#iconhover)
    - [heading](#heading)
    - [headingLevel](#headinglevel)
    - [description](#description)
    - [type](#type)
    - [borderColor](#bordercolor)
    - [width](#width)
    - [height](#height)
    - [minWidth](#minwidth)
    - [maxWidth](#maxwidth)
    - [maxDescriptionLines](#maxdescriptionlines)
    - [maxHeadingLines](#maxheadinglines)
    - [tag](#tag)
    - [cornerIcon](#cornericon)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Card (`<elvia-card>`)

## Reference

https://design.elvia.io/components/card

`<elvia-card>` is a web component.

## Installation

This web component requires the `@elvia/elvis-card` package. Follow the
[Installation reference](./installation.md).

## Use

```html
<elvia-card heading="Forbruk"></elvia-card>
```

- Set `slot` to `icon` and `iconHover` for icon elements on simple cards.
- Set `type` to `detail` to display `tag` or `cornerIcon`.
- Set `slot` to `cornerIcon` for a detail-card icon element.

## Attributes

### icon

Set `icon` to text for a number or short visual label. For an icon element, use the `icon` slot.

```html
<elvia-card heading="Forbruk">
  <e-icon slot="icon" name="graphBar" size="lg"></e-icon>
</elvia-card>
```

### iconHover

Set `iconHover` to the text or icon element that replaces `icon` on hover. Use the `iconHover` slot for an
icon element.

```html
<elvia-card heading="Forbruk">
  <e-icon slot="icon" name="graphBar" size="lg"></e-icon>
  <e-icon slot="iconHover" name="graphBarColor" size="lg"></e-icon>
</elvia-card>
```

### heading

Set `heading` to the card title.

```html
<elvia-card heading="Forbruk"></elvia-card>
```

### headingLevel

Allowed values: `h1` through `h6`. The default is `h3`.

Set the level to match the page heading order.

```html
<elvia-card heading="Forbruk" headingLevel="h2"></elvia-card>
```

### description

Keep the description short on a simple card. A simple card shows one line. Use a detail card for longer
descriptions.

```html
<elvia-card heading="Forbruk" description="Siste måleverdier"></elvia-card>
```

### type

Allowed values: `simple` and `detail`. The default is `simple`.

```html
<elvia-card type="detail" heading="Varsler"></elvia-card>
```

### borderColor

Allowed values: `none`, `green`, `blue-berry`, `blueBerry`, `blue`, `red`, and `orange`. The default is
`none`. This colored line appears only on simple cards.

```html
<elvia-card borderColor="green" heading="Forbruk"></elvia-card>
```

### width

The default is `100%`. Set a CSS length value to change the card width.

```html
<elvia-card heading="Forbruk" width="20rem"></elvia-card>
```

### height

Set a CSS length value to change the card height. A simple card is square when `height` is not set.

```html
<elvia-card heading="Forbruk" height="12rem"></elvia-card>
```

### minWidth

Set the minimum width in pixels. The default is `150` for simple cards and `250` for detail cards. The
component does not allow a lower minimum.

```html
<elvia-card type="detail" minWidth="300" heading="Varsler"></elvia-card>
```

### maxWidth

Set the maximum width in pixels. The default is `250` for simple cards and `600` for detail cards. The
component does not allow a higher maximum.

```html
<elvia-card type="detail" maxWidth="500" heading="Varsler"></elvia-card>
```

### maxDescriptionLines

This attribute applies only to detail cards. The default is `3`. The component clamps extra lines and adds an
ellipsis.

```html
<elvia-card type="detail" maxDescriptionLines="2" description="Lang beskrivelse"></elvia-card>
```

### maxHeadingLines

The default is `1` for simple cards and `2` for detail cards. The component clamps extra lines and adds an
ellipsis.

```html
<elvia-card type="detail" maxHeadingLines="3" heading="Varsler ved lynnedslag"></elvia-card>
```

### tag

This attribute applies only to detail cards.

```html
<elvia-card type="detail" heading="Varsler" tag="Sikkerhet"></elvia-card>
```

### cornerIcon

Set `type` to `detail` to show a corner icon. Use the `cornerIcon` slot for an icon element.

```html
<elvia-card type="detail" heading="Varsler">
  <e-icon slot="cornerIcon" name="lock" size="sm"></e-icon>
</elvia-card>
```

## Guidelines

### When to use

- Use a simple card for a short label and a visual item.
- Use a detail card for longer descriptions or a tag.
- Use a colored line to show a useful category or status.

### When not to use

- Do not set the same colored line on every card without a clear reason.
- If the text is more describable than the icon, consider using Action link group instead.
- Do not use different types of cards on the same page. The same goes for the description version, use
  description on all or none.
- Do not use card as a wrapper for other content or layout purposes.

## Accessibility

Wrap a navigational card in an `<a>` element. Do not skip heading levels; set `headingLevel` to match the page
heading order.

## Examples

**Input:** Create a link card with a number as its visual item.

**Output:**

```html
<a href="/forbruk">
  <elvia-card heading="Forbruk">
    <span slot="icon" aria-hidden="true">12</span>
  </elvia-card>
</a>
```

**Input:** Show more information and a category in a detail card.

**Output:**

```html
<elvia-card
  type="detail"
  heading="Varsler ved lynnedslag"
  description="Les om prognoser ved lyn og påvirkningen på strømnettet."
  tag="Sikkerhet"
></elvia-card>
```
