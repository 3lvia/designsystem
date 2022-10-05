import { DocPage } from './shared.interface';
import { Pages, DocPageStatus } from './shared.enum';

// Used for shortcuts at home page
export const homeMenu: DocPage[] = [
  {
    title: 'Components',
    description: 'UI Library',
    docUrl: Pages.OverviewComp,
    absolutePath: '/components/',
    imageUrl: 'assets/doc-page-icons/shortcut-icons/Component.svg',
    imageUrlOn: 'assets/doc-page-icons/shortcut-icons/ComponentOn.svg',
  },
  {
    title: 'The concept',
    description: 'Branding',
    docUrl: 'the-concept',
    absolutePath: '/brand/the-concept/',
    imageUrl: 'assets/doc-page-icons/shortcut-icons/Identity.svg',
    imageUrlOn: 'assets/doc-page-icons/shortcut-icons/IdentityOn.svg',
  },
  {
    title: 'Accessibility',
    description: 'WCAG 2.0',
    docUrl: 'accessibility',
    absolutePath: '/tools/accessibility/',
    imageUrl: 'assets/doc-page-icons/shortcut-icons/UtilityClasses.svg',
    imageUrlOn: 'assets/doc-page-icons/shortcut-icons/UtilityClassesOn.svg',
  },
  {
    title: 'Contribute',
    description: 'Help us get better',
    docUrl: Pages.Contribute,
    absolutePath: '/about/' + Pages.Contribute,
    imageUrl: 'assets/doc-page-icons/shortcut-icons/Contribute.svg',
    imageUrlOn: 'assets/doc-page-icons/shortcut-icons/ContributeOn.svg',
  },
];

