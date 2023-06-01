import { Pipe, PipeTransform } from '@angular/core';
import Prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import parserBabel from 'prettier/parser-babel';
import parserPostCss from 'prettier/parser-postcss';
import { Language } from './types';

@Pipe({
  name: 'formatCode',
})
export class FormatCodePipe implements PipeTransform {
  transform(code: string, language: Language): string {
    const codeWithClosedTags = this.addClosingTagsToVoidElements(code);

    let parser = 'babel';
    if (language === 'css') {
      parser = 'css';
    } else if (language === 'html') {
      parser = 'html';
    }

    let formattedCode = Prettier.format(codeWithClosedTags, {
      parser: parser,
      plugins: [parserHtml, parserBabel, parserPostCss],
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
