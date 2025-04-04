import { Pipe, PipeTransform } from '@angular/core';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-typescript';

import { Language } from './types';

@Pipe({
  name: 'highlighter',
})
export class HighlighterPipe implements PipeTransform {
  transform(code: string | null, language: Language): string {
    if (!code) {
      return '';
    }
    if (Prism.languages[language]) {
      return Prism.highlight(code, Prism.languages[language], language);
    } else {
      return Prism.util.encode(code) as string;
    }
  }
}
