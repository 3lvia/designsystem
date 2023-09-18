import { Pipe, PipeTransform } from '@angular/core';
import { SearchResult } from './searcher';

@Pipe({
  name: 'searchHighlighter',
  standalone: true,
})
export class SearchHighlighterPipe<T> implements PipeTransform {
  transform(
    value: string | number | boolean | undefined,
    key: keyof SearchResult<T>['item'],
    matches?: SearchResult<T>['matches'],
  ): string {
    const match = matches?.find?.((match) => match.key === key);
    if (match && value) {
      let highlightedText = value.toString();
      /** The highlighting works like this:
       * 1. We start by filtering out indices that have the same start- and end-index
       * 2. We then start wrapping the matches in "span"-elements, starting at the end of the string
       * and moving backwards. This is because it allows us to use all indexes without worrying
       * about invalidating the following indexes due to us altering the string by inserting "span"-elements.
       */
      match.indices
        .filter(([start, end]) => end - start > 0)
        .reverse()
        .forEach(([start, end]) => {
          highlightedText = insertIntoString(highlightedText, end + 1, `</span>`);

          highlightedText = insertIntoString(
            highlightedText,
            start,
            `<span class="e-color-background-selected-1">`,
          );
        });
      return highlightedText;
    }

    return value?.toString() || '';
  }
}

const insertIntoString = (value: string, index: number, insertion: string): string => {
  const firstPart = value.slice(0, index);
  const lastPart = value.slice(index);

  return `${firstPart}${insertion}${lastPart}`;
};
