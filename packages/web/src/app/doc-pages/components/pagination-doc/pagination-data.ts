import changelogJson from 'src/assets/changelogs/elvis-pagination/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const paginationData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Pagination',
  attributes: {
    value: {
      isRequired: false,
      type: 'object',
      description:
        'The range of elements that should be visible in the paginator from star. "start" represents first element index and "end" represents last element index. {start: number, end: number}',
      cegDisplayName: 'value',
      default: '{ start: undefined, end: undefined }',
    },
    numberOfElements: {
      isRequired: true,
      type: 'number',
      description: 'Total amount of rows/objects in a table that is display.',
      default: 0,
    },
    lastNumberLimit: {
      isRequired: false,
      type: 'number',
      description:
        'Hides the last number in pagination if numberOfElements is equal or exceeds the lastNumberLimit.',
    },
    dropdownMenuPosition: {
      isRequired: false,
      type: 'top | bottom | auto',
      description: `Set the position of the dropdown menu.`,
      default: 'bottom',
    },
    alignment: {
      isRequired: false,
      type: 'left | right',
      description: 'Alignment of the paginator.',
      default: 'left',
    },
    dropdownItems: {
      isRequired: false,
      type: 'object',
      description:
        'Options available in the pagination dropdown menu, set as array of objects with keys of:  {value: string, label: string}',
      default: `[
        {
          value: '10',
          label: '10'
        },
        ...
        {
          value: '40',
          label: '40'
        },
      ]`,
    },
    dropdownSelectedItemIndex: {
      isRequired: false,
      type: 'number',
      description: `Set the default value of the dropdown in the paginator by passing the index number of the dropdownItems object you want as a default value.`,
      default: '0',
    },
    dropdownSelectedItemIndexOnChange: {
      isRequired: false,
      type: '(value: number) => CustomEvent',
      description: `Gets called every time a new value in the pagination dropdown is chosen, returns the index of the chosen value from the available dropdownItems.`,
    },
    labelOptions: {
      isRequired: false,
      type: 'object',
      description: 'Labels used in the paginator.',
      default: `{
        displaying: 'Viser', 
        of: 'av',
        label: 'elementer'
      }`,
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: object) => CustomEvent',
      description: `Gets called every time a selection range is updated and return a value object with start and end key value pairs.`,
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the pagination.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the pagination. Example: {marginTop: '8px', width: '100%'}",
    },
  },
  codeReact: `<Pagination numberOfElements={156}
  valueOnChange={(event) => handleOnChange(event)} >
</Pagination>`,
  codeAngular: `<elvia-pagination
  [numberOfElements]="156"
  (valueOnChange)="handleOnChange($event.detail.value)">
</elvia-pagination>`,
  codeVue: `<elvia-pagination
  :numberOfElements="156"
  @value-on-change="handleOnChange($event.detail.value)">
</elvia-pagination>`,
  codeNativeHTML: `<elvia-pagination
  id="example-elvia-pagination"
  ></elvia-pagination>`,

  codeNativeScript: `
  const pagination = document.getElementById('example-elvia-pagination');
    const numberOfElements = 156;
    pagination.setProps({'numberOfElements': numberOfElements})
    pagination.addEventListener('valueOnChange', (event) => {
      console.log('Current selection range of paginator is : ', event.detail.value)
    });
  `,
};
