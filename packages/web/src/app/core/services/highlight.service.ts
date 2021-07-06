import { Injectable } from '@angular/core';

import 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-scss';

declare let Prism: any;

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  highlight(code: string, language: string): string {
    return Prism.highlight(code, Prism.languages[language]);
  }
}
