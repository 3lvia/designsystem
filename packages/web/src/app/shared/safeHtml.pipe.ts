import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
})
export class SafeHtmlPipe implements PipeTransform {
  private domSanitizer = inject(DomSanitizer);

  transform(htmlString: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(htmlString);
  }
}
