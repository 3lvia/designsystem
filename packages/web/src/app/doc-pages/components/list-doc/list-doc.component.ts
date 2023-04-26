import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { exampleContents } from 'src/app/shared/example-contents';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list-doc',
  templateUrl: './list-doc.component.html',
  styleUrls: ['./list-doc.component.scss'],
})
export class ListDocComponent {
  figmaUrl = getComponent('list')?.figmaUrl;
  description = getComponent('list')?.description;
  title = getComponent('list')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  doesExample1 = ['Items that are in no required order.'];
  doesExample3 = [
    'When you need to have a priority or hierarchy between list items',
    'Item in required order (step by step)',
  ];
  doesExample4 = ['When you need to list up definitions or explain items.'];
}
