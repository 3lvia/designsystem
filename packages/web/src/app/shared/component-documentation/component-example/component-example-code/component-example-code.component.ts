import { Component, Input, AfterViewChecked, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HighlightService } from 'src/app/core/services/highlight.service';
import { CopyToClipboardService } from 'src/app/core/services/copy-to-clipboard.service';
import { VersionService } from 'src/app/core/services/version.service';

@Component({
  selector: 'app-component-example-code',
  templateUrl: './component-example-code.component.html',
  styleUrls: ['./component-example-code.component.scss'],
})
export class ComponentExampleCodeComponent implements OnInit, OnChanges, AfterViewChecked {
  @Input() codeTS = '';
  @Input() codeHTML = '';
  @Input() codeCSS = '';
  @Input() codeInstallation = '';
  @Input() codeWebComponent = '';
  @Input() codeReact = '';
  @Input() codeInverted = '';
  @Input() isInverted = false;
  @Input() isJS = false;
  @Input() doDontComp = false;
  copyMessage = '';
  highlighted = false;
  activeTab = '';
  activeLanguage = '';
  activeCode = '';
  myCode = '';
  codepen = '';

  constructor(
    private highlightService: HighlightService,
    private copyService: CopyToClipboardService,
    private versionService: VersionService,
  ) {}

  ngOnInit(): void {
    this.initializeActiveTab();
    this.setCodePenValue();
  }

  initializeActiveTab(): void {
    if (this.codeInstallation !== '') {
      this.changeActiveTab('installation');
    } else {
      this.changeActiveTab(this.codeTS !== '' ? 'ts' : this.codeHTML !== '' ? 'html' : 'css');
    }
  }

  changeActiveTab(type: string): void {
    this.activeTab = type;
    if (this.isInverted) {
      this.activeCode = this.codeInverted;
      this.activeLanguage = 'html';
    } else if (this.activeTab === 'ts') {
      this.activeCode = this.codeTS;
      this.activeLanguage = 'ts';
    } else if (this.activeTab === 'html') {
      this.activeCode = this.codeHTML;
      this.activeLanguage = 'html';
    } else if (this.activeTab === 'css') {
      this.activeCode = this.codeCSS;
      this.activeLanguage = 'scss';
    } else if (this.activeTab === 'installation') {
      this.activeCode = this.codeInstallation;
      this.activeLanguage = 'js';
    } else if (this.activeTab === 'react') {
      this.activeCode = this.codeReact;
      this.activeLanguage = 'jsx';
    } else {
      this.activeCode = this.codeWebComponent;
      this.activeLanguage = 'html';
    }
    this.highlighted = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.isInverted && !changes.isInverted.firstChange) {
      this.isInverted = changes.isInverted.currentValue;
    }
    if (changes.codeTS) {
      this.codeTS = changes.codeTS.currentValue;
    }
    if (changes.codeHTML) {
      this.codeHTML = changes.codeHTML.currentValue;
    }
    if (changes.codeCSS) {
      this.codeCSS = changes.codeCSS.currentValue;
    }
    if (changes.codeInstallation) {
      this.codeInstallation = changes.codeInstallation.currentValue;
    }
    if (changes.codeWebComponent) {
      this.codeWebComponent = changes.codeWebComponent.currentValue;
    }
    if (changes.codeReact) {
      this.codeReact = changes.codeReact.currentValue;
    }
    this.initializeActiveTab();
  }

  ngAfterViewChecked(): void {
    setTimeout(() => {
      if (!this.highlighted) {
        this.myCode = this.highlightService.highlight(this.activeCode, this.activeLanguage);
        this.highlighted = true;
      }
    });
  }

  copyCode(): void {
    this.copyService.copyToClipBoard(this.activeCode);
    this.copyMessage = 'Copied!';
    setTimeout(() => {
      this.copyMessage = '';
    }, 3000);
  }

  setCodePenValue(): void {
    let html;
    const css = 'body {margin: 0}';
    this.versionService.getCodePenTag().subscribe((tag) => {
      if (this.codeInverted !== '' && this.isInverted) {
        html = `${this.codeInverted}
${tag}`;
      } else {
        html = `${this.activeCode}
${tag}`;
      }
      this.codepen = JSON.stringify({ title: 'Elvis', html, css });
    });
  }
}
