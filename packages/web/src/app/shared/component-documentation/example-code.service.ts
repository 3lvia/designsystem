import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExampleCodeService {
  private subjectCodeReact = new Subject<any>();
  private subjectCodeWebComponent = new Subject<any>();

  listenCodeReact(): Observable<any> {
    return this.subjectCodeReact.asObservable();
  }

  listenCodeWebComponent(): Observable<any> {
    return this.subjectCodeWebComponent.asObservable();
  }

  updateCodeReact(newCode: string): void {
    this.subjectCodeReact.next(newCode);
  }

  updateCodeWebComponent(newCode: string): void {
    this.subjectCodeWebComponent.next(newCode);
  }

  getPropRegex(prop: string): RegExp {
    return new RegExp('  ' + prop + '=("|{).*', 'gi');
  }

  getNewLineRegex(elementName: string): RegExp {
    return new RegExp('<' + elementName, 'gi');
  }

  getReplaceValueString(prop: string, newValue: string, isReact: boolean, type: string): string {
    if (type !== 'string' && isReact) {
      return '  ' + prop + '={' + newValue + '}';
    } else {
      return '  ' + prop + '="' + newValue + '"';
    }
  }

  getNewPropStringW(elementNaveW: string, prop: string, newValue: string): string {
    return '<' + elementNaveW + '\n  ' + prop + '="' + newValue + '"';
  }

  getNewPropStringR(elementNaveR: string, prop: string, newValue: string, type: string): string {
    if (type === 'string') {
      return '<' + elementNaveR + '\n  ' + prop + '="' + newValue + '"';
    } else {
      return '<' + elementNaveR + '\n  ' + prop + '={' + newValue + '}';
    }
  }
}
