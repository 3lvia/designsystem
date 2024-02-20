import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CMSPageComponent } from './cms-page.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import '@elvia/elvis-tooltip';

@NgModule({
    imports: [
        CommonModule,
        ComponentHeaderModule,
        ComponentSectionModule,
        ComponentSubsectionModule,
        RouterModule,
        HttpClientModule,
        CMSPageComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CMSPageModule {}
