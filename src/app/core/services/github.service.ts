import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GithubService {


  requestUserRepos(userName: string): void {
    const xhr = new XMLHttpRequest();
    const url = `https://api.github.com/users/${userName}/repos`;
    xhr.open('GET', url, true);
  }
}
