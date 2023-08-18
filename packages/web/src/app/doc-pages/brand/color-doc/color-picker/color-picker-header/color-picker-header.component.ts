import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ColorElement } from '../colors-types';
import { ThemeName } from '@elvia/elvis-colors';

@Component({
  selector: 'app-color-picker-header',
  templateUrl: './color-picker-header.component.html',
})
export class ColorPickerHeaderComponent implements OnChanges {
  @Input({ required: true }) readonly currentTheme: ThemeName = 'light';
  @Output() changeThemeEvent = new EventEmitter<ThemeName>();
  @Output() changeColorEvent = new EventEmitter<ColorElement>();

  isMobileScreenWidth = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        this.isMobileScreenWidth = result.matches;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentTheme) {
      const theme = changes.currentTheme.currentValue as ThemeName;
    }
  }

  handleSegmentedControlChange(event: Event) {
    const value = (event as CustomEvent<{ value: number }>).detail.value;
    this.changeThemeEvent.emit(value === 0 ? 'light' : 'dark');
  }
}
