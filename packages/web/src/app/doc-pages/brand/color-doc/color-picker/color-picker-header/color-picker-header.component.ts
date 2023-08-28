import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, Output } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeName } from '@elvia/elvis-colors';
import { ScrollColorsService } from '../../scroll-colors.service';

@Component({
  selector: 'app-color-picker-header',
  templateUrl: './color-picker-header.component.html',
})
export class ColorPickerHeaderComponent {
  @Output() changeThemeEvent = new EventEmitter<ThemeName>();

  isMobileScreenWidth = false;

  constructor(private breakpointObserver: BreakpointObserver, private scrollService: ScrollColorsService) {
    this.breakpointObserver
      .observe(['(max-width: 768px)'])
      .pipe(takeUntilDestroyed())
      .subscribe((result) => {
        this.isMobileScreenWidth = result.matches;
      });
  }

  handleSegmentedControlChange(event: Event) {
    const value = (event as CustomEvent<{ value: number }>).detail.value;
    this.changeThemeEvent.emit(value === 0 ? 'light' : 'dark');
  }

  scrollToTokens(): void {
    this.scrollService.scrollToTokens();
  }
}
