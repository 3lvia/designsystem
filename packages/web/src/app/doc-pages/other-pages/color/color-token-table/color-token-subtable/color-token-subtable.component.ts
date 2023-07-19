import { Component, Input, OnInit, computed, signal, effect } from '@angular/core';
import { TableColorArray } from '../colors';

type Colors = {
  colors: TableColorArray;
  title?: string;
  description?: string;
}[];

@Component({
  selector: 'app-color-token-subtable',
  templateUrl: './color-token-subtable.component.html',
  styleUrls: ['./color-token-subtable.component.scss'],
})
export class ColorTokenSubtableComponent implements OnInit {
  @Input({ required: true }) colors: Colors;
  @Input({ required: true }) title: string;
  @Input({ required: true }) subtitle: string;

  private _searchValue = signal('');
  @Input({ required: true }) set searchValue(value: string) {
    this._searchValue.set(value);
  }

  readonly isVisible = signal(true);
  readonly isOpen = signal(false);
  readonly hasExampleColumn = signal(false);
  readonly hasRoleColumn = signal(false);

  readonly visibleColors = computed(() => this.updateFilter(this._searchValue()));

  constructor() {
    effect(
      () => {
        if (this._searchValue()) {
          if (this.visibleColors().some((entry) => entry.colors.length)) {
            this.isVisible.set(true);
            this.isOpen.set(true);
          } else {
            this.isVisible.set(false);
            this.isOpen.set(false);
          }
        } else {
          this.isVisible.set(true);
          this.isOpen.set(false);
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit(): void {
    this.colors.forEach((category) => {
      category.colors.forEach((color) => {
        if (typeof color.example !== 'undefined') {
          this.hasExampleColumn.set(true);
        }
        if (typeof color.role !== 'undefined') {
          this.hasRoleColumn.set(true);
        }
      });
    });
  }

  private updateFilter(value: string) {
    const parsedValue = value.trim().toLowerCase();
    if (!parsedValue) {
      return this.colors;
    }
    return this.colors.map((entry) => {
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
  }
}
