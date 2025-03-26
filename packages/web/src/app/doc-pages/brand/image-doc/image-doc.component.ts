import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { LocalizationService } from 'src/app/core/services/localization.service';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { getDocPage } from 'src/app/shared/doc-pages';
import { SafeHtmlPipe } from 'src/app/shared/safeHtml.pipe';

const docPage = getDocPage('images');
@Component({
  selector: 'app-image-doc',
  imports: [ComponentHeaderComponent, ComponentSectionComponent, SafeHtmlPipe],
  templateUrl: './image-doc.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImageDocComponent {
  docPage = docPage;
  locale = toSignal(inject(LocalizationService).listenLocalization());
}
