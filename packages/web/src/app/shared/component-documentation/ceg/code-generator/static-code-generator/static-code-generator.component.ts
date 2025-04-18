import { Component, OnInit, booleanAttribute, input } from '@angular/core';

import { CodeGeneratorComponent } from '../code-generator.component';

@Component({
  selector: 'app-static-code-generator',
  templateUrl: './static-code-generator.component.html',
  styleUrls: ['./static-code-generator.component.scss'],
  imports: [CodeGeneratorComponent],
})
export class StaticCodeGeneratorComponent implements OnInit {
  readonly staticContent = input.required<string>();
  readonly hideReact = input(false, { transform: booleanAttribute });
  readonly comment = input<string>();

  angularCode = '';
  reactCode = '';
  vueCode = '';

  ngOnInit() {
    let code = this.addNewLinesBetweenTags(this.staticContent());
    code = this.cleanSrcAttribute(code);
    code = this.cleanCheckedAttribute(code);
    const comment = this.comment();
    this.angularCode = comment ? `<!--${comment}-->\n${code}` : code;

    const cleanCode = this.removeAngularSpecificAttributes(code);
    this.vueCode = this.createVueCodeFromStaticContent(cleanCode);

    if (!this.hideReact()) {
      this.reactCode = this.createReactCodeFromStaticContent(cleanCode);
    }
  }

  private addNewLinesBetweenTags(code: string): string {
    return code.replace(/>(.*?)</g, (_, innerContent?: string) => {
      if (innerContent && innerContent.trim().length > 0) {
        return `>\n${innerContent.trim()}\n<`;
      }
      return '>\n<';
    });
  }

  private cleanSrcAttribute(code: string): string {
    return code.replace(/src="([^\s]+)"/g, (_, srcValue: string) => {
      return `src="${srcValue.substring(srcValue.indexOf('assets/'))}"`;
    });
  }

  private cleanCheckedAttribute(code: string): string {
    return code.replace(/checked="[^\s]*"/g, 'checked');
  }

  private removeAngularSpecificAttributes(code: string): string {
    return code.replace(/\[ngClass\]=".*"/g, '').replace(/\[ngStyle\]=".*"/g, '');
  }

  private createVueCodeFromStaticContent(staticContent: string): string {
    const vuePropSyntax = staticContent.slice().replace(/\[(\w+)\]/g, ':$1');
    const ngIfReplaced = vuePropSyntax.replace(/\*ngIf/g, 'v-if');
    const ngForReplaced = ngIfReplaced.replace(
      /\*ngFor="let ([a-zA-Z]+) of ([a-zA-Z]+)"/g,
      'v-for="$1 in $2"',
    );
    const vueEventSyntax = ngForReplaced.replace(/ \(([a-zA-Z]+)\)="/g, ' @$1="');
    const comment = this.comment();
    if (comment) {
      return `<!--${comment}-->\n${vueEventSyntax}`;
    }
    return vueEventSyntax;
  }

  private getOriginalAttributeNames(code: string): string[] {
    return code.match(/\w+[\])]?="/g) || [];
  }

  private restoreOriginalPropNames(code: string, originalAttributeNames: string[]): string {
    let transformedCode = code;
    originalAttributeNames.forEach(
      (attributeName) =>
        (transformedCode = transformedCode.replace(attributeName.toLowerCase(), attributeName)),
    );
    return transformedCode;
  }

  private isScript(code: string): boolean {
    return code.includes('<script');
  }

