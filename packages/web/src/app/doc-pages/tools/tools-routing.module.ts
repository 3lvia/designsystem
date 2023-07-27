import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolsModule } from './tools.module';
import { CMSPageComponent } from '../cms/cms-page/cms-page.component';
import { UtilitiesDocComponent } from './utilities-doc/utilities-doc.component';
import { Pages } from 'src/app/shared/shared.enum';

const routes: Routes = [
  {
    path: '',
    component: CMSPageComponent,
  },
  {
    path: Pages.Utilities,
    component: UtilitiesDocComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ToolsModule],
  exports: [RouterModule],
})
export class ToolsRoutingModule {}
