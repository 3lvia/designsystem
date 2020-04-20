import { Component, Input, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { heightDown } from 'src/app/shared/animations';

@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss'],
  animations: [heightDown]
})


export class CodeBlockComponent implements OnInit {
  @Input() title = '';
  @Input() class: string[];
  @Input() description = '';
  @Input() does = '';
  @Input() donts = '';
  @Input() isTS = false;
  @Input() isHTML = false;
  @Input() isSCSS = false;
  @Input() code = '';
  @Input() noPhone = false;
  @Input() noTablet = false;
  @Input() noDesktop = false;

  showCode = false;
  screen = 'desktop';
  codepen = '';

  constructor() {}

  ngOnInit() {
  }
}