  private transformSlotsIntoReactAttributes(code: string): string {
    if (this.isScript(code)) {
      return code;
    }

    const originalPropNames = this.getOriginalAttributeNames(code);

    const parsedCode = new DOMParser().parseFromString(code, 'text/html');
    parsedCode.querySelectorAll('[slot]').forEach((slotElement) => {
      const slotName = slotElement.getAttribute('slot');
      if (!slotName) {
        return;
      }
      slotElement.removeAttribute('slot');
      /**
       * We add __ to identify the slots in the HTML so that we can remove the quotations
       * that is added by the DOMParer.
       **/
      slotElement.parentElement?.setAttribute(slotName, `__{<>${slotElement.outerHTML}</>}__`);
      slotElement.parentElement?.removeChild(slotElement);
    });

    // Remove quotes around curly braces and convert &quot; to "
    const transformedCode = parsedCode.body.innerHTML
      .replace(/&quot;/g, '"')
      .replace(/"__{/g, '{')
      .replace(/}__"/g, '}');

    // We need to restore prop casing, because they are all lowercase due to the
    // DOMParser used earlier. This will break our components in React.
    const codeWithOriginalPropNames = this.restoreOriginalPropNames(transformedCode, originalPropNames);

    // We need to clean the checked attributes, because the DOMParser adds empty quotes as value.
    return this.cleanCheckedAttribute(codeWithOriginalPropNames);
  }

  private transformAngularEventsToReactStyle(code: string): string {
    // Finds all angular events (like "isShowing") and it's value within the quotes.
    return code.replace(/\((\w+)\)="((.|\n)+?)"/g, (_, attributeName: string, attributeValue: string) => {
      let value = attributeValue;

      /**
       * If the value is a function, map it to React syntax
       * "handleRoutingOnClick($any($event).detail.value)" becomes "value => handleRoutingOnClick(value)"
       */
      value = value.replace(/(\w+)(\(.+\))/, 'value => $1(value)');

      return `${attributeName}={${value}}`;
    });
  }

  private transformTagsToReactStyle(code: string): string {
    return code
      .split('elvia-')
      .flatMap((elviaTag) => elviaTag.split(/(<\/?)e-/))
      .map((elviaTag) => {
        const tagParts = elviaTag.split(' ');
        // @ts-expect-error TS2532 (LEGO-3683)
        if (tagParts[0].length > 1) {
          const componentName = tagParts.shift() || '';
          const titleCase = componentName
            .split('-')
            .map((part) => `${part.substring(0, 1).toUpperCase()}${part.substring(1)}`)
            .join('');

          return `${titleCase} ${tagParts.join(' ')}`;
        }
        return elviaTag;
      })
      .join('');
  }

  private transformAngularAttributesToReactStyle(code: string): string {
    /**
     * This RegEx finds two things:
     *   - Attributes surrounded by square brackets: \[(\w+)\]
     *   - The value following the attribute with square brackets: ((?:.|\n)+?)
     * Then it pulls those values out as two capture groups, and formats it as React
     */
    return code.replace(/\[(\w+)\]="((?:.|\n)+?)"/g, '$1={$2}');
  }

  private transformReactSpecificProps(code: string): string {
    return code.replace(/class=/g, 'className=');
  }

  /**
   * When the app is build, the HTML may be minified, removing new lines.
   * This leaves white space between elements which Prettier adds as a new line between elements.
   */
  private removeWhiteSpaceBetweenTags(code: string): string {
    return code.replace(/> *</g, '><');
  }

  private replaceForWithHtmlFor(code: string): string {
    return code.replace(/ for="/g, ' htmlFor="');
  }

  private htmlHasMultipleRoots(code: string): boolean {
    const parsed = new DOMParser().parseFromString(code, 'text/html');
    return parsed.body.children.length > 1;
  }

  private createReactCodeFromStaticContent(angularCode: string): string {
    let reactCode = this.transformSlotsIntoReactAttributes(angularCode);
    reactCode = this.transformAngularEventsToReactStyle(reactCode);
    reactCode = this.transformTagsToReactStyle(reactCode);
    reactCode = this.transformAngularAttributesToReactStyle(reactCode);
    reactCode = this.transformReactSpecificProps(reactCode);
    reactCode = this.removeWhiteSpaceBetweenTags(reactCode);
    reactCode = this.replaceForWithHtmlFor(reactCode);

    if (this.htmlHasMultipleRoots(reactCode)) {
      reactCode = `<>${reactCode}</>`;
    }

    const comment = this.comment();
    if (comment) {
      reactCode = '// ' + comment.replace(/\n/g, '\n// ') + '\n' + reactCode;
    }

    return reactCode;
  }
}
