import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CMSPageComponent } from './cms-page.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { RouterModule } from '@angular/router';
import { DynamicModule } from 'ng-dynamic-component';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    RouterModule,
    DynamicModule,
  ],
  declarations: [CMSPageComponent],
})
export class CMSPageModule {}
