import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {

  sideBar = {
    show: true,
  };
  private showInternalHeaderSubject = new Subject<any>();

  listenShowInternalHeader(): Observable<any> {
    return this.showInternalHeaderSubject.asObservable();
  }
  toggleShowInternalHeader(show: boolean): void {
    this.showInternalHeaderSubject.next(show);
  }

}
