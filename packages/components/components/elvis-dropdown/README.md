# Elvia Dropdown

Dropdown present a list of options the user can select from and have typically 5-10 options to choose from.

The Elvia dropdown is created using the [react-select](https://github.com/JedWatson/react-select) package. It
is important to note that the value(s) selected, are objects of the same type as the input options, not just
simple string value(s).

## Props

- options (Array<object>) - Array of options that populate the dropdown menu. An option object contains two
  key value pairs, {value: string, label: string}.
- placeholder (string) - Placeholder value for the dropdown menu.
- label (string) - Label value for the dropdown element.
- isCompact (boolean) - Set the dropdown to a smaller elvia compact style.
- isDisabled (boolean) - Set dropdown to a disabled state.
- isError (boolean) - Set the dropdown to have a 2px red border style to indicate an error.
- isMulti (boolean) - Set the dropdown to accept multiple values.
- valueOnChange (function) - Gets called every time an option(s) is selected and return array of objects.

## REACT COMPONENT

```
import { Dropdown } from '@elvia/elvis-dropdown/react';

const options = [
    {
      value: 'norge',
      label: 'Norge',
    },
    {
      value: 'sverige',
      label: 'Sverige',
    },
    {
      value: 'danmark',
      label: 'Danmark',
    },
]

```

```
const [selectedOptions, setSelectedOptions] = useState([]);


<Dropdown options={options} isMulti isCompact valueOnChange={setSelectedOptions}> </Dropdown>
```

## WEB COMPONENT (Angular, Vue, etc)

```
// in module
import '@elvia/elvis-dropdown';
```

```
// ts file

  dropdownOptions = [
    {
      value: 'norge',
      label: 'Norge',
    },
    {
      value: 'sverige',
      label: 'Sverige',
    },
    {
      value: 'danmark',
      label: 'Danmark',
    },
  ];

  isCompactDropdown = true;
  isMultiDropdown = true;

// html template
<elvia-dropdown
  [options]='dropdownOptions'
  [isCompact]='isCompactDropdown'
  [isMulti]='isMultiDropdown'
  (valueOnChange)="selectedOptions = $event.detail.value"
></elvia-dropdown>
```
