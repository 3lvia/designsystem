import { EItems } from './e-items.interface';
import { Pages } from './pages.enum';
import { ItemStatus } from './item-status.enum';

export const eHomes: EItems[] = [
  {
    title: 'Identity',
    description: 'Elvis Branding',
    docUrl: Pages.OverviewIdentity,
    absolutePath: '/identity/',
    imageUrl: 'assets/website-icons/shortcut-images/Identity.svg',
    imageUrlOn: 'assets/website-icons/shortcut-images/IdentityOn.svg',
  },
  {
    title: 'Components',
    description: 'UI Library',
    docUrl: Pages.OverviewComp,
    absolutePath: '/components/',
    imageUrl: 'assets/website-icons/shortcut-images/Component.svg',
    imageUrlOn: 'assets/website-icons/shortcut-images/ComponentOn.svg',
  },
  {
    title: 'Utility Classes',
    description: 'Developer Tools',
    docUrl: Pages.Utilities,
    absolutePath: '/tools/' + Pages.Utilities,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/shortcut-images/UtilityClasses.svg',
    imageUrlOn: 'assets/website-icons/shortcut-images/UtilityClassesOn.svg',
  },
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
    title: 'The design system',
    // tslint:disable-next-line: max-line-length
    description:
      'Elvia’s design system - or Elvis, for short - is a scalable system of visual language, components and design assets which enables us to work together towards an ultimate brand experience.',
    docUrl: Pages.TheDesignSystem,
    status: ItemStatus.New,
    absolutePath: '/get-started/' + Pages.TheDesignSystem,
    imageUrl: 'assets/website-icons/get-started-images/the design system.svg',
    type: 'Get started',
  },
  {
    title: 'For developers',
    // tslint:disable-next-line: max-line-length
    description:
      'Guidance on how to use, and implementation of Elvia Designsystem. Elvis helps designers and developers create software with a consistent look and feel and saves time by allowing us to reuse components and design elements across multiple systems and sketches.',
    docUrl: Pages.NewProject,
    status: ItemStatus.New,
    absolutePath: '/get-started/' + Pages.NewProject,
    imageUrl: 'assets/website-icons/get-started-images/for developers.svg',
    type: 'Get started',
  },
  {
    title: 'For designers',
    // tslint:disable-next-line: max-line-length
    description:
      'As a designer, there’s a few resources to gather before getting started with the design system in Elvia. First thing to do is to make sure you have access to the Figma library.',
    docUrl: Pages.GetStartedDesigners,
    status: ItemStatus.New,
    absolutePath: '/get-started/' + Pages.GetStartedDesigners,
    imageUrl: 'assets/website-icons/get-started-images/for designers.svg',
    type: 'Get started',
  },
];

