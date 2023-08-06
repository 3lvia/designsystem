import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import '@elvia/elvis-card';
import { FrontPageChangelogModule } from './front-page-changelog/front-page-changelog.module';

@NgModule({
  imports: [CommonModule, RouterModule, HomeRoutingModule, FrontPageChangelogModule],
  declarations: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
