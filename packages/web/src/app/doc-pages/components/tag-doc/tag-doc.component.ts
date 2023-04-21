import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { exampleContents } from 'src/app/shared/example-contents';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tag-doc',
  templateUrl: './tag-doc.component.html',
  styleUrls: ['./tag-doc.component.scss'],
})
export class TagDocComponent {
  figmaUrl = getComponent('tag')?.figmaUrl;
  description = getComponent('tag')?.description;
  title = getComponent('tag')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  headerDoes = ['When you need to categorize or view the status of items.'];
  headerDonts = [
    'Do not use tags alone without pairing it with an item.',
    "Don't show numeric values ​​in a tag, then you should use data tags instead.",
  ];

  exampleOverview = `<div class="e-tag">tag</div>
`;

  example1 =
    `<div class="e-tag e-m-8">` +
    exampleContents.words.categories['eng-GBR'][0] +
    `</div>
<div class="e-tag e-m-8">` +
    exampleContents.words.categories['eng-GBR'][1] +
    `</div>
<div class="e-tag e-m-8">` +
    exampleContents.words.categories['eng-GBR'][2] +
    `</div>
`;

  example2 = `<div class="e-tag e-tag--green e-m-8">New</div>
<div class="e-tag e-tag--red e-m-8">Dangerous</div>
<div class="e-tag e-tag--orange e-m-8">Warning</div>
<div class="e-tag e-tag--blue-berry e-m-8">Info</div>
`;
}
