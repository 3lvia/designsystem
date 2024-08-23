import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { enableProdMode, importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';
import {
  bookmark,
  bookmarkFilled,
  download,
  han,
  informationCircle,
  informationCircleFilledColor,
  removeCircle,
  upload,
  viewOn,
} from '@elvia/elvis-assets-icons';
import { addIcons } from '@elvia/elvis-icons';
import '@elvia/elvis/checkDeprecations';
import '@elvia/elvis/elvis.js';

import { routes } from './app/app-routing';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

addIcons({
  bookmark: { svg: bookmark.getIcon() },
  bookmarkFilled: { svg: bookmarkFilled.getIcon() },
  han: { svg: han.getIcon() },
  download: { svg: download.getIcon() },
  upload: { svg: upload.getIcon() },
  removeCircle: { svg: removeCircle.getIcon() },
  informationCircle: { svg: informationCircle.getIcon() },
  informationCircleFilledColor: { svg: informationCircleFilledColor.getIcon() },
  viewOn: { svg: viewOn.getIcon() },
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
