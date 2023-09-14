import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';

interface IconLink {
  url: string;
  alt: string;
  defaultImgSrc: string;
  invertedImgSrc: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  bgClass = '';
  currentYear = new Date().getFullYear();
  links: IconLink[] = [
    {
      url: 'https://app.contentful.com/spaces/zez3t3t1iiwd/home',
      defaultImgSrc: 'assets/icons/Contentful.svg',
      invertedImgSrc: 'assets/icons/Contentful-inverted.svg',
      alt: 'Contentful icon',
    },
    {
      url: 'https://www.figma.com/files/880078299274452916/project/5995782/Designsystem-(Elvis)',
      defaultImgSrc: 'assets/icons/figma-header.svg',
      invertedImgSrc: 'assets/icons/figma-header_inverted.svg',
      alt: 'Figma icon',
    },
    {
      url: 'https://github.com/3lvia/designsystem',
      defaultImgSrc: 'assets/icons/github-header.svg',
      invertedImgSrc: 'assets/icons/github-header_inverted.svg',
      alt: 'GitHub icon',
    },
  ];

  constructor(private router: Router) {
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
