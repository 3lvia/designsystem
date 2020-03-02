import { Component, OnInit, Input } from '@angular/core';
import { TabNames } from 'src/app/shared/tab-names.enums';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  @Input() selected = TabNames.Article;

  tabs = [TabNames.Article, TabNames.Header, TabNames.Footer];

  constructor() { }

  ngOnInit() {
  }

}
