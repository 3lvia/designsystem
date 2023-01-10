import { AfterContentInit, Component, Input } from '@angular/core';
import { HighlightService } from 'src/app/core/services/highlight.service';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';

@Component({
  selector: 'app-code-preview',
  templateUrl: './code-preview.component.html',
  styleUrls: ['./code-preview.component.scss'],
})
export class CodePreviewComponent implements AfterContentInit {
  @Input() componentData: ComponentData;
  languages = ['angular', 'react', 'vue', 'native'];
  activeLanguageIndex = 0;
  activeCode;
  codes;
  showCopiedText = false;

  constructor(private highlightService: HighlightService) {}

  ngAfterContentInit(): void {
    this.codes = [
      this.componentData.codeAngular,
      this.componentData.codeReact,
      this.componentData.codeVue,
      this.componentData.codeNativeHTML,
    ];
    this.activeCode = this.componentData.codeAngular;
    this.highlightCode();
  }

  updateCode = (newActiveLanguageIndex: number): void => {
    this.activeLanguageIndex = newActiveLanguageIndex;
    this.activeCode = this.codes[newActiveLanguageIndex];
    this.highlightCode();
  };

  highlightCode(): void {
    const currentLanguage = this.activeLanguageIndex === 1 ? 'jsx' : 'html';
    if (this.activeCode) {
      this.activeCode = this.highlightService.highlight(this.activeCode, currentLanguage);
    }
  }

  copyCode(): void {
    navigator.clipboard.writeText(this.activeCode);
    this.showCopiedText = true;
    const copyTimeout = setTimeout(() => {
      clearTimeout(copyTimeout);
      this.showCopiedText = false;
    }, 3000);
  }
}
