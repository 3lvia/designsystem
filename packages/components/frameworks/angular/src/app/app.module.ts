import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

import '@elvia/elvis-accordion';
import '@elvia/elvis-popover';
import '@elvia/elvis-tabs';
import '@elvia/elvis-progress-linear';
import '@elvia/elvis-testing';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
