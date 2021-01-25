import { Component, Input } from '@angular/core';
import { EItems } from '../e-items.interface';
import { SectionAnimation, slideIn } from 'src/app/shared/animations';
import { ScrollService } from 'src/app/core/services/scroll.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-page-structure',
  templateUrl: './page-structure.component.html',
  styleUrls: ['./page-structure.component.scss'],
  animations: [SectionAnimation, slideIn],
})
export class PageStructureComponent {
  @Input() pages: EItems[] = [];
  routerSubscription;
  loadFeedbackComponent = true;

  constructor(private router: Router, private scrollService: ScrollService) {
    this.routerSubscription = this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        if (
          ev.url === '/community' ||
          ev.url === '/components' ||
          ev.url === '/get-started' ||
          ev.url === '/identity' ||
          ev.url === '/tools'
        ) {
          this.loadFeedbackComponent = false;
        } else {
          this.loadFeedbackComponent = true;
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  scrollToFeedback(): void {
    const offsetTop = document.body.scrollHeight;
    this.scrollService.scrollToElement(offsetTop);
  }
}
