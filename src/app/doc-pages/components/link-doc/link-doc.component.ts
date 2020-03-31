import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-link-doc',
  templateUrl: './link-doc.component.html',
  styleUrls: ['./link-doc.component.scss']
})
export class LinkDocComponent implements OnInit {

  componentStatus = getComponent('link-doc').status;
  pseudoClasses = ['e-hover', 'e-focus'];

  example1 = `<a class="e-link" href="https://www.elvia.no/">Normal link</a>
`;
  example2 = `<p>Lorem ipsum <a class="e-link e-inline" href="https://www.elvia.no/">dolor</a> sit amet.
  Soluta modi in rerum magnam blanditiis laboriosam architecto illum,
  nemo eaque voluptate consectetur nulla fugiat delectus vel quia tenetur eius pariatur magni!
</p>
`;

  example3 = `<a class="e-link e-more" href="https://www.elvia.no/">Se mer</a>
`;
  example4 = `<a class="e-link e-back" href="https://www.elvia.no/">Tilbake</a>
`;
  example5 = `<a class="e-link e-has-icon" href="https://www.elvia.no/">Last ned <i class="e-icon-download"></i></a>
`;
  example6 = `<a class="e-link e-custom" href="https://www.elvia.no/">Se hva du kan gjøre</a>
`;
  example7 = `
<a class="e-link e-hover" href="https://www.elvia.no/">Se hva du kan gjøre</a>
<br>
<br>
<a class="e-link e-focus" href="https://www.elvia.no/">Se hva du kan gjøre</a>
`;



  constructor() { }

  ngOnInit() {
  }

}
