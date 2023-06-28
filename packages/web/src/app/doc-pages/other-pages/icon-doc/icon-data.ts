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
      cegDisplayName: 'name',
      cegDefault: 0,
      cegType: 'string',
      cegFormType: 'iconName',
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
      cegDisplayName: 'Size',
      cegType: 'string',
      cegDefault: 'sm',
      cegFormType: 'radio',
      cegOptions: ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      cegOptionsLabel: ['XS', 'Small', 'Medium', 'Large', 'XL', 'XXL'],
      cegLabelTypography: 'capitalize',
    },
    customSize: {
      isRequired: false,
      type: 'string | undefined',
      description: 'Give the icon any valid css size property like 15px, 1em, 1.25rem',
      default: '',
    },
  },
  codeReact: `<Icon
  name={"addCircle"}
></Icon>
`,
  codeAngular: `<elvia-icon
  [name]="'addCircle'"
>
</elvia-icon>
`,
  codeNativeHTML: `<elvia-icon
  name="addCircle"
  id="example-elvia-icon"
>
</elvia-icon>
`,
  codeVue: `<elvia-icon
  :name="'addCircle'"
>
</elvia-icon>
`,
  codeNativeScript: `const elvisIcon = document.getElementById('example-elvia-icon');
`,
};

export { elvisIconData };
