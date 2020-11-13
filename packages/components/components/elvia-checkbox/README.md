# Elvia Checkbox

## Props

- Label (string) [required] - Label of checkbox
- Description (string) - Description
- Trigger element (HTMLElement) - The element triggering opening of popover (pass in as slot, in react as
  prop)

## REACT COMPONENT

```
import { Checkbox } from '@elvia/checkbox/react';
```

```
<Checkbox
    #checkbox
    label="label"
    name="name"
    id="id"
    size="size"
></Checkbox>
```

## WEB COMPONENT (Angular, Vue, etc)

```
import { Checkbox } from '@elvia/checkbox/web_component';
```

```
<elvia-checkbox
    #checkbox
    label="label"
    name="name"
    id="id"
    size="size"
></elvia-checkbox>
```

### Data-binding

- Listen to changes, set and get props

```
this.checkbox.nativeElement.addEventListener('props-changed', (event: any) => {
    this.checkBoxVal = event.detail.checked;
});
this.checkbox.nativeElement.setProps({ checked: true });
this.checkbox.nativeElement.getProps();
```
