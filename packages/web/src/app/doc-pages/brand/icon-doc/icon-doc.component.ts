import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import changelogJson from '@elvia/elvis-icons/CHANGELOG.json';

import { IconColorsCegComponent } from './icon-colors-ceg/icon-colors-ceg.component';
import { IconInstallationComponent } from './icon-installation/icon-installation.component';
import { IconPreviewComponent } from './icon-preview/icon-preview.component';
import { IconSizesCegComponent } from './icon-sizes-ceg/icon-sizes-ceg.component';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { StaticCegComponent } from 'src/app/shared/component-documentation/ceg';
import { CodeViewerComponent } from 'src/app/shared/component-documentation/ceg/code-generator/code-viewer/code-viewer.component';
import { ComponentChangelogComponent } from 'src/app/shared/component-documentation/component-changelog/component-changelog.component';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { CopyComponent } from 'src/app/shared/copy/copy.component';
import { getDocPage } from 'src/app/shared/doc-pages';
import { SafeHtmlPipe } from 'src/app/shared/safeHtml.pipe';

const docPage = getDocPage('icon');

@Component({
  selector: 'app-icon-doc',
  templateUrl: './icon-doc.component.html',
  styleUrls: ['./icon-doc.component.scss'],
  imports: [
    RouterLink,
    CopyComponent,
    ComponentHeaderComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    StaticCegComponent,
    IconSizesCegComponent,
    IconColorsCegComponent,
    CodeViewerComponent,
    ComponentChangelogComponent,
    IconPreviewComponent,
    IconInstallationComponent,
    SafeHtmlPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IconDocComponent {
  changelog = changelogJson.content;
  docPage = docPage;
  locale = toSignal(inject(LocalizationService).listenLocalization());

  scriptCodeHTML = `<script src="path_to_file/elvis.js"></script>`;
  iconExample = `<i class="e-icon e-icon--chat e-icon--md" aria-hidden="true"></i>`;
}
