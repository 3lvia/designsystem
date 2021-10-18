import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExampleCodeService {
  private subjectCodeReact = new Subject<any>();
  private subjectCodeAngular = new Subject<any>();
  private subjectCodeNative = new Subject<any>();

  listenCodeReact(): Observable<any> {
    return this.subjectCodeReact.asObservable();
  }

  listenCodeAngular(): Observable<any> {
    return this.subjectCodeAngular.asObservable();
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

  updateCodeNative(newCode: string): void {
    this.subjectCodeNative.next(newCode);
  }

  getEmptyLineRegex(): RegExp {
    return /^\s*[\r\n]/gm;
  }

  getOldPropRegex(attribute: string): RegExp {
    return new RegExp('  [\\[]?' + attribute + '[\\]]?=("|{).*', 'gi');
  }

  getNewPropRegex(elementName: string): RegExp {
    return new RegExp('<' + elementName, 'gi');
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
      return '  ' + attribute + '={' + newVal + '}';
    } else if (language === 'native') {
      return '  ' + attribute + '="' + newValue + '"';
    }
    // TODO: Finne ut hva slags Vue syntax gir mening og legge inn støtte her
    // else if (language === 'vue') {
    //   return '  ' + prop + '={"' + newVal + '"}';
    // }
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
    // else if (language === 'vue') {
    //   return '  ' + prop + '={"' + newVal + '"}';
    // }
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
}
