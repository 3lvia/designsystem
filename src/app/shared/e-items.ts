import { EItems } from './e-items.interface';
import { Pages } from './pages.enum';
import { ItemStatus } from './item-status.enum';

export const eHomes: EItems[] = [
  {
    title: 'Identity',
    description: 'Elvis Branding',
    docUrl: Pages.OverviewIdentity,
    absolutePath: '/identity/' + Pages.OverviewIdentity,
    imageUrl: 'assets/website-icons/shortcut-images/Identity.svg',
    imageUrlOn: 'assets/website-icons/shortcut-images/IdentityOn.svg',
  },
  {
    title: 'Components',
    description: 'UI Library',
    docUrl: Pages.OverviewComp,
    absolutePath: '/components/' + Pages.OverviewComp,
    imageUrl: 'assets/website-icons/shortcut-images/Component.svg',
    imageUrlOn: 'assets/website-icons/shortcut-images/ComponentOn.svg',
  },
  // {
  //   title: 'Accessibility',
  //   description: 'WCAG 2.0',
  //   docUrl: Pages.Contribute,
  //   absolutePath: '/community/' + Pages.Contribute,
  //   imageUrl: 'assets/website-icons/shortcut-images/Accessibility.svg',
  //   imageUrlOn: 'assets/website-icons/shortcut-images/AccessibilityOn.svg',
  // },
  {
    title: 'Contribute',
    description: 'Help us get better',
    docUrl: Pages.Contribute,
    absolutePath: '/community/' + Pages.Contribute,
    imageUrl: 'assets/website-icons/shortcut-images/Contribute.svg',
    imageUrlOn: 'assets/website-icons/shortcut-images/ContributeOn.svg',
  },
];

export const eGetStarted: EItems[] = [
  {
    title: 'For developers',
    // tslint:disable-next-line: max-line-length
    description: 'Guidance on how to use, and implementation of Elvia Designsystem. Elvis helps designers and developers create software with a consistent look and feel and saves time by allowing us to reuse components and design elements across multiple systems and sketches.',
    docUrl: Pages.NewProject,
    status: ItemStatus.New,
    absolutePath: '/get-started/' + Pages.NewProject,
    imageUrl: 'assets/website-icons/temporary.svg',
    type: 'Get started',
  },
];

