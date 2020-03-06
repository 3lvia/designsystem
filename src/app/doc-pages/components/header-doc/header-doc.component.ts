import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-header-doc',
  templateUrl: './header-doc.component.html',
  styleUrls: ['./header-doc.component.scss']
})
export class HeaderDocComponent implements OnInit {

  componentStatus = getComponent('header-doc').status;
  componentClasses = ['e-header'];

  example1 = `<header class="e-header">
  <a class="e-header_logo" href="#">
    <img src="" alt="Hafslund logo">
  </a>
  <h1 class="e-header_title">Overview</h1>
  <div class="e-header-user">
    <img class="e-header-user_icon-image" src="http://placekitten.com/150/150"/>
    <div class="e-header-user_name">
      Kevin Martin Haugen
    </div>
    <button class="e-button has-icon is-transparent"><i class="fal fa-sign-out"></i>Sign out</button>
  </div>
</header>
`;

  example2 = `<header class="e-header">
  <a class="e-header_logo" href="#">
    <img src="" alt="Hafslund logo">
  </a>
  <h1 class="e-header_title">Overview</h1>
  <div class="e-header-user">
    <div class="e-header-user_icon-no-image">
      TT
    </div>
    <div class="e-header-user_name">
      Tim Tom
    </div>
    <button class="e-button has-icon is-transparent"><i class="fal fa-sign-out"></i>Sign out</button>
  </div>
</header>
`;

  constructor() { }

  ngOnInit() {
  }

}
