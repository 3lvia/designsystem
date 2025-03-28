import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { illustrationsData } from './illustrations-data';
import { IllustrationsExhibitComponent } from './illustrations-exhibit/illustrations-exhibit.component';
import { IllustrationsInstallationComponent } from './illustrations-installation/illustrations-installation.component';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { ComponentChangelogComponent } from 'src/app/shared/component-documentation/component-changelog/component-changelog.component';
import { ComponentPropertiesTableComponent } from 'src/app/shared/component-documentation/component-properties-table/component-properties-table.component';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const illustrationDocPage = getDocPage('illustration');

@Component({
  selector: 'app-illustrations-doc',
  templateUrl: './illustrations-doc.component.html',
  imports: [
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    ComponentHeaderComponent,
    IllustrationsExhibitComponent,
    IllustrationsInstallationComponent,
    ComponentPropertiesTableComponent,
    ComponentChangelogComponent,
  ],
})
export class IllustrationsDocComponent {
  componentData = illustrationsData;
  title = illustrationDocPage.title;
  titleNo = illustrationDocPage.titleNo;
  description = illustrationDocPage.description;
  descriptionNo = illustrationDocPage.descriptionNo;
  figmaUrl = illustrationDocPage.figmaUrl;

  locale = toSignal(inject(LocalizationService).listenLocalization());
}
