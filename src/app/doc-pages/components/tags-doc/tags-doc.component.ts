import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-tags-doc',
  templateUrl: './tags-doc.component.html',
  styleUrls: ['./tags-doc.component.scss']
})
export class TagsDocComponent implements OnInit {

  componentStatus = getComponent('tags-doc').status;
  componentClasses = ['.elvis-tags', '.elvis-tags_item'];

  example1 = `<div class="elvis-tags">
  <span class="elvis-tags_item">707057500051628391</span>
  <span class="elvis-tags_item">707057500051628391</span>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
