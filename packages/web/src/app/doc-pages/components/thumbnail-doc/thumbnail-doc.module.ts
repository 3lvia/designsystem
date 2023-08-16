import { NgModule } from '@angular/core';
import { ThumbnailDocComponent } from './thumbnail-doc.component';
import { ThumbnailCegComponent } from './thumbnail-ceg/thumbnail-ceg.component';
import { ThumbnailSelectedCegComponent } from './thumbnail-selected-ceg/thumbnail-selected-ceg.component';
import { SharedDocumentationModule } from 'src/app/shared/component-documentation/shared-component-documentation.module';

@NgModule({
  declarations: [ThumbnailDocComponent, ThumbnailCegComponent, ThumbnailSelectedCegComponent],
  imports: [SharedDocumentationModule],
})
export class ThumbnailDocModule {}
