import ComponentTypeData from '../../component-type-data.interface';

const segmentedControlIconCode: ComponentTypeData = {
  type: 'icon',
  codeReact: `<SegmentedControl
  type={"icon"}
  items={['thumbnail', 'list']}
  valueOnChange={(event) => handleOnChange(event)}
></SegmentedControl>`,
  codeAngular: `<elvia-segmented-control
  [type]="'icon'"
  [items]="['thumbnail', 'list']"
  (valueOnChange)="handleOnChange($event.detail.value)"
></elvia-segmented-control>`,
  codeVue: `<elvia-segmented-control
  :type="'icon'"
  :items="['thumbnail', 'list']"
  @value-on-change="handleOnChange($event.detail.value)"
></elvia-segmented-control>`,
  codeNativeHTML: `<elvia-segmented-control
  type="icon"
  items="['thumbnail', 'list']"
  id="example-elvia-segmented-control"
></elvia-segmented-control>`,
};

export { segmentedControlIconCode };
