- [File Upload (`e-fileupload`)](#file-upload-e-fileupload)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)
  - [Classes](#classes)

# File Upload (`e-fileupload`)

## Reference

https://design.elvia.io/components/file-upload

File Upload is a CSS-based component, consisting of only CSS classes.

## Installation

This component requires the `@elvia/elvis` package. See [Installation](./installation.md).

## Use

```html
<div class="e-fileupload">
  <div class="e-fileupload__icon">
    <e-icon name="imageAddColor"> </e-icon>
  </div>
  <div class="e-fileupload__description">Dra og slipp eller</div>
  <div class="e-fileupload__input">
    <input type="file" id="file-upload" />
    <label for="file-upload">
      <e-icon name="upload"> </e-icon>
      Velg fil
    </label>
  </div>
</div>
```

- Your application handles drag events and adds or removes `e-fileupload--dragover`.
- The modifier changes the border color only.
- Your application handles file selection, file validation, upload requests, and errors.
- The component has no upload or uploaded state classes.
- See the [File Upload documentation](https://design.elvia.io/components/file-upload) for the upload and
  uploaded designs. These are in Figma only and the designsystem does not provide CSS classes for these
  states.

## Guidelines

### When to use

- Use File Upload for a file input with a visible file selection label and a drop area.

### When not to use

- For a custom content area without the file input layout, use [Drag and Drop](./drag-and-drop.md).
- For upload progress alone, use [Progress linear](./progress-linear.md).

## Accessibility

- The label `for` value MUST match the file input `id`.
- Keep the file selection control available when the interface also supports file drops.

## Examples

**Input:** Show the border state when a file is over the area.

**Output:**

```html
<div class="e-fileupload e-fileupload--dragover">
  <div class="e-fileupload__icon">
    <e-icon name="imageAddColor"> </e-icon>
  </div>
  <div class="e-fileupload__description">Dra og slipp eller</div>
  <div class="e-fileupload__input">
    <input type="file" id="file-upload" />
    <label for="file-upload">
      <e-icon name="upload"> </e-icon>
      Velg fil
    </label>
  </div>
</div>
```

## Classes

Classes use BEM.

Base: `e-fileupload`

**Elements**

- `e-fileupload__description`
- `e-fileupload__icon`
- `e-fileupload__input`

**Modifiers**

- `e-fileupload--dragover`
