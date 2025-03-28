import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { DesignsystemSlackLinkComponent } from 'src/app/shared/designsystem-slack-link/designsystem-slack-link.component';

interface IconLink {
  url: string;
  alt: string;
  imgSrc: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [DesignsystemSlackLinkComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterComponent {
  bgClass = '';
  currentYear = new Date().getFullYear();
  links: IconLink[] = [
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
}
