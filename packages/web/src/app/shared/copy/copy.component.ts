import { Component, Input, ViewEncapsulation, booleanAttribute } from '@angular/core';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CopyComponent {
  @Input() message = '';
  @Input() smallElementAnimation = false;
  @Input({ transform: booleanAttribute }) autoOverflow = false;

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
