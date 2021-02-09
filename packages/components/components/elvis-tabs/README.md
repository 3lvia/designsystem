# Elvia Tabs

Tabs are used to divide content into sections and let the user navigate between one section at a time. Use
tabs when the content is at the same level of the hierarchy and are related. It should always be one tab
selected by default.

### Number of tabs

Tabs with more than 6 options should be avoided and never fewer than 2 tabs.

### Option label

Keep the option label name of a tab short, descriptive and unique. Should not be any longer than two words.

## Props

- items (TabItem[label: string]) [required] - Items getting converted to tabs.
- value (number) [required] - Index of selected tab.
- valueOnChange (function) - Gets called every time the value is changed.

## REACT COMPONENT

```
import { Tabs } from '@elvia/elvis-tabs/react';
```

```
<Tabs
    items={items}
    value={selectedValue}
    valueOnChange={setSelectedValue}
></Tabs>
```

## WEB COMPONENT (Angular, Vue, etc)

```
import '@elvia/elvis-tabs';
```

```
<elvia-tabs
    [items]="items"
    [value]="value"
    (valueOnChange)="value = $event.detail.value"
></elvia-tabs>
```