export const componentsDocPages: DocPage[] = [
  {
    title: 'Accordion group',
    // tslint:disable-next-line: max-line-length
    description:
      'A group accordion with titles. Can be used to organize a lot of content and are easy for the user to scan and select what’s relevant. Example of use is as a FAQ section.',
    docUrl: Pages.AccordionGroup,
    absolutePath: '/components/' + Pages.AccordionGroup,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/CTFyTP4zr2KuVjSXsgZO1s/Accordion?node-id=72%3A491',
    type: 'Component',
  },
  {
    title: 'Accordion',
    // tslint:disable-next-line: max-line-length
    description:
      'An accordion lets the user show and hide a section of content. It let us organize information and deliver a large amount of content in a small place.',
    docUrl: Pages.Accordion,
    absolutePath: '/components/' + Pages.Accordion,
    status: DocPageStatus.Done,
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
    status: DocPageStatus.Done,
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
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=2742%3A0',
    type: 'Component',
  },
  {
    title: 'Badge',
    // tslint:disable-next-line: max-line-length
    description:
      'A badge is a small visual indicator to communicate the status of an object, either as a numeric value or just a color. Examples of use are new notifications, unread messages or filter added.',
    docUrl: Pages.Badge,
    absolutePath: '/components/' + Pages.Badge,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/RDqaOx4hfYvZyQXtaqdkgA/Badge',
    type: 'Component',
  },
  {
    title: 'Box',
    // tslint:disable-next-line: max-line-length
    description:
      'Box are used to group different content. Use a box together with grid and space to make different layouts.',
    docUrl: Pages.Box,
    absolutePath: '/components/' + Pages.Box,
    status: DocPageStatus.Done,
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
    status: DocPageStatus.Done,
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
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/JNbQmeFGfn7QOybUKbSvks/Breadcrumb?node-id=3%3A2',
    type: 'Component',
  },
  {
    title: 'Card',
    // tslint:disable-next-line: max-line-length
    description:
      'A card presents a single topic in a collection you can choose from. The card is clickable, and the layout can vary if you have a description, image, or label.',
    docUrl: Pages.Card,
    absolutePath: '/components/' + Pages.Card,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/w0gte3tPfAypBQpdynPMcU/Card?node-id=1%3A8',
    type: 'Component',
  },
  {
    title: 'Carousel',
    // tslint:disable-next-line: max-line-length
    description:
      'Carousel is used when the user can navigate through a collection of related visual items, for example a collection of images. The collection should have a common theme.',
    docUrl: Pages.Carousel,
    absolutePath: '/components/' + Pages.Carousel,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/Um5AotNfUftDorJHGbIy99/Navigational-controls?node-id=1023%3A15726',
    type: 'Component',
  },
  {
    title: 'Chip',
    // tslint:disable-next-line: max-line-length
    description:
      'Chips are interactive elements that are often used when a user filters content. They provide a good overview of the options the user has chosen.',
    docUrl: Pages.Chip,
    absolutePath: '/components/' + Pages.Chip,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/dPti8DhGm7C2Rjx4IZSQFw/Chip?node-id=1%3A237',
    type: 'Component',
  },
  {
    title: 'Checkbox',
    // tslint:disable-next-line: max-line-length
    description:
      'Checkboxes let users select one or multiple options. It can also be used to toggle on/off when you have a single option available, for example if you want to receive a newsletter or when you have to accept terms.',
    docUrl: Pages.Checkbox,
    absolutePath: '/components/' + Pages.Checkbox,
    status: DocPageStatus.Done,
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
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/gZpJ1gY3wXM06X04j1r2RR/Loading-%26-scroll?node-id=9%3A0',
    type: 'Component',
  },
  {
    title: 'Date Picker',
    // tslint:disable-next-line: max-line-length
    description:
      'Date picker is a simple way for the user to quickly select a date in a calendar dialog. It uses a text field and a visual calendar in a popover.',
    docUrl: Pages.Datepicker,
    absolutePath: '/components/' + Pages.Datepicker,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=4456%3A0',
    type: 'Component',
  },
  {
    title: 'Date Range Picker',
    // tslint:disable-next-line: max-line-length
    description:
      'Date range picker is a simple way for the user to quickly select a date range in a calendar dialog. It uses two separate date pickers for the start and end date selection.',
    docUrl: Pages.DatepickerRange,
    absolutePath: '/components/' + Pages.DatepickerRange,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=4456%3A0',
    type: 'Component',
  },
  {
    title: 'Drag & drop',
    // tslint:disable-next-line: max-line-length
    description: `Drag & drop is typically used in <a onclick="event.stopPropagation();" class="e-link e-link--inline" href="/components/${Pages.FileUpload}">File Upload</a> to show content area.`,
    docUrl: Pages.DragAndDrop,
    absolutePath: '/components/' + Pages.DragAndDrop,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1811%3A1080',
    type: 'Component',
  },
  {
    title: 'Divider',
    // tslint:disable-next-line: max-line-length
    description: 'Dividers are used to group or section off content.',
    docUrl: Pages.Divider,
    absolutePath: '/components/' + Pages.Divider,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/F4ycCcM9cGf9T12EhzbN3F/Dividers?node-id=1%3A2',
    type: 'Component',
  },
  {
    title: 'Dropdown',
    // tslint:disable-next-line: max-line-length
    description:
      'Dropdown presents a list of options the user can select from and can be used to submit data, filter, in a menu and so on. You can select one or multiple options. If you have too many options consider using autocomplete instead.',
    docUrl: Pages.Dropdown,
    absolutePath: '/components/' + Pages.Dropdown,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1285%3A842',
    type: 'Component',
  },
  {
    title: 'File Upload',
    description: 'Upload files through a file input element or a placeholder area.',
    docUrl: Pages.FileUpload,
    absolutePath: '/components/' + Pages.FileUpload,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1404%3A132',
    type: 'Component',
  },
  {
    title: 'Header',
    // tslint:disable-next-line: max-line-length
    description:
      'Headers are used for navigation on the website and should be displayed at the top of the page. There are two types of headers available: one for external and one for internal systems.',
    docUrl: Pages.Header,
    absolutePath: '/components/' + Pages.Header,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/QRhfgr0sd9MPmACos1xDNT/Header?node-id=230%3A604',
    type: 'Component',
  },
  {
    title: 'Text field',
    // tslint:disable-next-line: max-line-length
    description: 'Text fields are input boxes the user can type text or number into in a structured format.',
    docUrl: Pages.Input,
    absolutePath: '/components/' + Pages.Input,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1262%3A486',
    type: 'Component',
  },
  {
    title: 'Tag',
    // tslint:disable-next-line: max-line-length
    description:
      'Tags are used to label, tag, categorize or organize items using keywords that describe them. They can also be used to show the status of an item.',
    docUrl: Pages.Tag,
    absolutePath: '/components/' + Pages.Tag,
    status: DocPageStatus.Done,
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
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/sgrg5TId3ewAFznKBFh2Wb/Links?node-id=1%3A10',
    type: 'Component',
  },
  {
    title: 'List',
    // tslint:disable-next-line: max-line-length
    description:
      'Lists are related content grouped vertically. We have different types of lists to suit different needs; bullet, numbered and icon. Lists should usually inherit the typography from the text surrounding the list. See <a onclick="event.stopPropagation();" class="e-link e-link--inline" href="/patterns/groups">patterns</a> for list or group design patterns.',
    docUrl: Pages.List,
    absolutePath: '/components/' + Pages.List,
    status: DocPageStatus.Done,
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
    status: DocPageStatus.Done,
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
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/Um5AotNfUftDorJHGbIy99/Pagination?node-id=0%3A1',
    type: 'Component',
  },
  {
    title: 'Popover',
    // tslint:disable-next-line: max-line-length
    description:
      'A popover is a non-modal dialog that appears above the content on the screen without losing the context of their original view. It can contain rich data such as text, selection controls, and buttons. A popover is used with a clickable trigger element and should position itself relative to where there is free space on the screen.',
    docUrl: Pages.Popover,
    absolutePath: '/components/' + Pages.Popover,
    status: DocPageStatus.Done,
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
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=2506%3A17',
    type: 'Component',
  },
  {
    title: 'Progressbar',
    // tslint:disable-next-line: max-line-length
    description: `Graphical indication of the progress of an operation.`,
    docUrl: Pages.Progressbar,
    absolutePath: '/components/' + Pages.Progressbar,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/gZpJ1gY3wXM06X04j1r2RR/Loading-%26-scroll?node-id=73%3A9',
    type: 'Component',
  },
  {
    title: 'Radio button',
    // tslint:disable-next-line: max-line-length
    description:
      'Radio buttons should be used if the user can only choose one option. One option is always selected by default. The options should be listed in a logical order and have between two and five options in total.',
    docUrl: Pages.Radiobutton,
    absolutePath: '/components/' + Pages.Radiobutton,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=1%3A517',
    type: 'Component',
  },
  {
    title: 'Radio Filter',
    // tslint:disable-next-line: max-line-length
    description:
      'Radio filters are buttons you can toggle between to filter out different properties of same content. It should always be an “all” option (shows all content) in radio filter.',
    docUrl: Pages.RadioFilter,
    absolutePath: '/components/' + Pages.RadioFilter,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=813%3A821',
    type: 'Component',
  },
  {
    title: 'Search',
    description:
      'Search allows the user to find specific information by search terms as an alternative to the main navigation menu.',
    docUrl: Pages.Search,
    absolutePath: '/components/' + Pages.Search,
    status: DocPageStatus.Done,
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
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=1%3A436',
    type: 'Component',
  },
  {
    title: 'Slider',
    // tslint:disable-next-line: max-line-length
    description:
      'A slider allows users to adjust the value by moving a handle along a track. It can be used as a visual tool in addition to a numeric input where the user can type exact value.',
    docUrl: Pages.Slider,
    absolutePath: '/components/' + Pages.Slider,
    status: DocPageStatus.Coming,
    figmaUrl: 'https://www.figma.com/file/Bpc4gmpy4T4eeWm51X5UmJ/Slider?node-id=0%3A1',
    type: 'Component',
  },
  {
    title: 'Spotlight',
    // tslint:disable-next-line: max-line-length
    description:
      'Spotlight is used to highlight a specific selection of a page, often used together with an information box.',
    docUrl: Pages.Spotlight,
    absolutePath: '/components/' + Pages.Spotlight,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/rpflFlBIv4c5TNKLXJLktG/?node-id=2%3A8',
    type: 'Component',
  },
  {
    title: 'Stepper',
    // tslint:disable-next-line: max-line-length
    description:
      'Steppers provide users with an overview of a process and helps them keep track of progress. The stepper can be normal or forced. A normal stepper enables full navigation through the steps - typically useful in long processes, while a forced stepper should be used if any step has to be completed before advancing to the next - typically in short processes.',
    docUrl: Pages.Stepper,
    absolutePath: '/components/' + Pages.Stepper,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=622%3A0',
    type: 'Component',
  },
  {
    title: 'Tabs',
    // tslint:disable-next-line: max-line-length
    description:
      'Tabs are used to divide content into sections and let the user navigate between one section at a time. Use tabs when the content is at the same level of the hierarchy and are related. It should always be one tab selected by default.',
    docUrl: Pages.Tabs,
    absolutePath: '/components/' + Pages.Tabs,
    status: DocPageStatus.Done,
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
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/gh5MaG2NWKVODTk1p3cO6s/Tables?node-id=3%3A292',
    type: 'Component',
  },
  {
    title: 'Toggle',
    description:
      'Toggle button allows the user to switch between to states (on/off) and have always a default state. Toggle takes effect immediately.',
    docUrl: Pages.Toggle,
    absolutePath: '/components/' + Pages.Toggle,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=1%3A49',
    type: 'Component',
  },
  {
    title: 'Time picker',
    description:
      'The time picker is a simple way for the user to quickly select the time through a text field and a visual dropdown. The user can input the time manually or click on the clock icon to choose the hour and if needed, a preset interval of minutes.',
    docUrl: Pages.Timepicker,
    absolutePath: '/components/' + Pages.Timepicker,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=4456%3A0',
    type: 'Component',
  },
  {
    title: 'Thumbnail',
    description:
      'Thumbnail is a small preview of an image. A clickable thumbnail can be used to navigate through a collection of images. Choose the image you want to see in larger version, instead of scrolling chronologically with an arrow.',
    docUrl: Pages.Thumbnail,
    absolutePath: '/components/' + Pages.Thumbnail,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/cIyfnYdCJ6Nlj5fLVi245M/Thumbnail?node-id=11%3A30',
    type: 'Component',
  },
  {
    title: 'Tooltip',
    description:
      'Tooltip is a light popover for showing additional information upon hover or focus. Keep tooltips short.',
    docUrl: Pages.Tooltip,
    absolutePath: '/components/' + Pages.Tooltip,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/kisdszIRwlezU3B4ZYRjfG/Tooltip?node-id=1%3A10',
    type: 'Component',
  },
];

