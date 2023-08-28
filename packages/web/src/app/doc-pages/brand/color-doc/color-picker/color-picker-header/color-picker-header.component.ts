import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeName } from '@elvia/elvis-colors';
import { ScrollColorsService } from '../../scroll-colors.service';
import { Observable } from 'rxjs';
import { BreakpointService } from 'src/app/core/services/breakpoint.service';

@Component({
  selector: 'app-color-picker-header',
  templateUrl: './color-picker-header.component.html',
})
export class ColorPickerHeaderComponent {
  @Output() changeThemeEvent = new EventEmitter<ThemeName>();

  isMobileScreenWidth: Observable<boolean>;

  constructor(breakpointService: BreakpointService, private scrollService: ScrollColorsService) {
    this.isMobileScreenWidth = breakpointService.matches(['sm']);
  }

  handleSegmentedControlChange(event: Event) {
    const value = (event as CustomEvent<{ value: number }>).detail.value;
    this.changeThemeEvent.emit(value === 0 ? 'light' : 'dark');
  }

  scrollToTokens(): void {
    this.scrollService.scrollToTokens();
  }
}
