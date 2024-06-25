import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import { bookmark, bookmarkFilled, han } from '@elvia/elvis-assets-icons';
import { add } from '@elvia/elvis-icons';
import '@elvia/elvis/checkDeprecations';
import '@elvia/elvis/elvis.js';

import { routes } from './app/app-routing';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

add({
  bookmark: { svg: bookmark.getIcon() },
  bookmarkFilled: { svg: bookmarkFilled.getIcon() },
  han: { svg: han.getIcon() },
});

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' }),
    ),
  ],
}).catch((err) => console.error(err));
