- [Carousel (`<elvia-carousel>`)](#carousel-elvia-carousel)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [items](#items)
    - [type](#type)
    - [hasConfirmationCheckmark](#hasconfirmationcheckmark)
    - [onFinish](#onfinish)
    - [value](#value)
    - [valueOnChange](#valueonchange)
    - [hasAnimation](#hasanimation)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Carousel (`<elvia-carousel>`)

## Reference

https://design.elvia.io/components/carousel#Overview

`<elvia-carousel>` is a web component.

## Installation

Install `@elvia/elvis-carousel`. See [Elvis Installation](./installation.md).

## Use

Add one `item-N` slot for each item. Number slots from 1 without gaps. Add `heading-N` slots when needed.

```html
<elvia-carousel>
  <h3 slot="heading-1">Er strømbruddet kun hos deg?</h3>
  <div slot="item-1">Sjekk om naboene også mangler strøm.</div>
  <h3 slot="heading-2">Har flere mistet strømmen?</h3>
  <div slot="item-2">Meld fra om strømbruddet.</div>
</elvia-carousel>
```

You can also set `items` to a number. This shows the navigation only. Add your own item content and transition
animation.

## Attributes

### items

Use numbered `item-N` and optional `heading-N` slots, or set `items` to a number to show navigation without
content.

```html
<elvia-carousel items="3"></elvia-carousel>
```

### type

Allowed values are `loop` and `linear`. The default is `loop`. Set `linear` to stop at the first and last
items.

```html
<elvia-carousel type="linear"></elvia-carousel>
```

### hasConfirmationCheckmark

Set this to `true` with `type="linear"` to replace the last next button with a confirmation button.

```html
<elvia-carousel type="linear" hasconfirmationcheckmark></elvia-carousel>
```

### onFinish

Listen for this event when the user selects the confirmation button. It requires `type="linear"` and
`hasConfirmationCheckmark`.

```js
carousel.addEventListener('onFinish', () => {
  closeDialog();
});
```

### value

The selected item index starts at `0`. Set this property to select an item.

```js
carousel.value = 1;
```

### valueOnChange

Listen for this event to get the selected item index. See [Web components](./web-components.md).

```js
carousel.addEventListener('valueOnChange', (event) => {
  console.log(event.detail.value);
});
```

### hasAnimation

The default is `true`. Set this to `false` to disable transitions between items.

```html
<elvia-carousel hasAnimation="false"></elvia-carousel>
```

## Guidelines

### When to use

- Use a carousel for a visual collection when users need to focus on a few items at a time.
- Use a carousel for a collection of related items.

### When not to use

- Do not use a carousel for non-visual items, such as links or paragraphs.
- Do not use a carousel for form split in multiple steps. Use [Stepper](./stepper.md) instead.
- Use a [list](./list.md) instead of a carousel with more than five items.

## Accessibility

- Use the left and right arrow keys to navigate the controls and pages.
- Use Space or Enter to select a page.

## Examples

**Input:** Show three related images with headings.

**Output:**

```html
<elvia-carousel>
  <h3 slot="heading-1">Er strømbruddet kun hos deg?</h3>
  <img slot="item-1" alt="" src="/assets/carousel/el1.jpeg" />
  <h3 slot="heading-2">Har flere mistet strømmen?</h3>
  <img slot="item-2" alt="" src="/assets/carousel/el2.jpeg" />
  <h3 slot="heading-3">Vær forberedt på strømbrudd</h3>
  <img slot="item-3" alt="" src="/assets/carousel/el3.jpeg" />
</elvia-carousel>
```

**Input:** Close a dialog after the user confirms the last onboarding step.

**Output:**

```html
<elvia-carousel type="linear" hasconfirmationcheckmark>
  <div slot="item-1">Velkommen.</div>
  <div slot="item-2">Du er klar til å begynne.</div>
</elvia-carousel>
```

```js
carousel.addEventListener('onFinish', () => {
  closeDialog();
});
```
