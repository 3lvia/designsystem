import {Component} from '@angular/core';
import {getUtilities} from 'src/app/shared/e-items';

@Component({
  selector: 'app-contribute',
  templateUrl: './contribute.component.html',
  styleUrls: ['./contribute.component.scss'],
})
export class ContributeComponent {
  componentStatus = getUtilities('contribute').status;
}
