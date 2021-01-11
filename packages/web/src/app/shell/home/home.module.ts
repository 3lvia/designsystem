import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { OverviewPageModule } from 'src/app/shared/overview-page/overview-page.module';
import { RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  imports: [CommonModule, OverviewPageModule, RouterModule, MarkdownModule.forRoot()],
  declarations: [HomeComponent],
})
export class HomeModule {}
