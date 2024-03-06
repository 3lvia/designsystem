import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, booleanAttribute } from '@angular/core';
import { Subscription } from 'rxjs';

import { LocalStorageService } from '../../localstorage.service';
import { CodeViewerComponent } from './code-viewer/code-viewer.component';
import { Tab } from './types';

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  standalone: true,
  imports: [CodeViewerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CodeGeneratorComponent implements OnInit {
  private storageSubscription: Subscription;

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

  constructor(private localStorageService: LocalStorageService) {
    this.activeTabIndex = this.localStorageService.getItem();
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

    this.storageSubscription = this.localStorageService.storageChanged.subscribe((value) => {
      this.activeTabIndex = value;
    });
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
    this.localStorageService.setItem(newIndex);
    this.activeTabIndex = newIndex;
  }
}
