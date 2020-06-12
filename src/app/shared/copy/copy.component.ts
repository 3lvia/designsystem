import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.scss'],
})
export class CopyComponent {
  @Input() message = '';

  copyTooltip = 'Copy';

  copyMessage(copyMessage: string): void {
    this.copyToClipBoard(copyMessage);
    this.copyTooltip = 'Copied!';
    setTimeout(() => {
      this.copyTooltip = 'Copy';
    }, 3000);
  }

  copyToClipBoard(val: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
