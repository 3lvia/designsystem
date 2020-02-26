import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-dropdown-doc',
  templateUrl: './dropdown-doc.component.html',
  styleUrls: ['./dropdown-doc.component.scss']
})
export class DropdownDocComponent implements OnInit {

  componentStatus = getComponent('dropdown-doc').status;
  componentClasses = ['.e-form_input', '.e-dropdown'];

  example1 = `<div class="e-form_input e-dropdown is-focus">
  <i class="fal fa-search e-form_input_icon"></i>
  <input value="Jer" />
  <i class="fal fa-times" aria-label="Clear text"></i>

  <div class="e-dropdown_content is-active">
    <div class="e-dropdown_content_item is-active"><b>Jer</b>oen</div>
    <div class="e-dropdown_content_item">Stian</div>
    <div class="e-dropdown_content_item">Erik</div>
  </div>
</div>
<div class="example-fill">
  <p>Some content behind</p>
  <p>Some content behind</p>
  <p>Some content behind</p>
  <p>Some content behind</p>
</div>
`;

  example2 = `<div class="example-fill">
  <p>Some content behind</p>
  <p>Some content behind</p>
  <p>Some content behind</p>
  <p>Some content behind</p>
  <p>Some content behind</p>
</div>
<div class="e-form_input e-dropdown is-focus">
    <i class="fal fa-search e-form_input_icon"></i>
    <input value="Jer" />
    <i class="fal fa-times" aria-label="Clear text"></i>

  <div class="e-dropdown_content is-active is-aligned-top">
    <div class="e-dropdown_content_item is-active"><b>Jer</b>oen</div>
    <div class="e-dropdown_content_item">Stian</div>
    <div class="e-dropdown_content_item">Rune</div>
    <div class="e-dropdown_content_item">Erik</div>
  </div>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
