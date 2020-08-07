import { Component, Input, AfterViewChecked, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HighlightService } from 'src/app/core/services/highlight.service';

@Component({
  selector: 'app-code-highlighter',
  templateUrl: './code-highlighter.component.html',
  styleUrls: ['./code-highlighter.component.scss'],
})
export class CodeHighlighterComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() codeTS = '';
  @Input() codeHTML = '';
  @Input() codeCSS = '';
  @Input() codeInverted = '';
  @Input() isInverted = false;
  @Input() isJS = false;

  highlighted = false;
  activeTab = 'ts';
  copyMessage = '';

  constructor(private highlightService: HighlightService) { }

  ngOnInit(): void {
    this.activeTab = this.codeTS !== '' ? 'ts' : (this.codeHTML !== '' ? 'html' : 'css');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isInverted && !changes.isInverted.firstChange) {
      this.isInverted = changes.isInverted.currentValue;
      this.highlighted = false;
    }
  }

  ngAfterViewChecked(): void {
    if (!this.highlighted) {
      this.highlight();
    }
  }

  highlight(): void {
    this.highlightService.highlightAll();
    this.highlighted = true;
  }

  copyCode(): void {
    if (this.activeTab === 'ts') {
      this.copyToClipBoard(this.codeTS);
    } else if (this.activeTab === 'html') {
      this.copyToClipBoard(this.codeHTML);
    } else {
      this.copyToClipBoard(this.codeCSS);
    }
    this.copyMessage = 'Copied!';
    setTimeout(() => {
      this.copyMessage = '';
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

  changeActiveTab(type: string): void {
    this.activeTab = type;
    this.highlighted = false;
  }
}
