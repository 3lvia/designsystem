import changelogJson from '@elvia/elvis-header/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { HeaderProps } from '@elvia/elvis-header/react';

export const headerData: ComponentData<HeaderProps> = {
  changelog: changelogJson.content,
  name: 'Header',
  attributes: {
    username: {
      isRequired: true,
      type: 'string',
      description: 'The username of the signed in user. Can be fetched from the JWT.',
    },
    email: {
      isRequired: true,
      type: 'string',
      description: 'The email of the signed in user. Can be fetched from the JWT.',
    },
    appTitle: {
      type: 'string',
      description: 'The name of the application. If no title is provided, the title is assumed from the URL.',
    },
    pageTitle: {
      isRequired: true,
      type: 'string | HTMLElement | JSX.Element',
      description:
        'The name of the current page. Can be text, or rich content (use slot in web component if not just text).',
    },
    navItems: {
      type: 'string | HTMLElement | JSX.Element',
      description: 'A list of nav items which is rendered in the side nav.',
      default: 'undefined',
    },
    appContent: {
      type: 'string | HTMLElement | JSX.Element',
      default: 'undefined',
      description: 'The page content. Usually a div, wrapping a router outlet.',
    },
    hideThemeSwitch: {
      type: 'boolean',
      default: 'false',
      description: 'Hides the theme switch in the profile menu if set to true.',
    },
    onLogoClick: {
      isEvent: true,
      type: '() => void',
      description: 'An event that is triggered when the Elvia logo is clicked.',
    },
    onSignOutClick: {
      isEvent: true,
      type: '() => void',
      description: 'An event that is triggered when the sign out button is clicked.',
    },
    onThemeChange: {
      isEvent: true,
      type: '(theme: Theme) => void',
      description: 'An event that is triggered when the theme is switched.',
    },
  },
};
