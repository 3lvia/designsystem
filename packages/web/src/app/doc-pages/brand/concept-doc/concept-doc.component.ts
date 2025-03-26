import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { SafeHtmlPipe } from '../../../shared/safeHtml.pipe';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { ThemeService } from 'src/app/core/services/theme.service';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { getDocPage } from 'src/app/shared/doc-pages';
import { QuoteComponent } from 'src/app/shared/quote/quote.component';

const docPage = getDocPage('the-concept');
@Component({
  selector: 'app-concept-doc',
  imports: [
    ComponentHeaderComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    QuoteComponent,
    RouterLink,
    SafeHtmlPipe,
  ],
  templateUrl: './concept-doc.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConceptDocComponent {
  docPage = docPage;

  locale = toSignal(inject(LocalizationService).listenLocalization());
  theme = inject(ThemeService).themeSignal;
}
