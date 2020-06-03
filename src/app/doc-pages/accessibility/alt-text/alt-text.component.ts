import { Component } from '@angular/core';

@Component({
  selector: 'app-alt-text',
  templateUrl: './alt-text.component.html',
  styleUrls: ['./alt-text.component.scss']
})
export class AltTextComponent {

  do = true;
  dont = false;

  example1 = `<img src="pynt.jpg" alt="" />`;
  example2 = `<img src="pynt.jpg" />`;

}
