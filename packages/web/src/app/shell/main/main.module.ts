import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { NavbarModule } from '../navbar/navbar.module';
import { FooterModule } from '../footer/footer.module';
import { FeedbackModule } from 'src/app/shared/feedback/feedback.module';

@NgModule({
  imports: [CommonModule, RouterModule, HeaderModule, NavbarModule, FooterModule, FeedbackModule],
  declarations: [MainComponent],
  exports: [MainComponent],
})
export class MainModule {}
