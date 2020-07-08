import { EItems } from './e-items.interface';
import { Pages } from './pages.enum';
import { ItemStatus } from './item-status.enum';

export const eHomes: EItems[] = [
  {
    title: 'New project',
    description: 'Guidance on how to use, and implementation of Elvia Designsystem.',
    docUrl: Pages.NewProject,
    absolutePath: '/get-started/new-project-doc',
    imageUrl: 'assets/website-icons/temporary.svg',
  },
  {
    title: 'Components',
    description: 'Explore components that are available in Elvia Designsystem.',
    docUrl: Pages.OverviewComp,
    absolutePath: '/components/' + Pages.OverviewComp,
    imageUrl: 'assets/website-icons/shortcut-images/Component.svg',
  },
  {
    title: 'Contribute',
    description: 'Guidance on how to contribute to Elvia Designsystem.',
    docUrl: Pages.Contribute,
    absolutePath: '/community/' + Pages.Contribute,
    imageUrl: 'assets/website-icons/shortcut-images/Contribute.svg',
  },
  {
    title: 'Discussion',
    description: 'Report a bug? Request a new feauture?',
    docUrl: Pages.Discussion,
    absolutePath: '/community/' + Pages.Discussion,
    externalUrl: 'https://github.com/hafslundnett/elvia-designsystem/issues/new/choose',
    imageUrl: 'assets/website-icons/temporary.svg',
  },
  {
    title: 'Changelog',
    description: 'Overview og major and minor changes to Elvis',
    docUrl: Pages.Changelog,
    absolutePath: '/community/' + Pages.Changelog,
    externalUrl: 'https://github.com/hafslundnett/elvia-designsystem/blob/master/style/elvis/CHANGELOG.md',
    imageUrl: 'assets/website-icons/temporary.svg',
  },
  {
    title: 'FAQ',
    description: 'Answers to frequently asked questions',
    docUrl: Pages.Faq,
    absolutePath: '/community/' + Pages.Faq,
    imageUrl: 'assets/website-icons/temporary.svg',
  },
];

export const eGetStarted: EItems[] = [
  {
    title: 'New project',
    description: 'Guidance on how to use, and implementation of Elvia Designsystem.',
    docUrl: Pages.NewProject,
    status: ItemStatus.New,
    absolutePath: '/get-started/' + Pages.NewProject,
    imageUrl: 'assets/website-icons/temporary.svg',
  },
];

