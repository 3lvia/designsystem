import { Component, Input, AfterViewInit, ViewChild, OnInit, ElementRef } from '@angular/core';
import { heightDown } from 'src/app/shared/animations';
import { VersionService } from 'src/app/core/services/version.service';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
  animations: [heightDown],
})
export class CodeBlockComponent implements OnInit, AfterViewInit {
  @ViewChild('toggle') toggle: ElementRef;
  @ViewChild('defaultFrame') defaultFrame;
  @Input() does = [];
  @Input() donts = [];
  @Input() showPreview = true;
  @Input() codeTS = '';
  @Input() codeHTML = '';
  @Input() codeCSS = '';
  @Input() isJS = false;
  @Input() codeInverted = '';
  @Input() showIframeScreens = false;
  @Input() noPhone = false;
  @Input() noTablet = false;
  @Input() noDesktop = false;
  @Input() greyBg = false;
  @Input() overwriteHeight: number;
  @Input() overwriteHeightTablet: number;
  @Input() overwriteHeightPhone: number;
  @Input() showIframeDesktop = false;

  code = '';
  showTabs = true;
  screen = 'desktop';
  codepen = '';
  displayCode = '';
  isInverted = false;
  showIframe = false;
  desktopScreenWidth: boolean;

  constructor(private versionService: VersionService) { }

  ngOnInit(): void {
    this.code = this.codeTS !== '' ? this.codeTS : (this.codeHTML !== '' ? this.codeHTML : this.codeCSS);
    this.setCodePenValue();
    this.displayCode = this.code;

    if (!this.showIframeScreens) {
      return;
    }
    if (window.innerWidth >= 1024) {
      this.desktopScreenWidth = true;
      this.showIframe = false;
    } else {
      this.desktopScreenWidth = false;
      this.showIframe = true;
    }
    if (!this.showIframeDesktop) {
      this.updateShowIframe();
      window.addEventListener('resize', () => {
        this.updateShowIframe();
      });
    }
    if (this.noPhone && this.noTablet) {
      this.screen = 'desktop';
      this.showTabs = false;
    }
    if (this.noPhone && this.noDesktop) {
      this.screen = 'tablet';
      this.showTabs = false;
    }
    if (this.noTablet && this.noDesktop) {
      this.screen = 'phone';
      this.showTabs = false;
    }
  }

  ngAfterViewInit(): void {
    this.updateDefaultFrame();
    if (this.codeInverted !== '' && this.showPreview) {
      const elements = document.querySelectorAll('.e-toggle__input');
      for (let i = 0; i < elements.length; i++) {
        const item = elements.item(i) as HTMLInputElement;
        setTimeout(() => {
          item.checked = false;
        });
      }
    }
  }

  updateDefaultFrame(): void {
    if (this.showIframeScreens && window.innerWidth < 1024 || this.screen !== 'desktop' || !this.showPreview) {
      return;
    }
    this.defaultFrame.nativeElement.innerHTML = this.code;
  }

  updateShowIframe(): void {
    const isDesk = this.isDesktop();
    if (isDesk === this.desktopScreenWidth) {
      return;
    }
    this.showIframe = !this.showIframe;
    this.desktopScreenWidth = isDesk;
    setTimeout(() => { if (this.defaultFrame) { this.defaultFrame.nativeElement.innerHTML = this.code; } }, 0);
  }

  isDesktop(): boolean {
    return window.innerWidth >= 1024;
  }

  setScreenType(screenType: string): void {
    this.screen = screenType;
    setTimeout(() => this.updateDefaultFrame(), 10);
  }

  setCodePenValue(): void {
    let html;
    this.versionService.getCodePenTag().subscribe(tag => {
      if (this.codeInverted !== '' && this.isInverted) {
        html = `${this.codeInverted}
${tag}`;
      } else {
        html = `${this.code}
${tag}`;
      }
      this.codepen = JSON.stringify({ title: 'Elvis', html });
    });

  }

  toggleInverted(): void {
    this.isInverted = !this.isInverted;
    this.setCodePenValue();
    if (this.displayCode === this.code && this.isInverted) {
      if (this.defaultFrame) {
        this.defaultFrame.nativeElement.innerHTML = this.codeInverted;
      } else {
        this.displayCode = this.codeInverted;
      }
    } else {
      if (this.defaultFrame) {
        this.defaultFrame.nativeElement.innerHTML = this.code;
      } else {
        this.displayCode = this.code;
      }
    }
  }

}








