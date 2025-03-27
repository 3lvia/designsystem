import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { LocalizationService } from 'src/app/core/services/localization.service';
import { getDocPagesByType } from 'src/app/shared/doc-pages';
import { InlineSvgComponent } from 'src/app/shared/inline-svg/inline-svg.component';

@Component({
  selector: 'app-brand-doc',
  imports: [RouterLink, InlineSvgComponent],
  templateUrl: './brand-doc.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BrandDocComponent {
  docPages = getDocPagesByType('Brand');
  locale = toSignal(inject(LocalizationService).listenLocalization());
}
