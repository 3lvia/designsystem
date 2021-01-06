# Elvia Checkbox

## Props

- items (TabItem[label: string, isDisabled: boolean]) [required] - Items getting converted to tabs.
- value (number) [required] - Index of selected tab.
- valueOnChange (function) [reactOnly] - Gets called every time the value is changed.

## REACT COMPONENT

```
import { Tabs } from '@elvia/elvis-tabs/react';
```

```
<Tabs
    items={items}
    value={selectedState}
    valueOnChange={setSelectedState}
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
