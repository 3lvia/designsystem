import { Component } from '@angular/core';
import { getCommunity } from 'src/app/shared/e-items';

@Component({
  selector: 'app-faq-doc',
  templateUrl: './faq-doc.component.html',
  styleUrls: ['./faq-doc.component.scss'],
})
export class FaqDocComponent {

  description = getCommunity('faq-doc').description;
}