export const eComponents: EItems[] = [
  {
    title: 'Accordion',
    // tslint:disable-next-line: max-line-length
    description:
      'An accordion lets the user show and hide a section of content. It let us organize information and deliver a large amount of content in a small place.',
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
    description:
      'Alert should provide important messages and feedback to the user. It may be an alert message that something went wrong, to warn about something, confirmation to the user or just to inform. Alerts have different types and statuses that are customized to the different severity.',
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
    description:
      ' Autocomplete is a text input that predicts the rest of a word a user is typing. When you would have a long drop-down list and have to scroll a lot, you can use autocomplete to filter down the options, an example of this is filling in countries. If the user enters something that cannot match the options, errors will be displayed.',
    docUrl: Pages.Autocomplete,
    absolutePath: '/components/' + Pages.Autocomplete,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Autocomplete.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=2742%3A0',
    type: 'Component',
  },
  {
    title: 'Box',
    // tslint:disable-next-line: max-line-length
    description:
      'Box are used to group different content. Use a box together with grid and space to make different layouts.',
    docUrl: Pages.Box,
    absolutePath: '/components/' + Pages.Box,
    status: ItemStatus.Ignore,
    imageUrl: 'assets/website-icons/component-images/Box.svg',
    figmaUrl: 'https://www.figma.com/file/BGZQp24T3is2F2YbN8mIYO/Box?node-id=288%3A0',
    type: 'Component',
  },
  {
    title: 'Button',
    // tslint:disable-next-line: max-line-length
    description:
      'Button elements are used to provide a straightforward and accessible experience for users. A button element should be used whenever an action is performed by the user.',
    docUrl: Pages.Button,
    absolutePath: '/components/' + Pages.Button,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Button.svg',
    figmaUrl: 'https://www.figma.com/file/KtmjuJ1UVpS5pLFrcZK2uJ/Buttons?node-id=0%3A1',
    type: 'Component',
  },
  {
    title: 'Breadcrumb',
    // tslint:disable-next-line: max-line-length
    description:
      'Breadcrumb is a navigation system that help the user to understand the hierarchy and navigate between levels. It is a secondary navigation scheme used in addition to the primary navigation.',
    docUrl: Pages.Breadcrumb,
    absolutePath: '/components/' + Pages.Breadcrumb,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Button.svg',
    figmaUrl: 'https://www.figma.com/file/JNbQmeFGfn7QOybUKbSvks/Breadcrumb?node-id=3%3A2',
    type: 'Component',
  },
  {
    title: 'Card',
    // tslint:disable-next-line: max-line-length
    description:
      'A card is a flexible container that groups various elements of information and actions. They should be easy to scan, read and get things done.',
    docUrl: Pages.Card,
    absolutePath: '/components/' + Pages.Card,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Card.svg',
    figmaUrl: 'https://www.figma.com/file/BGZQp24T3is2F2YbN8mIYO/Cards?node-id=2%3A9',
    type: 'Component',
  },
  {
    title: 'Carousel',
    // tslint:disable-next-line: max-line-length
    description:
      'Carousel is used when the user can navigate through a collection of related visual items, for example a collection of images. The collection should have a common theme.',
    docUrl: Pages.Carousel,
    absolutePath: '/components/' + Pages.Carousel,
    status: ItemStatus.Ignore,
    imageUrl: 'assets/website-icons/component-images/Carousel.svg',
    figmaUrl: 'https://www.figma.com/file/Um5AotNfUftDorJHGbIy99/Navigational-controls?node-id=1023%3A15726',
    type: 'Component',
  },
  {
    title: 'Chip',
    // tslint:disable-next-line: max-line-length
    description:
      'Chips are interactive elements that represent an input. These are triggered by the user and can easily be removed by clicking on them. These are often used when you are going to filter content.',
    docUrl: Pages.Chips,
    absolutePath: '/components/' + Pages.Chips,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Chip.svg',
    figmaUrl: 'https://www.figma.com/file/B898GK3p5YqOj4cMBztM37/Labels-and-chips?node-id=136%3A1258',
    type: 'Component',
  },
  {
    title: 'Checkbox',
    // tslint:disable-next-line: max-line-length
    description:
      'Checkboxes let users select one or multiple options. It can also be used to toggle on/off when you have a single option available, for example if you want to receive a newsletter or when you have to accept terms.',
    docUrl: Pages.Checkbox,
    absolutePath: '/components/' + Pages.Checkbox,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Checkbox.svg',
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=1%3A452',
    type: 'Component',
  },
  {
    title: 'Content Loader',
    // tslint:disable-next-line: max-line-length
    description:
      'A content loader is used to indicate loading content in a way that gives users a perception of a faster loading time. Each component is shown in its animated block state, hinting the overall page structure, until its possible to replace the blocks with real content.',
    docUrl: Pages.ContentLoader,
    absolutePath: '/components/' + Pages.ContentLoader,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Content loader.svg',
    figmaUrl: 'https://www.figma.com/file/gZpJ1gY3wXM06X04j1r2RR/Loading-%26-scroll?node-id=9%3A0',
    type: 'Component',
  },
  {
    title: 'Date picker',
    // tslint:disable-next-line: max-line-length
    description:
      'Date picker is a simple way for the user to quickly select a date in a calendar dialog. It uses a text field and a visual calendar in a popover.',
    docUrl: Pages.Datepicker,
    absolutePath: '/components/' + Pages.Datepicker,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Date picker.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=4456%3A0',
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
    title: 'Divider',
    // tslint:disable-next-line: max-line-length
    description: 'Dividers are used to group or section off content.',
    docUrl: Pages.Divider,
    absolutePath: '/components/' + Pages.Divider,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Divider.svg',
    figmaUrl: 'https://www.figma.com/file/F4ycCcM9cGf9T12EhzbN3F/Dividers?node-id=1%3A2',
    type: 'Component',
  },
  {
    title: 'Dropdown',
    // tslint:disable-next-line: max-line-length
    description:
      'Dropdown present a list of options the user can select from and have typically 5-10 options to choose from. Dropdown can be used to submit data, filter, menu and so on. If you have too many options consider using autocomplete instead.',
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
    description:
      'Headers are used for navigation on the website and should be displayed at the top of the page. There are two types of headers available: one for external(coming) and one for internal systems.',
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
    description: 'Text fields are boxes the user can type text or number into in a structured format.',
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
    description:
      'Labels are used to label, categorize or organize items using keywords that describe them. They can also be used to show the status of an item.',
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
    description:
      'Links are navigational elements that take the user to a new page or context. Links can be used alone or inline with text.',
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
    description:
      'Lists are related content grouped vertically. We have different types of lists to suit different needs; bullet, numbered and icon. Lists should usually inherit the typography from the text surrounding the list.',
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
    description:
      'Modal is a dialog that displays critical information to the user in a layer above the content. The user is blocked from the main page and are asked to decide from several actions before they can continue to their previous workflow. They can dismiss by clicking cancel or outside the dialog window. Modals interrupt the user flow so use them sparingly.',
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
    description:
      'Pagination provides navigation to the page, by splitting content across pages and linking to them at the bottom of the page. This way the user is given a sense of control by being able to estimate the size of the data set as well as how much time it will take for them to find the information they’re looking for.',
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
    description:
      'We offer popover as a shell with options like close button, title and text. Popover displays additional information or operations without leaving the page. It is triggered by a button and layered on top of all other content.',
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
    description:
      'Position selector lets you select a position and gives you coordinates. You can choose either by clicking on a map or text input field.',
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
    description: `Graphical indication of the progress of an operation.`,
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
    description:
      'Radio buttons should be used if the user can only choose one option. One option is always selected by default. The options should be listed in a logical order and have between two and five options in total.',
    docUrl: Pages.Radiobutton,
    absolutePath: '/components/' + Pages.Radiobutton,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Radio buttons.svg',
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=1%3A517',
    type: 'Component',
  },
  {
    title: 'Radio Filter',
    // tslint:disable-next-line: max-line-length
    description:
      'Radio filters are buttons you can toggle between to filter out different properties of same content. It should always be an “all” option(shows all content) in radio filter. An example is an email inbox and you want to toggle between “all”, “read” and “unread” for all mails.',
    docUrl: Pages.RadioFilter,
    absolutePath: '/components/' + Pages.RadioFilter,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Radio filters.svg',
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=813%3A821',
    type: 'Component',
  },
  {
    title: 'Search',
    description:
      'Search allows the user to find specific information by search terms as an alternative to the main navigation menu.',
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
    description:
      'Segmented controls are a horizontal set of two or three segments to display different views of same content, each of which functions as a mutually exclusive button. Segments should be kept short and clear, and try to keep the segment size consistent.',
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
    description:
      'Steppers provide users with an overview of a process and helps them keep track of progress. The stepper can be normal or forced. A normal stepper enables full navigation through the steps - typically useful in long processes, while a forced stepper should be used if any step has to be completed before advancing to the next - typically in short processes.',
    docUrl: Pages.Stepper,
    absolutePath: '/components/' + Pages.Stepper,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Stepper.svg',
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=622%3A0',
  },
  {
    title: 'Tabs',
    // tslint:disable-next-line: max-line-length
    description:
      'Tabs are used to divide content into sections and let the user navigate between one section at a time. Use tabs when the content is at the same level of the hierarchy and are related. It should always be one tab selected by default.',
    docUrl: Pages.Tabs,
    absolutePath: '/components/' + Pages.Tabs,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Tabs.svg',
    figmaUrl: 'https://www.figma.com/file/v0KlQT8eAWiNN1ORHsmNjt/Tabs?node-id=1%3A72',
    type: 'Component',
  },
  {
    title: 'Table',
    // tslint:disable-next-line: max-line-length
    description:
      ' A table displays rows and columns with data and makes it efficient to look up and compare values. Text should be left aligned in the columns and numbers should be right aligned.',
    docUrl: Pages.Table,
    absolutePath: '/components/' + Pages.Table,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/component-images/Table.svg',
    figmaUrl: 'https://www.figma.com/file/gh5MaG2NWKVODTk1p3cO6s/Tables?node-id=3%3A292',
    type: 'Component',
  },
  {
    title: 'Toggle',
    description:
      'Toggle button allows the user to switch between to states (on/off) and have always a default state.',
    docUrl: Pages.Toggle,
    absolutePath: '/components/' + Pages.Toggle,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Toggle.svg',
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=1%3A49',
    type: 'Component',
  },
  {
    title: 'Time picker',
    description:
      'Time picker is a simple way for the user to quickly select a time in a dropdown dialog. It uses a text field and a visual dropdown.',
    docUrl: Pages.Timepicker,
    absolutePath: '/components/' + Pages.Timepicker,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/component-images/Date picker.svg',
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=4456%3A0',
    type: 'Component',
  },
  {
    title: 'Tooltip',
    description:
      'Tooltip is a light popover for showing additional information upon hover or focus. Keep tooltips short.',
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
    title: 'Colors',
    // tslint:disable-next-line: max-line-length
    description:
      'Elvia colors are a reference for energy and light. It plays an important part to bring the concept ON/OFF to life. For consistency, you shall use the defined color palette throughout our interface.',
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
    description:
      'Our grid-system is based off of Bootstraps grid-system and works almost the same. Read the  <a onclick="event.stopPropagation();" class="e-link e-link--inline e-link--new-tab" target="_blank" href="https://getbootstrap.com/docs/4.4/layout/grid/"><span class="e-link__title">Bootstrap documentation</span><span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold"></i></span></a> . All the Bootstrap grid-system classes are available for use. To use the grid-system add the e-grid class on a wrapper element. The bootstrap-classes will only work inside this wrapper, and will therefore not break any other potential grid-systems.',
    docUrl: Pages.Grid,
    absolutePath: '/identity/' + Pages.Grid,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Grid.svg',
    figmaUrl: 'https://www.figma.com/file/fMr1lhboPukTxmH9KruWB2/Grid?node-id=2%3A0',
    type: 'Identity',
  },
  {
    title: 'Icons',
    // tslint:disable-next-line: max-line-length
    description: `In our icon library, you’ll find all available icons in the design system as well as defined sizes for them. Missing a specific icon? Reach out to us.`,
    docUrl: Pages.Icon,
    absolutePath: '/identity/' + Pages.Icon,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Icon.svg',
    figmaUrl: 'https://www.figma.com/file/0RM10vUNKdYVlW5BuXwqQK/Icons?node-id=0%3A1',
    type: 'Identity',
  },
  {
    title: 'Logo',
    // tslint:disable-next-line: max-line-length
    description:
      'Elvia can be described as the power source in your home. Just like our services, our logo acts as the power source that the consumer can turn on and off when needed.',
    docUrl: Pages.Logo,
    absolutePath: '/identity/' + Pages.Logo,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Logo.svg',
    figmaUrl: 'https://www.figma.com/file/SDUCEPhQu0q602oh2uhvKZ/Logo?node-id=0%3A1',
    type: 'Identity',
  },
  {
    title: 'Shadow',
    // tslint:disable-next-line: max-line-length
    description:
      'Shadow is used to make an element stand out from the surface to create depth. Choosing a shadow is up to each scenario - but the shadow should be "experienced" and should not be prominent.',
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
    description:
      'Spacing refers to space between UI elements. It is important to create an appropriate spatial relationship between items and are a big part of the visual design.',
    docUrl: Pages.Spacing,
    absolutePath: '/identity/' + Pages.Spacing,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Spacing.svg',
    figmaUrl: 'https://www.figma.com/file/FvsJlYXAIXS5IVKzZzMYgT/Spacing?node-id=1%3A2',
    type: 'Identity',
  },
  {
    title: 'The concept',
    // tslint:disable-next-line: max-line-length
    description:
      'Our concept and values ​​should reflect us as a company in everything we do and how we are perceived on a corporate level and towards the customers.',
    docUrl: Pages.TheConcept,
    absolutePath: '/identity/' + Pages.TheConcept,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/The concept.svg',
    type: 'Identity',
  },
  {
    title: 'Tone of voice',
    // tslint:disable-next-line: max-line-length
    description:
      "In order to create clear content and simultaneously have a consistent linguistic personality, it is important that we have a defined tone of voice. This section explains the difference between Elvia's style and tone and how they are connected when we communicate with our customers; whether it is written or oral.",
    docUrl: Pages.ToneOfVoice,
    absolutePath: '/identity/' + Pages.ToneOfVoice,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Tone of voice.svg',
    figmaUrl: 'https://www.figma.com/file/hvQucRpSHYZtSiIKM7NgBo/Typography?node-id=0%3A1',
    type: 'Identity',
  },
  {
    title: 'Typography',
    // tslint:disable-next-line: max-line-length
    description:
      'Elvia has a profile font called Red Hat that should be used throughout all material. The Red Hat font family inlcudes two optical sizes: Display and Text.',
    docUrl: Pages.Typography,
    absolutePath: '/identity/' + Pages.Typography,
    status: ItemStatus.Done,
    imageUrl: 'assets/website-icons/identity-images/Typography.svg',
    figmaUrl: 'https://www.figma.com/file/hvQucRpSHYZtSiIKM7NgBo/Typography?node-id=0%3A1',
    type: 'Identity',
  },
];

