import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tag-doc',
  templateUrl: './tag-doc.component.html',
  styleUrls: ['./tag-doc.component.scss'],
})
export class TagDocComponent {
  title = getComponent('tag')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  headerDoes = ['When you need to categorize or view the status of items.'];
  headerDonts = [
    'Do not use tags alone without pairing it with an item.',
    "Don't show numeric values ​​in a tag, then you should use data tags instead.",
  ];
}
