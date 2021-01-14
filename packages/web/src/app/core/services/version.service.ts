import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VersionService {
  private defaultVersion = 'please wait...';
  private cdnVersion;
  private latestVersion = new BehaviorSubject<string>(this.defaultVersion);
  private scriptFile = new BehaviorSubject<string>('');
  private styleFile = new BehaviorSubject<string>('');
  private codePenTag = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {}

  updateVersionFromCDN(): void {
    this.http.get<any[]>('https://cdn.elvia.io/npm/filelist.json').subscribe(
      (data) => {
        const elvis = data.filter((file) => file.filename.indexOf('elvis') > -1);
        const elvisSorted = elvis.sort((fileA, fileB) => {
          if (fileA.filename > fileB.filename) {
            return -1;
          } else {
            return 1;
          }
        });
        this.cdnVersion = elvisSorted[0].filename.split('/')[1].split('-')[1];
        const scriptFile = elvisSorted.find(
          (item) => item.filename.indexOf('elvis-' + this.cdnVersion + '/elvis.js') > -1,
        );
        const styleFile = elvisSorted.find(
          (item) => item.filename.indexOf('elvis-' + this.cdnVersion + '/css/elvis.min.css') > -1,
        );

        this.scriptFile.next(this.createScriptTag(scriptFile));
        this.styleFile.next(this.createStyleTag(styleFile));
        this.codePenTag.next(`
${this.createScriptTag(scriptFile)}
${this.createStyleTag(styleFile)}`);

        this.latestVersion.next(this.cdnVersion);
      },
      () => {
        this.scriptFile.next('CDN is down');
        this.styleFile.next('CDN is down');
      },
    );
  }

  getCDNScriptFile(): BehaviorSubject<string> {
    if (!this.cdnVersion) {
      this.updateVersionFromCDN();
    }

    return this.scriptFile;
  }

  getCDNStyleFile(): BehaviorSubject<string> {
    if (!this.cdnVersion) {
      this.updateVersionFromCDN();
    }

    return this.styleFile;
  }

  getCodePenTag(): BehaviorSubject<string> {
    if (!this.cdnVersion) {
      this.updateVersionFromCDN();
    }
    return this.codePenTag;
  }

  // Returns latest version accessible through CDN
  getCurrentVersion(): Observable<string> {
    if (!this.cdnVersion) {
      this.updateVersionFromCDN();
    }

    return this.latestVersion;
  }

  private createScriptTag(file: { filename: string; sha512: string }): string {
    return `<script src="https://cdn.elvia.io/${file.filename}" integrity="sha512-${file.sha512}" crossorigin="anonymous"></script>`;
  }

  private createStyleTag(file: { filename: string; sha512: string }): string {
    return `<link rel="stylesheet" href="https://cdn.elvia.io/${file.filename}" integrity="sha512-${file.sha512}" crossorigin="anonymous">`;
  }
}
