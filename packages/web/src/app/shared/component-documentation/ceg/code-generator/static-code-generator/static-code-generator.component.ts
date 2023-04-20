import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-static-code-generator',
  templateUrl: './static-code-generator.component.html',
  styleUrls: ['./static-code-generator.component.scss'],
})
export class StaticCodeGeneratorComponent implements OnInit {
  @Input() staticContent = '';
  @Input() comment?: string;

  angularCode = '';
  reactCode = '';
  vueCode = '';

  ngOnInit() {
    const code = this.addNewLinesBetweenTags(this.staticContent);
    this.angularCode = this.comment ? `<!--${this.comment}-->\n${code}` : code;

    const cleanCode = this.removeAngularSpecificAttributes(code);
    this.vueCode = this.createVueCodeFromStaticContent(cleanCode);
    this.reactCode = this.createReactCodeFromStaticContent(cleanCode);
  }

  private addNewLinesBetweenTags(code: string): string {
    return code.replace(/>\s?</g, '>\n<');
  }

  private removeAngularSpecificAttributes(code: string): string {
    return code.replace(/\[ngClass\]=".*"/g, '').replace(/\[ngStyle\]=".*"/g, '');
  }

  private createVueCodeFromStaticContent(staticContent: string): string {
    const vuePropSyntax = staticContent.slice().replace(/\[/g, ':').replace(/]/g, '');
    const vueEventSyntax = vuePropSyntax.replace(/ \(/g, ' @').replace(/\)=/g, '=');
    if (this.comment) {
      return `<!--${this.comment}-->\n${vueEventSyntax}`;
    }
    return vueEventSyntax;
  }

  private transformAngularAttributeToReact(attribute: string): string {
    const keyValue = attribute.split('=');
    const key = keyValue[0].replace('[', '').replace(']', '');
    const value = keyValue[1].trim().replace(/"/g, '').replace('>', '');
    let output = `${key}={${value}}`;
    if (attribute.trim().endsWith('>')) {
      return `${output}>\n`;
    }
    return output;
  }

  private transformSlotsIntoReactAttributes(code: string): string {
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
    return parsedCode.body.innerHTML
      .replace(/&quot;/g, '"')
      .replace(/"__{/g, '{')
      .replace(/}__"/g, '}');
  }

  private removeAngularEvents(code: string): string {
    // Matches e.g. (onClose)="isShowing = false"
    return code.replace(/\(\w+\)="[a-zA-Z\s=]+"/g, '');
  }

  private transformTagsToReactStyle(code: string): string {
    return code
      .split('elvia-')
      .map((elviaTag) => {
        const tagParts = elviaTag.split(' ');
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

  private transformAttributesToReactStyle(code: string): string {
    return code
      .replace(/>/g, ' > ')
      .split(' ')
      .map((attribute) => {
        if (attribute.startsWith('[')) {
          return this.transformAngularAttributeToReact(attribute);
        }
        return attribute;
      })
      .join(' ');
  }

  /**
   * When the app is build, the HTML may be minified, removing new lines.
   * This leaves white space between elements which Prettier adds as a new line between elements.
   */
  private removeWhiteSpaceBetweenTags(code: string): string {
    return code.replace(/> *</g, '><');
  }

  private createReactCodeFromStaticContent(angularCode: string): string {
    let reactCode = this.transformSlotsIntoReactAttributes(angularCode);
    reactCode = this.removeAngularEvents(reactCode);
    reactCode = this.transformTagsToReactStyle(reactCode);
    reactCode = this.transformAttributesToReactStyle(reactCode);
    reactCode = this.removeWhiteSpaceBetweenTags(reactCode);
    if (this.comment) {
      reactCode = '// ' + this.comment.replace(/\n/g, '\n// ') + '\n' + reactCode;
    }
    return reactCode;
  }
}
