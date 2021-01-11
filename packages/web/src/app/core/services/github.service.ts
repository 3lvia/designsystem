import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  ELVIA_DESIGNSYSTEM_ID = 241121231;
  // Need to add the key, and find a way to store it
  API_KEY = '';

  constructor(private http: HttpClient) {}

  requestRepo(): Observable<any> {
    const url = `https://api.github.com/repositories/` + this.ELVIA_DESIGNSYSTEM_ID;
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.API_KEY,
    };

    return this.http.get(url, { headers });
  }
}
