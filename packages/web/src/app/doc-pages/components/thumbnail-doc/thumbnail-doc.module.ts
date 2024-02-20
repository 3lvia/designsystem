import { NgModule } from '@angular/core';
import { ThumbnailDocComponent } from './thumbnail-doc.component';
import { ThumbnailCegComponent } from './thumbnail-ceg/thumbnail-ceg.component';
import { ThumbnailSelectedCegComponent } from './thumbnail-selected-ceg/thumbnail-selected-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  imports: [
    SharedDocumentationModule,
    ThumbnailDocComponent,
    ThumbnailCegComponent,
    ThumbnailSelectedCegComponent,
  ],
})
export class ThumbnailDocModule {}
