import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-phone-shell',
    templateUrl: './phone-shell.component.html',
    styleUrls: ['./phone-shell.component.scss'],
    standalone: true,
    imports: [DatePipe],
})
export class PhoneShellComponent {
  now = new Date();
}
