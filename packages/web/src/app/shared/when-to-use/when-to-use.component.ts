import { CUSTOM_ELEMENTS_SCHEMA, Component, input } from '@angular/core';

import { Locale } from 'src/app/core/services/localization.service';

@Component({
  selector: 'app-when-to-use',
  templateUrl: './when-to-use.component.html',
  styleUrls: ['./when-to-use.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WhenToUseComponent {
  readonly whens = input<string[]>([]);
  readonly whenNots = input<string[]>([]);
  readonly locale = input<Locale>('en-GB');
}
