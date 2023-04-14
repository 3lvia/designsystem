import { Component, Input } from '@angular/core';

import { FormatCodePipe } from './formatCode.pipe';
import { Language } from './language';

type Tab = 'Angular' | 'React' | 'Vue';

const LANGUAGE_STORAGE_KEY = 'preferredCegLanguage';
let CODE_GENERATOR_TAB_ID = 0;

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.scss'],
})
export class CodeGeneratorComponent {
  @Input() angularCode = '';
  @Input() reactCode = '';
  @Input() vueCode = '';
  activeTabIndex = localStorage.getItem(LANGUAGE_STORAGE_KEY) ?? 0;
  tabs: Tab[] = ['Angular', 'React', 'Vue'];
  copyMessage = '';
  tabGroupId = `ceg-tabs-id-${CODE_GENERATOR_TAB_ID++}`;

  constructor(private codeFormatter: FormatCodePipe) {}

  get language(): Language {
    return this.activeTab === 'React' ? 'jsx' : 'html';
  }

  get activeTab() {
    return this.tabs[this.activeTabIndex];
  }

  get activeCode() {
    if (this.activeTab === 'Angular') {
      return this.angularCode;
    } else if (this.activeTab === 'React') {
      return this.reactCode;
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
