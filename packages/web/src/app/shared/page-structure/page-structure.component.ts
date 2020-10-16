import { Component, Input } from '@angular/core';
import { EItems } from '../e-items.interface';
import { SectionAnimation, slideIn } from 'src/app/shared/animations';

@Component({
  selector: 'app-page-structure',
  templateUrl: './page-structure.component.html',
  styleUrls: ['./page-structure.component.scss'],
  animations: [SectionAnimation, slideIn],
})
export class PageStructureComponent {

  @Input() pages: EItems[] = [];

}
