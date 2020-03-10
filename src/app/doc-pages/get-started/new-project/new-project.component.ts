import { Component, OnInit, Input } from '@angular/core';
import { getUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-new-project',
  templateUrl: './new-project.component.html',
  styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {

  componentStatus = getUtilities('new-project-doc').status;

  constructor() { }

  ngOnInit() {
  }

}
