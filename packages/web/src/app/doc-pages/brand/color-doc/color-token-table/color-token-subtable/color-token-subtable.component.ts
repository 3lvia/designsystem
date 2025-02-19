import { LowerCasePipe, NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, input } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { debounceTime, tap } from 'rxjs';

import { TableColorArray } from '../colors';
import { ColorTokenSubtableColorCircleComponent } from './color-token-subtable-color-circle/color-token-subtable-color-circle.component';
import { CopyComponent } from 'src/app/shared/copy/copy.component';
import { SafeHtmlPipe } from 'src/app/shared/safeHtml.pipe';

type Colors = {
  colors: TableColorArray;
  title?: string;
  description?: string;
}[];

@Component({
  selector: 'app-color-token-subtable',
  templateUrl: './color-token-subtable.component.html',
  styleUrls: ['./color-token-subtable.component.scss'],
  imports: [
    NgClass,
    CopyComponent,
    RouterLink,
    ColorTokenSubtableColorCircleComponent,
    LowerCasePipe,
    SafeHtmlPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ColorTokenSubtableComponent implements OnInit {
  readonly colors = input.required<Colors>();
  readonly searchValue = input.required<string>();
  readonly subtitle = input.required<string>();
  readonly title = input.required<string>();

  isVisible = true;
  isOpen = false;
  hasExampleColumn = false;
  hasRoleColumn = false;
  // @ts-expect-error TS2564 (LEGO-3683)
  visibleColors: Colors;

  constructor() {
    toObservable(this.searchValue)
      .pipe(
        debounceTime(300),
        tap((value) => this.updateFilter(value)),
        takeUntilDestroyed(),
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.colors().forEach((category) => {
      category.colors.forEach((color) => {
        if (typeof color.example !== 'undefined') {
          this.hasExampleColumn = true;
        }
        if (typeof color.role !== 'undefined') {
          this.hasRoleColumn = true;
        }
      });
    });
    this.visibleColors = this.colors();
  }

  private updateFilter(value: string) {
    const parsedValue = value.trim().toLowerCase();
    if (value) {
      this.visibleColors = this.colors().map((entry) => {
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
      this.visibleColors = this.colors();
      this.isVisible = true;
      this.isOpen = false;
    }
  }
}
