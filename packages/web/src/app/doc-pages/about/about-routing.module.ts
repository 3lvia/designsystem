import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CMSPageComponent } from '../cms/cms-page/cms-page.component';
import { AboutModule } from './about.module';
import { TheDesignSystemDocComponent } from './the-design-system-doc/the-design-system-doc.component';
import { ContactComponent } from './contact/contact.component';
import { GetStartedDocComponent } from './get-started-doc/get-started-doc.component';
import { ChangelogComponent } from './changelog/changelog.component';

const routes: Routes = [
  {
    path: '',
    component: CMSPageComponent,
  },
  {
    path: 'the-design-system',
    component: TheDesignSystemDocComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'get-started',
    component: GetStartedDocComponent,
  },
  {
    path: 'whats-new',
    component: ChangelogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AboutModule],
  exports: [RouterModule],
})
export class BrandRoutingModule {}
