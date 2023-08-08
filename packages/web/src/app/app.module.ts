import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellModule } from './shell/shell.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ErrorModule } from './shared/error/error.module';
import { CMSPageModule } from './doc-pages/cms/cms-page/cms-page.module';
import { MobileHeaderModule } from './shell/header/mobile-menu/mobile-menu.module';
import '@elvia/elvis-outline';
import { HomeModule } from './home/home.module';
import { ShortcutModule } from './shell/shortcut/shortcut.module';
import { FeedbackModule } from './shared/feedback/feedback.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    RouterModule,
    ShellModule,
    HttpClientModule,
    ErrorModule,
    CMSPageModule,
    MobileHeaderModule,
    ShortcutModule,
    FeedbackModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
