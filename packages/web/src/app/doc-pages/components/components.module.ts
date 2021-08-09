import { NgModule } from '@angular/core';
import { LabelDocModule } from './label-doc/label-doc.module';
import { ButtonDocModule } from './button-doc/button-doc.module';
import { CardDocModule } from './card-doc/card-doc.module';
import { CarouselDocModule } from './carousel-doc/carousel-doc.module';
import { ComponentsStartModule } from './components-start/components-start.module';
import { FormComponentsModule } from './forms/formComponents.module';
import { LinkDocModule } from './link-doc/link-doc.module';
import { ListDocModule } from './list-doc/list-doc.module';
import { OverviewModule } from './overview-comp/overview-comp.module';
import { TableDocModule } from './table-doc/table-doc.module';
import { TooltipDocModule } from './tooltip-doc/tooltip-doc.module';
import { FileUploadDocModule } from './file-upload-doc/file-upload-doc.module';
import { ProgressbarDocModule } from './progressbar-doc/progressbar-doc.module';
import { PopoverDocModule } from './popover-doc/popover-doc.module';
import { ModalDocModule } from './modal-doc/modal-doc.module';
import { AutocompleteDocModule } from './autocomplete-doc/autocomplete-doc.module';
import { PositionPickerDocModule } from './position-picker-doc/position-picker-doc.module';
import { AlertMessagesModule } from './alert-messages/alert-messages.module';
import { PaginationDocModule } from './pagination-doc/pagination-doc.module';
import { HeaderDocModule } from './header-doc/header-doc.module';
import { DropdownDocModule } from './dropdown-doc/dropdown-doc.module';
import { AccordionDocModule } from './accordion-doc/accordion-doc.module';
import { StepperDocModule } from './stepper-doc/stepper-doc.module';
import { ContentLoaderDocModule } from './content-loader-doc/content-loader-doc.module';
import { RadioFilterDocModule } from './radio-filter-doc/radio-filter-doc.module';
import { ChipsModule } from './chips/chips.module';
import { DividerDocModule } from './divider-doc/divider-doc.module';
import { TabsDocModule } from './tabs-doc/tabs-doc.module';
import { TimepickerDocModule } from './forms/timepicker-doc/timepicker-doc.module';
import { BoxDocModule } from './box-doc/box-doc.module';

@NgModule({
  imports: [
    AccordionDocModule,
    AlertMessagesModule,
    AutocompleteDocModule,
    BoxDocModule,
    ButtonDocModule,
    CardDocModule,
    CarouselDocModule,
    ChipsModule,
    ComponentsStartModule,
    ContentLoaderDocModule,
    DividerDocModule,
    DropdownDocModule,
    FileUploadDocModule,
    RadioFilterDocModule,
    FormComponentsModule,
    LabelDocModule,
    LinkDocModule,
    ListDocModule,
    ModalDocModule,
    OverviewModule,
    ProgressbarDocModule,
    PositionPickerDocModule,
    PopoverDocModule,
    PaginationDocModule,
    StepperDocModule,
    TabsDocModule,
    TableDocModule,
    TimepickerDocModule,
    TooltipDocModule,
    HeaderDocModule,
  ],
})
export class ComponentsModule {}
