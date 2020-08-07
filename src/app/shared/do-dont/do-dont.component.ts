import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-do-dont',
  templateUrl: './do-dont.component.html',
  styleUrls: ['./do-dont.component.scss'],
})
export class DoDontComponent {
  @Input() codeTS = '';
  @Input() codeHTML = '';
  @Input() codeCSS = '';
  @Input() do = false;
}
