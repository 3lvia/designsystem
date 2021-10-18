import { Component, Input } from '@angular/core';
import { CopyToClipboardService } from 'src/app/core/services/copy-to-clipboard.service';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.scss'],
})
export class CopyComponent {
  @Input() message = '';
  @Input() smallElementAnimation = false;

  copyTooltip = 'Copy';
  copyTimeout;

  constructor(private copyService: CopyToClipboardService) {}

  copyMessage(copyMessage: string): void {
    this.copyToClipBoard(copyMessage);
    this.copyTooltip = 'Copied!';
    clearTimeout(this.copyTimeout);
    if (screen.width < 1024) {
      return;
    }
    this.copyTimeout = setTimeout(() => {
      this.copyTooltip = 'Copy';
    }, 3000);
  }

  copyToClipBoard(val: string): void {
    this.copyService.copyToClipBoard(val);
  }
}
