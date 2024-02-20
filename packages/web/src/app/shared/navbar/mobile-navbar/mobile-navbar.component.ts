import { Component } from '@angular/core';
import { NavbarBase } from '../navbar-base';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: './mobile-navbar.component.html',
  styleUrls: ['./mobile-navbar.component.scss'],
  standalone: true,
  imports: [NgFor, RouterLink],
})
export class MobileNavbarComponent extends NavbarBase {}
