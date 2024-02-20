import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserQuestionnaireService {
  constructor(private http: HttpClient) {}

  submitForm(formState: Record<string, string>): Observable<string> {
    const entry = new HttpParams({
      fromObject: {
        ...formState,
      },
    });

    return this.submitEntry(entry);
  }

  private submitEntry(entry: HttpParams): Observable<string> {
    return this.http
      .post('/', entry.toString(), {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType: 'text',
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errMsg = '';

    if (err.error instanceof ErrorEvent) {
      errMsg = `A client-side error occurred: ${err.error.message}`;
    } else {
      errMsg = `A server-side error occurred. Code: ${err.status}. Message: ${err.message}`;
    }

    return throwError(() => new Error(errMsg));
  }
}
