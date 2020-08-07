import { Component, Input, AfterViewInit, ViewChild, OnInit, ElementRef } from '@angular/core';
import { heightDown } from 'src/app/shared/animations';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
  animations: [heightDown],
})
export class CodeBlockComponent implements OnInit, AfterViewInit {
  @ViewChild('accordion') accordion: ElementRef;
  @ViewChild('defaultFrame') defaultFrame;
  @Input() title = '';
  @Input() description = '';
  @Input() does = [];
  @Input() donts = [];
  @Input() codeTS = '';
  @Input() codeHTML = '';
  @Input() codeCSS = '';
  @Input() codeInverted = '';
  @Input() showIframeScreens = false;
  @Input() noPhone = false;
  @Input() noTablet = false;
  @Input() noDesktop = false;
  @Input() greyBg = false;
  @Input() overwriteHeight: number;
  @Input() overwriteHeightTablet: number;
  @Input() overwriteHeightPhone: number;

  code = '';
  showCode = false;
  showTabs = true;
  screen = 'desktop';
  codepen = '';
  displayCode = '';
  isInverted = false;


  ngOnInit(): void {
    this.codepen = this.getCodePen();
    this.code = this.codeTS !== '' ? this.codeTS : (this.codeHTML !== '' ? this.codeHTML : this.codeCSS);
    this.displayCode = this.code;

    if (!this.showIframeScreens) {
      return;
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
    if (!this.showIframeScreens) {
      this.defaultFrame.nativeElement.innerHTML = this.code;
    }
  }

  getCodePen(): string {
    this.title = this.title ? this.title : 'Example';
    let html;
    if (this.codeInverted !== '' && this.isInverted) {
      html = `${this.codeInverted}
      <script src="https://unpkg.com/@elvia/elvis@latest/elvis.js"></script>
      <link rel="stylesheet" type="text/css" href="https://unpkg.com/@elvia/elvis@latest/css/elvis.min.css" />
      `;
    } else {
      html = `${this.code}
  <script src="https://unpkg.com/@elvia/elvis@latest/elvis.js"></script>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/@elvia/elvis@latest/css/elvis.min.css" />
      `;
    }
    return JSON.stringify({ title: this.title, html });
  }

  toggleInverted(): void {
    this.isInverted = !this.isInverted;
    this.codepen = this.getCodePen();
    if (this.displayCode === this.code) {
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

  toggleOpen(): void {
    if (this.accordion.nativeElement.classList.contains('e-accordion__item--open')) {
      this.accordion.nativeElement.classList.remove('e-accordion__item--open');
    } else {
      this.accordion.nativeElement.classList.add('e-accordion__item--open');
    }
  }
}

