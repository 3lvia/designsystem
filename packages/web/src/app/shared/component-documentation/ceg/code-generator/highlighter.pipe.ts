import { Pipe, PipeTransform } from '@angular/core';
import Prism from 'prismjs';

import { Language } from './language';

@Pipe({
  name: 'highlighter',
})
export class HighlighterPipe implements PipeTransform {
  transform(code: string, language: Language): string {
    return Prism.highlight(code, Prism.languages[language], language);
  }
}
