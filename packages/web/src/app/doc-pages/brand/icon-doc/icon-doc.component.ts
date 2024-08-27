import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { CodeViewerComponent } from '../../../shared/component-documentation/ceg/code-generator/code-viewer/code-viewer.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentChangelogComponent } from '../../../shared/component-documentation/component-changelog/component-changelog.component';
import { ComponentHeaderComponent } from '../../../shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSubsubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { CopyComponent } from '../../../shared/copy/copy.component';
import { IconColorsCegComponent } from './icon-colors-ceg/icon-colors-ceg.component';
import { elvisIconData } from './icon-data';
import { IconPreviewComponent } from './icon-preview/icon-preview.component';
import { IconSizesCegComponent } from './icon-sizes-ceg/icon-sizes-ceg.component';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

const docPage = getDocPagesNotFromCMS('icon');

@Component({
  selector: 'app-icon-doc',
  templateUrl: './icon-doc.component.html',
  styleUrls: ['./icon-doc.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    CopyComponent,
    ComponentHeaderComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    ComponentSubsubsectionComponent,
    StaticCegComponent,
    IconSizesCegComponent,
    IconColorsCegComponent,
    CodeViewerComponent,
    CegComponent,
    ComponentChangelogComponent,
    IconPreviewComponent,
  ],
})
export class IconDocComponent {
  componentData = elvisIconData;
  docPage = docPage;
  locale = toSignal(inject(LocalizationService).listenLocalization());

  scriptCodeHTML = `<script src="path_to_file/elvis.js"></script>`;
  iconExample = `<i class="e-icon e-icon--chat e-icon--md" aria-hidden="true"></i>`;

  constructor(private titleService: Title) {
    effect(() => {
      this.titleService.setTitle(
        (this.locale() === 'nb-NO' ? this.docPage.titleNo : this.docPage.title) + ' | Elvia design system',
      );
    });
  }
}
