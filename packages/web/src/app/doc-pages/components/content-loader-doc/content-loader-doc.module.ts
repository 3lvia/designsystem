import { NgModule } from '@angular/core';
import { ContentLoaderDocComponent } from './content-loader-doc.component';
import { ContentLoaderCegComponent } from './content-loader-ceg/content-loader-ceg.component';
import { ContentLoaderBoxCegComponent } from './content-loader-box-ceg/content-loader-box-ceg.component';
import { ContentLoaderCircleCegComponent } from './content-loader-circle-ceg/content-loader-circle-ceg.component';
import { ContentLoaderTextCegComponent } from './content-loader-text-ceg/content-loader-text-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  declarations: [
    ContentLoaderDocComponent,
    ContentLoaderCegComponent,
    ContentLoaderBoxCegComponent,
    ContentLoaderCircleCegComponent,
    ContentLoaderTextCegComponent,
  ],
  imports: [SharedDocumentationModule],
})
export class ContentLoaderDocModule {}
