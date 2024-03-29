import { AsyncPipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeName } from '@elvia/elvis-colors';
import { Observable } from 'rxjs';

import { BreakpointService } from 'src/app/core/services/breakpoint.service';

@Component({
  selector: 'app-color-picker-header',
  templateUrl: './color-picker-header.component.html',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ColorPickerHeaderComponent {
  @Output() changeThemeEvent = new EventEmitter<ThemeName>();

  isMobileScreenWidth: Observable<boolean>;

  constructor(breakpointService: BreakpointService) {
    this.isMobileScreenWidth = breakpointService.matches(['sm']);
  }

  handleSegmentedControlChange(event: Event) {
    const value = (event as CustomEvent<{ value: number }>).detail.value;
    this.changeThemeEvent.emit(value === 0 ? 'light' : 'dark');
  }
}
