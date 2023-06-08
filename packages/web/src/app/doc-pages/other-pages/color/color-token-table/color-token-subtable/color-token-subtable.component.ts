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
  @Input({ required: true }) colors: Colors;
  @Input({ required: true }) title: string;
  @Input({ required: true }) subtitle: string;

  @Input({ required: true }) set searchValue(value: string) {
    this.updateFilter(value);
  }

  isVisible = true;
  isOpen = false;
  hasExampleColumn = false;
  hasRoleColumn = false;
  visibleColors: Colors;

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
    this.visibleColors = this.colors;
  }

  private updateFilter(value: string) {
    if (value) {
      this.visibleColors = this.colors
        .filter((entry): entry is TableArray => entry.type === 'colors')
        .map((entry) => ({
          type: 'colors',
          colors: entry.colors.filter((color) =>
            color.token.toLowerCase().includes(value.trim().toLowerCase()),
          ),
        }));
      if (this.visibleColors.some((entry) => entry.type === 'colors' && entry.colors.length)) {
        this.isOpen = true;
        this.isVisible = true;
      } else {
        this.isOpen = false;
        this.isVisible = false;
      }
    } else {
      this.visibleColors = this.colors;
      this.isVisible = true;
      this.isOpen = false;
    }
  }
}
