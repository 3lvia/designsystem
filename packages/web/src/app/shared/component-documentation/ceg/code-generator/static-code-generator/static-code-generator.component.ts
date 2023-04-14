import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-static-code-generator',
  templateUrl: './static-code-generator.component.html',
  styleUrls: ['./static-code-generator.component.scss'],
})
export class StaticCodeGeneratorComponent implements OnInit {
  @Input() staticContent = '';

  angularCode = '';
  reactCode = '';
  vueCode = '';

  ngOnInit() {
    this.angularCode = this.staticContent;
    this.vueCode = this.staticContent.slice().replace(/\[/g, ':').replace(/]/g, '');
    this.reactCode = this.createReactCodeFromStaticContent(this.staticContent);
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

  private transformTagsToReactStyle(code: string): string {
    return code.replace(/elvia(^|-)([a-z])/g, (_match, _prefix, letter) => letter.toUpperCase());
  }

  private transformAttributesToReactStyle(code: string): string {
    return code
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
    reactCode = this.transformTagsToReactStyle(reactCode);
    reactCode = this.transformAttributesToReactStyle(reactCode);
    reactCode = this.removeWhiteSpaceBetweenTags(reactCode);

    return reactCode;
  }
}
