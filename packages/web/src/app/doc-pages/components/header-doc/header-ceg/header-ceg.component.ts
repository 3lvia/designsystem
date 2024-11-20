import { NgClass } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { HeaderProps } from '@elvia/elvis-header/react';

import { CegControlManager, ComponentExample } from 'src/app/shared/component-documentation/ceg';

@Component({
    selector: 'app-header-ceg',
    templateUrl: './header-ceg.component.html',
    providers: [{ provide: ComponentExample, useExisting: HeaderCegComponent }],
    imports: [NgClass],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  reactSlotReplacement = {
    navItems: `<div className="e-sidenav__container">
    <a aria-label="Dashbord" className="e-sidenav__item e-sidenav__item--active">
      <div className="e-sidenav__icon-container">
        <Icon name="dashboard" size="sm"></Icon>
        <Icon name="dashboardColor" size="sm"></Icon>
      </div>
      <div className="e-sidenav__item-text">Dashbord</div>
    </a>
    <a aria-label="Søk" className="e-sidenav__item">
      <div className="e-sidenav__icon-container">
        <Icon name="search" size="sm"></Icon>
        <Icon name="searchColor" size="sm"></Icon>
      </div>
      <div className="e-sidenav__item-text">Søk</div>
    </a>
    <a aria-label="Analyse" className="e-sidenav__item">
      <div className="e-sidenav__icon-container">
        <Icon name="fullBattery" size="sm"></Icon>
        <Icon name="fullBatteryColor" size="sm"></Icon>
      </div>
      <div className="e-sidenav__item-text">Analyse</div>
    </a>
  </div>`,
  };

  toggleHeader() {
    this.headerIsVisible = !this.headerIsVisible;
    const externalHeader = document.getElementById('header');
    externalHeader?.classList.toggle('e-none', this.headerIsVisible);

    const bodyElement = document.body;
    if (bodyElement && this.headerIsVisible) {
      bodyElement.style.background = 'var(--e-color-background-2)';
    } else if (bodyElement) {
      bodyElement.style.background = 'transparent';
    }
  }
}
