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
import { IconDocModule } from './utilities/icon-doc/icon-doc.module';
import { TypographyDocModule } from './utilities/typography-doc/typography-doc.module';
import { CheckboxDocModule } from './components/forms/checkbox-doc/checkbox-doc.module';
import { CheckboxToggleDocModule } from './components/forms/checkbox-toggle-doc/checkbox-toggle-doc.module';
import { InputDocModule } from './components/forms/input-doc/input-doc.module';
import { RadiobuttonDocModule } from './components/forms/radiobutton-doc/radiobutton-doc.module';
import { SelectDocModule } from './components/forms/select-doc/select-doc.module';
import { ShadowDocModule } from './utilities/shadow-doc/shadow-doc.module';
import { NotificationDotDocModule } from './components/notification-dot-doc/notification-dot-doc.module';
import { AccessibilityModule } from './accessibility/accessibility/accessibility.module';
import { AltTextModule } from './accessibility/alt-text/alt-text.module';
import { UuToolsModule } from './accessibility/uu-tools/uu-tools.module';
import { OverviewAccessibilityModule } from './accessibility/overview-accessibility/overview-accessibility.module';
import { OverviewUtilModule } from './utilities/overview-util/overview-util.module';
import { OverviewModule } from './components/overview-comp/overview-comp.module';
import { SpacingDocModule } from './utilities/spacing-doc/spacing-doc.module';
import { BorderDocModule } from './utilities/border-doc/border-doc.module';


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
    IconDocModule,
    TypographyDocModule,
    NotificationDotDocModule,
    CheckboxDocModule,
    CheckboxToggleDocModule,
    InputDocModule,
    RadiobuttonDocModule,
    SelectDocModule,
    ShadowDocModule,
    OverviewModule,
    OverviewUtilModule,
    AccessibilityModule,
    AltTextModule,
    UuToolsModule,
    OverviewAccessibilityModule,
    SpacingDocModule,
    BorderDocModule,
    TypographyDocModule
  ],
})
export class DocPagesModule { }

