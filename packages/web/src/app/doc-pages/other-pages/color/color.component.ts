import { Component } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss'],
})
export class ColorComponent {
  constructor() {}
  purposeTokenExample = `.container {
  color: var(--e-color-text-1);
  background: var(--e-color-background-1);  
  border-color: var(--e-color-border-1);  
  &::hover {
    background: var(--e-color-background-hover-1);
  }
}`;

  baseTokenExample = `:root,
.e-theme-light {
  --container-color-border: var(--e-light?-grey-10);
}
.e-theme-dark {
  --container-color-border: var(--e-dark-grey-20);
}
.container {
  border-color: var(--container-color-border);
}`;

  classTokenExample = `<div class='e-color-background-1'>
  A container with text that follow the background-1 color contrast.   
  <span class='e-color-text-2 e-color-border-1'>
     Some kind of subtext with the e-color-text-2 color and a border with the e-color-border-1 token.
  </span>
</div>`;
}
