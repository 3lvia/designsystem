import { Pipe, PipeTransform } from '@angular/core';

import { getDocPage } from 'src/app/shared/doc-pages';
import { DocPageName } from 'src/app/shared/shared.enum';

@Pipe({
  name: 'docPage',
})
export class DocPagePipe implements PipeTransform {
  transform(docUrl: DocPageName) {
    return getDocPage(docUrl);
  }
}
