import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { LocalizationService } from 'src/app/core/services/localization.service';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { getDocPage } from 'src/app/shared/doc-pages';
import { SafeHtmlPipe } from 'src/app/shared/safeHtml.pipe';

const docPage = getDocPage('examples');
@Component({
  selector: 'app-examples-doc',
  imports: [ComponentHeaderComponent, ComponentSectionComponent, SafeHtmlPipe],
  templateUrl: './examples-doc.component.html',
})
export class ExamplesDocComponent {
  docPage = docPage;
  locale = toSignal(inject(LocalizationService).listenLocalization());
}
