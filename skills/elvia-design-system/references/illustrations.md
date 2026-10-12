- [Elvis Illustrations](#elvis-illustrations)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Register](#register)
  - [Use](#use)
  - [Attributes](#attributes)
    - [Color](#color)
  - [Examples](#examples)

# Elvis Illustrations

## Reference

https://design.elvia.io/brand/illustration

Each illustration is provided as a web component.

## Installation

This web component requires the `@elvia/elvis-illustrations` package. If it is not already installed, follow
the [Installation reference](./installation.md).

## Register

Import each illustration you need once from the application entry point. Browse the
[illustration catalog](https://design.elvia.io/brand/illustration) to find illustrations.

```ts
import '@elvia/elvis-illustrations/meter-reading';
import '@elvia/elvis-illustrations/no-connection';
```

## Use

```html
<elvia-illustrations-no-connection color="green"></elvia-illustrations-no-connection>
```

## Attributes

### Color

The `color` attribute accepts `grey` (default), `purple`, `green`, `blue`, or `orange`.

## Examples

**Input:** Show a no-connection illustration in an empty state.

**Output:**

```html
<elvia-illustrations-no-connection></elvia-illustrations-no-connection>
```

**Input:** Show the meter-reading illustration in blue.

**Output:**

```html
<elvia-illustrations-meter-reading color="blue"></elvia-illustrations-meter-reading>
```
