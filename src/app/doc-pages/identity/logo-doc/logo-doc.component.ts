import { Component } from '@angular/core';
import { getIdentity } from 'src/app/shared/e-items';

@Component({
  selector: 'app-logo-doc',
  templateUrl: './logo-doc.component.html',
  styleUrls: ['./logo-doc.component.scss'],
})
export class LogoDocComponent {
  figmaUrl = getIdentity('logo-doc').figmaUrl;

  faviconTS = `isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').addListener(
  e => e.matches && this.handleMode(e.matches)
);
isLightMode = window.matchMedia('(prefers-color-scheme: light)').addListener(
  e => e.matches && this.handleMode(!e.matches)
);
handleMode(darkMode) {
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
`;
  faviconHTML = `<link id="favicon" rel="icon" href="/favicon.ico" type="image/x-icon">
`;

}