export const eComponents: EItems[] = [
  {
    title: 'Accordion',
    // tslint:disable-next-line: max-line-length
    description: 'An accordion let the user show and hide a section of content they. It let us organize information and deliver large amount of content in a small place.',
    docUrl: Pages.Accordion,
    absolutePath: '/components/' + Pages.Accordion,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Accordion.svg',
    figmaUrl: 'https://www.figma.com/file/CTFyTP4zr2KuVjSXsgZO1s/Accordion?node-id=72%3A491',
    type: 'Component',
  },
  {
    title: 'Alert',
    // tslint:disable-next-line: max-line-length
    description: 'Alert should provide important messages and feedback to the user. It may be an alert message that something went wrong, to warn about something, confirmation to the user or just to inform. Alerts have different types and statuses that are customized to the different severity.',
    docUrl: Pages.Alert,
    absolutePath: '/components/' + Pages.Alert,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Alert.svg',
    figmaUrl: 'https://www.figma.com/file/rxDEfFvqhgtlUWoEbJnGQW/Alert-messages?node-id=165%3A0',
    type: 'Component',
  },
  {
    title: 'Autocomplete',
    // tslint:disable-next-line: max-line-length
    description: ' Autocomplete is a text input that predicts the rest of a word a user is typing. When you would have a long drop-down list and have to scroll a lot, you can use autocomplete to filter down the options, an example of this is filling in countries. If the user enters something that cannot match the options, errors will be displayed.',
    docUrl: Pages.Autocomplete,
    absolutePath: '/components/' + Pages.Autocomplete,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Autocomplete.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=2742%3A0',
    type: 'Component',
  },
  {
    title: 'Button',
    // tslint:disable-next-line: max-line-length
    description: 'Button elements are used to provide a straightforward and accessible experience for users. A button element should be used whenever an action is performed by the user. There are three different sizes of buttons: small, medium and large (medium is default).',
    docUrl: Pages.Button,
    absolutePath: '/components/' + Pages.Button,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Button.svg',
    figmaUrl: 'https://www.figma.com/file/KtmjuJ1UVpS5pLFrcZK2uJ/Buttons?node-id=0%3A1',
    type: 'Component',
  },
  {
    title: 'Card',
    // tslint:disable-next-line: max-line-length
    description: 'A card is a flexible container that groups various elements of information and actions. They should be easy to scan, read and get things done.',
    docUrl: Pages.Card,
    absolutePath: '/components/' + Pages.Card,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Card.svg',
    figmaUrl: 'https://www.figma.com/file/BGZQp24T3is2F2YbN8mIYO/Cards?node-id=2%3A9',
    type: 'Component',
  },
  {
    title: 'Checkbox',
    // tslint:disable-next-line: max-line-length
    description: 'Checkboxes let users select one or multiple options. It can also be used to toggle on/off when you have a single option available, for example if you want to receive a newsletter or when you have to accept terms.',
    docUrl: Pages.Checkbox,
    absolutePath: '/components/' + Pages.Checkbox,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Checkbox.svg',
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=1%3A452',
    type: 'Component',
  },
  // Not implemented yet
  // {
  //   title: 'Chips',
  //   description: 'Some useful component with amazing features',
  //   docUrl: Pages.Tags, // Dette må endres
  //   absolutePath: '/components/' + Pages.Tags, // Dette må endres
  //   status: ItemStatus.Coming,
  //   imageUrl: 'assets/website-icons/component-images/Chip.svg',
  //   type: 'Component',
  // },
  {
    title: 'Content Loader',
    // tslint:disable-next-line: max-line-length
    description: 'Loaders confirms that content or actions are being processed by the system, either on a global or local level. The content loader is used globally to show page structure before it’s possible to show real content.',
    docUrl: Pages.ContentLoader,
    absolutePath: '/components/' + Pages.ContentLoader,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Content loader.svg',
    figmaUrl: 'https://www.figma.com/file/gZpJ1gY3wXM06X04j1r2RR/Loading-%26-scroll?node-id=9%3A0',
    type: 'Component',
  },
  {
    title: 'Date/Time Picker',
    // tslint:disable-next-line: max-line-length
    description: 'Date and time picker is a simple way for the user to quickly select a date and/or time in a calendar dialog. It uses a text field and a visual calendar in a popover. You can also let the user select a range of dates.',
    docUrl: Pages.DateTimePicker,
    absolutePath: '/components/' + Pages.DateTimePicker,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Date picker.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=2193%3A468',
    type: 'Component',
  },
  {
    title: 'Drag&Drop',
    // tslint:disable-next-line: max-line-length
    description: `Drag&drop is typically used in <a onclick="event.stopPropagation();" class="e-link e-link--inline" href="/components/${Pages.FileUpload}">File Upload</a> to show content area.`,
    docUrl: Pages.DragAndDrop,
    absolutePath: '/components/' + Pages.DragAndDrop,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Drag & drop.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1811%3A1080',
    type: 'Component',
  },
  {
    title: 'Dropdown',
    // tslint:disable-next-line: max-line-length
    description: 'Dropdown present a list of options the user can select from and have typically 5-10 options to choose from. Dropdown can be used to submit data, filter, menu and so on. If you have too many options consider using autocomplete instead.',
    docUrl: Pages.Dropdown,
    absolutePath: '/components/' + Pages.Dropdown,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Dropdown.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1285%3A842',
    type: 'Component',
  },
  {
    title: 'File Upload',
    description: 'Upload files through a file input element or a placeholder area.',
    docUrl: Pages.FileUpload,
    absolutePath: '/components/' + Pages.FileUpload,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/File upload.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1404%3A132',
    type: 'Component',
  },
  {
    title: 'Header',
    // tslint:disable-next-line: max-line-length
    description: 'Headers are used for navigation on the website and should be displayed at the top of the page. There are two types of headers available: one for external(coming) and one for internal systems.',
    docUrl: Pages.Header,
    absolutePath: '/components/' + Pages.Header,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Header.svg',
    figmaUrl: 'https://www.figma.com/file/QRhfgr0sd9MPmACos1xDNT/Header?node-id=230%3A604',
    type: 'Component',
  },
  {
    title: 'Input',
    // tslint:disable-next-line: max-line-length
    description: 'Text fields are boxes the user can type text or number into in a structured format. The size of the container should be proportional to the expected user input. Validation is determined in all fields based on the field being filled out. Validation takes place along the way, and the user must also be presented with guidance or error message.',
    docUrl: Pages.Input,
    absolutePath: '/components/' + Pages.Input,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Input.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1262%3A486',
    type: 'Component',
  },
  {
    title: 'Label',
    // tslint:disable-next-line: max-line-length
    description: 'Labels are used to label, categorize or organize items using keywords that describe them. They can also be used to show the status of an item.',
    docUrl: Pages.Label,
    absolutePath: '/components/' + Pages.Label,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Label.svg',
    figmaUrl: 'https://www.figma.com/file/B898GK3p5YqOj4cMBztM37/Labels-%26-chips?node-id=136%3A1738',
    type: 'Component',
  },
  {
    title: 'Link',
    // tslint:disable-next-line: max-line-length
    description: 'Links are navigational elements that take the user to a new page or context. Links can be used alone or inline with text.',
    docUrl: Pages.Link,
    absolutePath: '/components/' + Pages.Link,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Link.svg',
    figmaUrl: 'https://www.figma.com/file/sgrg5TId3ewAFznKBFh2Wb/Links?node-id=1%3A10',
    type: 'Component',
  },
  {
    title: 'List',
    // tslint:disable-next-line: max-line-length
    description: 'Lists are related content grouped vertically. We have different types of lists to suit different needs; bullet, numbered and icon.',
    docUrl: Pages.List,
    absolutePath: '/components/' + Pages.List,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/List.svg',
    figmaUrl: 'https://www.figma.com/file/uT9r54Z9NP5JQXxRvZ4LBV/Lists?node-id=353%3A0',
    type: 'Component',
  },
  {
    title: 'Modal',
    // tslint:disable-next-line: max-line-length
    description: 'Modal is a dialog that displays critical information to the user in a layer above the content. The user is blocked from the main page and are asked to decide from several actions before they can continue to their previous workflow. They can dismiss by clicking cancel or outside the dialog window. Modals interrupt the user flow so use them sparingly.',
    docUrl: Pages.Modal,
    absolutePath: '/components/' + Pages.Modal,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Modal.svg',
    figmaUrl: 'https://www.figma.com/file/unlDZ5F7svra9dPNKYdTK9/Modal?node-id=2%3A0',
    type: 'Component',
  },
  {
    title: 'Pagination',
    // tslint:disable-next-line: max-line-length
    description: 'Pagination provides navigation to the page, by splitting content across pages and linking to them at the bottom of the page. This way the user is given a sense of control by being able to estimate the size of the data set as well as how much time it will take for them to find the information they’re looking for.',
    docUrl: Pages.Pagination,
    absolutePath: '/components/' + Pages.Pagination,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Pagination.svg',
    figmaUrl: 'https://www.figma.com/file/Um5AotNfUftDorJHGbIy99/Pagination?node-id=0%3A1',
    type: 'Component',
  },
  {
    title: 'Popover',
    // tslint:disable-next-line: max-line-length
    description: 'Popover is a non-modal dialog that appears over the content on the screen. Popover is used with a clickable trigger element and should position itself relative to where there is free space on the screen. ',
    docUrl: Pages.Popover,
    absolutePath: '/components/' + Pages.Popover,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Popover.svg',
    figmaUrl: 'https://www.figma.com/file/9dvKKozGL4AEU0mSkN40Ul/Popover?node-id=1%3A10',
    type: 'Component',
  },
  {
    title: 'Position Picker',
    // tslint:disable-next-line: max-line-length
    description: 'Position selector lets you select a position and gives you coordinates. You can choose either by clicking on a map or text input field.',
    docUrl: Pages.PositionPicker,
    absolutePath: '/components/' + Pages.PositionPicker,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Position picker.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=2506%3A17',
    type: 'Component',
  },
  {
    title: 'Progressbar',
    // tslint:disable-next-line: max-line-length
    description: `Progressbar is typically used in <a onclick="event.stopPropagation();" class="e-link e-link--inline" href="/components/${Pages.FileUpload}">File Upload</a> to show file progress.`,
    docUrl: Pages.Progressbar,
    absolutePath: '/components/' + Pages.Progressbar,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Progressbar.svg',
    figmaUrl: 'https://www.figma.com/file/gZpJ1gY3wXM06X04j1r2RR/Loading-%26-scroll?node-id=73%3A9',
    type: 'Component',
  },
  {
    title: 'Radiobutton',
    // tslint:disable-next-line: max-line-length
    description: 'Radio buttons should be used if the user can only choose one option. One option is always selected by default. The options should be listed in a logical order and have between two and five options in total.',
    docUrl: Pages.Radiobutton,
    absolutePath: '/components/' + Pages.Radiobutton,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Radio buttons.svg',
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=1%3A517',
    type: 'Component',
  },
  {
    title: 'Search',
    description: 'Search allows the user to find specific information by search terms as an alternative to the main navigation menu.',
    docUrl: Pages.Search,
    absolutePath: '/components/' + Pages.Search,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Search.svg',
    figmaUrl: 'https://www.figma.com/file/Yz09cKdXxOvfP0KP7AkTI7/Search?node-id=1%3A2',
    type: 'Component',
  },
  {
    title: 'Segmented Control',
    // tslint:disable-next-line: max-line-length
    description: 'Segmented controls are a horizontal set of two or more segments, each of which functions as a mutually exclusive button. Segments should be kept short and clear, and try to keep the segment size consistent.',
    docUrl: Pages.SegmentedControl,
    absolutePath: '/components/' + Pages.SegmentedControl,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Segment control.svg',
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=1%3A436',
    type: 'Component',
  },
  {
    title: 'Stepper',
    // tslint:disable-next-line: max-line-length
    description: 'Steppers provide users with an overview of a process and helps them keep track of progress. The stepper can be normal or forced. A normal stepper enables full navigation through the steps - typically useful in long processes, while a forced stepper should be used if any step has to be completed before advancing to the next - typically in short processes.',
    docUrl: Pages.Stepper,
    absolutePath: '/components/' + Pages.Stepper,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Stepper.svg',
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=622%3A0',
  },
  {
    title: 'Table',
    // tslint:disable-next-line: max-line-length
    description: ' A table displays rows and columns with data and makes it efficient to look up and compare values. Text should be left aligned in the columns and numbers should be right aligned.',
    docUrl: Pages.Table,
    absolutePath: '/components/' + Pages.Table,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Table.svg',
    figmaUrl: 'https://www.figma.com/file/gh5MaG2NWKVODTk1p3cO6s/Tables?node-id=3%3A292',
    type: 'Component',
  },
  {
    title: 'Toggle',
    description: 'Toggle button allows the user to switch between to states (on/off) and have always a default state.',
    docUrl: Pages.Toggle,
    absolutePath: '/components/' + Pages.Toggle,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Toggle.svg',
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=1%3A49',
    type: 'Component',
  },
  {
    title: 'Tooltip',
    description: 'Tooltip is a light popover for showing additional information upon hover or focus. Keep tooltips short.',
    docUrl: Pages.Tooltip,
    absolutePath: '/components/' + Pages.Tooltip,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Tooltip.svg',
    figmaUrl: 'https://www.figma.com/file/kisdszIRwlezU3B4ZYRjfG/Tooltip?node-id=1%3A10',
    type: 'Component',
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
    type: 'Identity',
  },
  {
    title: 'Colors',
    // tslint:disable-next-line: max-line-length
    description: 'Elvia colors are a reference for energy and light. It plays an important part to bring the concept ON/OFF to life. For consistency, you shall use the defined color palette throughout our interface.',
    docUrl: Pages.Color,
    absolutePath: '/identity/' + Pages.Color,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Color.svg',
    figmaUrl: 'https://www.figma.com/file/Q4bR2dykeg5bSC2VGPZRAL/Colours?node-id=0%3A1',
    type: 'Identity',
  },
  {
    title: 'Grid',
    // tslint:disable-next-line: max-line-length
    description: 'This grid-system is based off of Bootstraps grid-system and works almost the same. All the Bootstrap grid-system classes are available for use. To use the grid-system add the e-grid class on a wrapper element. The bootstrap-classes will only work inside this wrapper, and will therefore not break any other potential grid-systems.',
    docUrl: Pages.Grid,
    absolutePath: '/identity/' + Pages.Grid,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Grid.svg',
    figmaUrl: 'https://www.figma.com/file/fMr1lhboPukTxmH9KruWB2/Grid?node-id=2%3A0',
    type: 'Identity',
  },
  {
    title: 'Logo',
    // tslint:disable-next-line: max-line-length
    description: 'Elvia can be described as the power source in your home. Just like our services, our logo acts as the power source that the consumer can turn on and off when needed.',
    docUrl: Pages.Logo,
    absolutePath: '/identity/' + Pages.Logo,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Logo.svg',
    figmaUrl: 'https://www.figma.com/file/SDUCEPhQu0q602oh2uhvKZ/Logo?node-id=0%3A1',
    type: 'Identity',
  },
  {
    title: 'Icons',
    description: 'Here are all the available icons in Elvis design system.',
    docUrl: Pages.Icon,
    absolutePath: '/identity/' + Pages.Icon,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Icon.svg',
    figmaUrl: 'https://www.figma.com/file/0RM10vUNKdYVlW5BuXwqQK/Icons?node-id=0%3A1',
    type: 'Identity',
  },
  {
    title: 'Shadow',
    // tslint:disable-next-line: max-line-length
    description: 'Shadow is used to make an element stand out from the surface to create depth. Choosing a shadow is up to each scenario - but the shadow should be "experienced" and should not be prominent.',
    docUrl: Pages.Shadow,
    absolutePath: '/identity/' + Pages.Shadow,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Shadow.svg',
    figmaUrl: 'https://www.figma.com/file/E2yRkpqSSuRnq8RDXO4Mly/Shadow?node-id=1%3A10',
    type: 'Identity',
  },
  {
    title: 'Spacing',
    // tslint:disable-next-line: max-line-length
    description: 'Spacing refers to space between UI elements. It is important to create an appropriate spatial relationship between items and are a big part of the visual design. We are using the 8 point grid system - Use multiples of 8 to define dimensions, padding, and margin of both block and inline elements.',
    docUrl: Pages.Spacing,
    absolutePath: '/identity/' + Pages.Spacing,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Spacing.svg',
    figmaUrl: 'https://www.figma.com/file/FvsJlYXAIXS5IVKzZzMYgT/Spacing?node-id=1%3A2',
    type: 'Identity',
  },
  {
    title: 'Typography',
    // tslint:disable-next-line: max-line-length
    description: 'Red Hat is Elvia\'s profile font and should be used throughout all material. The font family has two optical sizes, Display and Text.',
    docUrl: Pages.Typography,
    absolutePath: '/identity/' + Pages.Typography,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Typography.svg',
    figmaUrl: 'https://www.figma.com/file/hvQucRpSHYZtSiIKM7NgBo/Typography?node-id=0%3A1',
    type: 'Identity',
  },
  {
    title: 'Utility Classes',
    // tslint:disable-next-line: max-line-length
    description: 'Elvis offers several utility classes that can be applied on elements without making any extra CSS classes or modifications in your project.',
    docUrl: Pages.Utilities,
    absolutePath: '/identity/' + Pages.Utilities,
    status: ItemStatus.Done,
    // Update Icons
    imageUrl: 'assets/website-icons/identity-images/Utilities.svg',
    // No figma page ready yet
    // figmaUrl: 'https://www.figma.com/file/hvQucRpSHYZtSiIKM7NgBo/Typography?node-id=0%3A1',
    type: 'Identity',
  },
];

