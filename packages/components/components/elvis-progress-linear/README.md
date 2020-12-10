# Elvis Progress-linear

The linear progress bar is a display of current completion of an item/data loading. The progressbar is called
upon by feeding it a rangeValue data, a number between 0 and 100. The Progressbar will not display any
progress beyond these limits, and will notify your system by an error message in the console. In the instance
of a failure you can pass an error boolean property to display a failed progress. Instead of a displaying a
progress range from 0 - 100, you can also use the progress bar in its indeterminate style. Simply pass "true"
to the indeterminate boolean property

## Props

- rangeValue (number) - The percentage value of completion
- indeterminate (boolean) - For indeterminate loading style
- error (boolean) - For displaying an error in the progress completion.

### Hierarchy of props

Note that if error is set to true the style of the progressbar will be in the error format and override any
default style with range or indeterminate style. If indeterminate is set to true, this will always override
default progressbar style with range of completion.

## REACT COMPONENT

```
import { Progressbar } from '@elvia/elvis-progress-linear/react';
```

```
<Progressbar
    rangeValue={progressValue}
    error={false}
    indeterminate={false}>
</Progressbar>

```

## WEB COMPONENT (Angular, Vue, etc)

```
// in app.module.ts
import '@elvia/elvis-progress-linear';
```

```
// props are set throug setProp(), see the Data-binding section for an example
<elvis-progress-linear #progressbar ></elvis-progress-linear>

```

### Data-binding in web component

- Listen to changes, set and get props

```
  this.progressbar.nativeElement.addEventListener('props-changed', (event: any) => {
      this.progressValue = event.detail.rangeValue;
    });
this.progressbar.nativeElement.setProps({ rangeValue: 10, indeterminate: false, error: false });
this.progressbar.nativeElement.getProps();
```
