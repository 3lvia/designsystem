import changelogJson from 'src/assets/changelogs/elvis-header/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const headerData: ComponentData = {
  name: 'elvis-header',
  elementNameW: 'elvia-header',
  elementNameR: 'Header',
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
      isRequired: true,
      type: 'string',
      description: 'The name of the application.',
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
      description:
        'Custom CSS classes that can be added to the tooltip. NB: This applies to the content, not the trigger.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the tooltip. Example: {marginTop: '8px', width: '100%'}. NB: This applies to the content, not the trigger.",
    },
  },
  package: 'npm install @elvia/elvis-header',
  codeImportReact: `import { Header } from '@elvia/elvis-header/react';`,
  codeImportTypescriptInterface: `import { HeaderProps } from '@elvia/elvis-header/react';`,
  codeImportWebComponent: `import '@elvia/elvis-header';`,
  codeReact: `<Header
  appContent={
    <h1 class="e-title-md">
      This is the page content
    </h1>
  }
></Tooltip>`,
  codeAngular: `<elvia-header
>
  <div slot="appContent">
    <h1 class="e-title-md">
      This is the page content
    </h1>
  </div>
</elvia-header>`,
  codeVue: `<elvia-header
>
  <div slot="appContent">
    <h1 class="e-title-md">
      This is the page content
    </h1>
  </div>
</elvia-header>`,
  codeNativeHTML: `<elvia-header
>
  <div slot="appContent">
    <h1 class="e-title-md">
      This is the page content
    </h1>
  </div>
</elvia-header>`,
  codeNativeScript: ``,
  changelog: changelogJson.content,
};
