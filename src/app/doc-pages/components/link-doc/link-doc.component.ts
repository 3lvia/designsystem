import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-link-doc',
  templateUrl: './link-doc.component.html',
  styleUrls: ['./link-doc.component.scss']
})
export class LinkDocComponent implements OnInit {

  componentStatus = getComponent('link-doc').status;
  componentClasses = ['e-link', 'e-link is-inline', 'e-link is-action' ];

  example1 = `<a class="e-link" href="https://hafslundnett.no">Normal link</a>
`;
  example2 = `<p>Lorem ipsum <a class="e-link is-inline" href="https://hafslundnett.no">dolor</a> sit amet.</p>
`;
  example3 = `<a class="e-link is-action" href="https://hafslundnett.no">Se hva du kan gjøre</a>
`;


  constructor() { }

  ngOnInit() {
  }

}
