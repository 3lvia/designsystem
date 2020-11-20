# Elvia Checkbox

## Props

- label: string [required] - Label of checkbox
- name?: string - Name of checkbox
- id?: string - Id of checkbox
- size?: string - Size of checkbox (small, normal(default))
- disabled?: boolean - Disabled value (true, false(default))
- required?: boolean - Required value (true, false(default))
- checked?: boolean [reactOnly] - Checked value (true, false(default))
- changeHandler?: (checked: boolean) => void [reactOnly] - Runs the function every time the checked-value is
  changed
- ref?: ref [reactOnly] - Links ref to checkbox-component

## REACT COMPONENT

```
import { Checkbox } from '@elvia/checkbox/react';
```

```
<Checkbox
    ref={ref}
    checked={checked}
    label="label"
    name="name"
    id="id"
    size="size"
    changeHandler={changeHandler}
></Checkbox>
```

## WEB COMPONENT (Angular, Vue, etc)

```
import { Checkbox } from '@elvia/checkbox/web_component';
```

```
<elvia-checkbox
    label="label"
    name="name"
    id="id"
    size="size"
></elvia-checkbox>
```

### Data-binding in web component

- Listen to changes, set and get props

```
this.checkbox.nativeElement.addEventListener('props-changed', (event: any) => {
    this.checkBoxVal = event.detail.checked;
});
this.checkbox.nativeElement.setProps({ checked: true });
this.checkbox.nativeElement.getProps();
```
