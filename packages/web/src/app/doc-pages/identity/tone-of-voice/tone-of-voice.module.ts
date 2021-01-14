import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToneOfVoiceComponent } from './tone-of-voice.component';
import { ComponentSubsectionModule } from 'src/app/shared/component-structure/component-subsection/component-subsection.module';
import { ComponentSectionModule } from 'src/app/shared/component-structure/component-section/component-section.module';
import { ComponentHeaderModule } from 'src/app/shared/component-structure/component-header/component-header.module';
import { ComponentSubsubsectionModule } from 'src/app/shared/component-structure/component-subsubsection/component-subsubsection.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    ComponentSubsubsectionModule,
    RouterModule,
  ],
  declarations: [ToneOfVoiceComponent],
})
export class ToneOfVoiceModule {}
