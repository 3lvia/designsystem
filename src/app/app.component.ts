import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'elvia-designsystem';

  isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').addListener(
    e => e.matches && this.handleMode(e.matches)
  );
  isLightMode = window.matchMedia('(prefers-color-scheme: light)').addListener(
    e => e.matches && this.handleMode(!e.matches)
  );

  ngOnInit() {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
    this.handleMode(darkMode.matches);
  }


  handleMode(darkMode) {
    console.log(darkMode);
    const favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      console.log('Cant find favicon element');
      return;
    }
    if (darkMode) {
      console.log(favicon);
      favicon.setAttribute('href', './../assets/favicon/favicon_final_white/favicon.ico');
      console.log(favicon);
    } else {
      console.log(favicon);
      favicon.setAttribute('href', './../assets/favicon/favicon_final_black/favicon.ico');
      console.log(favicon);
    }
  }
}
