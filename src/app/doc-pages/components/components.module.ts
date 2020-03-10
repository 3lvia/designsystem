import { NgModule } from '@angular/core';
import { BadgeDocModule } from './badge-doc/badge-doc.module';
import { ButtonDocModule } from './button-doc/button-doc.module';
import { CardDocModule } from './card-doc/card-doc.module';
import { ComponentsStartModule } from './components-start/components-start.module';
import { DividerDocModule } from './divider-doc/divider-doc.module';
import { DropdownDocModule } from './dropdown-doc/dropdown-doc.module';
import { FeedbackDocModule } from './feedback-doc/feedback-doc.module';
import { FormComponentsModule } from './forms/formComponents.module';
import { HeaderDocModule } from './header-doc/header-doc.module';
import { LinkDocModule } from './link-doc/link-doc.module';
import { NotificationDotDocModule } from './notification-dot-doc/notification-dot-doc.module';
import { OverviewModule } from './overview-comp/overview-comp.module';
import { TableDocModule } from './table-doc/table-doc.module';
import { TagsDocModule } from './tags-doc/tags-doc.module';
import { TooltipDocModule } from './tooltip-doc/tooltip-doc.module';

@NgModule({
    imports: [
        BadgeDocModule,
        ButtonDocModule,
        CardDocModule,
        ComponentsStartModule,
        DividerDocModule,
        DropdownDocModule,
        FeedbackDocModule,
        FormComponentsModule,
        HeaderDocModule,
        LinkDocModule,
        NotificationDotDocModule,
        OverviewModule,
        TableDocModule,
        TagsDocModule,
        TooltipDocModule
    ],
})
export class ComponentsModule { }

