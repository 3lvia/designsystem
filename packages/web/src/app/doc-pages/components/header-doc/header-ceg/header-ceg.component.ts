import { Component } from '@angular/core';
import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

import { HeaderProps } from '@elvia/elvis-header/react';

@Component({
  selector: 'app-header-ceg',
  templateUrl: './header-ceg.component.html',
  providers: [{ provide: ComponentExample, useExisting: HeaderCegComponent }],
})
export class HeaderCegComponent implements ComponentExample {
  headerIsVisible = false;
  elementName = 'header';
  cegContent = new CegControlManager<HeaderProps>([
    {
      controls: {
        username: { type: 'text', group: 'Username', label: 'Username', value: 'Ola Nordmann' },
        email: { type: 'text', group: 'Email', label: 'Email', value: 'ola.nordmann@elvia.no' },
        appTitle: { type: 'text', group: 'App Title', label: 'App Title', value: 'Designsystemet' },
        pageTitle: { type: 'text', group: 'Page Title', label: 'Page Title', value: 'Dashbord' },
      },
      groupOrder: ['Username', 'Email', 'App Title', 'Page Title'],
    },
  ]);

  toggleHeader() {
    const externalHeader = document.getElementById('header');
    externalHeader?.classList.toggle('e-none');

    const mainElement = document.getElementById('main-content');
    mainElement?.classList.toggle('e-bg-grey-05');

    this.headerIsVisible = !this.headerIsVisible;
  }
}
