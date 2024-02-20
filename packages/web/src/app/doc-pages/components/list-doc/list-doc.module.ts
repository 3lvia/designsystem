import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentChangelogComponent } from 'src/app/shared/component-documentation/component-changelog/component-changelog.component';

import { ListDocComponent } from './list-doc.component';

import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { BulletListCegComponent } from './list-bullet-ceg/list-bullet-ceg.component';
import { NumberedListCegComponent } from './list-numbered-ceg/list-numbered-ceg.component';
import { IconListCegComponent } from './list-icon-ceg/list-icon-ceg.component';
import { ListCegComponent } from './list-ceg/list-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentChangelogComponent,
    CegModule,
    SharedDocumentationModule,
    ListDocComponent,
    ListCegComponent,
    BulletListCegComponent,
    NumberedListCegComponent,
    IconListCegComponent,
  ],
})
export class ListDocModule {}
