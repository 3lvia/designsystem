import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { illustrationsData } from './illustrations-data';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';

@Component({
  selector: 'app-illustrations-doc',
  templateUrl: './illustrations-doc.component.html',
  styleUrls: ['./illustrations-doc.component.scss'],
  standalone: true,
  imports: [ComponentHeaderComponent, AsyncPipe],
})
export class IllustrationsDocComponent {
  componentData = illustrationsData;
  title = getDocPagesNotFromCMS('illustration')?.title;
  titleNo = getDocPagesNotFromCMS('illustration')?.titleNo;
  description = getDocPagesNotFromCMS('illustration')?.description;
  descriptionNo = getDocPagesNotFromCMS('illustration')?.descriptionNo;
  figmaUrl = getDocPagesNotFromCMS('illustration')?.figmaUrl;

  locale = inject(LocalizationService).listenLocalization();
}
