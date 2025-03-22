import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, effect, inject, input } from '@angular/core';

/**
 * Directive to load and inline an SVG file into the host element.
 * Useful for embedding SVGs directly into the DOM, allowing the use of CSS variables.
 * @example
 * ```html
 * <div slot="icon" [appInlineSVG]="page.imageUrl"></div>
 * ```
 */
@Directive({
  selector: '[appInlineSVG]',
})
export class InlineSVGDirective {
  private elementRef = inject(ElementRef);
  private http = inject(HttpClient);

  /**
   * Path to the SVG file to be loaded.
   * @example '/assets/icons/icon.svg'
   */
  appInlineSVG = input.required<string>();

  constructor() {
    effect(() => {
      this.loadSVG();
    });
  }

  private loadSVG(): void {
    const svgPath = this.appInlineSVG();

    if (!svgPath) {
      console.error('No SVG path provided for appInlineSVG directive');
      return;
    }
    this.http.get(svgPath, { responseType: 'text' }).subscribe({
      next: (data) => {
        this.elementRef.nativeElement.innerHTML = data;
      },
      error: (e) => {
        console.error(`Could not load SVG from ${svgPath}`, e);
      },
    });
  }
}
