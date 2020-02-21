import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-header-doc',
  templateUrl: './header-doc.component.html',
  styleUrls: ['./header-doc.component.scss']
})
export class HeaderDocComponent implements OnInit {

  componentStatus = getComponent('header-doc').status;

  example1 = `<header class="elvis-header">
  <a class="elvis-header_logo" href="#">
    <img src="styleguide/lib/logo.svg" alt="Hafslund logo">
  </a>
  <h1 class="elvis-header_title">Overview</h1>
  <div class="elvis-header-user">
    <img class="elvis-header-user_icon-image" src="http://placekitten.com/150/150"/>
    <div class="elvis-header-user_name">
      Kevin Martin Haugen
    </div>
    <button class="elvis-button has-icon is-transparent"><i class="fal fa-sign-out"></i>Sign out</button>
  </div>
</header>
`;
  
  example2 = `<header class="elvis-header">
  <a class="elvis-header_logo" href="#">
    <img src="styleguide/lib/logo.svg" alt="Hafslund logo">
  </a>
  <h1 class="elvis-header_title">Overview</h1>
  <div class="elvis-header-user">
    <div class="elvis-header-user_icon-no-image">
      TT
    </div>
    <div class="elvis-header-user_name">
      Tim Tom
    </div>
    <button class="elvis-button has-icon is-transparent"><i class="fal fa-sign-out"></i>Sign out</button>
  </div>
</header>
`;

  constructor() { }

  ngOnInit() {
  }

}
