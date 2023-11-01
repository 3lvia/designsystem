import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CMSPageComponent } from '../cms/cms-page/cms-page.component';
import { AboutModule } from './about.module';
import { TheDesignSystemDocComponent } from './the-design-system-doc/the-design-system-doc.component';
import { ContactComponent } from './contact/contact.component';
import { GetStartedDocComponent } from './get-started-doc/get-started-doc.component';
import { Pages } from 'src/app/shared/shared.enum';

const routes: Routes = [
  {
    path: '',
    component: CMSPageComponent,
  },
  {
    path: Pages.TheDesignSystem,
    component: TheDesignSystemDocComponent,
  },
  {
    path: Pages.Contact,
    component: ContactComponent,
  },
  {
    path: Pages.GetStarted,
    component: GetStartedDocComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AboutModule],
  exports: [RouterModule],
})
export class BrandRoutingModule {}
