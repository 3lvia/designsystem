import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';

interface IconLink {
  url: string;
  alt: string;
  imgSrc: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [NgClass, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterComponent {
  private router = inject(Router);

  bgClass = '';
  currentYear = new Date().getFullYear();
  links: IconLink[] = [
    {
      url: 'https://app.contentful.com/spaces/zez3t3t1iiwd/home',
      imgSrc: 'assets/icons/contentful-logo.svg',
      alt: 'Contentful icon',
    },
    {
      url: 'https://www.figma.com/files/880078299274452916/project/5995782/Designsystem-(Elvis)',
      imgSrc: 'assets/icons/figma-logo.svg',
      alt: 'Figma icon',
    },
    {
      url: 'https://github.com/3lvia/designsystem',
      imgSrc: 'assets/icons/github-logo.svg',
      alt: 'GitHub icon',
    },
  ];

  constructor() {
    this.router.events.pipe(takeUntilDestroyed()).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const eventUrl = event.urlAfterRedirects;
        if (eventUrl === '/not-found') {
          this.bgClass = 'not-found';
        } else {
          this.bgClass = '';
        }
      }
    });
  }
}
