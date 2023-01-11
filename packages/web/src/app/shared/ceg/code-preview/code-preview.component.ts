import { OnInit, Component, Input } from '@angular/core';
import { HighlightService } from 'src/app/core/services/highlight.service';
import ComponentData from 'src/app/doc-pages/components/component-data.interface';

@Component({
  selector: 'app-code-preview',
  templateUrl: './code-preview.component.html',
  styleUrls: ['./code-preview.component.scss'],
})
export class CodePreviewComponent implements OnInit {
  @Input() componentData: ComponentData;
  languages = ['angular', 'react', 'vue', 'native'];
  activeLanguageIndex = 0;
  codes;
  activeCode;
  highlightedCode;

  constructor(private highlightService: HighlightService) {}

  ngOnInit(): void {
    this.activeCode = this.componentData.codeAngular;
    this.codes = [
      this.componentData.codeAngular,
      this.componentData.codeReact,
      this.componentData.codeVue,
      this.componentData.codeNativeHTML,
    ];

    this.highlightCode();
  }

  highlightCode = (): void => {
    const activeLanguageType = this.activeLanguageIndex === 1 ? 'jsx' : 'html';
    if (this.activeCode) {
      this.highlightedCode =
        this.activeLanguageIndex !== 3
          ? this.highlightService.highlight(this.activeCode, activeLanguageType)
          : this.highlightService.highlight(this.activeCode, activeLanguageType) +
            '\n \n' +
            this.highlightService.highlight('<!--Script-->', 'html') +
            '\n' +
            this.highlightService.highlight(this.componentData.codeNativeScript, 'js');
    }
  };

  changeLanguage = (newActiveLanguageIndex: number): void => {
    this.activeLanguageIndex = newActiveLanguageIndex;
    this.activeCode = this.codes[newActiveLanguageIndex];
    this.highlightCode();
  };
}
