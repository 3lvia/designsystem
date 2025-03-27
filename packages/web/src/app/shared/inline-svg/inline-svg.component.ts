import { HttpClient } from '@angular/common/http';
import { Component, effect, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-inline-svg',
  template: `<div [innerHtml]="svgIcon()"></div>`,
  styles: `
    :host {
      display: contents;
      line-height: 0;
    }
  `,
})
export class InlineSvgComponent {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  /**
   * Path to the SVG file to be loaded.
   * @example '/assets/icons/icon.svg'
   */
  src = input.required<string>();

  protected svgIcon = signal<SafeHtml>('');

  constructor() {
    effect(() => {
      this.loadSVG();
    });
  }

  private loadSVG(): void {
    const src = this.src();

    if (!src) {
      console.error('No SVG src provided!');
      return;
    }
    this.http.get(src, { responseType: 'text' }).subscribe({
      next: (value) => {
        this.svgIcon.set(this.sanitizer.bypassSecurityTrustHtml(value));
      },
      error: (e) => {
        console.error(`Could not load SVG from ${src}`, e);
      },
    });
  }
}
