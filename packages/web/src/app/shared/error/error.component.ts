import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import { ThemeName } from '@elvia/elvis-colors';
import { ThemeService } from 'src/app/core/services/theme.service';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
    standalone: true,
    imports: [NgIf, RouterLink],
})
export class ErrorComponent {
  currentTheme: ThemeName = 'light';

  constructor(
    private titleService: Title,
    private themeService: ThemeService,
  ) {
    this.themeService
      .listenTheme()
      .pipe(takeUntilDestroyed())
      .subscribe((theme) => {
        this.currentTheme = theme;
      });
    this.titleService.setTitle('404: Not Found | Elvia design system');
  }
}
