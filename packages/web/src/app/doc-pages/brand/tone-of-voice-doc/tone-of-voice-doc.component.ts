import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { QuoteComponent } from '../../../shared/quote/quote.component';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { getDocPage } from 'src/app/shared/doc-pages';
import { SafeHtmlPipe } from 'src/app/shared/safeHtml.pipe';

const docPage = getDocPage('tone-of-voice');
@Component({
  selector: 'app-tone-of-voice-doc',
  imports: [
    ComponentHeaderComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    RouterLink,
    SafeHtmlPipe,
    QuoteComponent,
  ],
  templateUrl: './tone-of-voice-doc.component.html',
  styles: `
    app-quote {
      margin: 40px 0;

      p {
        margin: 0;
      }
      p:not(:first-child) {
        margin-top: 16px;
      }
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ToneOfVoiceDocComponent {
  docPage = docPage;

  locale = toSignal(inject(LocalizationService).listenLocalization());
}
