import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit } from '@angular/core';
import { TableColorArray } from '../colors';
import { ColorTokenSubtableColorCircleComponent } from './color-token-subtable-color-circle/color-token-subtable-color-circle.component';
import { RouterLink } from '@angular/router';
import { CopyComponent } from '../../../../../shared/copy/copy.component';
import { NgIf, NgClass, NgFor, LowerCasePipe } from '@angular/common';

type Colors = {
  colors: TableColorArray;
  title?: string;
  description?: string;
}[];

@Component({
  selector: 'app-color-token-subtable',
  templateUrl: './color-token-subtable.component.html',
  styleUrls: ['./color-token-subtable.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    NgFor,
    CopyComponent,
    RouterLink,
    ColorTokenSubtableColorCircleComponent,
    LowerCasePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
      category.colors.forEach((color) => {
        if (typeof color.example !== 'undefined') {
          this.hasExampleColumn = true;
        }
        if (typeof color.role !== 'undefined') {
          this.hasRoleColumn = true;
        }
      });
    });
    this.visibleColors = this.colors;
  }

  private updateFilter(value: string) {
    const parsedValue = value.trim().toLowerCase();
    if (value) {
      this.visibleColors = this.colors.map((entry) => {
        if (entry.title?.toLowerCase().includes(parsedValue)) {
          return entry;
        } else {
          const newColors = entry.colors.filter((color) =>
            JSON.stringify(color).toLowerCase().includes(parsedValue),
          );
          return {
            title: newColors.length > 0 ? entry.title : undefined,
            description: newColors.length > 0 ? entry.description : undefined,
            colors: newColors,
          };
        }
      });
      if (this.visibleColors.some((entry) => entry.colors.length)) {
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
