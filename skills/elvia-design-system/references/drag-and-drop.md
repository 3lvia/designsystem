- [Drag and Drop (`e-dragdrop`)](#drag-and-drop-e-dragdrop)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Examples](#examples)
  - [Classes](#classes)

# Drag and Drop (`e-dragdrop`)

## Reference

https://design.elvia.io/components/drag-and-drop

Drag and Drop is a CSS-based component, consisting of only CSS classes.

## Installation

This component requires the `@elvia/elvis` package. See [Installation](./installation.md).

## Use

```html
<div class="e-dragdrop app-drop-area"></div>
```

Define a class in your application to set its size:

```css
.app-drop-area {
  width: 300px;
  height: 150px;
}
```

- The base class adds a dashed border, rounded corners, and a grid that centers its content.
- Set the dimensions in your application. The class has no default width or height.
- The component provides no content, file input, drag event handlers, file validation, or upload logic.
- Your application handles drag events and adds or removes `e-dragdrop--dragover`.
- The modifier changes the border color only. It does not enable file drops.
- For file controls and upload states, follow the [File Upload reference](./file-upload.md) and
  [File Upload documentation](https://design.elvia.io/components/file-upload).

## Guidelines

### When to use

- Use `e-dragdrop` for a content area within a custom drag and drop interface.

### When not to use

- For a file input layout, follow the [File Upload reference](./file-upload.md) and
  [File Upload documentation](https://design.elvia.io/components/file-upload).
- For upload progress, use [Progress linear](./progress-linear.md).

## Examples

**Input:** Show the border state when an item is over the area.

**Output:**

```html
<div class="e-dragdrop e-dragdrop--dragover"></div>
```

Add the modifier during a drag over the area. Remove it when the drag leaves or the drop completes.

## Classes

Classes use BEM.

Base: `e-dragdrop`

**Modifiers**

- `e-dragdrop--dragover`
