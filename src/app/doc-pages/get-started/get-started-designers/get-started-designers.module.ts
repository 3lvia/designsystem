import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetStartedDesignersComponent } from './get-started-designers.component';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
  ],
  declarations: [GetStartedDesignersComponent]
})
export class GetStartedDesignersModule { }
