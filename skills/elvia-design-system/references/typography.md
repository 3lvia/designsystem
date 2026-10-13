- [Typography](#typography)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Guidelines](#guidelines)
  - [Classes](#classes)

# Typography

## Reference

https://design.elvia.io/brand/typography

Use the Elvis typography classes for text styling.

## Installation

Install `@elvia/elvis` and import its CSS once in the application's global stylesheet. Follow the
[Elvis installation reference](./installation.md) if the package or stylesheet is not already configured.

Do NOT install or import `@elvia/elvis-typography`, it is only intended for the authors of the
3lvia/designsystem repository.

## Use

Apply the matching typography class to the element:

```html
<h1 class="e-title-lg">Page title</h1>
<p class="e-text-lead">Introduction text</p>
<h2 class="e-title-md">Page heading</h2>
<p class="e-text-md">Body text</p>
```

## Guidelines

- Use an Elvis typography class whenever one fits the text.
- Use the mono variants sparsely, only for code snippets, or when comparing data values or numbers in tables.
- Typography classes do not add margins.
- Typography automatically adjusts to the mobile and desktop viewports.
- The typography classes set `font-family`, `font-size`, `font-style`, `font-weight`, `letter-spacing`,
  `line-height`, and `text-transform`, do not add these manually.
- Do not add typography classes to text inside Elvis components. For example do not add `e-text-interactive-*`
  to buttons or links; use the component's own classes and markup.
- Do not load or reference other external fonts. Do not add custom Google Fonts, `@font-face` declarations, or
  font imports. The Elvis stylesheet imports Red Hat fonts for you.

## Alternative font

Use "Verdana" as an alternative system font. Only use it when it isn’t possible to use Red Hat, for example
digital documents and e-mail that are shared with people outside of Elvia who might not have Red Hat
installed.

## Classes

**Titles**

- `e-title-lg`,
- `e-title-md`,
- `e-title-sm`,
- `e-title-xs`,
- `e-title-xxs`,
- `e-title-caps`,

**Body text**

- `e-text-lead`, use this for leading paragraphs or introductory text.

- Large
  - Large is our main option for longer text in articles at external webpages.
  - `e-text-lg`, `e-text-lg-strong`, `e-text-lg-light`, `e-text-lg-mono`;
- Medium
  - Medium is our standard option for most text content.
  - `e-text-md`, `e-text-md-strong`, `e-text-md-light`, `e-text-md-mono`;
- Small
  - Small is the smallest variant of body text and can be used for short text in internal applications.
  - `e-text-sm`, `e-text-sm-strong`, `e-text-sm-light`, `e-text-sm-mono`;

**Interactive text**

Use the interactive text classes for text that requires user interaction. However, do not add them to Elvia
components; the components themselves set the correct typography. Only use these classes for custom implementations.

- `e-text-interactive-lg`
- `e-text-interactive-md`
- `e-text-interactive-sm`

**Special text**

- `e-text-micro`, `e-text-micro-strong`, `e-text-micro-light`. Used as descriptive text such as dates and
  values. Should not be used in paragraphs, as it is very small.
- `e-text-quote`. Only used when you have quotes in articles.
- `e-text-img`. Only used together with an image for caption.
- Deprecated (do NOT use): `e-text-label`, `e-text-option`
