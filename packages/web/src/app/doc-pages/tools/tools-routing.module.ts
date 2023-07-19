import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolsModule } from './tools.module';
import { CMSPageComponent } from '../cms/cms-page/cms-page.component';
import { UtilitiesDocComponent } from './utilities-doc/utilities-doc.component';

const routes: Routes = [
  {
    path: '',
    component: CMSPageComponent,
  },
  {
    path: 'utility-classes',
    component: UtilitiesDocComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ToolsModule],
  exports: [RouterModule],
})
export class ToolsRoutingModule {}
