import {Component} from '@angular/core';
import {getUtilities} from 'src/app/shared/e-items';

@Component({
  selector: 'app-faq-doc',
  templateUrl: './faq-doc.component.html',
  styleUrls: ['./faq-doc.component.scss'],
})
export class FaqDocComponent {
  componentStatus = getUtilities('faq-doc').status;
}
