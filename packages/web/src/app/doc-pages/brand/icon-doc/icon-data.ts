import changelogJson from '@elvia/elvis-icon/CHANGELOG.json';
import ComponentData from '../../components/component-data.interface';

const elvisIconData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Icon',
  attributes: {
    name: {
      isRequired: true,
      type: 'string',
      description: 'Available icons from elvia/elvis-assets-icons package, in camelCase',
      default: '""',
    },
    color: {
      isRequired: false,
      type: 'string | undefined',
      description: 'Color of icon, can be any color value like string, hex or rgba',
      default: '',
    },
    size: {
      isRequired: false,
      type: `"xxs" ... =>  "xxl" | undefined`,
      description: `Standard size of icon, follows same sizing guide as css classes, e.g "xs" = 16px, "sm" = 24px `,
      default: '"sm"',
    },
    customSize: {
      isRequired: false,
      type: 'string | undefined',
      description: 'Give the icon any valid css size property like 15px, 1em, 1.25rem',
      default: '',
    },
  },
};

export { elvisIconData };
