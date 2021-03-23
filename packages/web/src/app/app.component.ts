import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'elvia-designsystem';

  ngOnInit(): void {
    this.listenToModeChanges();
  }

  listenToModeChanges(): void {
    if (!window || !window.matchMedia) {
      return;
    }
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
    this.handleMode(darkMode.matches);


    if (window.matchMedia('(prefers-color-scheme: dark)')) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addListener((e) => e.matches && this.handleMode(e.matches));
    }
    if (window.matchMedia('(prefers-color-scheme: light)')) {
      window
        .matchMedia('(prefers-color-scheme: light)')
        .addListener((e) => e.matches && this.handleMode(!e.matches));
    }
  }

  handleMode(darkMode: boolean): void {
    const favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      console.warn('Cant find favicon element');
      return;
    }
    if (darkMode) {
      favicon.setAttribute('href', './../assets/favicon/favicon_final_white/favicon.ico');
    } else {
      favicon.setAttribute('href', './../assets/favicon/favicon_final_black/favicon.ico');
    }
  }
}
