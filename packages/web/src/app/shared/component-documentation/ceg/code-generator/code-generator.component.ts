import { Component, Input, OnInit } from '@angular/core';

import { FormatCodePipe } from './formatCode.pipe';
import { Language } from './language';

type Tab = 'Angular' | 'React' | 'Vue' | 'Typescript';

const LANGUAGE_STORAGE_KEY = 'preferredCegLanguage';
let CODE_GENERATOR_TAB_ID = 0;

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.scss'],
})
export class CodeGeneratorComponent implements OnInit {
  @Input() angularCode = '';
  @Input() reactCode = '';
  @Input() vueCode = '';
  @Input() hideReact: boolean;

  private _typeScriptCode = '';
  @Input()
  get typeScriptCode() {
    return this._typeScriptCode;
  }
  set typeScriptCode(code: string) {
    this._typeScriptCode = code;

    if (code?.length && !this.tabs.includes('Typescript')) {
      this.tabs.push('Typescript');
    } else if (!code?.length && this.tabs.includes('Typescript')) {
      this.tabs.splice(this.tabs.indexOf('Typescript'), 1);
    }
  }

  activeTabIndex = localStorage.getItem(LANGUAGE_STORAGE_KEY)
    ? parseInt(localStorage.getItem(LANGUAGE_STORAGE_KEY)!)
    : 0;
  tabs: Tab[] = ['Angular', 'React', 'Vue'];
  copyMessage = '';
  tabGroupId = `ceg-tabs-id-${CODE_GENERATOR_TAB_ID++}`;

  constructor(private codeFormatter: FormatCodePipe) {}

  ngOnInit(): void {
    if (this.hideReact) {
      this.tabs.splice(this.tabs.indexOf('React'), 1);
    }

    /**
     * Prevent that no tab is selected if user navigates from a page with
     * the typescript tab selected, to a page without the typescript tab.
     */
    if (this.activeTabIndex > this.tabs.length - 1) {
      this.setActiveTab(this.tabs.length - 1);
    }
  }

  get language(): Language {
    if (this.activeTab === 'React') {
      return 'jsx';
    } else if (this.activeTab === 'Typescript') {
      return 'typescript';
    }
    return 'html';
  }

  get activeTab() {
    return this.tabs[this.activeTabIndex];
  }

  get activeCode() {
    if (this.activeTab === 'Angular') {
      return this.angularCode;
    } else if (this.activeTab === 'React') {
      return this.reactCode;
    } else if (this.activeTab === 'Typescript') {
      return this.typeScriptCode;
    } else {
      return this.vueCode;
    }
  }

  setActiveTab(newIndex: number): void {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, newIndex.toString());
    this.activeTabIndex = newIndex;
  }

  copyCode() {
    navigator.clipboard.writeText(this.codeFormatter.transform(this.activeCode, this.language)).then(() => {
      this.copyMessage = 'Copied!';
      const copyTimeout = setTimeout(() => {
        this.copyMessage = '';
        clearTimeout(copyTimeout);
      }, 3000);
    });
  }
}