export const docPagesNotFromCMS: DocPage[] = [
  {
    title: 'The design system',
    // tslint:disable-next-line: max-line-length
    description:
      'Elvia’s design system - or Elvis, for short - is a scalable system of visual language, components and design assets which enables us to work together towards an ultimate brand experience.',
    docUrl: Pages.TheDesignSystem,
    status: DocPageStatus.Done,
    absolutePath: '/get-started/' + Pages.TheDesignSystem,
  },
  {
    title: 'Contact',
    // tslint:disable-next-line: max-line-length
    description: `We at team ATOM will be happy to help you with anything. So don’t hesitate to contact us for any further information or questions. You can also find us on slack at
      <a onclick="event.stopPropagation();" class="e-link e-link--inline e-link--new-tab" target="_blank" rel="noopener" href="https://elvia-group.slack.com/archives/C01C1DU9X1Q" >
        <span class="e-link__title">#designsystemet</span>
        <span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold" aria-hidden="true"></i></span>
      </a>`,
    docUrl: Pages.Contact,
    absolutePath: '/about/' + Pages.Contact,
    status: DocPageStatus.Done,
  },
  {
    title: 'Contribute',
    // tslint:disable-next-line: max-line-length
    description: `To contribute, or if you have any question, contact us on Slack:
      <a onclick="event.stopPropagation();" class="e-link e-link--inline e-link--new-tab" target="_blank" rel="noopener" href="https://elvia-group.slack.com/archives/C01C1DU9X1Q" >
        <span class="e-link__title">#designsystemet</span>
        <span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold" aria-hidden="true"></i></span>
      </a> or contact any of the 
      <a onclick="event.stopPropagation();" class="e-link e-link--inline" href="/about/${Pages.Contact}" >
        <span class="e-link__title">team members</span>
      </a>directly.`,
    docUrl: Pages.Contribute,
    absolutePath: '/about/' + Pages.Contribute,
    status: DocPageStatus.Done,
  },
  {
    title: 'FAQ',
    // tslint:disable-next-line: max-line-length
    description: `We try to answer the most asked questions. If you can´t find the answers you were looking for, contact us on Slack:
      <a onclick="event.stopPropagation();" class="e-link e-link--inline e-link--new-tab" target="_blank" rel="noopener" href="https://elvia-group.slack.com/archives/C01C1DU9X1Q" >
        <span class="e-link__title">#designsystemet</span>
        <span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold" aria-hidden="true"></i></span>
      </a>`,
    docUrl: Pages.Faq,
    absolutePath: '/about/' + Pages.Faq,
    status: DocPageStatus.Done,
  },
  {
    title: "What's new?",
    description: 'The latest news, updates, and changes to the design system.',
    docUrl: Pages.Changelog,
    absolutePath: '/about/' + Pages.Changelog,
  },
  {
    title: 'Shadow',
    // tslint:disable-next-line: max-line-length
    description:
      'Shadow is used to make an element stand out from the surface to create depth. Choosing a shadow is up to each scenario - but the shadow should be "experienced" and should not be prominent. Elvia have a flat design, so shadow should be used carefully and only on overlays.',
    docUrl: Pages.Shadow,
    absolutePath: '/brand/' + Pages.Shadow,
    status: DocPageStatus.Done,
    type: 'Brand',
    figmaUrl: 'https://www.figma.com/file/E2yRkpqSSuRnq8RDXO4Mly/Shadow?node-id=90%3A24',
  },
  {
    title: 'Colors',
    // tslint:disable-next-line: max-line-length
    description:
      'Elvia colors are a reference for energy and light. It plays an important part to bring the concept ON/OFF to life. For consistency, you shall use the defined color palette throughout our interface.',
    docUrl: Pages.Color,
    absolutePath: '/brand/' + Pages.Color,
    status: DocPageStatus.Done,
    type: 'Brand',
    figmaUrl: 'https://www.figma.com/file/Q4bR2dykeg5bSC2VGPZRAL/Colours?node-id=0%3A1',
  },
  {
    title: 'Icons',
    // tslint:disable-next-line: max-line-length
    description: `In our icon library, you’ll find all available icons in the design system, 
    as well guides on how to use them. Missing a specific icon? Let us know on our Slack channel 
  <a class="e-link e-link--inline e-link--new-tab e-mr-8" href="https://elvia-group.slack.com/archives/C01C1DU9X1Q" target="_blank" rel="noopener">
  <span class="e-link__title">#designsystemet</span>
  <span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold" aria-hidden="true"></i></span>
</a>
   and we’ll look into adding it to the library.`,
    docUrl: Pages.Icon,
    absolutePath: '/brand/' + Pages.Icon,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/0RM10vUNKdYVlW5BuXwqQK/Icons?node-id=0%3A1',
    type: 'Brand',
  },
  {
    title: 'Layout',
    figmaUrl: 'https://www.figma.com/file/S7hXnDqBIr6VTSWJx1OQlx/Design.elvia.io?node-id=8936%3A67993',
    docUrl: 'layout',
    absolutePath: '/brand/' + 'layout',
    description:
      'Layout provides rules to give designs consistent rhythm in the application, as well as across applications to ensure a holistic design in Elvia. The layout consist of grid, spacing and box design.',
    type: 'Brand',
  },
  {
    title: 'Typography',
    // tslint:disable-next-line: max-line-length
    description:
      'Elvia has a profile font called Red Hat that should be used throughout all material. The Red Hat font family inlcudes two optical sizes: Display and Text.',
    docUrl: Pages.Typography,
    absolutePath: '/brand/' + Pages.Typography,
    status: DocPageStatus.Done,
    figmaUrl: 'https://www.figma.com/file/hvQucRpSHYZtSiIKM7NgBo/Typography?node-id=0%3A1',
    type: 'Brand',
  },
  {
    title: 'Utility Classes',
    // tslint:disable-next-line: max-line-length
    description:
      'Elvis offers several utility classes that can be applied on elements without making any extra CSS classes or modifications in your project.',
    docUrl: Pages.Utilities,
    absolutePath: '/tools/' + Pages.Utilities,
    status: DocPageStatus.Done,
    type: 'Tools',
  },
  {
    title: "What's new?",
    description: 'The latest news, updates, and changes to the design system.',
    docUrl: Pages.Changelog,
    absolutePath: '/about/' + Pages.Changelog,
  },
  {
    title: 'Contact',
    // tslint:disable-next-line: max-line-length
    description: `We at team ATOM will be happy to help you with anything. So don’t hesitate to contact us for any further information or questions. You can also find us on Slack at
    <a onclick="event.stopPropagation();" class="e-link e-link--inline e-link--new-tab" target="_blank" rel="noopener" href="https://elvia-group.slack.com/archives/C01C1DU9X1Q" >
      <span class="e-link__title">#designsystemet</span>
      <span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold" aria-hidden="true"></i></span>
    </a>`,
    docUrl: Pages.Contact,
    absolutePath: '/about/' + Pages.Contact,
    status: DocPageStatus.Done,
    type: 'About',
  },
  {
    title: 'Contribute',
    // tslint:disable-next-line: max-line-length
    description: `To contribute, or if you have any question, you can contact us on Slack:
    <a onclick="event.stopPropagation();" class="e-link e-link--inline e-link--new-tab" target="_blank" rel="noopener" href="https://elvia-group.slack.com/archives/C01C1DU9X1Q" >
      <span class="e-link__title">#designsystemet</span>
      <span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold" aria-hidden="true"></i></span>
    </a>`,
    docUrl: Pages.Contribute,
    absolutePath: '/about/' + Pages.Contribute,
    status: DocPageStatus.Done,
  },
  {
    title: 'FAQ',
    // tslint:disable-next-line: max-line-length
    description: `We try to answer the most asked questions. If you can´t find the answers you were looking for, contact us on Slack:
    <a onclick="event.stopPropagation();" class="e-link e-link--inline e-link--new-tab" target="_blank" href="https://elvia-group.slack.com/archives/C01C1DU9X1Q" >
      <span class="e-link__title">#designsystemet</span>
      <span class="e-link__icon"><i class="e-icon e-icon--new_tab-bold" aria-hidden="true"></i></span>
    </a>`,
    docUrl: Pages.Faq,
    absolutePath: '/about/' + Pages.Faq,
    status: DocPageStatus.Done,
  },
];

export function getComponent(docUrl: string): DocPage {
  return componentsDocPages.find((component) => component.docUrl === docUrl);
}
export function getDocPagesNotFromCMS(docUrl: string): DocPage {
  return docPagesNotFromCMS.find((component) => component.docUrl === docUrl);
}
