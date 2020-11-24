import { Component, Input } from '@angular/core';
import { EItems } from '../e-items.interface';
import { SectionAnimation, slideIn } from 'src/app/shared/animations';
import { ScrollService } from 'src/app/core/services/scroll.service';

@Component({
  selector: 'app-page-structure',
  templateUrl: './page-structure.component.html',
  styleUrls: ['./page-structure.component.scss'],
  animations: [SectionAnimation, slideIn],
})
export class PageStructureComponent {

  @Input() pages: EItems[] = [];

  constructor(private scrollService: ScrollService) { }

  scrollToFeedback(): void {
    const offsetTop = document.body.scrollHeight;
    this.scrollService.scrollToElement(offsetTop);
  }

}
