import { Component } from '@angular/core';

@Component({
  selector: 'app-border-doc',
  templateUrl: './border-doc.component.html',
  styleUrls: ['./border-doc.component.scss'],
})
export class BorderDocComponent {
  example1 = `<span class="e-border example-box"></span>
<span class="e-border-b example-box"></span>
<span class="e-border-t example-box"></span>
<span class="e-border-l example-box"></span>
<span class="e-border-r example-box"></span>`;
}
