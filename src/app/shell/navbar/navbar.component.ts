import { Component, OnInit } from '@angular/core';
import { NavBarItem } from '../../shared/navbar-item.interface';
import { Pages } from 'src/app/shared/pages.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  components: NavBarItem[] = [
    {
      title: 'Badge',
      navbarUrl: Pages.Badge
    },
    {
      title: 'Button',
      navbarUrl: Pages.Button
    },
    {
      title: 'Card',
      navbarUrl: Pages.Card
    },
    {
      title: 'Checkbox',
      navbarUrl: Pages.Checkbox
    },
    {
      title: 'Checkbox-Toggle',
      navbarUrl: Pages.CheckboxToggle
    },
    {
      title: 'Divider',
      navbarUrl: Pages.Divider
    },
    {
      title: 'Dropdown',
      navbarUrl: Pages.Dropdown
    },
    {
      title: 'Feedback-Message',
      navbarUrl: Pages.Feedback
    },
    {
      title: 'Header',
      navbarUrl: Pages.Header
    },
    {
      title: 'Input',
      navbarUrl: Pages.Input
    },
    {
      title: 'Link',
      navbarUrl: Pages.Link
    },
    {
      title: 'Notification-Dot',
      navbarUrl: Pages.Notification
    },
    {
      title: 'Radiobutton',
      navbarUrl: Pages.Radiobutton
    },
    {
      title: 'Select',
      navbarUrl: Pages.Select
    },
    {
      title: 'Table',
      navbarUrl: Pages.Table
    },
    {
      title: 'Tags',
      navbarUrl: Pages.Tags
    },
    {
      title: 'Tooltip',
      navbarUrl: Pages.Tooltip
    }
  ];

  utilities: NavBarItem[] = [
    {
      title: 'Colors',
      navbarUrl: Pages.Color
    },
    {
      title: 'Shadows',
      navbarUrl: Pages.Shadow
    },
    {
      title: 'Typography',
      navbarUrl: Pages.Typography
    }
  ];

  constructor() { }


  ngOnInit() {
  }

}
