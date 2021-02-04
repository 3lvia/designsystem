import { Injectable } from '@angular/core';

import 'clipboard';

import 'prismjs';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-sass';
import 'prismjs/components/prism-scss';

declare let Prism: any;

@Injectable({
  providedIn: 'root',
})
export class HighlightService {
  highlightAll(): void {
    Prism.highlightAll();
  }
}
