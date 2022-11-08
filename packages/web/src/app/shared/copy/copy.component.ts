import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CopyToClipboardService } from 'src/app/core/services/copy-to-clipboard.service';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CopyComponent {
  @Input() message = '';
  @Input() smallElementAnimation = false;

  tooltipContent = 'Copy';
  copyTimeout;

  constructor(private copyService: CopyToClipboardService) {}

  copyMessage(copyMessage: string): void {
    this.copyToClipboard(copyMessage);
    this.tooltipContent = 'Copied!';
    clearTimeout(this.copyTimeout);

    this.copyTimeout = setTimeout(() => {
      this.tooltipContent = 'Copy';
    }, 3000);
  }

  copyToClipboard(val: string): void {
    this.copyService.copyToClipboard(val);
  }
}
