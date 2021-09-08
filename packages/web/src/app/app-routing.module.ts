import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pages } from './shared/pages.enum';
import { MainComponent } from './shell/main/main.component';
import { HomeComponent } from './shell/home/home.component';
import { ButtonDocComponent } from './doc-pages/components/button-doc/button-doc.component';
import { LabelDocComponent } from './doc-pages/components/label-doc/label-doc.component';
import { CardDocComponent } from './doc-pages/components/card-doc/card-doc.component';
import { CarouselDocComponent } from './doc-pages/components/carousel-doc/carousel-doc.component';
import { LinkDocComponent } from './doc-pages/components/link-doc/link-doc.component';
import { TableDocComponent } from './doc-pages/components/table-doc/table-doc.component';
import { TooltipDocComponent } from './doc-pages/components/tooltip-doc/tooltip-doc.component';
import { CheckboxDocComponent } from './doc-pages/components/forms/checkbox-doc/checkbox-doc.component';
import { ToggleDocComponent } from './doc-pages/components/forms/toggle-doc/toggle-doc.component';
import { InputDocComponent } from './doc-pages/components/forms/input-doc/input-doc.component';
import { RadiobuttonDocComponent } from './doc-pages/components/forms/radiobutton-doc/radiobutton-doc.component';
import { SelectDocComponent } from './doc-pages/components/forms/select-doc/select-doc.component';
import { OverviewComponent } from './doc-pages/components/overview-comp/overview-comp.component';
import { ComponentsStartComponent } from './doc-pages/components/components-start/components-start.component';
import { ListDocComponent } from './doc-pages/components/list-doc/list-doc.component';
import { SegmentedControlsDocComponent } from './doc-pages/components/forms/segmented-controls-doc/segmented-controls-doc.component';
import { FileUploadDocComponent } from './doc-pages/components/file-upload-doc/file-upload-doc.component';
import { ProgressbarDocComponent } from './doc-pages/components/progressbar-doc/progressbar-doc.component';
import { DraganddropDocComponent } from './doc-pages/components/forms/draganddrop-doc/draganddrop-doc.component';
import { PopoverDocComponent } from './doc-pages/components/popover-doc/popover-doc.component';
import { ModalDocComponent } from './doc-pages/components/modal-doc/modal-doc.component';
import { AutocompleteDocComponent } from './doc-pages/components/autocomplete-doc/autocomplete-doc.component';
import { DatepickerDocComponent } from './doc-pages/components/forms/datepicker-doc/datepicker-doc.component';
import { PositionPickerDocComponent } from './doc-pages/components/position-picker-doc/position-picker-doc.component';
import { AlertMessagesComponent } from './doc-pages/components/alert-messages/alert-messages.component';
import { DevStartComponent } from './doc-pages/dev/dev-start/dev-start.component';
import { PaginationDocComponent } from './doc-pages/components/pagination-doc/pagination-doc.component';
import { HeaderDocComponent } from './doc-pages/components/header-doc/header-doc.component';
import { DropdownDocComponent } from './doc-pages/components/dropdown-doc/dropdown-doc.component';
import { SearchDocComponent } from './doc-pages/components/forms/search-doc/search-doc.component';
import { AccordionDocComponent } from './doc-pages/components/accordion-doc/accordion-doc.component';
import { StepperDocComponent } from './doc-pages/components/stepper-doc/stepper-doc.component';
import { ContentLoaderDocComponent } from './doc-pages/components/content-loader-doc/content-loader-doc.component';
import { RadioFilterDocComponent } from './doc-pages/components/radio-filter-doc/radio-filter-doc.component';
import { ChipsComponent } from './doc-pages/components/chips/chips.component';
import { ErrorComponent } from './shared/error/error.component';
import { DividerDocComponent } from './doc-pages/components/divider-doc/divider-doc.component';
import { TabsDocComponent } from './doc-pages/components/tabs-doc/tabs-doc.component';
import { TimepickerDocComponent } from './doc-pages/components/forms/timepicker-doc/timepicker-doc.component';
import { v2PlaygroundComponent } from './doc-pages/dev/v2-playground/v2-playground.component';
import { CMSPageComponent } from './doc-pages/cms/cms-page/cms-page.component';
import { BoxDocComponent } from './doc-pages/components/box-doc/box-doc.component';

const routes: Routes = [
  {
    path: Pages.Index,
    component: MainComponent,
    children: [
      {
        path: Pages.Index,
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: Pages.Home,
        redirectTo: Pages.Index,
      },
      // Components section
      {
        path: Pages.ComponentsStart,
        component: ComponentsStartComponent,
        children: [
          {
            path: '',
            component: OverviewComponent,
          },
          {
            path: Pages.OverviewComp,
            component: OverviewComponent,
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
            path: Pages.Box,
            component: BoxDocComponent,
          },
          {
            path: Pages.Button,
            component: ButtonDocComponent,
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
            path: Pages.Chips,
            component: ChipsComponent,
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
            path: Pages.Label,
            component: LabelDocComponent,
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
            path: Pages.PositionPicker,
            component: PositionPickerDocComponent,
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
            path: Pages.Select,
            component: SelectDocComponent,
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
            path: Pages.Tooltip,
            component: TooltipDocComponent,
          },
        ],
      },
      // Dev section
      {
        path: Pages.DevelopmentStart,
        component: DevStartComponent,
        children: [
          {
            path: '',
            component: v2PlaygroundComponent,
          },
          {
            path: Pages.DevelopmentPlayground,
            component: v2PlaygroundComponent,
          },
        ],
      },
      { path: 'not-found', component: ErrorComponent },
      {
        path: ':submenu',
        component: CMSPageComponent,
      },
      {
        path: ':submenu/:page',
        pathMatch: 'full',
        component: CMSPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
