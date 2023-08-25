import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TheDesignSystemDocComponent } from './the-design-system-doc.component';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { RouterModule } from '@angular/router';
import { FlexibleIconComponent } from './flexible-icon/flexible-icon.component';
import { EasyIconComponent } from './easy-icon/easy-icon.component';
import { InnovativeIconComponent } from './innovative-icon/innovative-icon.component';
import { OpenIconComponent } from './open-icon/open-icon.component';
import { QualityIconComponent } from './quality-icon/quality-icon.component';

@NgModule({
  imports: [CommonModule, ComponentHeaderModule, ComponentSectionModule, RouterModule],
  declarations: [
    TheDesignSystemDocComponent,
    EasyIconComponent,
    FlexibleIconComponent,
    InnovativeIconComponent,
    OpenIconComponent,
    QualityIconComponent,
  ],
})
export class TheDesignSystemDocModule {}
