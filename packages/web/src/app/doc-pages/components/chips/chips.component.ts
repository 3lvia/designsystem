import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent {

  figmaUrl = getComponent('chips').figmaUrl;
  description = getComponent('chips').description;
  does = [
    'Don\'t redirect cards to external sites - use links instead.',
  ];
  donts = [
    'Don\'t redirect cards to external sites - use links instead.',
  ];

  exampleOverview = `<div class="e-chip">
  <div class="e-chip__label">Label</div>
</div>
`;

  exampleStandard = `<div class="e-chip-container">
  <div class="e-chip">
    <div class="e-chip__label">2018</div>
  </div>
  <div class="e-chip">
    <div class="e-chip__label">2019</div>
  </div>
  <div class="e-chip">
    <div class="e-chip__label">2020</div>
  </div>
</div>
`;

  exampleColors = `<div class="e-chip-container">
  <div class="e-chip e-chip--purple-plum">
    <div class="e-chip__label">Annleggsbeskrivelse</div>
  </div>
  <div class="e-chip e-chip--blue-berry">
    <div class="e-chip__label">Adresse</div>
  </div>
  <div class="e-chip e-chip--orange-mango">
    <div class="e-chip__label">Målernummer</div>
  </div>
  <div class="e-chip e-chip--green-apple">
    <div class="e-chip__label">Annleggsbeskrivelse</div>
  </div>
  <div class="e-chip e-chip--red-tomato">
    <div class="e-chip__label">Adresse</div>
  </div>
  <div class="e-chip e-chip--violet-grape">
    <div class="e-chip__label">Målepunkt-ID</div>
  </div>
</div>
`;

}
