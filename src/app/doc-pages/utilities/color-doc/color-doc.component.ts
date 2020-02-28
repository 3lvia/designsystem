import { Component, OnInit, Input } from '@angular/core';
import { TabNames } from 'src/app/shared/tab-names.enums';

@Component({
  selector: 'app-color-doc',
  templateUrl: './color-doc.component.html',
  styleUrls: ['./color-doc.component.scss']
})
export class ColorDocComponent implements OnInit {

  @Input() selected = TabNames.Overview;

  tabs = [TabNames.Overview, TabNames.Guidelines];
  componentClasses = ['e-text', 'e-bg'];
  colors: string[] = ['red', 'green'];

  constructor() { }

  ngOnInit() {
  }


}
