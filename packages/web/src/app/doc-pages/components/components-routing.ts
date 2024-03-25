import { Routes } from '@angular/router';

import { Pages } from 'src/app/shared/shared.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components-doc.component').then((m) => m.ComponentsDocComponent),
  },
  {
    path: 'accordion-group',
    redirectTo: Pages.Accordion,
    pathMatch: 'full',
  },
  {
    path: Pages.CssLibrary,
    loadComponent: () =>
      import('./css-library-doc/css-library-doc.component').then((m) => m.CSSLibraryDocComponent),
  },
  {
    path: Pages.Accordion,
    loadComponent: () =>
      import('./accordion-doc/accordion-doc.component').then((m) => m.AccordionDocComponent),
  },
  {
    path: Pages.Alert,
    loadComponent: () =>
      import('./alert-messages/alert-messages.component').then((m) => m.AlertMessagesComponent),
  },
  {
    path: Pages.Autocomplete,
    loadComponent: () =>
      import('./autocomplete-doc/autocomplete-doc.component').then((m) => m.AutocompleteDocComponent),
  },
  {
    path: Pages.Badge,
    loadComponent: () => import('./badge-doc/badge-doc.component').then((m) => m.BadgeDocComponent),
  },
  {
    path: Pages.Box,
    loadComponent: () => import('./box-doc/box-doc.component').then((m) => m.BoxDocComponent),
  },
  {
    path: Pages.Button,
    loadComponent: () => import('./button-doc/button-doc.component').then((m) => m.ButtonDocComponent),
  },
  {
    path: Pages.Breadcrumb,
    loadComponent: () =>
      import('./breadcrumb-doc/breadcrumb-doc.component').then((m) => m.BreadcrumbDocComponent),
  },
  {
    path: Pages.Card,
    loadComponent: () => import('./card-doc/card-doc.component').then((m) => m.CardDocComponent),
  },
  {
    path: Pages.Carousel,
    loadComponent: () => import('./carousel-doc/carousel-doc.component').then((m) => m.CarouselDocComponent),
  },
  {
    path: Pages.Chip,
    loadComponent: () => import('./chip-doc/chip-doc.component').then((m) => m.ChipDocComponent),
  },
  {
    path: Pages.Checkbox,
    loadComponent: () =>
      import('./forms/checkbox-doc/checkbox-doc.component').then((m) => m.CheckboxDocComponent),
  },
  {
    path: Pages.ContentLoader,
    loadComponent: () =>
      import('./content-loader-doc/content-loader-doc.component').then((m) => m.ContentLoaderDocComponent),
  },
  {
    path: Pages.ContextMenu,
    loadComponent: () =>
      import('./context-menu-doc/context-menu-doc.component').then((m) => m.ContextMenuDocComponent),
  },
  {
    path: Pages.Divider,
    loadComponent: () => import('./divider-doc/divider-doc.component').then((m) => m.DividerDocComponent),
  },
  {
    path: Pages.Dropdown,
    loadComponent: () => import('./dropdown-doc/dropdown-doc.component').then((m) => m.DropdownDocComponent),
  },
  {
    path: Pages.Illustration,
    redirectTo: `/brand/${Pages.Illustration}`,
  },
  {
    path: Pages.Tabs,
    loadComponent: () => import('./tabs-doc/tabs-doc.component').then((m) => m.TabsDocComponent),
  },
  {
    path: Pages.Toggle,
    loadComponent: () => import('./forms/toggle-doc/toggle-doc.component').then((m) => m.ToggleDocComponent),
  },
  {
    path: Pages.Datepicker,
    loadComponent: () =>
      import('./forms/datepicker-doc/datepicker-doc.component').then((m) => m.DatepickerDocComponent),
  },
  {
    path: Pages.DatepickerRange,
    loadComponent: () =>
      import('./forms/datepicker-range-doc/datepicker-range-doc.component').then(
        (m) => m.DatepickerRangeDocComponent,
      ),
  },
  {
    path: Pages.DragAndDrop,
    loadComponent: () =>
      import('./forms/draganddrop-doc/draganddrop-doc.component').then((m) => m.DraganddropDocComponent),
  },
  {
    path: Pages.FileUpload,
    loadComponent: () =>
      import('./file-upload-doc/file-upload-doc.component').then((m) => m.FileUploadDocComponent),
  },
  {
    path: Pages.RadioFilter,
    loadComponent: () =>
      import('./radio-filter-doc/radio-filter-doc.component').then((m) => m.RadioFilterDocComponent),
  },
  {
    path: Pages.Header,
    loadComponent: () => import('./header-doc/header-doc.component').then((m) => m.HeaderDocComponent),
  },
  {
    path: Pages.Input,
    loadComponent: () => import('./forms/input-doc/input-doc.component').then((m) => m.InputDocComponent),
  },
  {
    path: Pages.Tag,
    loadComponent: () => import('./tag-doc/tag-doc.component').then((m) => m.TagDocComponent),
  },
  {
    path: Pages.Link,
    loadComponent: () => import('./link-doc/link-doc.component').then((m) => m.LinkDocComponent),
  },
  {
    path: Pages.List,
    loadComponent: () => import('./list-doc/list-doc.component').then((m) => m.ListDocComponent),
  },
  {
    path: Pages.Modal,
    loadComponent: () => import('./modal-doc/modal-doc.component').then((m) => m.ModalDocComponent),
  },
  {
    path: Pages.Outline,
    loadComponent: () => import('./outline-doc/outline-doc.component').then((m) => m.OutlineDocComponent),
  },
  {
    path: Pages.Pagination,
    loadComponent: () =>
      import('./pagination-doc/pagination-doc.component').then((m) => m.PaginationDocComponent),
  },
  {
    path: Pages.Progressbar,
    loadComponent: () =>
      import('./progressbar-doc/progressbar-doc.component').then((m) => m.ProgressbarDocComponent),
  },
  {
    path: Pages.Popover,
    loadComponent: () => import('./popover-doc/popover-doc.component').then((m) => m.PopoverDocComponent),
  },
  {
    path: Pages.Radiobutton,
    loadComponent: () =>
      import('./forms/radiobutton-doc/radiobutton-doc.component').then((m) => m.RadiobuttonDocComponent),
  },
  {
    path: Pages.SegmentedControl,
    loadComponent: () =>
      import('./forms/segmented-controls-doc/segmented-controls-doc.component').then(
        (m) => m.SegmentedControlsDocComponent,
      ),
  },
  {
    path: Pages.Search,
    loadComponent: () => import('./forms/search-doc/search-doc.component').then((m) => m.SearchDocComponent),
  },
  {
    path: Pages.Slider,
    loadComponent: () => import('./slider-doc/slider-doc.component').then((m) => m.SliderDocComponent),
  },
  {
    path: Pages.Spotlight,
    loadComponent: () =>
      import('./spotlight-doc/spotlight-doc.component').then((m) => m.SpotlightDocComponent),
  },
  {
    path: Pages.Stepper,
    loadComponent: () => import('./stepper-doc/stepper-doc.component').then((m) => m.StepperDocComponent),
  },
  {
    path: Pages.Table,
    loadComponent: () => import('./table-doc/table-doc.component').then((m) => m.TableDocComponent),
  },
  {
    path: Pages.Timepicker,
    loadComponent: () =>
      import('./forms/timepicker-doc/timepicker-doc.component').then((m) => m.TimepickerDocComponent),
  },
  {
    path: Pages.Thumbnail,
    loadComponent: () =>
      import('./thumbnail-doc/thumbnail-doc.component').then((m) => m.ThumbnailDocComponent),
  },
  {
    path: Pages.Toast,
    loadComponent: () => import('./toast-doc/toast-doc.component').then((m) => m.ToastDocComponent),
  },
  {
    path: Pages.Tooltip,
    loadComponent: () => import('./tooltip-doc/tooltip-doc.component').then((m) => m.TooltipDocComponent),
  },
];
