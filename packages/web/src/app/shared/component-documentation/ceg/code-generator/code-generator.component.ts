import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, booleanAttribute } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PreferredLanguageService } from '../../preferredLanguage.service';
import { LanguageType, Tab } from '../../types';
import { CodeViewerComponent } from './code-viewer/code-viewer.component';

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  standalone: true,
  imports: [CodeViewerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CodeGeneratorComponent implements OnInit {
  @Input() angularCode = '';
  @Input() reactCode = '';
  @Input() vueCode = '';
  @Input({ transform: booleanAttribute }) hideReact: boolean;

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

  activeTabIndex: number = 0;
  tabs: Tab[] = ['Angular', 'React', 'Vue'];

  constructor(private preferredLanguageService: PreferredLanguageService) {
    this.preferredLanguageService.preferredLanguage$.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.setTabIndex(value);
    });
  }

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

  setTabIndex(value: LanguageType) {
    this.activeTabIndex = this.tabs.findIndex((tab) => tab.toLowerCase() === value);
  }

  setActiveTab(newIndex: number): void {
    this.preferredLanguageService.setPreferredLanguage(this.tabs[newIndex].toLowerCase() as LanguageType);
  }
}