export const eComponents: EItems[] = [
  {
    title: 'Alert',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Alert,
    absolutePath: '/components/' + Pages.Alert,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Alert.svg',
    figmaUrl: 'https://www.figma.com/file/rxDEfFvqhgtlUWoEbJnGQW/Alert-messages?node-id=165%3A0',
  },
  {
    title: 'Autocomplete',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Autocomplete,
    absolutePath: '/components/' + Pages.Autocomplete,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Autocomplete.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1332%3A231',
  },
  {
    title: 'Button',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Button,
    absolutePath: '/components/' + Pages.Button,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Button.svg',
    figmaUrl: 'https://www.figma.com/file/KtmjuJ1UVpS5pLFrcZK2uJ/Buttons?node-id=2596%3A1120',
  },
  {
    title: 'Card',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Card,
    absolutePath: '/components/' + Pages.Card,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Card.svg',
    figmaUrl: 'https://www.figma.com/file/BGZQp24T3is2F2YbN8mIYO/Cards?node-id=2%3A9',
  },
  {
    title: 'Checkbox',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Checkbox,
    absolutePath: '/components/' + Pages.Checkbox,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Checkbox.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1263%3A493',
  },
  {
    title: 'Chips',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Tags, // Dette må endres
    absolutePath: '/components/' + Pages.Tags, // Dette må endres
    status: ItemStatus.Coming,
    imageUrl: 'assets/website-icons/component-images/Chip.svg',
  },
  {
    title: 'Date/Time Picker',
    description: 'Some useful component with amazing features',
    docUrl: Pages.DateTimePicker,
    absolutePath: '/components/' + Pages.DateTimePicker,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Date picker.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=2193%3A468',
  },
  {
    title: 'Drag&Drop',
    description: 'Some useful component with amazing features',
    docUrl: Pages.DragAndDrop,
    absolutePath: '/components/' + Pages.DragAndDrop,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Drag & drop.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1404%3A132',
  },
  {
    title: 'File Upload',
    description: 'Some useful component with amazing features',
    docUrl: Pages.FileUpload,
    absolutePath: '/components/' + Pages.FileUpload,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/File upload.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1404%3A132',
  },
  {
    title: 'Input',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Input,
    absolutePath: '/components/' + Pages.Input,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Input.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1262%3A486',
  },
  {
    title: 'Label',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Label,
    absolutePath: '/components/' + Pages.Label,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Label.svg',
    figmaUrl: 'https://www.figma.com/file/B898GK3p5YqOj4cMBztM37/Labels-%26-chips?node-id=0%3A1',
  },
  {
    title: 'Link',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Link,
    absolutePath: '/components/' + Pages.Link,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Link.svg',
    figmaUrl: 'https://www.figma.com/file/sgrg5TId3ewAFznKBFh2Wb/Links?node-id=1%3A10',
  },
  {
    title: 'List',
    description: 'Some useful component with amazing features',
    docUrl: Pages.List,
    absolutePath: '/components/' + Pages.List,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/List.svg',
    figmaUrl: 'https://www.figma.com/file/uT9r54Z9NP5JQXxRvZ4LBV/Modules%3A-article?node-id=353%3A0',
  },
  {
    title: 'Modal',
    description: 'An overlay that talks to the user',
    docUrl: Pages.Modal,
    absolutePath: '/components/' + Pages.Modal,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Modal.svg',
    figmaUrl: 'https://www.figma.com/file/unlDZ5F7svra9dPNKYdTK9/Modal?node-id=0%3A1',
  },
  {
    title: 'Popover',
    description: 'An overlay that positions itself relative to an anchor element',
    docUrl: Pages.Popover,
    absolutePath: '/components/' + Pages.Popover,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Popover.svg',
    figmaUrl: 'https://www.figma.com/file/9dvKKozGL4AEU0mSkN40Ul/Popover?node-id=372%3A36',
  },
  {
    title: 'Position Picker',
    description: 'Some useful component with amazing features',
    docUrl: Pages.PositionPicker,
    absolutePath: '/components/' + Pages.PositionPicker,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Position picker.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1404%3A132',
  },
  {
    title: 'Progressbar',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Progressbar,
    absolutePath: '/components/' + Pages.Progressbar,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Progressbar.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1404%3A132',
  },
  {
    title: 'Radiobutton',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Radiobutton,
    absolutePath: '/components/' + Pages.Radiobutton,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Radio buttons.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1283%3A70',
  },
  {
    title: 'Search',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Search,
    absolutePath: '/components/' + Pages.Search,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Search.svg',
    figmaUrl: 'https://www.figma.com/file/Yz09cKdXxOvfP0KP7AkTI7/Search?node-id=1%3A51',
  },
  {
    title: 'Segmented Control',
    description: 'Some useful component with amazing features',
    docUrl: Pages.SegmentedControl,
    absolutePath: '/components/' + Pages.SegmentedControl,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Segment control.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1285%3A253',
  },
  {
    title: 'Table',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Table,
    absolutePath: '/components/' + Pages.Table,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Table.svg',
    figmaUrl: 'https://www.figma.com/file/gh5MaG2NWKVODTk1p3cO6s/Tables?node-id=0%3A1',
  },
  {
    title: 'Toggle',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Toggle,
    absolutePath: '/components/' + Pages.Toggle,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Toggle.svg',
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=1%3A49',
  },
  {
    title: 'Tooltip',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Tooltip,
    absolutePath: '/components/' + Pages.Tooltip,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Tooltip.svg',
    figmaUrl: 'https://www.figma.com/file/kisdszIRwlezU3B4ZYRjfG/Tooltip?node-id=1%3A19',
  },
];

