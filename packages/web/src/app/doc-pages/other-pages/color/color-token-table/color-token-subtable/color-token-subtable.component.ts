import { Component, Input, OnInit } from '@angular/core';
import { TableColorArray } from '../colors';

interface TableTitle {
  type: 'title';
  title: string;
  description: string;
}
interface TableArray {
  type: 'colors';
  colors: TableColorArray;
}
type Colors = (TableArray | TableTitle)[];

@Component({
  selector: 'app-color-token-subtable',
  templateUrl: './color-token-subtable.component.html',
  styleUrls: ['./color-token-subtable.component.scss'],
})
export class ColorTokenSubtableComponent implements OnInit {
  @Input() colors: Colors;
  @Input() title: string;
  @Input() subtitle: string;

  isOpen = false;
  hasExampleColumn = false;
  hasRoleColumn = false;

  ngOnInit(): void {
    this.colors.forEach((category) => {
      if (category.type === 'colors') {
        category.colors.forEach((color) => {
          if (typeof color.example !== 'undefined') {
            this.hasExampleColumn = true;
          }
          if (typeof color.role !== 'undefined') {
            this.hasRoleColumn = true;
          }
        });
      }
    });
  }
}
