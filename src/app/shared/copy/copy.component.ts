import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.scss']
})
export class CopyComponent implements OnInit {

  @Input() message = '';

  copyTooltip = 'Copy class';

  constructor() { }

  ngOnInit() {
  }

  copyMessage(copyMessage) {
    this.copyToClipBoard(copyMessage);
    this.copyTooltip = 'Copied!';
    setTimeout(() => {
      this.copyTooltip = 'Copy class';
    }, 2500);
  }

  copyToClipBoard(val: string) {
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