export const eIdentity: EItems[] = [
  {
    title: 'Alignment',
    description: 'Alignment of text',
    docUrl: Pages.Alignment,
    absolutePath: '/identity/' + Pages.Alignment,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Alignment.svg',
  },
  {
    title: 'Colors',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Color,
    absolutePath: '/identity/' + Pages.Color,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Color.svg',
    figmaUrl: 'https://www.figma.com/file/Q4bR2dykeg5bSC2VGPZRAL/Colours?node-id=1426%3A834',
  },
  {
    title: 'Grid',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Grid,
    absolutePath: '/identity/' + Pages.Grid,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Grid.svg',
    figmaUrl: 'https://www.figma.com/file/fMr1lhboPukTxmH9KruWB2/Grid?node-id=2%3A0',
  },
  {
    title: 'Logo',
    description: 'Our logo and how to use it correctly',
    docUrl: Pages.Logo,
    absolutePath: '/identity/' + Pages.Logo,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Logo.svg',
    figmaUrl: 'https://www.figma.com/file/SDUCEPhQu0q602oh2uhvKZ/Logo?node-id=0%3A1',
  },
  {
    title: 'Icons',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Icon,
    absolutePath: '/identity/' + Pages.Icon,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Icon.svg',
    figmaUrl: 'https://www.figma.com/file/0RM10vUNKdYVlW5BuXwqQK/Icons?node-id=82%3A2',
  },
  {
    title: 'Shadow',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Shadow,
    absolutePath: '/identity/' + Pages.Shadow,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Shadow.svg',
    figmaUrl: 'https://www.figma.com/file/E2yRkpqSSuRnq8RDXO4Mly/Shadow?node-id=1%3A10',
  },
  {
    title: 'Spacing',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Spacing,
    absolutePath: '/identity/' + Pages.Spacing,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Spacing.svg',
    figmaUrl: 'https://www.figma.com/file/FvsJlYXAIXS5IVKzZzMYgT/Spacing?node-id=1%3A2',
  },
  {
    title: 'Typography',
    description: 'Some useful component with amazing features',
    docUrl: Pages.Typography,
    absolutePath: '/identity/' + Pages.Typography,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Typography.svg',
    figmaUrl: 'https://www.figma.com/file/hvQucRpSHYZtSiIKM7NgBo/Typography?node-id=0%3A1',
  },
];

export const eTools: EItems[] = [
  {
    title: 'Accessibility',
    description: 'Accessibility in Elvia Designsystem',
    docUrl: Pages.Accessibility,
    absolutePath: '/tools/' + Pages.Accessibility,
    imageUrl: 'assets/website-icons/temporary.svg',
  },
  {
    title: 'Alt-texts',
    description: 'All meaningful images should have an alt-text (alternative text)',
    docUrl: Pages.AltText,
    absolutePath: '/tools/' + Pages.AltText,
    imageUrl: 'assets/website-icons/temporary.svg',
  },
  {
    title: 'UU Tools',
    description: 'Useful UU tools',
    docUrl: Pages.UUTools,
    absolutePath: '/tools/' + Pages.UUTools,
    imageUrl: 'assets/website-icons/temporary.svg',
  },
];
export const eCommunity: EItems[] = [
  {
    title: 'Changelog',
    description: 'Overview og major and minor changes to Elvis',
    docUrl: Pages.Changelog,
    absolutePath: '/community/' + Pages.Changelog,
    externalUrl: 'https://github.com/hafslundnett/elvia-designsystem/blob/master/style/elvis/CHANGELOG.md',
    imageUrl: 'assets/website-icons/temporary.svg',
  },
  {
    title: 'Contribute',
    description: 'Guidance on how to contribute to Elvia Designsystem.',
    docUrl: Pages.Contribute,
    absolutePath: '/community/' + Pages.Contribute,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/temporary.svg',
  },
  {
    title: 'Discussion',
    description: 'Report a bug? Request a new feature?',
    docUrl: Pages.Discussion,
    absolutePath: '/community/' + Pages.Discussion,
    externalUrl: 'https://github.com/hafslundnett/elvia-designsystem/issues/new/choose',
    imageUrl: 'assets/website-icons/temporary.svg',
  },
  {
    title: 'FAQ',
    description: 'Answers to frequently asked questions',
    docUrl: Pages.Faq,
    absolutePath: '/community/' + Pages.Faq,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/temporary.svg',
  },
];

export function getGetStarted(docUrl: string): EItems {
  return eGetStarted.find((component) => component.docUrl === docUrl);
}
export function getComponent(docUrl: string): EItems {
  return eComponents.find((component) => component.docUrl === docUrl);
}
export function getIdentity(docUrl: string): EItems {
  return eIdentity.find((component) => component.docUrl === docUrl);
}
export function getTools(docUrl: string): EItems {
  return eTools.find((component) => component.docUrl === docUrl);
}
export function getCommunity(docUrl: string): EItems {
  return eCommunity.find((component) => component.docUrl === docUrl);
}
