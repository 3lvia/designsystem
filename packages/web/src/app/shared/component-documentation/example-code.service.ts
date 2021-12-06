import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExampleCodeService {
  private subjectCodeReact = new Subject<any>();
  private subjectCodeAngular = new Subject<any>();
  private subjectCodeVue = new Subject<any>();
  private subjectCodeNative = new Subject<any>();

  listenCodeReact(): Observable<any> {
    return this.subjectCodeReact.asObservable();
  }

  listenCodeAngular(): Observable<any> {
    return this.subjectCodeAngular.asObservable();
  }

  listenCodeVue(): Observable<any> {
    return this.subjectCodeVue.asObservable();
  }

  listenCodeNative(): Observable<any> {
    return this.subjectCodeNative.asObservable();
  }

  updateCodeReact(newCode: string): void {
    this.subjectCodeReact.next(newCode);
  }

  updateCodeAngular(newCode: string): void {
    this.subjectCodeAngular.next(newCode);
  }

  updateCodeVue(newCode: string): void {
    this.subjectCodeVue.next(newCode);
  }

  updateCodeNative(newCode: string): void {
    this.subjectCodeNative.next(newCode);
  }

  getEmptyLineRegex(): RegExp {
    return /^\s*[\r\n]/gm;
  }

  getOldPropRegex(attribute: string, type?: string): RegExp {
    if (type === 'html') {
      return new RegExp('  ' + attribute + '={.*', 'gi');
    } else {
      /* Matches either:
        - [attribute]="..."
        - attribute={...}
        - attribute="..."
        - :attribute="..."
      */
      return new RegExp('  [\\[|:]?' + attribute + ']?=("|{).*', 'gi');
    }
  }
  getOldSlotRegex(elementName: string, attribute: string, content: string): RegExp {
    return new RegExp('  <div slot="' + attribute + '">\n    ' + content + '\n  </div>', 'gi');
  }

  getNewPropRegex(elementName: string): RegExp {
    return new RegExp('<' + elementName, 'gi');
  }

  getNewSlotRegex(elementName: string): RegExp {
    return new RegExp('</' + elementName + '>', 'gi');
  }

  getReplaceString(attribute: string, newValue: string, language: string, propType: string): string {
    let newVal = newValue;
    if (language === 'angular') {
      if (propType === 'string') {
        newVal = "'" + newVal + "'";
      }
      return '  [' + attribute + ']="' + newVal + '"';
    } else if (language === 'react') {
      if (propType === 'string') {
        newVal = '"' + newVal + '"';
      }
      return '  ' + attribute + '={"' + newVal + '"}';
    } else if (language === 'native') {
      return '  ' + attribute + '="' + newValue + '"';
    }
    // TODO: Finne ut hva slags Vue syntax gir mening og legge inn støtte her
    else if (language === 'vue') {
      if (propType === 'string') {
        newVal = "'" + newVal + "'";
      }
      return '  :' + attribute + '="' + newVal + '"';
    }
  }

  getNewString(
    elementName: string,
    prop: string,
    newValue: string,
    language: string,
    propType: string,
  ): string {
    let newVal = newValue;
    if (language === 'angular') {
      if (propType === 'string') {
        newVal = "'" + newVal + "'";
      }
      return '<' + elementName + '\n  [' + prop + ']="' + newVal + '"';
    } else if (language === 'react') {
      if (propType === 'string') {
        newVal = '"' + newVal + '"';
      }
      return '<' + elementName + '\n  ' + prop + '={' + newVal + '}';
    } else if (language === 'native') {
      return '<' + elementName + '\n  ' + prop + '="' + newValue + '"';
    }
    // TODO: Finne ut hva slags Vue syntax gir mening og legge inn støtte her
    else if (language === 'vue') {
      if (propType === 'string') {
        newVal = "'" + newVal + "'";
      }
      return '<' + elementName + '\n  :' + prop + '="' + newVal + '"';
    }
  }

  getNewSlotString(elementName: string, attribute: string, newContent: string): string {
    return '  <div slot="' + attribute + '">\n    ' + newContent + '\n  </div>\n</' + elementName + '>';
  }

  replaceOldProp(
    stringToReplace: string,
    attribute: string,
    newValue: string,
    language: string,
    type: string,
  ): string {
    return stringToReplace.replace(
      this.getOldPropRegex(attribute),
      this.getReplaceString(attribute, newValue, language, type),
    );
  }

  addNewProp(
    stringToReplace: string,
    attribute: string,
    newValue: string,
    language: string,
    type: string,
    elementName: string,
  ): string {
    return stringToReplace.replace(
      this.getNewPropRegex(elementName),
      this.getNewString(elementName, attribute, newValue, language, type),
    );
  }

  removeProp(stringToReplace: string, attribute: string): string {
    return stringToReplace.replace(this.getOldPropRegex(attribute), '').replace(this.getEmptyLineRegex(), '');
  }

  addNewSlotAndProp(
    stringToReplace: string,
    attribute: string,
    newValue: string,
    language: string,
    elementName: string,
  ): string {
    const propType = 'html';
    if (language === 'react') {
      return stringToReplace.replace(
        this.getNewPropRegex(elementName),
        this.getNewString(elementName, attribute, newValue, language, propType),
      );
    } else {
      return stringToReplace.replace(
        this.getNewSlotRegex(elementName),
        this.getNewSlotString(elementName, attribute, newValue),
      );
    }
  }

  removeSlotAndProp(
    stringToReplace: string,
    attribute: string,
    oldValue: string,
    language: string,
    elementName: string,
  ): string {
    if (language === 'react') {
      return stringToReplace
        .replace(this.getOldPropRegex(attribute, 'html'), '')
        .replace(this.getEmptyLineRegex(), '');
    } else {
      return stringToReplace
        .replace(this.getOldSlotRegex(elementName, attribute, oldValue), '')
        .replace(this.getEmptyLineRegex(), '');
    }
  }

  updateAllCode(codeReact: string, codeAngular: string, codeVue: string, codeNative: string): void {
    this.updateCodeReact(codeReact);
    this.updateCodeAngular(codeAngular);
    this.updateCodeVue(codeVue);
    this.updateCodeNative(codeNative);
  }
}
