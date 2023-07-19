import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellModule } from './shell/shell.module';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { ErrorModule } from './shared/error/error.module';
import { CMSPageModule } from './doc-pages/cms/cms-page/cms-page.module';
import { MobileHeaderModule } from './shell/header/mobile-menu/mobile-menu.module';
import { OtherPagesModule } from './doc-pages/other-pages/other-pages.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    OtherPagesModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    ShellModule,
    OverlayModule,
    HttpClientModule,
    ErrorModule,
    CMSPageModule,
    MobileHeaderModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
