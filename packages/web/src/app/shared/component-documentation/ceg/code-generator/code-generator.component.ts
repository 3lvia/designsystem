import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  booleanAttribute,
  effect,
  input,
  signal,
} from '@angular/core';

import { PreferredLanguageService } from '../../preferredLanguage.service';
import { LanguageType, Tab } from '../../types';
import { CodeViewerComponent } from './code-viewer/code-viewer.component';

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  imports: [CodeViewerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CodeGeneratorComponent implements OnInit {
  readonly angularCode = input('');
  readonly reactCode = input('');
  readonly vueCode = input('');
  readonly hideReact = input(false, { transform: booleanAttribute });

  private _typeScriptCode = '';
  // TODO: Skipped for migration because:
  //  Accessor inputs cannot be migrated as they are too complex.
  @Input()
  get typeScriptCode() {
    return this._typeScriptCode;
  }
  set typeScriptCode(code: string) {
    this._typeScriptCode = code;

    if (code?.length && !this.tabs().includes('Typescript')) {
      this.tabs.update((old) => [...old, 'Typescript']);
    } else if (!code?.length && this.tabs().includes('Typescript')) {
      this.tabs.update((old) => old.filter((tab) => tab !== 'Typescript'));
    }
  }

  activeTabIndex = 0;
  tabs = signal<Tab[]>(['Angular', 'React', 'Vue']);

  constructor(private preferredLanguageService: PreferredLanguageService) {
    effect((cleanup) => {
      const subscription = this.preferredLanguageService
        .listenLanguage(this.tabs().map((tab) => tab.toLowerCase() as LanguageType))
        .subscribe((value) => {
          this.activeTabIndex = this.tabs().findIndex((tab) => tab.toLowerCase() === value);
        });
      cleanup(() => subscription.unsubscribe());
    });
  }

  ngOnInit(): void {
    if (this.hideReact()) {
      this.tabs.update((old) => old.filter((tab) => tab !== 'React'));
    }

    /**
     * Prevent that no tab is selected if user navigates from a page with
     * the typescript tab selected, to a page without the typescript tab.
     */
    if (this.activeTabIndex > this.tabs().length - 1) {
      this.setActiveTab(this.tabs().length - 1);
    }
  }

  get activeTab() {
    return this.tabs()[this.activeTabIndex];
  }

  get activeCode() {
    if (this.activeTab === 'Angular') {
      return this.angularCode();
    } else if (this.activeTab === 'React') {
      return this.reactCode();
    } else if (this.activeTab === 'Typescript') {
      return this.typeScriptCode;
    } else {
      return this.vueCode();
    }
  }

  setActiveTab(newIndex: number): void {
    // @ts-expect-error TS2532 (LEGO-3683)
    this.preferredLanguageService.setPreferredLanguage(this.tabs()[newIndex].toLowerCase() as LanguageType);
  }
}
