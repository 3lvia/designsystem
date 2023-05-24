import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-faq-doc',
  templateUrl: './faq-doc.component.html',
})
export class FaqDocComponent {
  description = getDocPagesNotFromCMS('faq')?.description;
  title = getDocPagesNotFromCMS('faq')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | ' + 'Elvia design system');
  }
}
