import { NgModule } from '@angular/core';
import { LabelDocModule } from './label-doc/label-doc.module';
import { ButtonDocModule } from './button-doc/button-doc.module';
import { CardDocModule } from './card-doc/card-doc.module';
import { ComponentsStartModule } from './components-start/components-start.module';
import { FormComponentsModule } from './forms/formComponents.module';
import { LinkDocModule } from './link-doc/link-doc.module';
import { ListDocModule } from './list-doc/list-doc.module';
import { NotificationDotDocModule } from './notification-dot-doc/notification-dot-doc.module';
import { OverviewModule } from './overview-comp/overview-comp.module';
import { TableDocModule } from './table-doc/table-doc.module';
import { TagsDocModule } from './tags-doc/tags-doc.module';
import { TooltipDocModule } from './tooltip-doc/tooltip-doc.module';
import { FileUploadDocModule } from './file-upload-doc/file-upload-doc.module';
import { ProgressbarDocModule } from './progressbar-doc/progressbar-doc.module';
import { ModalDocModule } from './modal-doc/modal-doc.module';
import { AutocompleteDocModule } from './autocomplete-doc/autocomplete-doc.module';

@NgModule({
    imports: [
        AutocompleteDocModule,
        ButtonDocModule,
        CardDocModule,
        ComponentsStartModule,
        FileUploadDocModule,
        FormComponentsModule,
        LabelDocModule,
        LinkDocModule,
        ListDocModule,
        ModalDocModule,
        NotificationDotDocModule,
        OverviewModule,
        ProgressbarDocModule,
        TableDocModule,
        TagsDocModule,
        TooltipDocModule
    ],
})
export class ComponentsModule { }

