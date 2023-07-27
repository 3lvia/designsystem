import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevModule } from './dev.module';
import { Pages } from '../shared/shared.enum';
import { v2PlaygroundComponent } from './v2-playground/v2-playground.component';

const routes: Routes = [
  {
    path: '',
    component: v2PlaygroundComponent,
  },
  {
    path: Pages.DevelopmentPlayground,
    component: v2PlaygroundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), DevModule],
  exports: [RouterModule],
})
export class DevRoutingModule {}
