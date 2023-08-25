import { Component } from '@angular/core';

@Component({
  selector: 'app-old-illustration',
  templateUrl: './old-illustration.component.html',
  styleUrls: ['./old-illustration.component.scss'],
})
export class OldIllustrationComponent {
  shadows = [
    { title: 'Soft', className: 'e-shadow-soft', blur: '50', opacity: '3%' },
    { title: 'Medium', className: 'e-shadow-medium', blur: '40', opacity: '6%' },
    { title: 'Hard', className: 'e-shadow-hard', blur: '30', opacity: '8%' },
  ];
}
