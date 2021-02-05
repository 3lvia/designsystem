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

  UpdateCodeReact(newCode: string): void {
    this.subjectCodeReact.next(newCode);
  }

  UpdateCodeWebComponent(newCode: string): void {
    this.subjectCodeWebComponent.next(newCode);
  }
}
