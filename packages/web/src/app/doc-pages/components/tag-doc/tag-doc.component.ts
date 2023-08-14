import { Component } from '@angular/core';

@Component({
  selector: 'app-tag-doc',
  templateUrl: './tag-doc.component.html',
  styleUrls: ['./tag-doc.component.scss'],
})
export class TagDocComponent {
  headerDoes = ['When you need to categorize or view the status of items.'];
  headerDonts = [
    'Do not use tags alone without pairing it with an item.',
    "Don't show numeric values ​​in a tag, then you should use data tags instead.",
  ];
}
