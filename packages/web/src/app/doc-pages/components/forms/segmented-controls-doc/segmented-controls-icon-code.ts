import ComponentTypeData from '../../component-type-data.interface';

const segmentedControlIconCode: ComponentTypeData = {
  type: 'icon',
  codeReact: `<SegmentedControl
  type={"icon"}
  items={[
    {iconName: 'thumbnail', iconNameSelected: 'thumbnailColor', ariaLabel: 'Segmented control example label'}, 
    {iconName: 'list', iconNameSelected: 'listColor', ariaLabel: 'Segmented control example label'}
  ]}
  valueOnChange={(event) => handleOnChange(event)}
></SegmentedControl>`,
  codeAngular: `<elvia-segmented-control
  [type]="'icon'"
  [items]="[
    {iconName: 'thumbnail', iconNameSelected: 'thumbnailColor', ariaLabel: 'Segmented control example label'}, 
    {iconName: 'list', iconNameSelected: 'listColor', ariaLabel: 'Segmented control example label'}
  ]"
  (valueOnChange)="handleOnChange($event.detail.value)"
></elvia-segmented-control>`,
  codeVue: `<elvia-segmented-control
  :type="'icon'"
  :items="[
    {iconName: 'thumbnail', iconNameSelected: 'thumbnailColor', ariaLabel: 'Segmented control example label'}, 
    {iconName: 'list', iconNameSelected: 'listColor', ariaLabel: 'Segmented control example label'}
  ]"
  @value-on-change="handleOnChange($event.detail.value)"
></elvia-segmented-control>`,
  codeNativeHTML: `<elvia-segmented-control
  type="icon"
  items="[
    {iconName: 'thumbnail', iconNameSelected: 'thumbnailColor', ariaLabel: 'Segmented control example label'}, 
    {iconName: 'list', iconNameSelected: 'listColor', ariaLabel: 'Segmented control example label'}
  ]"
  id="example-elvia-segmented-control"
></elvia-segmented-control>`,
};

export { segmentedControlIconCode };
