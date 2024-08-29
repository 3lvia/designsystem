import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';

import { Locale } from 'src/app/core/services/localization.service';

@Component({
  selector: 'app-when-to-use',
  templateUrl: './when-to-use.component.html',
  styleUrls: ['./when-to-use.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WhenToUseComponent {
  @Input() whens? = [''];
  @Input() whenNots? = [''];
  @Input() locale: Locale = 'en-GB';
}
