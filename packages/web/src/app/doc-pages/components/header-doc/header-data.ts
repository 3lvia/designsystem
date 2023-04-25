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
    },
    email: {
      isRequired: true,
      type: 'string',
      description: 'The email of the signed in user. Can be fetched from the JWT.',
    },
    appTitle: {
      isRequired: false,
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
    bonusContent: {
      isRequired: false,
      type: 'HTMLElement | JSX.Element',
      default: 'undefined',
      description: 'Custom content placed to the right of the header.',
    },
    onLogoClick: {
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
};
