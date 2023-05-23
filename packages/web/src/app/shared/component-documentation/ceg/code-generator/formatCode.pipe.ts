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
    console.log(code);
    const codeWithClosedTags = this.addClosingTagsToVoidElements(code);
    let formattedCode = Prettier.format(codeWithClosedTags, {
      parser: language === 'html' ? 'html' : 'babel',
      plugins: [parserHtml, parserBabel],
      printWidth: 80,
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

  /**
   * Adds a closing tag to void elements in the given HTML code.
   * Needed for Prettier.
   */
  private addClosingTagsToVoidElements = (code: string): string => {
    const tags = code.match(/<(img|input|hr)[^>]*[^/]>/g);

    if (tags) {
      tags.forEach((tag) => {
        const tagWithClosingTag = tag.replace('>', '/>');
        code = code.replace(tag, tagWithClosingTag);
      });
    }

    return code;
  };
}
