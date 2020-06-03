import { Component } from '@angular/core';
import { getUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-favicon-doc',
  templateUrl: './favicon-doc.component.html',
  styleUrls: ['./favicon-doc.component.scss']
})
export class FaviconDocComponent {

  componentStatus = getUtilities('favicon-doc').status;

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
