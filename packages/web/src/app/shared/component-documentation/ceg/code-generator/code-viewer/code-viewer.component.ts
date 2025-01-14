import { AsyncPipe } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  booleanAttribute,
  input,
  output
} from '@angular/core';

import { IfViewportSizeDirective } from '../../../../viewport-size/if-viewport-size.directive';
import { TabToSegmentedControlItemPipe } from '../../../tabToSegmentedControlItem.pipe';
import { Tab } from '../../../types';
import { FormatCodePipe } from '../formatCode.pipe';
import { HighlighterPipe } from '../highlighter.pipe';
import { Language } from '../types';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';

@Component({
  selector: 'app-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.scss'],
  imports: [
    IfViewportSizeDirective,
    AsyncPipe,
    TabToSegmentedControlItemPipe,
    FormatCodePipe,
    HighlighterPipe,
  ],
  providers: [FormatCodePipe, HighlighterPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CodeViewerComponent {
  readonly tabs = input<Tab[]>(['HTML']);
  readonly fileName = input('');
  readonly activeCode = input('');
  readonly activeTabIndex = input(0);
  /** Hides tabs in the code viewer
   * NB: language must be specified in the 'tabs' property for syntax highlighting */
  readonly hideTabs = input(false, { transform: booleanAttribute });
  readonly hideCopy = input(false, { transform: booleanAttribute });
  readonly tabIndexChange = output<number>();

  copyMessage = '';

  get language(): Language {
    if (this.activeCode().toLowerCase().startsWith('<!doctype html>')) {
      return 'html';
    } else if (this.activeTab === 'React') {
      return 'jsx';
    } else if (this.activeTab === 'Typescript') {
      return 'typescript';
    } else if (this.activeTab === 'CSS') {
      return 'css';
    } else if (this.activeTab === 'Bash') {
      return 'bash';
    } else if (this.activeTab === 'JSON') {
      return 'json';
    }
    return 'html';
  }

  get activeTab(): Tab {
    return this.tabs()[this.activeTabIndex()];
  }

  constructor(
    private codeFormatter: FormatCodePipe,
    public breakpointService: BreakpointService,
  ) {}

  async copyCode() {
    await navigator.clipboard
      .writeText(await this.codeFormatter.transform(this.activeCode(), this.language))
      .then(() => {
        this.copyMessage = 'Copied!';
        const copyTimeout = setTimeout(() => {
          this.copyMessage = '';
          clearTimeout(copyTimeout);
        }, 3000);
      });
  }
}
