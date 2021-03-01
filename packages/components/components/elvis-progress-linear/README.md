# Elvis Progress-linear

The progress-linear component is a display of current completion of an item/data loading. The progressbar is
called upon by feeding it a value, a number between 0 and 100. The Progressbar will not display any progress
beyond these limits.

Instead of a displaying a progress range from 0 - 100, you can also use the progress linear to represent an
indeterminate amount. Simply pass "true" to the Isindeterminate boolean property.

In the instance of a failure you can pass true to the isError boolean property to display a failed progress.

## Props

- value (number) - The percentage value of completion
- isIndeterminate (boolean) - For indeterminate loading
- isError (boolean) - For displaying an error in the progress completion.

### Hierarchy of props

Note that if error is set to true the style of the progressbar will be in the error format and override any
default style with range or indeterminate style. If indeterminate is set to true, this will always override
default progressbar style with range of completion.

## REACT COMPONENT

```
import { ProgressLinear } from '@elvia/elvis-progress-linear/react';
```

```
<ProgressLinear
  value={progressValue}
  isError={false}
  isIndeterminate={false}>
</ProgressLinear>

```

## WEB COMPONENT (Angular, Vue, etc)

```
// in app.module.ts
import '@elvia/elvis-progress-linear';
```

```
// In an angular:

// app.component.ts
  progressValue = 0;
  isIndeterminate = false;
  progressError = false;

// app.component.html

<elvia-progress-linear
  [value]="progressValue"
  [isIndeterminate]="indeterminate"
  [isError]="progressError">
</elvia-progress-linear>

```
