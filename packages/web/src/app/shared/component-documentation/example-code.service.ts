import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExampleCodeService {
  private subjectCodeReact = new Subject<any>();
  private subjectCodeWebComponent = new Subject<any>();

  listenNewCodeReact(): Observable<any> {
    return this.subjectCodeReact.asObservable();
  }

  listenNewCodeWebComponent(): Observable<any> {
    return this.subjectCodeWebComponent.asObservable();
  }
}
