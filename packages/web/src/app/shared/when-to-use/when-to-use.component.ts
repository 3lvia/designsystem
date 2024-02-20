import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Locale } from 'src/app/core/services/localization.service';

@Component({
  selector: 'app-when-to-use',
  templateUrl: './when-to-use.component.html',
  styleUrls: ['./when-to-use.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor],
})
export class WhenToUseComponent {
  @Input() whens? = [''];
  @Input() whenNots? = [''];
  @Input() locale: Locale = 'en-GB';
}
