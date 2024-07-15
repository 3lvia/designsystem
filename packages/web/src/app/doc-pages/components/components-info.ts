import { DocPageName, Pages } from 'src/app/shared/shared.enum';

interface CategoryComponentInfo {
  title?: string;
  components: DocPageName[];
}

type Category = 'navigation' | 'action' | 'input' | 'dataDisplay' | 'feedback' | 'layout';

type ComponentInfo = {
  [category in Category]: CategoryComponentInfo[];
};

const componentsInfo: ComponentInfo = {
  navigation: [
    {
      title: 'Between pages',
      components: [Pages.Breadcrumb, Pages.Card, Pages.Header, Pages.Link],
    },
    {
      title: 'Between content',
      components: [Pages.Carousel, Pages.Pagination, Pages.Stepper, Pages.Tabs],
    },
  ],
  action: [
    {
      components: [Pages.Button, Pages.ContextMenu],
    },
  ],
  input: [
    {
      title: 'Text',
      components: [
        Pages.Autocomplete,
        Pages.Datepicker,
        Pages.DatepickerRange,
        Pages.Dropdown,
        Pages.Input,
        Pages.Search,
        Pages.Timepicker,
      ],
    },
    {
      title: 'Selection control',
      components: [
        Pages.Checkbox,
        Pages.Chip,
        Pages.RadioFilter,
        Pages.RadioPanel,
        Pages.Radiobutton,
        Pages.SegmentedControl,
        Pages.Slider,
        Pages.Toggle,
      ],
    },
    {
      title: 'Content',
      components: [Pages.DragAndDrop, Pages.FileUpload],
    },
  ],
  dataDisplay: [
    {
      title: 'Visualisation',
      components: [Pages.Graph, Pages.List, Pages.Table, Pages.Thumbnail],
    },
    {
      title: 'Overlay',
      components: [Pages.Modal, Pages.Popover, Pages.Tooltip],
    },
    {
      title: 'Categorize',
      components: [Pages.Accordion, Pages.Tag],
    },
  ],
  feedback: [
    {
      components: [
        Pages.Alert,
        Pages.Badge,
        Pages.ContentLoader,
        Pages.Outline,
        Pages.Progressbar,
        Pages.Spotlight,
        Pages.Toast,
      ],
    },
  ],
  layout: [
    {
      components: [Pages.Box, Pages.Divider],
    },
  ],
};

const allComponents: DocPageName[] = Object.values(componentsInfo)
  .flatMap((category: CategoryComponentInfo[]) => category.flatMap((component) => component.components))
  .sort((a, b) => a.localeCompare(b));

const sortComponents = (components: CategoryComponentInfo[]): CategoryComponentInfo[] => {
  return components.map((item) => ({
    ...item,
    components: item.components.sort((a, b) => a.localeCompare(b)),
  }));
};

const sortComponentsInfo = (componentsInfo: ComponentInfo): ComponentInfo => {
  for (const key in componentsInfo) {
    if (componentsInfo.hasOwnProperty(key)) {
      componentsInfo[key as Category] = sortComponents(componentsInfo[key as Category]);
    }
  }
  return componentsInfo;
};

const sortedComponentsInfo: ComponentInfo = sortComponentsInfo(componentsInfo);

export { Category, sortedComponentsInfo, allComponents };
