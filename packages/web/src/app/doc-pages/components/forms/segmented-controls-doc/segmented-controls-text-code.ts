import ComponentTypeData from '../../component-type-data.interface';

const segmentedControlTextCode: ComponentTypeData = {
  type: 'text',
  codeReact: `<SegmentedControl
  items={[{name: 'Weekly'}, {name: 'Monthly'}, {name: 'Yearly'}]}
  valueOnChange={(event) => handleOnChange(event)}
></SegmentedControl>`,
  codeAngular: `<elvia-segmented-control
  [items]="[{name: 'Weekly'}, {name: 'Monthly'}, {name: 'Yearly'}]"
  (valueOnChange)="handleOnChange($event.detail.value)"
></elvia-segmented-control>`,
  codeVue: `<elvia-segmented-control
  :items="[{name: 'Weekly'}, {name: 'Monthly'}, {name: 'Yearly'}]"
  @value-on-change="handleOnChange($event.detail.value)"
></elvia-segmented-control>`,
  codeNativeHTML: `<elvia-segmented-control
  items="[{name: 'Weekly'}, {name: 'Monthly'}, {name: 'Yearly'}]"
  id="example-elvia-segmented-control"
></elvia-segmented-control>`,
};

export { segmentedControlTextCode };
