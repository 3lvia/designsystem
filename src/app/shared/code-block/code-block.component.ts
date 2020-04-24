import { Component, Input, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { heightDown } from 'src/app/shared/animations';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
  animations: [heightDown]
})


export class CodeBlockComponent implements OnInit, AfterViewInit {
  @ViewChild('defaultFrame') defaultFrame;
  @Input() title = '';
  @Input() class: string[];
  @Input() description = '';
  @Input() does = '';
  @Input() donts = '';
  @Input() isTS = false;
  @Input() isHTML = false;
  @Input() isSCSS = false;
  @Input() code = '';
  @Input() showIframeScreens = false;
  @Input() noPhone = false;
  @Input() noTablet = false;
  @Input() noDesktop = false;

  showCode = false;
  showTabs = true;
  screen = 'desktop';
  codepen = '';

  constructor() {}

  ngOnInit() {
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

  ngAfterViewInit() {
    if (!this.showIframeScreens) {
      this.defaultFrame.nativeElement.innerHTML = this.code;
    }
  }
}

