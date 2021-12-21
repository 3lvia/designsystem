import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HighlightService } from 'src/app/core/services/highlight.service';
import { CopyToClipboardService } from 'src/app/core/services/copy-to-clipboard.service';
import { VersionService } from 'src/app/core/services/version.service';
import { ExampleCodeService } from '../../example-code.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-component-example-code',
  templateUrl: './component-example-code.component.html',
  styleUrls: ['./component-example-code.component.scss'],
})
export class ComponentExampleCodeComponent implements OnInit, OnChanges {
  @Input() componentData;
  @Input() inlineExample;
  @Input() codeTS = '';
  @Input() codeHTML = '';
  @Input() codeCSS = '';
  @Input() codeAngular = '';
  @Input() codeReact = '';
  @Input() codeVue = '';
  @Input() codeInverted = '';
  @Input() isInverted = false;
  @Input() isJS = false;
  @Input() doDontComp = false;
  @Input() noSubscriptions = false;

  codeNative = '';
  copyMessage = '';
  activeTab = 0;
  activeLanguage = '';
  activeCode = '';
  highlightedCode = '';
  nativeScriptCode = '';
  startOfScript = '';
  endOfScript = '';
  myCode = '';
  codepen = '';
  codeAngularSub: Subscription;
  codeReactSub: Subscription;
  codeVueSub: Subscription;
  codeNativeSub: Subscription;
  tabs = [];

  constructor(
    private highlightService: HighlightService,
    private copyService: CopyToClipboardService,
    private versionService: VersionService,
    private codeService: ExampleCodeService,
  ) {}

  getTabIndex(str: string): void {
    this.tabs.indexOf(str);
  }

  changeTab(index: number): void {
    this.activeTab = index;
    const selectedTab = this.tabs[index];

    if (selectedTab === 'HTML') {
      this.activeLanguage = 'html';
      this.activeCode = this.codeHTML;
    }
    if (selectedTab === 'Typescript') {
      this.activeLanguage = 'ts';
      this.activeCode = this.codeTS;
    }
    if (selectedTab === 'CSS') {
      this.activeLanguage = 'scss';
      this.activeCode = this.codeCSS;
    }
    if (selectedTab === 'Angular') {
      this.activeLanguage = 'html';
      this.activeCode = this.codeAngular;
    }
    if (selectedTab === 'React') {
      this.activeLanguage = 'jsx';
      this.activeCode = this.codeReact;
    }
    if (selectedTab === 'Vue') {
      this.activeLanguage = 'html';
      this.activeCode = this.codeVue;
    }
    if (selectedTab === 'Native') {
      this.activeLanguage = 'html';
      this.activeCode = this.codeNative;
      if (this.componentData && this.componentData.codeNativeScript) {
        this.startOfScript = `<script>`;
        this.startOfScript = this.highlightService.highlight(this.startOfScript, 'html');
        this.endOfScript = `</script>`;
        this.endOfScript = this.highlightService.highlight(this.endOfScript, 'html');
        this.nativeScriptCode = this.componentData.codeNativeScript;
        this.nativeScriptCode = this.highlightService.highlight(this.nativeScriptCode, 'js');
      }
    }
    if (this.isInverted) {
      this.activeCode = this.codeInverted;
      this.activeLanguage = 'html';
    }

    if (this.activeCode && this.activeLanguage) {
      this.highlightCode();
    }
  }

  updateTabs(): void {
    this.tabs = this.getTabs();
    this.changeTab(this.activeTab);
  }

  getTabs(): any[] {
    const tabs = [];
    if (this.noSubscriptions === false) {
      if (this.codeAngular !== '') {
        tabs.push('Angular');
      }
      if (this.codeReact !== '') {
        tabs.push('React');
      }
      if (this.codeVue !== '' && this.codeVue !== undefined) {
        tabs.push('Vue');
      }
      if (this.codeNative !== '') {
        tabs.push('Native');
      }
    }
    if (this.codeTS !== '') {
      tabs.push('Typescript');
    }
    if (this.isJS && this.codeTS != '') {
      tabs.push('Javascript');
    }
    if (this.codeHTML !== '') {
      tabs.push('HTML');
    }
    if (this.codeCSS !== '') {
      tabs.push('CSS');
    }
    return tabs;
  }

  ngOnInit(): void {
    if (this.componentData) {
      this.codeAngular = this.componentData.codeAngular;
      this.codeReact = this.componentData.codeReact;
      this.codeNative = this.componentData.codeNativeHTML;
      this.codeVue = this.componentData.codeVue;
    }
    if (this.inlineExample) {
      this.updateTabs();
      this.setCodePenValue();
      return;
    }
    this.codeAngularSub = this.codeService.listenCodeAngular().subscribe((newCode: string) => {
      this.codeAngular = newCode;
      this.highlightCode();
      this.updateTabs();
    });
    this.codeReactSub = this.codeService.listenCodeReact().subscribe((newCode: string) => {
      this.codeReact = newCode;
      this.highlightCode();
      this.updateTabs();
    });
    this.codeVueSub = this.codeService.listenCodeVue().subscribe((newCode: string) => {
      this.codeVue = newCode;
      this.highlightCode();
      this.updateTabs();
    });
    this.codeNativeSub = this.codeService.listenCodeNative().subscribe((newCode: string) => {
      this.codeNative = newCode;
      this.highlightCode();
      this.updateTabs();
    });
    this.updateTabs();
    this.setCodePenValue();
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
    if (changes.codeAngular) {
      this.codeAngular = changes.codeAngular.currentValue;
    }
    if (changes.codeReact) {
      this.codeReact = changes.codeReact.currentValue;
    }
    this.updateTabs();
  }

  ngOnDestroy(): void {
    if (this.codeAngularSub) {
      this.codeAngularSub.unsubscribe();
    }
    if (this.codeReactSub) {
      this.codeReactSub.unsubscribe();
    }
  }

  highlightCode(): void {
    if (this.activeCode && this.activeLanguage) {
      this.highlightedCode = this.highlightService.highlight(this.activeCode, this.activeLanguage);
    }
  }

  copyCode(): void {
    this.copyService.copyToClipBoard(this.activeCode);
    this.copyMessage = 'Copied!';
    const copyTimeout = setTimeout(() => {
      this.copyMessage = '';
      clearTimeout(copyTimeout);
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
