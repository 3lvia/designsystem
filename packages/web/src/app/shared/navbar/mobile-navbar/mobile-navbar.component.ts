import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavbarBase } from '../navbar-base';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss'],
  standalone: true,
  imports: [NgFor, RouterLink],
})
export class MobileNavbarComponent extends NavbarBase {}
