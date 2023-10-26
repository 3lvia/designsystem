import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pages } from 'src/app/shared/shared.enum';
import { CMSPageComponent } from '../cms/cms-page/cms-page.component';
import { AccordionDocComponent } from './accordion-doc/accordion-doc.component';
import { AlertMessagesComponent } from './alert-messages/alert-messages.component';
import { AutocompleteDocComponent } from './autocomplete-doc/autocomplete-doc.component';
import { BadgeDocComponent } from './badge-doc/badge-doc.component';
import { BoxDocComponent } from './box-doc/box-doc.component';
import { BreadcrumbDocComponent } from './breadcrumb-doc/breadcrumb-doc.component';
import { ButtonDocComponent } from './button-doc/button-doc.component';
import { CardDocComponent } from './card-doc/card-doc.component';
import { CarouselDocComponent } from './carousel-doc/carousel-doc.component';
import { ChipDocComponent } from './chip-doc/chip-doc.component';
import { ContentLoaderDocComponent } from './content-loader-doc/content-loader-doc.component';
import { ContextMenuDocComponent } from './context-menu-doc/context-menu-doc.component';
import { DividerDocComponent } from './divider-doc/divider-doc.component';
import { DropdownDocComponent } from './dropdown-doc/dropdown-doc.component';
import { FileUploadDocComponent } from './file-upload-doc/file-upload-doc.component';
import { CheckboxDocComponent } from './forms/checkbox-doc/checkbox-doc.component';
import { DatepickerDocComponent } from './forms/datepicker-doc/datepicker-doc.component';
import { DatepickerRangeDocComponent } from './forms/datepicker-range-doc/datepicker-range-doc.component';
import { DraganddropDocComponent } from './forms/draganddrop-doc/draganddrop-doc.component';
import { InputDocComponent } from './forms/input-doc/input-doc.component';
import { RadiobuttonDocComponent } from './forms/radiobutton-doc/radiobutton-doc.component';
import { SearchDocComponent } from './forms/search-doc/search-doc.component';
import { SegmentedControlsDocComponent } from './forms/segmented-controls-doc/segmented-controls-doc.component';
import { TimepickerDocComponent } from './forms/timepicker-doc/timepicker-doc.component';
import { ToggleDocComponent } from './forms/toggle-doc/toggle-doc.component';
import { HeaderDocComponent } from './header-doc/header-doc.component';
import { LinkDocComponent } from './link-doc/link-doc.component';
import { ListDocComponent } from './list-doc/list-doc.component';
import { ModalDocComponent } from './modal-doc/modal-doc.component';
import { OutlineDocComponent } from './outline-doc/outline-doc.component';
import { PaginationDocComponent } from './pagination-doc/pagination-doc.component';
import { PopoverDocComponent } from './popover-doc/popover-doc.component';
import { ProgressbarDocComponent } from './progressbar-doc/progressbar-doc.component';
import { RadioFilterDocComponent } from './radio-filter-doc/radio-filter-doc.component';
import { SliderDocComponent } from './slider-doc/slider-doc.component';
import { SpotlightDocComponent } from './spotlight-doc/spotlight-doc.component';
import { StepperDocComponent } from './stepper-doc/stepper-doc.component';
import { TableDocComponent } from './table-doc/table-doc.component';
import { TabsDocComponent } from './tabs-doc/tabs-doc.component';
import { TagDocComponent } from './tag-doc/tag-doc.component';
import { ThumbnailDocComponent } from './thumbnail-doc/thumbnail-doc.component';
import { ToastDocComponent } from './toast-doc/toast-doc.component';
import { TooltipDocComponent } from './tooltip-doc/tooltip-doc.component';
import { ComponentsModule } from './components.module';
import { CSSLibraryDocComponent } from './css-library-doc/css-library-doc.component';

const routes: Routes = [
  {
    path: '',
    component: CMSPageComponent,
  },
  {
    path: 'accordion-group',
    redirectTo: Pages.Accordion,
    pathMatch: 'full',
  },
  {
    path: Pages.CssLibrary,
    component: CSSLibraryDocComponent,
  },
  {
    path: Pages.Accordion,
    component: AccordionDocComponent,
  },
  {
    path: Pages.Alert,
    component: AlertMessagesComponent,
  },
  {
    path: Pages.Autocomplete,
    component: AutocompleteDocComponent,
  },
  {
    path: Pages.Badge,
    component: BadgeDocComponent,
  },
  {
    path: Pages.Box,
    component: BoxDocComponent,
  },
  {
    path: Pages.Button,
    component: ButtonDocComponent,
  },
  {
    path: Pages.Breadcrumb,
    component: BreadcrumbDocComponent,
  },
  {
    path: Pages.Card,
    component: CardDocComponent,
  },
  {
    path: Pages.Carousel,
    component: CarouselDocComponent,
  },
  {
    path: Pages.Chip,
    component: ChipDocComponent,
  },
  {
    path: Pages.Checkbox,
    component: CheckboxDocComponent,
  },
  {
    path: Pages.ContentLoader,
    component: ContentLoaderDocComponent,
  },
  {
    path: Pages.ContextMenu,
    component: ContextMenuDocComponent,
  },
  {
    path: Pages.Divider,
    component: DividerDocComponent,
  },
  {
    path: Pages.Dropdown,
    component: DropdownDocComponent,
  },
  {
    path: Pages.Tabs,
    component: TabsDocComponent,
  },
  {
    path: Pages.Toggle,
    component: ToggleDocComponent,
  },
  {
    path: Pages.Datepicker,
    component: DatepickerDocComponent,
  },
  {
    path: Pages.DatepickerRange,
    component: DatepickerRangeDocComponent,
  },
  {
    path: Pages.DragAndDrop,
    component: DraganddropDocComponent,
  },
  {
    path: Pages.FileUpload,
    component: FileUploadDocComponent,
  },
  {
    path: Pages.RadioFilter,
    component: RadioFilterDocComponent,
  },
  {
    path: Pages.Header,
    component: HeaderDocComponent,
  },
  {
    path: Pages.Input,
    component: InputDocComponent,
  },
  {
    path: Pages.Tag,
    component: TagDocComponent,
  },
  {
    path: Pages.Link,
    component: LinkDocComponent,
  },
  {
    path: Pages.List,
    component: ListDocComponent,
  },
  {
    path: Pages.Modal,
    component: ModalDocComponent,
  },
  {
    path: Pages.Outline,
    component: OutlineDocComponent,
  },
  {
    path: Pages.Pagination,
    component: PaginationDocComponent,
  },
  {
    path: Pages.Progressbar,
    component: ProgressbarDocComponent,
  },
  {
    path: Pages.Popover,
    component: PopoverDocComponent,
  },
  {
    path: Pages.Radiobutton,
    component: RadiobuttonDocComponent,
  },
  {
    path: Pages.SegmentedControl,
    component: SegmentedControlsDocComponent,
  },
  {
    path: Pages.Search,
    component: SearchDocComponent,
  },
  {
    path: Pages.Slider,
    component: SliderDocComponent,
  },
  {
    path: Pages.Spotlight,
    component: SpotlightDocComponent,
  },
  {
    path: Pages.Stepper,
    component: StepperDocComponent,
  },
  {
    path: Pages.Table,
    component: TableDocComponent,
  },
  {
    path: Pages.Timepicker,
    component: TimepickerDocComponent,
  },
  {
    path: Pages.Thumbnail,
    component: ThumbnailDocComponent,
  },
  {
    path: Pages.Toast,
    component: ToastDocComponent,
  },
  {
    path: Pages.Tooltip,
    component: TooltipDocComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ComponentsModule],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
