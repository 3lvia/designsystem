import { Component } from '@angular/core';
import '../../../../components/elvia-popover/dist/web_component/js/elvia-popover';
//import { default as PopoverWebComponent } from '@elvia/popover/dist/web_component/js/elvia-popover';
import { from } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
}
