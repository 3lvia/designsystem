# Elvis Progress-linear

The progress-linear component is a display of current completion of an item/data loading. The progressbar is
called upon by feeding it a value, a number between 0 and 100. The Progressbar will not display any progress
beyond these limits.

Instead of a displaying a progress range from 0 - 100, you can also use the progress linear to represent an
indeterminate amount. Simply pass "true" to the indeterminate boolean property, and the progress-linear
componenent will have a undetermninate loading style, and not visualising any value input given.

In the instance of a failure you can pass an error boolean property to display a failed progress.

## Props

- value (number) - The percentage value of completion
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
<ProgressLinear
  rangeValue={progressValue}
  error={false}
  indeterminate={false}>
</ProgressLinear>

```

## WEB COMPONENT (Angular, Vue, etc)

```
// in app.module.ts
import '@elvia/elvis-progress-linear';
```

```
// props are set throug setProp(), see the Data-binding section for an example with the #progressbar element
<elvis-progress-linear #progressbar ></elvis-progress-linear>

// In an ea
<elvis-progress-linear
  rangeValue="50"
  error="false"
  indeterminate="false" >
</elvis-progress-linear>


```

### Data-binding in web component

- Listen to changes, set and get props

```
this.progressbar.nativeElement.setProps({ rangeValue: 10, indeterminate: false, error: false });

```
