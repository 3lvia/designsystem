import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-link-doc',
  templateUrl: './link-doc.component.html',
  styleUrls: ['./link-doc.component.scss'],
})
export class LinkDocComponent {
  figmaUrl = getComponent('link')?.figmaUrl;
  description = getComponent('link')?.description;
  title = getComponent('link')?.title;
  doExample = `<a class="e-link e-link--lg" href="https://design.elvia.io/components/link#Overview">Se vårt strømsbruddskart</a>`;
  dontExample = `<a class="e-link e-link--lg" href="https://design.elvia.io/components/link#Overview">Klikk her</a>`;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
