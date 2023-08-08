import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { FrontPageChangelogModule } from './front-page-changelog/front-page-changelog.module';
import '@elvia/elvis-card';

@NgModule({
  imports: [CommonModule, RouterModule, FrontPageChangelogModule],
  declarations: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
