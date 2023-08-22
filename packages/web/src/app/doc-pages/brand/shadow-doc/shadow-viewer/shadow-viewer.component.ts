import { Component } from '@angular/core';
import { ThemeName } from '@elvia/elvis-colors';
import { Observable } from 'rxjs';

import { BreakpointService } from 'src/app/core/services/breakpoint.service';

interface Shadow {
  title: string;
  token: string;
  blur: number;
  opacity: number;
}

@Component({
  selector: 'app-shadow-viewer',
  templateUrl: './shadow-viewer.component.html',
  styleUrls: ['./shadow-viewer.component.scss'],
})
export class ShadowViewerComponent {
  activeTheme: ThemeName = 'light';
  isMobile: Observable<boolean>;
  shadows: Shadow[] = [
    { title: 'Soft', token: 'e-shadow-soft', blur: 50, opacity: 3 },
    { title: 'Medium', token: 'e-shadow-medium', blur: 40, opacity: 6 },
    { title: 'Hard', token: 'e-shadow-hard', blur: 30, opacity: 8 },
  ];

  constructor(breakpointService: BreakpointService) {
    this.isMobile = breakpointService.matches(['sm']);
  }

  setTheme(activeTabIndex: number): void {
    this.activeTheme = activeTabIndex === 0 ? 'light' : 'dark';
  }
}
