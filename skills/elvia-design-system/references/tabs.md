- [Tabs (`<elvia-tabs>`)](#tabs-elvia-tabs)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [items](#items)
    - [value](#value)
    - [valueOnChange](#valueonchange)
    - [ariaLabel](#arialabel)
    - [isInverted](#isinverted)
    - [hasManualActivation](#hasmanualactivation)
    - [tabIdPrefix](#tabidprefix)
  - [Guidelines](#guidelines)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Tabs (`<elvia-tabs>`)

## Reference

https://design.elvia.io/components/tabs

## Installation

This web component requires the `@elvia/elvis-tabs` package. If it is not already installed, follow the
[Installation reference](./installation.md).

## Use

`<elvia-tabs>` renders the tablist and tracks its selection. The caller listens to `valueOnChange` and shows
the matching panel.

For updates to `value` or `items` after initialization, follow the shared
[attribute and property guidance](./web-components.md#attributes-and-properties).

## Attributes

### items

Required. An array of strings, one per tab. Order sets the tab order. See
[Arrays and objects](./web-components.md#arrays-and-objects) for how to pass the value.

### value

The index of the selected tab. Defaults to `0`.

### valueOnChange

Fires when a tab is activated, with its index as the value. Bind `value` only to control the selection
externally. See [Events](./web-components.md#events) for the event shape and naming.

### ariaLabel

Labels the tablist for assistive technology. Describe what the tabs are choosing between (e.g. the section of
the page they control), not "Tabs".

### isInverted

A boolean. Set it when the tabs sit on a dark/inverted background.

### hasManualActivation

A boolean. Defaults to `false` (automatic activation): arrow keys immediately move focus and select the tab.
Set it to `true` for manual activation: arrow keys only move focus, and the user must press Enter or Space to
select. Prefer manual activation when selecting a tab is expensive, e.g. it triggers a network request.

### tabIdPrefix

A string. Disambiguates the generated tab and tabpanel ids when more than one `<elvia-tabs>` instance exists
on the same page.

## Guidelines

Use tabs to divide content into sections at the same level of the hierarchy that are related. Exactly one tab
must be selected. Use 2–6 tabs with short, descriptive, unique labels of no more than two words. Scroll
buttons appear automatically when tabs overflow and are not configurable.

## Accessibility

- The component sets the tab roles, `aria-selected`, and `aria-controls`.
- Tab ids follow `ewc-tabs-{tabIdPrefix-}{index}`; the matching panel id is
  `ewc-tabpanel-{tabIdPrefix-}{index}` (0-based). The caller must render a panel for every tab with
  `role="tabpanel"`, that id, and `aria-labelledby` pointing at the corresponding tab id, so every
  `aria-controls` resolves. Use `tabIdPrefix` to keep ids unique when multiple `<elvia-tabs>` instances exist
  on the same page.
- Always set `ariaLabel`.

## Examples

**Input:** "A settings page with sections for profile, security, and notifications, one visible at a time."

**Output:**

```html
<elvia-tabs items='["Profil","Sikkerhet","Varsler"]' value="0" ariaLabel="Kontoinnstillinger"></elvia-tabs>

<section id="ewc-tabpanel-0" aria-labelledby="ewc-tabs-0" role="tabpanel">Profil</section>
<section id="ewc-tabpanel-1" aria-labelledby="ewc-tabs-1" role="tabpanel" hidden>Sikkerhet</section>
<section id="ewc-tabpanel-2" aria-labelledby="ewc-tabs-2" role="tabpanel" hidden>Varsler</section>

<script>
  const tabs = document.querySelector('elvia-tabs');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  tabs.addEventListener('valueOnChange', (event) => {
    panels.forEach((panel, index) => {
      panel.hidden = index !== event.detail.value;
    });
  });
</script>
```
