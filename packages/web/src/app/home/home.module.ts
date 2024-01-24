import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { FrontPageChangelogComponent } from './front-page-changelog/front-page-changelog.component';
import '@elvia/elvis-card';

@NgModule({
  imports: [CommonModule, RouterModule, FrontPageChangelogComponent],
  declarations: [HomeComponent],
  exports: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
