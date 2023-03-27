import { Pipe, PipeTransform } from '@angular/core';
import Prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import parserBabel from 'prettier/parser-babel';
import { Language } from './language';

@Pipe({
  name: 'formatCode',
})
export class FormatCodePipe implements PipeTransform {
  transform(code: string, language: Language): string {
    let formattedCode = Prettier.format(code, {
      parser: language === 'html' ? 'html' : 'babel',
      plugins: [parserHtml, parserBabel],
      singleAttributePerLine: true,
    });

    /**
     * This is an ugly fix to remove an unnecessary semi colon,
     * added by the babel parser.
     * It would be more suitable to use the mdx parser for jsx,
     * however I was not able to make it work properly.
     **/
    if (language === 'jsx') {
      formattedCode = formattedCode.slice(0, formattedCode.length - 2);
    }

    return formattedCode;
  }
}
