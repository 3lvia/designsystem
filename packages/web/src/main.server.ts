import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
// This import must come before any imports that would (directly or transitively)
// import `@angular/elements`, which rely on DOM built-ins being available.
import './load-domino.server';

export { AppServerModule } from './app/app.server.module';
export { renderModule, renderModuleFactory } from '@angular/platform-server';
