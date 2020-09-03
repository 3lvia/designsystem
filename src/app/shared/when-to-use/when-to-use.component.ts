import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-when-to-use',
  templateUrl: './when-to-use.component.html',
  styleUrls: ['./when-to-use.component.scss'],
})
export class WhenToUseComponent {

  @Input() whens = [''];
  @Input() whenNots = [''];

}
