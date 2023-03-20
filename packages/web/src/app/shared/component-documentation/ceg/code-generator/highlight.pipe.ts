import { Pipe, PipeTransform } from '@angular/core';

import 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';

declare let Prism: any;

type Language = 'html' | 'jsx';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(code: string, ...args: Language[]): string {
    return Prism.highlight(code, Prism.languages[args[0]]);
  }
}
