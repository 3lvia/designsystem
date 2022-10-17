import ComponentTypeData from '../../component-type-data.interface';

const segmentedControlTextCode: ComponentTypeData = {
  type: 'text',
  codeReact: `<SegmentedControl
  items={[{label: 'Weekly'}, {label: 'Monthly'}, {label: 'Yearly'}]}
  valueOnChange={(event) => handleOnChange(event)}
></SegmentedControl>`,
  codeAngular: `<elvia-segmented-control
  [items]="[{label: 'Weekly'}, {label: 'Monthly'}, {label: 'Yearly'}]"
  (valueOnChange)="handleOnChange($event.detail.value)"
></elvia-segmented-control>`,
  codeVue: `<elvia-segmented-control
  :items="[{label: 'Weekly'}, {label: 'Monthly'}, {label: 'Yearly'}]"
  @value-on-change="handleOnChange($event.detail.value)"
></elvia-segmented-control>`,
  codeNativeHTML: `<elvia-segmented-control
  items="[{label: 'Weekly'}, {label: 'Monthly'}, {label: 'Yearly'}]"
  id="example-elvia-segmented-control"
></elvia-segmented-control>`,
};

export { segmentedControlTextCode };
