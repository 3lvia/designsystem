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
import { ColorDocModule } from './utilities/color-doc/color-doc.module';
import { TypographyDocModule } from './utilities/typography-doc/typography-doc.module';
import { CheckboxDocModule } from './components/forms/checkbox-doc/checkbox-doc.module';
import { CheckboxToggleDocModule } from './components/forms/checkbox-toggle-doc/checkbox-toggle-doc.module';
import { InputDocModule } from './components/forms/input-doc/input-doc.module';
import { RadiobuttonDocModule } from './components/forms/radiobutton-doc/radiobutton-doc.module';
import { SelectDocModule } from './components/forms/select-doc/select-doc.module';
import { ShadowDocModule } from './utilities/shadow-doc/shadow-doc.module';
import { OverviewModule } from './overview/overview.module';
import { OverviewUtilModule } from './overview-util/overview-util.module';

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
    ColorDocModule,
    TypographyDocModule,
    CheckboxDocModule,
    CheckboxToggleDocModule,
    InputDocModule,
    RadiobuttonDocModule,
    SelectDocModule,
    ShadowDocModule,
    OverviewModule,
    OverviewUtilModule
  ],
})
export class DocPagesModule { }

