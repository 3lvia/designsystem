import { Component, Input, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { heightDown } from 'src/app/shared/animations';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
  animations: [heightDown],
})
export class CodeBlockComponent implements OnInit, AfterViewInit {
  @ViewChild('defaultFrame') defaultFrame;
  @Input() title = '';
  @Input() description = '';
  @Input() does = [];
  @Input() donts = [];
  @Input() isTS = false;
  @Input() isHTML = false;
  @Input() isSCSS = false;
  @Input() code = '';
  @Input() showIframeScreens = false;
  @Input() noPhone = false;
  @Input() noTablet = false;
  @Input() noDesktop = false;
  @Input() greyBg = false;
  @Input() overwriteHeight: number;

  showCode = false;
  showTabs = true;
  screen = 'desktop';
  codepen = '';


  ngOnInit(): void {
    this.codepen = this.getCodePen(this.code, this.title);

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

  getCodePen(code: string, title: string): string {
    title = title ? title : 'Example';
    const html = `${code}
<script src="https://unpkg.com/@elvia/elvis@latest/elvis.js"></script>
<link rel="stylesheet" type="text/css" href="https://unpkg.com/@elvia/elvis@latest/css/elvis.min.css" />
    `;
    return JSON.stringify({ title: title, html: html });
  }
}
