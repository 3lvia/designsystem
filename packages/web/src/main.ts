import { bootstrapApplication } from '@angular/platform-browser';
import '@elvia/elvis/checkDeprecations';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import './icons';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
