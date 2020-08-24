import { Component, Input } from '@angular/core';
import { CopyToClipboardService } from 'src/app/core/services/copy-to-clipboard.service';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.scss'],
})
export class CopyComponent {
  @Input() message = '';

  copyTooltip = 'Copy';

  constructor(private copyService: CopyToClipboardService) { }

  copyMessage(copyMessage: string): void {
    this.copyToClipBoard(copyMessage);
    this.copyTooltip = 'Copied!';
    setTimeout(() => {
      this.copyTooltip = 'Copy';
    }, 3000);
  }

  copyToClipBoard(val: string): void {
    this.copyService.copyToClipBoard(val);
  }
}
