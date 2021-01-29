import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import '@elvia/elvis-checkbox';
import '@elvia/elvis-popover';
import '@elvia/elvis-tabs';
import '@elvia/elvis-progress-linear';
import '@elvia/elvis-slider';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
