import { Pipe, PipeTransform } from '@angular/core';

import { getDocPage } from 'src/app/shared/doc-pages';
import { DocPageName } from 'src/app/shared/shared.enum';
import { DocPage } from 'src/app/shared/shared.interface';

@Pipe({
  name: 'docPage',
  standalone: true,
})
export class DocPagePipe implements PipeTransform {
  transform(docUrl: DocPageName): DocPage | undefined {
    return getDocPage(docUrl);
  }
}
