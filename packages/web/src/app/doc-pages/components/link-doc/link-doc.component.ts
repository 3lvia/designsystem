import { Component } from '@angular/core';

@Component({
  selector: 'app-link-doc',
  templateUrl: './link-doc.component.html',
  styleUrls: ['./link-doc.component.scss'],
})
export class LinkDocComponent {
  doExample = `<a class="e-link e-link--lg" href="https://design.elvia.io/components/link#Overview">Se vårt strømsbruddskart</a>`;
  dontExample = `<a class="e-link e-link--lg" href="https://design.elvia.io/components/link#Overview">Klikk her</a>`;
}
