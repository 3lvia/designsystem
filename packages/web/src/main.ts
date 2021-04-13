import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import cssVars from 'css-vars-ponyfill';

cssVars({
  include: 'style',
  onlyLegacy: true,
  watch: true,
});

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic()
    .bootstrapModule(AppModule).then(() => {
      document.getElementById('flicker-fix').style.display = "block";
    })
    .catch((err) => console.error(err));

});
