import changelogJson from 'src/assets/changelogs/elvis-header/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const headerData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Header',
  attributes: {
    username: {
      isRequired: true,
      type: 'string',
      description: 'The username of the signed in user. Can be fetched from the JWT.',
      cegDisplayName: 'User name',
      cegType: 'string',
      cegFormType: 'custom-text',
      cegDefault: 'Ola Jansen',
    },
    email: {
      isRequired: true,
      type: 'string',
      description: 'The email of the signed in user. Can be fetched from the JWT.',
      cegDisplayName: 'E-mail',
      cegType: 'string',
      cegFormType: 'custom-text',
      cegDefault: 'e12345@elvia.no',
    },
    appTitle: {
      isRequired: false,
      type: 'string',
      description: 'The name of the application. If no title is provided, the title is assumed from the URL.',
      cegDisplayName: 'App title',
      cegType: 'string',
      cegFormType: 'custom-text',
      cegDefault: 'Drops',
    },
    pageTitle: {
      isRequired: true,
      type: 'string | HTMLElement | JSX.Element',
      description:
        'The name of the current page. Can be text, or rich content (use slot in web component if not just text).',
      cegDisplayName: 'Page title',
      cegType: 'string',
      cegFormType: 'custom-text',
      cegDefault: 'Kart og analyse',
    },
    navItems: {
      isRequired: false,
      type: 'string | HTMLElement | JSX.Element',
      description: 'A list of nav items which is rendered in the side nav.',
      default: 'undefined',
    },
    appContent: {
      isRequired: false,
      type: 'string | HTMLElement | JSX.Element',
      default: 'undefined',
      description: 'The page content. Usually a div, wrapping a router outlet.',
    },
    onLogoCLick: {
      isRequired: false,
      type: '() => void',
      description: 'An event that is triggered when the Elvia logo is clicked.',
    },
    onSignOutClick: {
      isRequired: false,
      type: '() => void',
      description: 'An event that is triggered when the sign out button is clicked.',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the header.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the header. Example: {marginTop: '8px', width: '100%'}.",
    },
  },
  codeReact: `<Header
  appContent={
    <h1 class="e-title-md">
      This is the page content
    </h1>
  }
  navItems={
    <div className="e-sidenav__container">
      <Link to="/" className="e-sidenav__item e-sidenav__item--active" aria-label="Dashbord">
        <div className="e-sidenav__icon-container">
          <Icon name="dashboard" size="sm"></Icon>
        </div>
        <div className="e-sidenav__item-text">Dashbord</div>
      </Link>
      <Link to="/search" className="e-sidenav__item" aria-label="Søk">
        <div className="e-sidenav__icon-container">
          <Icon name="search" size="sm"></Icon>
        </div>
        <div className="e-sidenav__item-text">Søk</div>
      </Link>
      <Link to="/pin" className="e-sidenav__item" aria-label="Analyse">
        <div className="e-sidenav__icon-container">
          <Icon name="pin" size="sm"></Icon>
        </div>
        <div className="e-sidenav__item-text">Analyse</div>
      </Link>
    </div>
  }
></Header>`,
  codeAngular: `<elvia-header
>
  <div slot="appContent">
    <h1 class="e-title-md">
      This is the page content
    </h1>
  </div>
  <div slot="navItems" class="e-sidenav__container">
    <a routerLink="/" class="e-sidenav__item e-sidenav__item--active" aria-label="Dashbord">
      <div class="e-sidenav__icon-container">
        <elvia-icon name="dashboard" size="sm"></elvia-icon>
      </div>
      <div class="e-sidenav__item-text">Dashbord</div>
    </a>
    <a routerLink="/search" class="e-sidenav__item" aria-label="Søk">
      <div class="e-sidenav__icon-container">
        <elvia-icon name="search" size="sm"></elvia-icon>
      </div>
      <div class="e-sidenav__item-text">Søk</div>
    </a>
    <a routerLink="/pin" class="e-sidenav__item" aria-label="Analyse">
      <div class="e-sidenav__icon-container">
        <elvia-icon name="pin" size="sm"></elvia-icon>
      </div>
      <div class="e-sidenav__item-text">Analyse</div>
    </a>
  </div>
</elvia-header>`,
  codeVue: `<elvia-header
>
  <div slot="appContent">
    <h1 class="e-title-md">
      This is the page content
    </h1>
  </div>
  <div slot="navItems" class="e-sidenav__container">
    <router-link to="/" class="e-sidenav__item e-sidenav__item--active" aria-label="Dashbord">
      <div class="e-sidenav__icon-container">
        <elvia-icon name="dashboard" size="sm"></elvia-icon>
      </div>
      <div class="e-sidenav__item-text">Dashbord</div>
    </router-link>
    <router-link to="/search" class="e-sidenav__item" aria-label="Søk">
      <div class="e-sidenav__icon-container">
        <elvia-icon name="search" size="sm"></elvia-icon>
      </div>
      <div class="e-sidenav__item-text">Søk</div>
    </router-link>
    <router-link to="/pin" class="e-sidenav__item" aria-label="Analyse">
      <div class="e-sidenav__icon-container">
        <elvia-icon name="pin" size="sm"></elvia-icon>
      </div>
      <div class="e-sidenav__item-text">Analyse</div>
    </router-link>
  </div>
</elvia-header>`,
  codeNativeHTML: `<button class="e-btn" id="header-trigger" style="position: relative;
  z-index: 999999;">Toggle internal header</button>
<elvia-header
  class="e-none"
  id="internal-header"
>
  <div slot="navItems" class="e-sidenav__container">
    <a href="#" class="e-sidenav__item e-sidenav__item--active" aria-label="Dashbord">
      <div class="e-sidenav__icon-container">
        <elvia-icon name="dashboard" size="sm"></elvia-icon>
      </div>
      <div class="e-sidenav__item-text">Dashbord</div>
    </a>
    <a href="#" class="e-sidenav__item" aria-label="Søk">
      <div class="e-sidenav__icon-container">
        <elvia-icon name="search" size="sm"></elvia-icon>
      </div>
      <div class="e-sidenav__item-text">Søk</div>
    </a>
    <a href="#" class="e-sidenav__item" aria-label="Analyse">
      <div class="e-sidenav__icon-container">
        <elvia-icon name="pin" size="sm"></elvia-icon>
      </div>
      <div class="e-sidenav__item-text">Analyse</div>
    </a>
  </div>
</elvia-header>`,
  codeNativeScript: `
const header = document.getElementById('internal-header');
const externalHeader = document.getElementById('header');
const mainElement = document.getElementById('main-content');
const headerTrigger = document.getElementById('header-trigger');

headerTrigger.addEventListener('click', (event) => {
  if (header.classList.contains('e-none')) {
    header.classList.remove('e-none');
    externalHeader.classList.add('e-none');
    mainElement.classList.add('e-bg-grey-05');
  } else {
    header.classList.add('e-none');
    externalHeader.classList.remove('e-none');
    mainElement.classList.remove('e-bg-grey-05');
  }
});
  `,
};
