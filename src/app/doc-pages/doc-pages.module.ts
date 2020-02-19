import { NgModule } from '@angular/core';
import { ButtonDocModule } from './components/button-doc/button-doc.module';
import { DividerDocModule } from './components/divider-doc/divider-doc.module';
import { BadgeDocModule } from './components/badge-doc/badge-doc.module';
import { CardDocModule } from './components/card-doc/card-doc.module';
import { DropdownDocModule } from './components/dropdown-doc/dropdown-doc.module';
import { FeedbackDocModule } from './components/feedback-doc/feedback-doc.module';
import { HeaderDocModule } from './components/header-doc/header-doc.module';
import { LinkDocModule } from './components/link-doc/link-doc.module';
import { TableDocModule } from './components/table-doc/table-doc.module';
import { TagsDocModule } from './components/tags-doc/tags-doc.module';
import { TooltipDocModule } from './components/tooltip-doc/tooltip-doc.module';
import { ColorsDocModule } from './colors/colors-doc/colors-doc.module';

@NgModule({
  imports: [
    BadgeDocModule,
    ButtonDocModule,
    CardDocModule,
    DividerDocModule,
    DropdownDocModule,
    FeedbackDocModule,
    HeaderDocModule,
    LinkDocModule,
    TableDocModule,
    TagsDocModule,
    TooltipDocModule,
    ColorsDocModule
  ],
})
export class DocPagesModule { }

