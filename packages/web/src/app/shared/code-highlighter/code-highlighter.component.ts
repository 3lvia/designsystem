import { Component, Input, AfterViewChecked, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HighlightService } from 'src/app/core/services/highlight.service';
import { CopyToClipboardService } from 'src/app/core/services/copy-to-clipboard.service';

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
  @Input() doDontComp = false;

  highlighted = false;
  activeTab = 'ts';
  copyMessage = '';

  constructor(private highlightService: HighlightService, private copyService: CopyToClipboardService) { }

  ngOnInit(): void {
    this.activeTab = this.codeTS !== '' ? 'ts' : (this.codeHTML !== '' ? 'html' : 'css');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isInverted && !changes.isInverted.firstChange) {
      this.isInverted = changes.isInverted.currentValue;
      this.highlighted = false;
    }
    if (changes.codeTS) {
      this.codeTS = changes.codeTS.currentValue;
      this.highlighted = false;
      this.activeTab = this.codeTS !== '' ? 'ts' : (this.codeHTML !== '' ? 'html' : 'css');
    }
    if (changes.codeHTML) {
      this.codeHTML = changes.codeHTML.currentValue;
      this.highlighted = false;
      this.activeTab = this.codeTS !== '' ? 'ts' : (this.codeHTML !== '' ? 'html' : 'css');
    }
    if (changes.codeCSS) {
      this.codeCSS = changes.codeCSS.currentValue;
      this.highlighted = false;
      this.activeTab = this.codeTS !== '' ? 'ts' : (this.codeHTML !== '' ? 'html' : 'css');
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
    this.copyService.copyToClipBoard(val);
  }

  changeActiveTab(type: string): void {
    this.activeTab = type;
    this.highlighted = false;
  }
}
