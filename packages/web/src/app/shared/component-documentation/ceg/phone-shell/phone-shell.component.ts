import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-phone-shell',
    templateUrl: './phone-shell.component.html',
    styleUrls: ['./phone-shell.component.scss'],
    imports: [DatePipe]
})
export class PhoneShellComponent {
  now = new Date();
}
