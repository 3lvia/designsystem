import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-static-code-generator',
  templateUrl: './static-code-generator.component.html',
  styleUrls: ['./static-code-generator.component.scss'],
})
export class StaticCodeGeneratorComponent implements OnInit {
  @Input() staticContent: string;

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

  private capitalize(s: string): string {
    return s.substring(0, 1).toUpperCase() + s.substring(1);
  }

  private convertSlotsIntoAttributes(code: string): string {
    const parsedCode = new DOMParser().parseFromString(code, 'text/html');
    parsedCode.querySelectorAll('[slot]').forEach((slotElement) => {
      const slotName = slotElement.getAttribute('slot');
      slotElement.removeAttribute('slot');
      /**
       * We add __ to identify the slots in the HTML so that we can remove the quotations
       * that is added by the DOMParer.
       **/
      slotElement.parentElement.setAttribute(slotName, `__{<>${slotElement.outerHTML}</>}__`);
      slotElement.parentElement.removeChild(slotElement);
    });
    // Remove quotes around curly braces and convert \&quot; to "
    return parsedCode.body.innerHTML
      .replace(/\&quot;/g, '"')
      .replace(/"__{/g, '{')
      .replace(/}__"/g, '}');
  }

  private createReactCodeFromStaticContent(angularCode: string): string {
    const out = this.convertSlotsIntoAttributes(angularCode)
      .replace(/class=/g, 'className=')
      .split(' ')
      .map((attribute) => {
        if (attribute.startsWith('[')) {
          return this.transformAngularAttributeToReact(attribute);
        } else if (attribute.startsWith('<elvia-') || attribute.startsWith('</elvia-')) {
          const bracket = attribute.startsWith('</') ? '</' : '<';
          const attributeParts = attribute.split('-');
          attributeParts.shift();

          return `${bracket}${attributeParts.map((part) => this.capitalize(part)).join('')}`;
        }
        return attribute;
      })
      .join(' ');

    return out;
  }
}
