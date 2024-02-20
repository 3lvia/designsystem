import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserQuestionnaireComponent } from './shared/user-questionnaire/user-questionnaire.component';
import { HeaderComponent } from './shell/header/header.component';
import { FooterComponent } from './shell/footer/footer.component';

import '@elvia/elvis-accordion';
import '@elvia/elvis-autocomplete';
import '@elvia/elvis-badge';
import '@elvia/elvis-box';
import '@elvia/elvis-breadcrumb';
import '@elvia/elvis-card';
import '@elvia/elvis-carousel';
import '@elvia/elvis-chip';
import '@elvia/elvis-context-menu';
import '@elvia/elvis-datepicker';
import '@elvia/elvis-datepicker-range';
import '@elvia/elvis-divider';
import '@elvia/elvis-dropdown';
import '@elvia/elvis-header';
import '@elvia/elvis-icon';
import '@elvia/elvis-modal';
import '@elvia/elvis-outline';
import '@elvia/elvis-pagination';
import '@elvia/elvis-popover';
import '@elvia/elvis-progress-linear';
import '@elvia/elvis-radio-filter';
import '@elvia/elvis-segmented-control';
import '@elvia/elvis-slider';
import '@elvia/elvis-spotlight';
import '@elvia/elvis-stepper';
import '@elvia/elvis-tabs';
import '@elvia/elvis-timepicker';
import '@elvia/elvis-toast';
import '@elvia/elvis-tooltip';
import { PageWithSidenavComponent } from './shell/page-with-sidenav/page-with-sidenav.component';
import { ShortcutComponent } from './shell/shortcut/shortcut.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UserQuestionnaireComponent,
    HeaderComponent,
    PageWithSidenavComponent,
    FooterComponent,
    ShortcutComponent,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
