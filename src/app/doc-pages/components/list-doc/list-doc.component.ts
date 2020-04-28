import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';


@Component({
  selector: 'app-list-doc',
  templateUrl: './list-doc.component.html',
  styleUrls: ['./list-doc.component.scss']
})
export class ListDocComponent implements OnInit {


  externalUrl = getComponent('list-doc').externalUrl;
  componentStatus = getComponent('list-doc').status;

  example1 = `<ul class="e-list">
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
</ul>
`;

  example2 = `<ul class="e-list e-strong">
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
</ul>
`;

  example3 = `
<ol class="e-list e-has-icon">
  <li>
    <span class="e-list-icon-container">
      <i class="e-icon e-icon-step-1 e-icon--md"></i>
    </span>
  <strong>Describing title :</strong> After, one or multiple sentences could follow with more information. 
  These sentences can span over multiple rows, but shouldn’t be too long.
  </li>
  <li>
    <span class="e-list-icon-container">
      <i class="e-icon e-icon-step-2 e-icon--md"></i>
    </span>
  <strong>This can also be the start of a sentence</strong> that continues in thinner font.
  The bold part should be describing and the rest of the text informative.
  </li>
  <li>
    <span class="e-list-icon-container">
      <i class="e-icon e-icon-step-3 e-icon--md"></i>
    </span>
  <strong>Don’t use too many points</strong> and make sure the text is easy to read, 
  informative and follows Elvia’s tone of voice.
  </li>
</ol>
`;

// Old numbered lists. Might remove later
//   example4 = `<ol class="e-list e-numbers">
//   <li>Just a hunk, a hunk of burning list</li>
//   <li>Just a hunk, a hunk of burning lists</li>
//   <li>Just a hunk, a hunk of burning lists</li>
//   <li>Just a hunk, a hunk of burning lists</li>
// </ol>
// `;

  constructor() { }

  ngOnInit() {
  }
}