export const eTools: EItems[] = [
  {
    title: 'Accessibility',
    description: 'Accessibility in Elvia Designsystem',
    docUrl: Pages.Accessibility,
    absolutePath: '/tools/' + Pages.Accessibility,
    imageUrl: 'assets/website-icons/temporary.svg',
    type: 'Tool',
  },
  {
    title: 'Alt-texts',
    description: 'All meaningful images should have an alt-text (alternative text)',
    docUrl: Pages.AltText,
    absolutePath: '/tools/' + Pages.AltText,
    imageUrl: 'assets/website-icons/temporary.svg',
    type: 'Tool',
  },
  {
    title: 'UU Tools',
    description: 'Useful UU tools',
    docUrl: Pages.UUTools,
    absolutePath: '/tools/' + Pages.UUTools,
    imageUrl: 'assets/website-icons/temporary.svg',
    type: 'Tool',
  },
];
export const eCommunity: EItems[] = [
  {
    title: 'What´s new?',
    description: 'The latest news, updates, and changes to the design system.',
    docUrl: Pages.Changelog,
    absolutePath: '/community/' + Pages.Changelog,
    imageUrl: 'assets/website-icons/temporary.svg',
    type: 'Community',
  },
  {
    title: 'Contribute',
    // tslint:disable-next-line: max-line-length
    description: `Guidance on how to contribute to Elvia Designsystem. To contribute, or if you have any question, you can contact us on slack: <a onclick="event.stopPropagation();" class="e-link" href="https://hafslundnett.slack.com/archives/C01302LBTC2">#designsystemet</a>`,
    docUrl: Pages.Contribute,
    absolutePath: '/community/' + Pages.Contribute,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/temporary.svg',
    type: 'Community',
  },
  {
    title: 'Discussion',
    description: 'Discuss the design system? Report a bug? Request a new feature?',
    docUrl: Pages.Discussion,
    absolutePath: '/community/' + Pages.Discussion,
    externalUrl: 'https://github.com/hafslundnett/elvia-designsystem/issues/new/choose',
    imageUrl: 'assets/website-icons/temporary.svg',
    type: 'Community',
  },
  {
    title: 'FAQ',
    // tslint:disable-next-line: max-line-length
    description: `We try to answer the most asked questions. If you can´t find the answers you were looking for, contact us on slack: <a onclick="event.stopPropagation();" class="e-link e-text-lead" href="https://hafslundnett.slack.com/archives/C01302LBTC2">#designsystemet</a>.`,
    docUrl: Pages.Faq,
    absolutePath: '/community/' + Pages.Faq,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/temporary.svg',
    type: 'Community',
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
