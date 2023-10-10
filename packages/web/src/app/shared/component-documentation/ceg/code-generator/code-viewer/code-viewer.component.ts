import { Component, EventEmitter, Input, Output, booleanAttribute } from '@angular/core';
import { Language, Tab } from '../types';
import { FormatCodePipe } from '../formatCode.pipe';

let CODE_GENERATOR_TAB_ID = 0;

@Component({
  selector: 'app-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.scss'],
})
export class CodeViewerComponent {
  @Input() tabs: Tab[] = ['HTML'];
  @Input() activeCode = '';
  @Input() activeTabIndex = 0;
  /** Hides tabs in the code viewer
   * NB: language must be specified in the 'tabs' property for syntax highlighting */
  @Input({ transform: booleanAttribute }) hideTabs = false;
  @Output() tabIndexChange = new EventEmitter<number>();

  tabGroupId = `ceg-tabs-id-${CODE_GENERATOR_TAB_ID++}`;
  copyMessage = '';

  get language(): Language {
    if (this.activeCode.toLowerCase().startsWith('<!doctype html>')) {
      return 'html';
    } else if (this.activeTab === 'React') {
      return 'jsx';
    } else if (this.activeTab === 'Typescript') {
      return 'typescript';
    } else if (this.activeTab === 'CSS') {
      return 'css';
    }

    return 'html';
  }

  get activeTab(): Tab {
    return this.tabs[this.activeTabIndex];
  }

  constructor(private codeFormatter: FormatCodePipe) {}

  async copyCode() {
    await navigator.clipboard
      .writeText(await this.codeFormatter.transform(this.activeCode, this.language))
      .then(() => {
        this.copyMessage = 'Copied!';
        const copyTimeout = setTimeout(() => {
          this.copyMessage = '';
          clearTimeout(copyTimeout);
        }, 3000);
      });
  }
}
