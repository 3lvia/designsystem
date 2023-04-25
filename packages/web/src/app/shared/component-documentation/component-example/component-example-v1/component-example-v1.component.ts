import { Component, Input, AfterViewInit, ViewChild, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-component-example-v1',
  templateUrl: './component-example-v1.component.html',
  styleUrls: ['./component-example-v1.component.scss'],
})
export class ComponentExampleV1Component implements OnInit, AfterViewInit {
  @ViewChild('toggle') toggle: ElementRef;
  @ViewChild('defaultFrame') defaultFrame: ElementRef<HTMLDivElement>;
  @Input() showPreview = true;
  @Input() codeTS = '';
  @Input() codeHTML = '';
  @Input() codeCSS = '';
  @Input() codeInverted = '';
  @Input() isMobileExample = false;
  @Input() greyBg = false;
  @Input() darkGreyBg = false;
  @Input() overwriteHeight: number;
  @Input() showIframeDesktop = false;
  @Input() interactable = true;
  @Input() isInverted = false;
  @Input() noCodePenLink = false;

  code = '';
  desktopScreenWidth: boolean;
  displayCode = '';

  ngOnInit(): void {
    if (this.codeTS !== '') {
      this.code = this.codeTS;
    } else if (this.codeHTML !== '') {
      this.code = this.codeHTML;
    } else {
      this.code = this.codeCSS;
    }

    this.displayCode = this.code;
    if (!this.showIframeDesktop) {
      this.desktopScreenWidth = this.isDesktop();
      this.updateShowIframe();
      window.addEventListener('resize', () => {
        this.updateShowIframe();
      });
    }
  }

  ngAfterViewInit(): void {
    this.updateDefaultFrame();
  }

  updateDefaultFrame(): void {
    if (this.defaultFrame) {
      if (!this.isInverted) {
        this.defaultFrame.nativeElement.innerHTML = this.code;
      } else {
        this.defaultFrame.nativeElement.innerHTML = this.codeInverted;
      }
    }
  }

  updateShowIframe(): void {
    const isDesk = this.isDesktop();
    if (isDesk === this.desktopScreenWidth) {
      return;
    }
    this.desktopScreenWidth = isDesk;
    setTimeout(() => {
      if (this.defaultFrame) {
        this.defaultFrame.nativeElement.innerHTML = this.code;
      }
    }, 0);
  }

  isDesktop(): boolean {
    return window.innerWidth >= 1024;
  }

  toggleInverted(): void {
    this.isInverted = !this.isInverted;
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
