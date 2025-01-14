import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewEncapsulation, booleanAttribute, input } from '@angular/core';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [NgClass],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CopyComponent {
  readonly message = input('');
  readonly smallElementAnimation = input(false);
  readonly autoOverflow = input(false, { transform: booleanAttribute });

  tooltipContent = 'Copy';
  copyTimeout: ReturnType<typeof setTimeout>;

  copyMessage(copyMessage: string): void {
    navigator.clipboard.writeText(copyMessage);
    this.tooltipContent = 'Copied!';
    clearTimeout(this.copyTimeout);

    this.copyTimeout = setTimeout(() => {
      this.tooltipContent = 'Copy';
    }, 3000);
  }
}
