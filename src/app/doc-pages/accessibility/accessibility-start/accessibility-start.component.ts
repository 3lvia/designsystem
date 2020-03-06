import { Component, OnInit } from '@angular/core';
import { eAccessibility } from 'src/app/shared/e-items';

@Component({
  selector: 'app-accessibility-start',
  templateUrl: './accessibility-start.component.html',
  styleUrls: ['./accessibility-start.component.scss']
})
export class AccessibilityStartComponent implements OnInit {

  pages = eAccessibility;

  constructor() { }

  ngOnInit() {
  }

}
