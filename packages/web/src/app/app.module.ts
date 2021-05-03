import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellModule } from './shell/shell.module';
import { RouterModule } from '@angular/router';
import { ToolsModule } from './doc-pages/tools/tools.module';
import { ComponentsModule } from './doc-pages/components/components.module';
import { IdentityModule } from './doc-pages/identity/identity.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommunityModule } from './doc-pages/community/community.module';
import { HttpClientModule } from '@angular/common/http';
import { ErrorModule } from './shared/error/error.module';
import { devModule } from './doc-pages/dev/dev.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    ShellModule,
    ToolsModule,
    devModule,
    ComponentsModule,
    IdentityModule,
    OverlayModule,
    CommunityModule,
    HttpClientModule,
    ErrorModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
