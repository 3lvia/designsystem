import { Routes } from '@angular/router';

import { Pages } from 'src/app/shared/shared.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components-doc.component').then((m) => m.ComponentsDocComponent),
    title: 'Components',
  },
  {
    path: 'accordion-group',
    redirectTo: Pages.Accordion,
    pathMatch: 'full',
    title: 'Accordion Group',
  },
  {
    path: Pages.CssLibrary,
    loadComponent: () =>
      import('./css-library-doc/css-library-doc.component').then((m) => m.CSSLibraryDocComponent),
    title: 'Elvis CSS Library',
  },
  {
    path: Pages.Accordion,
    loadComponent: () =>
      import('./accordion-doc/accordion-doc.component').then((m) => m.AccordionDocComponent),
    title: 'Accordion',
  },
  {
    path: Pages.Alert,
    loadComponent: () =>
      import('./alert-messages/alert-messages.component').then((m) => m.AlertMessagesComponent),
    title: 'Alert',
  },
  {
    path: Pages.AppBridge,
    loadComponent: () =>
      import('./app-bridge-doc/app-bridge-doc.component').then((m) => m.AppBridgeDocComponent),
    title: 'App Bridge',
  },
  {
    path: Pages.Autocomplete,
    loadComponent: () =>
      import('./autocomplete-doc/autocomplete-doc.component').then((m) => m.AutocompleteDocComponent),
    title: 'Autocomplete',
  },
  {
    path: Pages.Badge,
    loadComponent: () => import('./badge-doc/badge-doc.component').then((m) => m.BadgeDocComponent),
    title: 'Badge',
  },
  {
    path: Pages.Box,
    loadComponent: () => import('./box-doc/box-doc.component').then((m) => m.BoxDocComponent),
    title: 'Box',
  },
  {
    path: Pages.Button,
    loadComponent: () => import('./button-doc/button-doc.component').then((m) => m.ButtonDocComponent),
    title: 'Button',
  },
  {
    path: Pages.Breadcrumb,
    loadComponent: () =>
      import('./breadcrumb-doc/breadcrumb-doc.component').then((m) => m.BreadcrumbDocComponent),
    title: 'Breadcrumb',
  },
  {
    path: Pages.Card,
    loadComponent: () => import('./card-doc/card-doc.component').then((m) => m.CardDocComponent),
    title: 'Card',
  },
  {
    path: Pages.Carousel,
    loadComponent: () => import('./carousel-doc/carousel-doc.component').then((m) => m.CarouselDocComponent),
    title: 'Carousel',
  },
  {
    path: Pages.Chip,
    loadComponent: () => import('./chip-doc/chip-doc.component').then((m) => m.ChipDocComponent),
    title: 'Chip',
  },
  {
    path: Pages.Checkbox,
    loadComponent: () =>
      import('./forms/checkbox-doc/checkbox-doc.component').then((m) => m.CheckboxDocComponent),
    title: 'Checkbox',
  },
  {
    path: Pages.ContentLoader,
    loadComponent: () =>
      import('./content-loader-doc/content-loader-doc.component').then((m) => m.ContentLoaderDocComponent),
    title: 'Content Loader',
  },
  {
    path: Pages.ContextMenu,
    loadComponent: () =>
      import('./context-menu-doc/context-menu-doc.component').then((m) => m.ContextMenuDocComponent),
    title: 'Context Menu',
  },
  {
    path: Pages.Divider,
    loadComponent: () => import('./divider-doc/divider-doc.component').then((m) => m.DividerDocComponent),
    title: 'Divider',
  },
  {
    path: Pages.Dropdown,
    loadComponent: () => import('./dropdown-doc/dropdown-doc.component').then((m) => m.DropdownDocComponent),
    title: 'Dropdown',
  },
  {
    path: Pages.Illustration,
    redirectTo: `/brand/${Pages.Illustration}`,
    title: 'Illustration',
  },
  {
    path: Pages.Tabs,
    loadComponent: () => import('./tabs-doc/tabs-doc.component').then((m) => m.TabsDocComponent),
    title: 'Tabs',
  },
  {
    path: Pages.Toggle,
    loadComponent: () => import('./forms/toggle-doc/toggle-doc.component').then((m) => m.ToggleDocComponent),
    title: 'Toggle',
  },
  {
    path: Pages.Datepicker,
    loadComponent: () =>
      import('./forms/datepicker-doc/datepicker-doc.component').then((m) => m.DatepickerDocComponent),
    title: 'Datepicker',
  },
  {
    path: Pages.DatepickerRange,
    loadComponent: () =>
      import('./forms/datepicker-range-doc/datepicker-range-doc.component').then(
        (m) => m.DatepickerRangeDocComponent,
      ),
    title: 'Datepicker Range',
  },
  {
    path: Pages.DragAndDrop,
    loadComponent: () =>
      import('./forms/draganddrop-doc/draganddrop-doc.component').then((m) => m.DraganddropDocComponent),
    title: 'Drag and Drop',
  },
  {
    path: Pages.FileUpload,
    loadComponent: () =>
      import('./file-upload-doc/file-upload-doc.component').then((m) => m.FileUploadDocComponent),
    title: 'File Upload',
  },
  {
    path: Pages.RadioFilter,
    loadComponent: () =>
      import('./radio-filter-doc/radio-filter-doc.component').then((m) => m.RadioFilterDocComponent),
    title: 'Radio Filter',
  },
  {
    path: Pages.Header,
    loadComponent: () => import('./header-doc/header-doc.component').then((m) => m.HeaderDocComponent),
    title: 'Header',
  },
  {
    path: Pages.Icon,
    redirectTo: `/brand/${Pages.Icon}`,
    title: 'Icon',
  },
  {
    path: Pages.Input,
    loadComponent: () => import('./forms/input-doc/input-doc.component').then((m) => m.InputDocComponent),
    title: 'Input',
  },
  {
    path: Pages.Tag,
    loadComponent: () => import('./tag-doc/tag-doc.component').then((m) => m.TagDocComponent),
    title: 'Tag',
  },
  {
    path: Pages.Link,
    loadComponent: () => import('./link-doc/link-doc.component').then((m) => m.LinkDocComponent),
    title: 'Link',
  },
  {
    path: Pages.List,
    loadComponent: () => import('./list-doc/list-doc.component').then((m) => m.ListDocComponent),
    title: 'List',
  },
  {
    path: Pages.Modal,
    loadComponent: () => import('./modal-doc/modal-doc.component').then((m) => m.ModalDocComponent),
    title: 'Modal',
  },
  {
    path: Pages.Outline,
    loadComponent: () => import('./outline-doc/outline-doc.component').then((m) => m.OutlineDocComponent),
    title: 'Outline',
  },
  {
    path: Pages.Pagination,
    loadComponent: () =>
      import('./pagination-doc/pagination-doc.component').then((m) => m.PaginationDocComponent),
    title: 'Pagination',
  },
  {
    path: Pages.Progressbar,
    loadComponent: () =>
      import('./progressbar-doc/progressbar-doc.component').then((m) => m.ProgressbarDocComponent),
    title: 'Progressbar',
  },
  {
    path: Pages.Popover,
    loadComponent: () => import('./popover-doc/popover-doc.component').then((m) => m.PopoverDocComponent),
    title: 'Popover',
  },
  {
    path: Pages.Radiobutton,
    loadComponent: () =>
      import('./forms/radiobutton-doc/radiobutton-doc.component').then((m) => m.RadiobuttonDocComponent),
    title: 'Radiobutton',
  },
  {
    path: Pages.SegmentedControl,
    loadComponent: () =>
      import('./forms/segmented-controls-doc/segmented-controls-doc.component').then(
        (m) => m.SegmentedControlsDocComponent,
      ),
    title: 'Segmented Control',
  },
  {
    path: Pages.Search,
    loadComponent: () => import('./forms/search-doc/search-doc.component').then((m) => m.SearchDocComponent),
    title: 'Search',
  },
  {
    path: Pages.Slider,
    loadComponent: () => import('./slider-doc/slider-doc.component').then((m) => m.SliderDocComponent),
    title: 'Slider',
  },
  {
    path: Pages.Spotlight,
    loadComponent: () =>
      import('./spotlight-doc/spotlight-doc.component').then((m) => m.SpotlightDocComponent),
    title: 'Spotlight',
  },
  {
    path: Pages.Stepper,
    loadComponent: () => import('./stepper-doc/stepper-doc.component').then((m) => m.StepperDocComponent),
    title: 'Stepper',
  },
  {
    path: Pages.Table,
    loadComponent: () => import('./table-doc/table-doc.component').then((m) => m.TableDocComponent),
    title: 'Table',
  },
  {
    path: Pages.Timepicker,
    loadComponent: () =>
      import('./forms/timepicker-doc/timepicker-doc.component').then((m) => m.TimepickerDocComponent),
    title: 'Timepicker',
  },
  {
    path: Pages.Thumbnail,
    loadComponent: () =>
      import('./thumbnail-doc/thumbnail-doc.component').then((m) => m.ThumbnailDocComponent),
    title: 'Thumbnail',
  },
  {
    path: Pages.Toast,
    loadComponent: () => import('./toast-doc/toast-doc.component').then((m) => m.ToastDocComponent),
    title: 'Toast',
  },
  {
    path: Pages.Tooltip,
    loadComponent: () => import('./tooltip-doc/tooltip-doc.component').then((m) => m.TooltipDocComponent),
    title: 'Tooltip',
  },
];
