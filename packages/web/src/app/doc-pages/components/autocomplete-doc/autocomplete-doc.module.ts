import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteDocComponent } from './autocomplete-doc.component';
import { ComponentChangelogModule } from 'src/app/shared/component-documentation/component-changelog/component-changelog.module';
import { ComponentHeaderModule } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.module';
import { ComponentPropertiesModule } from 'src/app/shared/component-documentation/component-properties/component-properties.module';
import { ComponentSectionModule } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.module';
import { ComponentSubsectionModule } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.module';
import { WhenToUseModule } from 'src/app/shared/when-to-use/when-to-use.module';
import { AutocompleteCegComponent } from './autocomplete-ceg/autocomplete-ceg.component';
import { CegModule } from 'src/app/shared/component-documentation/ceg/ceg.module';
import { AutocompleteNormalCegComponent } from './autocomplete-normal-ceg/autocomplete-normal-ceg.component';
import { AutocompleteCompactCegComponent } from './autocomplete-compact-ceg/autocomplete-compact-ceg.component';

@NgModule({
  declarations: [
    AutocompleteDocComponent,
    AutocompleteCegComponent,
    AutocompleteNormalCegComponent,
    AutocompleteCompactCegComponent,
  ],
  imports: [
    CommonModule,
    ComponentHeaderModule,
    ComponentPropertiesModule,
    ComponentSectionModule,
    ComponentSubsectionModule,
    WhenToUseModule,
    ComponentChangelogModule,
    CegModule,
  ],
})
export class AutocompleteDocModule {}