export const eTools: EItems[] = [
  {
    title: 'Accessibility',
    description: 'Accessibility in Elvia Designsystem',
    docUrl: Pages.Accessibility,
    absolutePath: '/tools/' + Pages.Accessibility,
    imageUrl: 'assets/website-icons/tools-images/accessibility.svg',
    type: 'Tool',
  },
  {
    title: 'Design process',
    description: 'Designprocess stuff',
    docUrl: Pages.DesignProcess,
    absolutePath: '/tools/' + Pages.DesignProcess,
    imageUrl: 'assets/website-icons/tools-images/designProcess.svg',
    type: 'Tool',
  },
  // JUST TO BE INCLUDED IN SEARCH BEFORE WE EXTEND SEARCH
  {
    title: 'Focus',
    description:
      'Keyboard accessibility is one of the most important aspects of web accessibility. A keyboard user typically uses the Tab key to navigate through interactive elements on a web page. Focus adds an additional outline around the element.',
    absolutePath: '/tools/' + Pages.Accessibility,
    fragmentPath: 'Keyboard',
    status: ItemStatus.Ignore,
    type: 'Tool',
  },
  {
    title: 'Patterns',
    // tslint:disable-next-line:max-line-length
    description:
      'Patterns are best practice solutions to solve common user situations. These solutions will ensure that we have the same user flow and consistent experience across applications.',
    docUrl: Pages.Patterns,
    absolutePath: '/tools/' + Pages.Patterns,
    imageUrl: 'assets/website-icons/tools-images/patternsIllustration.svg',
    type: 'Tool',
  },
  {
    title: 'User Feedback',
    description: 'Some feedback to the user',
    docUrl: Pages.UserFeedback,
    absolutePath: '/tools/' + Pages.UserFeedback,
    imageUrl: 'assets/website-icons/tools-images/userFeedback.svg',
    type: 'Tool',
  },
  {
    title: 'Utility Classes',
    // tslint:disable-next-line: max-line-length
    description:
      'Elvis offers several utility classes that can be applied on elements without making any extra CSS classes or modifications in your project.',
    docUrl: Pages.Utilities,
    absolutePath: '/tools/' + Pages.Utilities,
    status: ItemStatus.Done,
    // Update Icons
    imageUrl: 'assets/website-icons/tools-images/utilityClasses.svg',
    // No figma page ready yet
    // figmaUrl: 'https://www.figma.com/file/hvQucRpSHYZtSiIKM7NgBo/Typography?node-id=0%3A1',
    type: 'Tool',
  },
];
export const eCommunity: EItems[] = [
  {
    title: "What's new?",
    description: 'The latest news, updates, and changes to the design system.',
    docUrl: Pages.Changelog,
    absolutePath: '/community/' + Pages.Changelog,
    imageUrl: 'assets/website-icons/community-images/Whats-new.svg',
    type: 'Community',
  },
  {
    title: 'Contact',
    // tslint:disable-next-line: max-line-length
    description: `We at team ATOM will be happy to help you with anything. So don’t hesitate to contact us for any further information or questions. You can also find us on slack at
    <a onclick="event.stopPropagation();" class="e-link e-link--inline e-link--new-tab" target="_blank" href="https://elvia-group.slack.com/archives/C01C1DU9X1Q" >
      <span class="e-link__title">#designsystemet</span>
      <span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold"></i></span>
    </a>`,
    docUrl: Pages.Contact,
    absolutePath: '/community/' + Pages.Contact,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/community-images/contact.svg',
    type: 'Community',
  },
  {
    title: 'Contribute',
    // tslint:disable-next-line: max-line-length
    description: `To contribute, or if you have any question, you can contact us on slack:
    <a onclick="event.stopPropagation();" class="e-link e-link--inline e-link--new-tab" target="_blank" href="https://elvia-group.slack.com/archives/C01C1DU9X1Q" >
      <span class="e-link__title">#designsystemet</span>
      <span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold"></i></span>
    </a>`,
    docUrl: Pages.Contribute,
    absolutePath: '/community/' + Pages.Contribute,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/community-images/contribute.svg',
    type: 'Community',
  },
  {
    title: 'FAQ',
    // tslint:disable-next-line: max-line-length
    description: `We try to answer the most asked questions. If you can´t find the answers you were looking for, contact us on slack:
    <a onclick="event.stopPropagation();" class="e-link e-link--inline e-link--new-tab" target="_blank" href="https://elvia-group.slack.com/archives/C01C1DU9X1Q" >
      <span class="e-link__title">#designsystemet</span>
      <span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold"></i></span>
    </a>`,
    docUrl: Pages.Faq,
    absolutePath: '/community/' + Pages.Faq,
    status: ItemStatus.New,
    imageUrl: 'assets/website-icons/community-images/FAQ.svg',
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
