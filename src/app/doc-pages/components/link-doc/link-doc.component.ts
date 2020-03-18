import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-link-doc',
  templateUrl: './link-doc.component.html',
  styleUrls: ['./link-doc.component.scss']
})
export class LinkDocComponent implements OnInit {

  componentStatus = getComponent('link-doc').status;
  componentClasses = ['e-link', 'e-link is-inline', 'e-link is-more', 'e-link is-back', 'e-link has-icon', 'e-link is-custom'];

  example1 = `<a class="e-link" href="">Normal link</a>
`;
  example2 = `<p>Lorem ipsum <a class="e-link is-inline" href="">dolor</a> sit amet.
  Soluta modi in rerum magnam blanditiis laboriosam architecto illum,
  nemo eaque voluptate consectetur nulla fugiat delectus vel quia tenetur eius pariatur magni!
</p>
`;

  example3 = `<a class="e-link is-more" href="">Se mer</a>
`;
  example4 = `<a class="e-link is-back" href="">Tilbake</a>
`;
  example5 = `<a class="e-link has-icon" href="">Last ned <i class="e-icon-download"></i></a>
`;
  example6 = `<a class="e-link is-custom" href="">Se hva du kan gjøre</a>
`;


  constructor() { }

  ngOnInit() {
  }

}
