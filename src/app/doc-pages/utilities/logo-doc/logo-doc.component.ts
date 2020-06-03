import { Component } from '@angular/core';
import { getUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-logo-doc',
  templateUrl: './logo-doc.component.html',
  styleUrls: ['./logo-doc.component.scss']
})
export class LogoDocComponent {

  componentStatus = getUtilities('logo-doc').status;
  externalUrl = getUtilities('logo-doc').externalUrl;

}
