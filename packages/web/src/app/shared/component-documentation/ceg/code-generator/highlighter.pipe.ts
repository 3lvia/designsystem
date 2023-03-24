import { Pipe, PipeTransform } from '@angular/core';
import * as Prism from 'prismjs';

import 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';
import { Language } from './language';

@Pipe({
  name: 'highlighter',
})
export class HighlighterPipe implements PipeTransform {
  transform(code: string, language: Language): string {
    return Prism.highlight(code, Prism.languages[language], language);
  }
}
