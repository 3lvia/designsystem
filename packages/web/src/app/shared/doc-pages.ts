import { DocPageName, Pages } from './shared.enum';
import { DocPage, DocPageType, HomeMenuCard } from './shared.interface';

// Used for shortcuts at home page
export const homeMenu: HomeMenuCard[] = [
  {
    title: 'Components',
    description: 'UI Library',
    docUrl: Pages.OverviewComp,
    absolutePath: '/components/',
    imageUrl: 'assets/doc-page-icons/shortcut-icons/Component.svg',
    imageUrlOn: 'assets/doc-page-icons/shortcut-icons/ComponentOn.svg',
  },
  {
    title: 'The Concept',
    description: 'Branding',
    docUrl: 'the-concept',
    absolutePath: '/brand/the-concept/',
    imageUrl: 'assets/doc-page-icons/shortcut-icons/Concept.svg',
    imageUrlOn: 'assets/doc-page-icons/shortcut-icons/ConceptOn.svg',
  },
  {
    title: 'Accessibility',
    description: 'WCAG 2.0',
    docUrl: 'accessibility',
    absolutePath: '/tools/accessibility/',
    imageUrl: 'assets/doc-page-icons/shortcut-icons/Accessibility.svg',
    imageUrlOn: 'assets/doc-page-icons/shortcut-icons/AccessibilityOn.svg',
  },
];

const docPagesComponents: DocPage[] = [
  {
    title: 'CSS Library',
    description: `The CSS library <code>@elvia/elvis</code> consists of the most basic components like links, tags and inputs as well as utilities like colors, typography, icons and logos.`,
    docUrl: Pages.CssLibrary,
    absolutePath: '/components/' + Pages.CssLibrary,
    type: 'Component',
    isMainPage: true,
    imageUrl: 'assets/doc-page-icons/components/css_library.svg',
  },
  {
    title: 'Accordion',
    description:
      'An accordion lets the user show and hide a section of content. It let us organize information and deliver a large amount of content in a small place.',
    docUrl: Pages.Accordion,
    absolutePath: '/components/' + Pages.Accordion,
    figmaUrl: 'https://www.figma.com/file/CTFyTP4zr2KuVjSXsgZO1s/Accordion?node-id=72%3A491',
    type: 'Component',
    searchTerms: ['expandable', 'disclosure', 'pocket', 'collapse'],
    relatedPages: ['button', 'groups'],
    imageUrl: 'assets/doc-page-icons/components/accordion.svg',
  },
  {
    title: 'Alert',
    description:
      'Alert should provide important messages and feedback to the user. It may be an alert message that something went wrong, to warn about something, confirmation to the user or just to inform. Alerts have different types and statuses that are customized to the different severity.',
    docUrl: Pages.Alert,
    absolutePath: '/components/' + Pages.Alert,
    figmaUrl: 'https://www.figma.com/file/rxDEfFvqhgtlUWoEbJnGQW/Alert-messages?node-id=165%3A0',
    type: 'Component',
    searchTerms: ['notifications', 'feedback', 'banner', 'flag', 'snackbar', 'message', 'confirmation'],
    relatedPages: ['toast', 'badge', 'cookies', 'validations'],
    imageUrl: 'assets/doc-page-icons/components/alert.svg',
  },
  {
    title: 'App Bridge',
    description:
      'The app bridge can be used to open the selected meteringpoint in a different Elvia application. ',
    docUrl: Pages.AppBridge,
    absolutePath: '/components/' + Pages.AppBridge,
    figmaUrl: 'https://www.figma.com/design/g0Dva16HcsfI0JUmSJY2lE/App-bridge?node-id=1-539&m=dev',
    type: 'Component',
    searchTerms: ['internal', 'application', 'link', 'open'],
    imageUrl: 'assets/doc-page-icons/components/app_bridge.svg',
  },
  {
    title: 'Autocomplete',
    description:
      'Autocomplete gives filtered suggestions when the user starts to type. Use it when there are too many options, and it is not helpful for the user to see all options at the beginning. Autocomplete guides the user by giving suggestions, but the user doesn’t necessarily have to choose one of the suggestions.',
    docUrl: Pages.Autocomplete,
    absolutePath: '/components/' + Pages.Autocomplete,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=2742%3A0',
    type: 'Component',
    searchTerms: ['predictive', 'word completion', 'combobox', 'suggest', 'filter'],
    relatedPages: ['input', 'dropdown', 'search', 'filters'],
    imageUrl: 'assets/doc-page-icons/components/autocomplete.svg',
  },
  {
    title: 'Badge',
    description:
      'A badge is a small visual indicator to communicate the status of an object, either as a numeric value or just a color. Examples of use are new notifications, unread messages or filter added.',
    docUrl: Pages.Badge,
    absolutePath: '/components/' + Pages.Badge,
    figmaUrl: 'https://www.figma.com/file/RDqaOx4hfYvZyQXtaqdkgA/Badge',
    type: 'Component',
    searchTerms: ['notification', 'mark', 'counter'],
    relatedPages: ['tag', 'chip', 'alert'],
    imageUrl: 'assets/doc-page-icons/components/badge.svg',
  },
  {
    title: 'Box',
    description:
      'Use Box to group content. Use it together with a grid and spacing to make different layouts.',
    docUrl: Pages.Box,
    absolutePath: '/components/' + Pages.Box,
    figmaUrl: 'https://www.figma.com/file/BGZQp24T3is2F2YbN8mIYO/Box?node-id=288%3A0',
    type: 'Component',
    searchTerms: ['tile'],
    relatedPages: ['card', 'popover', 'layout'],
    imageUrl: 'assets/doc-page-icons/components/box.svg',
  },
  {
    title: 'Button',
    description:
      'Button elements are used to provide a straightforward and accessible experience for users. A button element should be used whenever an action is performed by the user.',
    docUrl: Pages.Button,
    absolutePath: '/components/' + Pages.Button,
    figmaUrl: 'https://www.figma.com/file/KtmjuJ1UVpS5pLFrcZK2uJ/Buttons?node-id=0%3A1',
    type: 'Component',
    searchTerms: ['cta', 'call to action', 'click'],
    elvisClassName: 'e-btn',
    relatedPages: ['context-menu', 'toggle', 'link', 'icon'],
    imageUrl: 'assets/doc-page-icons/components/button.svg',
  },
  {
    title: 'Breadcrumb',
    description:
      'Breadcrumb is a navigation system that help the user to understand the hierarchy and navigate between levels. It is a secondary navigation scheme used in addition to the primary navigation.',
    docUrl: Pages.Breadcrumb,
    absolutePath: '/components/' + Pages.Breadcrumb,
    figmaUrl: 'https://www.figma.com/file/JNbQmeFGfn7QOybUKbSvks/Breadcrumb?node-id=3%3A2',
    type: 'Component',
    searchTerms: ['navigation', 'path'],
    relatedPages: ['link', 'header'],
    imageUrl: 'assets/doc-page-icons/components/breadcrumb.svg',
  },
  {
    title: 'Card',
    description:
      'A card presents a single topic in a collection you can choose from. The card is clickable, and the layout can vary if you have a description, image, or label.',
    docUrl: Pages.Card,
    absolutePath: '/components/' + Pages.Card,
    figmaUrl: 'https://www.figma.com/file/w0gte3tPfAypBQpdynPMcU/Card?node-id=1%3A8',
    type: 'Component',
    searchTerms: ['collection', 'tile'],
    relatedPages: ['link', 'box', 'groups'],
    imageUrl: 'assets/doc-page-icons/components/card.svg',
  },
  {
    title: 'Carousel',
    description:
      'Carousel is used when the user can navigate through a collection of related visual items, for example a collection of images. The collection should have a common theme.',
    docUrl: Pages.Carousel,
    absolutePath: '/components/' + Pages.Carousel,
    figmaUrl: 'https://www.figma.com/file/Um5AotNfUftDorJHGbIy99/Navigational-controls?node-id=1023%3A15726',
    type: 'Component',
    searchTerms: ['horizontal', 'scroll', 'viewer', 'gallery'],
    relatedPages: ['button', 'stepper', 'thumbnail', 'images'],
    imageUrl: 'assets/doc-page-icons/components/carousel.svg',
  },
  {
    title: 'Chip',
    description:
      'Chips are interactive elements that are often used when a user filters content. They provide a good overview of the options the user has chosen.',
    docUrl: Pages.Chip,
    absolutePath: '/components/' + Pages.Chip,
    figmaUrl: 'https://www.figma.com/file/dPti8DhGm7C2Rjx4IZSQFw/Chip?node-id=1%3A237',
    type: 'Component',
    searchTerms: ['legend', 'pills', 'filter'],
    relatedPages: ['badge', 'radio-filter', 'tag', 'filters'],
    imageUrl: 'assets/doc-page-icons/components/chip.svg',
  },
  {
    title: 'Checkbox',
    description:
      'Checkboxes let users select one or multiple options. It can also be used to toggle on/off when you have a single option available, for example if you want to receive a newsletter or when you have to accept terms.',
    docUrl: Pages.Checkbox,
    absolutePath: '/components/' + Pages.Checkbox,
    figmaUrl:
      'https://www.figma.com/file/JtShiDWQ0ytG8vdQRpyOES/Checkbox?type=design&node-id=0%3A1&mode=design&t=zafwsYy1PwOe4Eks-1',
    type: 'Component',
    searchTerms: ['tick', 'select', 'option', 'selection', 'multiselect'],
    relatedPages: ['radiobutton', 'toggle', 'filters', 'forms'],
    imageUrl: 'assets/doc-page-icons/components/checkbox.svg',
  },
  {
    title: 'Content Loader',
    description:
      'A content loader is used to indicate loading content in a way that gives users a perception of a faster loading time. Each component is shown in its animated block state, hinting the overall page structure, until its possible to replace the blocks with real content.',
    docUrl: Pages.ContentLoader,
    absolutePath: '/components/' + Pages.ContentLoader,
    figmaUrl: 'https://www.figma.com/file/gZpJ1gY3wXM06X04j1r2RR/Loading-%26-scroll?node-id=9%3A0',
    type: 'Component',
    searchTerms: ['placeholder', 'skeleton', 'loading', 'shimmer', 'loader'],
    relatedPages: ['progressbar', 'illustration', 'empty-states'],
    imageUrl: 'assets/doc-page-icons/components/content_loader.svg',
  },
  {
    title: 'Context Menu',
    description:
      'A list of actions in a popover that often are used together with a more-menu icon button. This can be used when the space is limited or when you want to group actions. The context menu closes immediately after selecting action or clicking outside.',
    docUrl: Pages.ContextMenu,
    absolutePath: '/components/' + Pages.ContextMenu,
    figmaUrl:
      'https://www.figma.com/file/GIl5R2y3TWNwlyknvgwTZF/Context-menu?type=design&node-id=1%3A8&mode=design&t=WbrogSojhhPTUfBq-1',
    type: 'Component',
    searchTerms: ['menu', 'popup', 'more', 'actions'],
    relatedPages: ['button', 'popover', 'icon'],
    imageUrl: 'assets/doc-page-icons/components/context_menu.svg',
  },
  {
    title: 'Datepicker',
    description:
      'Datepicker is a simple way for the user to quickly select a date in a calendar dialog. It uses a text field and a visual calendar in a popover.',
    docUrl: Pages.Datepicker,
    absolutePath: '/components/' + Pages.Datepicker,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=4456%3A0',
    type: 'Component',
    searchTerms: ['calendar', 'date', 'time', 'input'],
    relatedPages: ['datepicker-range', 'timepicker', 'forms', 'filters'],
    imageUrl: 'assets/doc-page-icons/components/datepicker.svg',
  },
  {
    title: 'Datepicker Range',
    description:
      'Datepicker range is a simple way for the user to quickly select a date range in a calendar dialog. It uses two separate date pickers for the start and end date selection.',
    docUrl: Pages.DatepickerRange,
    absolutePath: '/components/' + Pages.DatepickerRange,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=4456%3A0',
    type: 'Component',
    searchTerms: ['calendar', 'date', 'time', 'input'],
    relatedPages: ['timepicker', 'datepicker', 'forms', 'filters'],
    imageUrl: 'assets/doc-page-icons/components/datepicker_range.svg',
  },
  {
    title: 'Drag & Drop',
    description: `Drag & Drop is typically used in <a class="e-link e-link--inline" href="/components/${Pages.FileUpload}">File Upload</a> to show content area.`,
    docUrl: Pages.DragAndDrop,
    absolutePath: '/components/' + Pages.DragAndDrop,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1811%3A1080',
    type: 'Component',
    searchTerms: ['file', 'upload'],
    elvisClassName: 'e-dragdrop',
    relatedPages: ['file-upload', 'forms', 'groups'],
    imageUrl: 'assets/doc-page-icons/components/drag_and_drop.svg',
  },
  {
    title: 'Divider',
    description: 'Dividers are used to group or section off content.',
    docUrl: Pages.Divider,
    absolutePath: '/components/' + Pages.Divider,
    figmaUrl: 'https://www.figma.com/file/F4ycCcM9cGf9T12EhzbN3F/Dividers?node-id=1%3A2',
    type: 'Component',
    searchTerms: ['line', 'separator', 'section', 'hr', 'br'],
    relatedPages: ['layout', 'groups'],
    imageUrl: 'assets/doc-page-icons/components/divider.svg',
  },
  {
    title: 'Dropdown',
    description:
      'Dropdown presents a list of options the user can select from and can be used to submit data, filter, in a menu and so on. You can select one or multiple options. If you have too many options consider using autocomplete instead.',
    docUrl: Pages.Dropdown,
    absolutePath: '/components/' + Pages.Dropdown,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1285%3A842',
    type: 'Component',
    searchTerms: ['select', 'option', 'multiselect', 'pull-down', 'combobox'],
    relatedPages: ['autocomplete', 'radiobutton', 'forms'],
    imageUrl: 'assets/doc-page-icons/components/dropdown.svg',
  },
  {
    title: 'File Upload',
    description: 'Upload files through a file input element or a placeholder area.',
    docUrl: Pages.FileUpload,
    absolutePath: '/components/' + Pages.FileUpload,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1404%3A132',
    type: 'Component',
    searchTerms: ['file', 'upload'],
    elvisClassName: 'e-fileupload',
    relatedPages: ['drag-and-drop', 'thumbnail', 'forms', 'groups'],
    imageUrl: 'assets/doc-page-icons/components/file_upload.svg',
  },
  {
    title: 'Header',
    description:
      'Headers are used for navigation on the website and should be displayed at the top of the page.',
    docUrl: Pages.Header,
    absolutePath: '/components/' + Pages.Header,
    figmaUrl: 'https://www.figma.com/file/QRhfgr0sd9MPmACos1xDNT/Header?node-id=230%3A604',
    type: 'Component',
    searchTerms: ['navigation', 'menu', 'top', 'bar', 'logo', 'title', 'toolbar', 'sidebar', 'topbar'],
    relatedPages: ['breadcrumb', 'link', 'onboarding'],
    imageUrl: 'assets/doc-page-icons/components/header.svg',
  },
  {
    title: 'Text Field',
    description: 'Text fields are input boxes the user can type text or number into in a structured format.',
    docUrl: Pages.Input,
    absolutePath: '/components/' + Pages.Input,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=1262%3A486',
    type: 'Component',
    searchTerms: ['input', 'text', 'number', 'email', 'password', 'textarea'],
    relatedPages: ['dropdown', 'autocomplete', 'comments', 'forms'],
    imageUrl: 'assets/doc-page-icons/components/input.svg',
  },
  {
    title: 'Tag',
    description:
      'Tags are used to label, tag, categorize or organize items using keywords that describe them. They can also be used to show the status of an item.',
    docUrl: Pages.Tag,
    absolutePath: '/components/' + Pages.Tag,
    figmaUrl: 'https://www.figma.com/file/B898GK3p5YqOj4cMBztM37/Labels-%26-chips?node-id=136%3A1738',
    type: 'Component',
    searchTerms: ['label', 'lozenge', 'status', 'ribbon', 'category', 'categorize', 'organize'],
    relatedPages: ['chip', 'badge', 'graph'],
    imageUrl: 'assets/doc-page-icons/components/tag.svg',
  },
  {
    title: 'Link',
    description:
      'Links are navigational elements that take the user to a new page or context. Links can be used alone or inline with text.',
    docUrl: Pages.Link,
    absolutePath: '/components/' + Pages.Link,
    figmaUrl: 'https://www.figma.com/file/sgrg5TId3ewAFznKBFh2Wb/Links?node-id=1%3A10',
    type: 'Component',
    searchTerms: ['anchor', 'url', 'href', 'navigate', 'navigation', 'click'],
    relatedPages: ['breadcrumb', 'card', 'header', 'groups'],
    imageUrl: 'assets/doc-page-icons/components/link.svg',
  },
  {
    title: 'List',
    description:
      'Lists are related content grouped vertically. We have different types of lists to suit different needs; bullet, numbered and icon. Lists should usually inherit the typography from the text surrounding the list. See <a class="e-link e-link--inline" href="/patterns/groups">patterns</a> for list or group design patterns.',
    docUrl: Pages.List,
    absolutePath: '/components/' + Pages.List,
    figmaUrl: 'https://www.figma.com/file/uT9r54Z9NP5JQXxRvZ4LBV/Lists?node-id=353%3A0',
    type: 'Component',
    searchTerms: ['bullet', 'numbered', 'unordered', 'ordered', 'ul', 'ol', 'li'],
    relatedPages: ['icon', 'groups'],
    imageUrl: 'assets/doc-page-icons/components/list.svg',
  },
  {
    title: 'Modal',
    description:
      'Modal is a dialog that displays critical information to the user in a layer above the content. The user is blocked from the main page and are asked to decide from several actions before they can continue to their previous workflow. They can dismiss by clicking cancel or outside the dialog window. Modals interrupt the user flow so use them sparingly.',
    docUrl: Pages.Modal,
    absolutePath: '/components/' + Pages.Modal,
    figmaUrl: 'https://www.figma.com/file/unlDZ5F7svra9dPNKYdTK9/Modal?node-id=2%3A0',
    type: 'Component',
    searchTerms: ['dialog', 'popup', 'confirm', 'prompt', 'window', 'layer', 'overlay'],
    relatedPages: ['popover', 'context-menu', 'tooltip'],
    imageUrl: 'assets/doc-page-icons/components/modal.svg',
  },
  {
    title: 'Outline',
    description:
      'Outline is an accessibility-oriented component that can be used to show an animated keyboard outline. The outline is placed at a new stacking context in the browser, meaning that it will not suffer from the usual outline issues, such as being clipped when used inside a scroll container.',
    docUrl: Pages.Outline,
    absolutePath: '/components/' + Pages.Outline,
    type: 'Component',
    searchTerms: ['keyboard', 'focus', 'accessibility', 'a11y', 'outline', 'focus-visible'],
    relatedPages: ['accessibility'],
    imageUrl: 'assets/doc-page-icons/components/outline.svg',
  },
  {
    title: 'Pagination',
    description:
      'Pagination provides navigation to the page, by splitting content across pages and linking to them at the bottom of the page. This way the user is given a sense of control by being able to estimate the size of the data set as well as how much time it will take for them to find the information they’re looking for.',
    docUrl: Pages.Pagination,
    absolutePath: '/components/' + Pages.Pagination,
    figmaUrl: 'https://www.figma.com/file/XCqUxqWe47Tu0x52JYEbsX/Pagination?node-id=0%3A1',
    type: 'Component',
    searchTerms: ['page', 'navigation', 'next', 'previous'],
    relatedPages: ['table', 'stepper', 'accordion'],
    imageUrl: 'assets/doc-page-icons/components/pagination.svg',
  },
  {
    title: 'Popover',
    description:
      'A popover is a non-modal dialog that appears above the content on the screen without losing the context of their original view. It can contain rich data such as text, selection controls, and buttons. A popover is used with a clickable trigger element and should position itself relative to where there is free space on the screen.',
    docUrl: Pages.Popover,
    absolutePath: '/components/' + Pages.Popover,
    figmaUrl: 'https://www.figma.com/file/9dvKKozGL4AEU0mSkN40Ul/Popover?node-id=1%3A10',
    type: 'Component',
    searchTerms: [
      'dialog',
      'popup',
      'confirm',
      'prompt',
      'window',
      'layer',
      'overlay',
      'overflow',
      'callout',
    ],
    relatedPages: ['modal', 'context-menu', 'tooltip'],
    imageUrl: 'assets/doc-page-icons/components/popover.svg',
  },
  {
    title: 'Progressbar',
    description: `Graphical indication of the progress of an operation.`,
    docUrl: Pages.Progressbar,
    absolutePath: '/components/' + Pages.Progressbar,
    figmaUrl:
      'https://www.figma.com/file/gZpJ1gY3wXM06X04j1r2RR/Loading-%26-progressbar?type=design&node-id=1%3A2&mode=design&t=KjDad1dKaKmUmwj4-1',
    type: 'Component',
    searchTerms: [
      'spinner',
      'loading',
      'progress',
      'bar',
      'line',
      'percentage',
      'percent',
      'status',
      'meter',
    ],
    relatedPages: ['content-loader', 'file-upload', 'empty-states'],
    imageUrl: 'assets/doc-page-icons/components/progressbar.svg',
  },
  {
    title: 'Radio Button',
    description:
      'Radio buttons should be used if the user can only choose one option. One option is always selected by default. The options should be listed in a logical order and have between two and five options in total.',
    docUrl: Pages.Radiobutton,
    absolutePath: '/components/' + Pages.Radiobutton,
    figmaUrl:
      'https://www.figma.com/file/Z7TZlvhDrcRDx1bcH441E0/Radio-button?type=design&node-id=0%3A1&mode=design&t=36kEpOhRdqzP1OX3-1',
    type: 'Component',
    searchTerms: ['choice', 'option', 'select', 'toggle'],
    elvisClassName: 'e-radio',
    relatedPages: ['checkbox', 'dropdown', 'forms', 'filters'],
    imageUrl: 'assets/doc-page-icons/components/radio_button.svg',
  },
  {
    title: 'Radio Filter',
    description:
      'Radio filters are buttons you can toggle between to filter out different properties of same content. It should always be an “all" option (shows all content) in radio filter.',
    docUrl: Pages.RadioFilter,
    absolutePath: '/components/' + Pages.RadioFilter,
    figmaUrl:
      'https://www.figma.com/file/8OZU7mSBLPpEzwtV0QRDoG/Radio-filter?type=design&node-id=0%3A1&mode=design&t=JASWYeK1lpA2hl1D-1',
    type: 'Component',
    searchTerms: ['choice', 'option', 'select', 'filter'],
    relatedPages: ['segmented-control', 'chip', 'forms', 'filters'],
    imageUrl: 'assets/doc-page-icons/components/radio_filter.svg',
  },
  {
    title: 'Search',
    description:
      'Search allows the user to find specific information by search terms as an alternative to the main navigation menu. Search results can either be displayed when the user presses the button or by instant search, where the results appear as you type.',
    docUrl: Pages.Search,
    absolutePath: '/components/' + Pages.Search,

    figmaUrl: 'https://www.figma.com/file/Yz09cKdXxOvfP0KP7AkTI7/Search?node-id=1%3A2',
    type: 'Component',
    searchTerms: ['find', 'filter'],
    relatedPages: ['autocomplete', 'forms', 'filters', 'empty-states'],
    imageUrl: 'assets/doc-page-icons/components/search.svg',
  },
  {
    title: 'Segmented Control',
    description:
      'Segmented controls are a horizontal set of two or three segments to display different views of same content, each of which functions as a mutually exclusive button.',
    docUrl: Pages.SegmentedControl,
    absolutePath: '/components/' + Pages.SegmentedControl,
    figmaUrl: 'https://www.figma.com/file/3J7QnNCnYx1tTi2h7tVStm/Selection-controls?node-id=1%3A436',
    type: 'Component',
    searchTerms: ['content switch', 'choice', 'option', 'select', 'filter'],
    relatedPages: ['radio-filter', 'tabs', 'radiobutton', 'filters'],
    imageUrl: 'assets/doc-page-icons/components/segmented_control.svg',
  },
  {
    title: 'Slider',
    description:
      'A slider allows users to adjust the value by moving a handle along a track. It can be used as a visual tool in addition to a numeric input where the user can type exact value.',
    docUrl: Pages.Slider,
    absolutePath: '/components/' + Pages.Slider,
    figmaUrl: 'https://www.figma.com/file/Bpc4gmpy4T4eeWm51X5UmJ/Slider?node-id=0%3A1',
    type: 'Component',
    searchTerms: ['range', 'input', 'adjust', 'value', 'number', 'handle', 'track'],
    relatedPages: ['input', 'radiobutton', 'forms'],
    imageUrl: 'assets/doc-page-icons/components/slider.svg',
  },
  {
    title: 'Spotlight',
    description:
      'Spotlight is used to highlight a specific selection of a page, often used together with an information box.',
    docUrl: Pages.Spotlight,
    absolutePath: '/components/' + Pages.Spotlight,
    figmaUrl: 'https://www.figma.com/file/rpflFlBIv4c5TNKLXJLktG/?node-id=2%3A8',
    type: 'Component',
    searchTerms: ['highlight', 'focus'],
    relatedPages: ['box', 'onboarding', 'illustration'],
    imageUrl: 'assets/doc-page-icons/components/spotlight.svg',
  },
  {
    title: 'Stepper',
    description:
      'Steppers provide users with an overview of a process and helps them keep track of progress. The stepper can be normal or forced. A normal stepper enables full navigation through the steps - typically useful in long processes, while a forced stepper should be used if any step has to be completed before advancing to the next - typically in short processes.',
    docUrl: Pages.Stepper,
    absolutePath: '/components/' + Pages.Stepper,
    figmaUrl: 'https://www.figma.com/file/x8ae3TPZemAkxtjSS2JI7x/Stepper?node-id=0-1&t=0oTWvsI5AMzfMr8Q-0',
    type: 'Component',
    searchTerms: ['steps', 'progress', 'process'],
    relatedPages: ['carousel', 'pagination', 'tabs', 'forms'],
    imageUrl: 'assets/doc-page-icons/components/stepper.svg',
  },
  {
    title: 'Tabs',
    description:
      'Tabs are used to divide content into sections and let the user navigate between one section at a time. Use tabs when the content is at the same level of the hierarchy and are related. It should always be one tab selected by default.',
    docUrl: Pages.Tabs,
    absolutePath: '/components/' + Pages.Tabs,
    figmaUrl: 'https://www.figma.com/file/v0KlQT8eAWiNN1ORHsmNjt/Tabs?node-id=1%3A72',
    type: 'Component',
    searchTerms: ['pivot', 'choice', 'option', 'view', 'filter'],
    relatedPages: ['segmented-control', 'radio-filter', 'stepper'],
    imageUrl: 'assets/doc-page-icons/components/tabs.svg',
  },
  {
    title: 'Table',
    description:
      ' A table displays rows and columns with data and makes it efficient to look up and compare values. Text should be left aligned in the columns and numbers should be right aligned.',
    docUrl: Pages.Table,
    absolutePath: '/components/' + Pages.Table,
    figmaUrl: 'https://www.figma.com/file/gh5MaG2NWKVODTk1p3cO6s/Tables?node-id=3%3A292',
    type: 'Component',
    searchTerms: ['data', 'row', 'column', 'th', 'td', 'tr', 'tbody', 'thead', 'tfoot'],
    relatedPages: ['pagination', 'chip', 'filters', 'graph'],
    imageUrl: 'assets/doc-page-icons/components/table.svg',
  },
  {
    title: 'Toggle',
    description:
      'Toggle button allows the user to switch between to states (on/off) and have always a default state. Toggle takes effect immediately.',
    docUrl: Pages.Toggle,
    absolutePath: '/components/' + Pages.Toggle,
    figmaUrl:
      'https://www.figma.com/file/8c1uZpEVnz2FHsCeQM3fVV/Toggle?type=design&node-id=0%3A1&mode=design&t=YPjADCj8T64UhBbq-1',
    type: 'Component',
    searchTerms: ['switch', 'on', 'off', 'option', 'state', 'radio', 'lever'],
    relatedPages: ['checkbox', 'radiobutton', 'segmented-control', 'forms'],
    imageUrl: 'assets/doc-page-icons/components/toggle.svg',
  },
  {
    title: 'Timepicker',
    description:
      'The timepicker is a simple way for the user to quickly select the time through a text field and a visual dropdown. The user can input the time manually or click on the clock icon to choose the hour and if needed, a preset interval of minutes.',
    docUrl: Pages.Timepicker,
    absolutePath: '/components/' + Pages.Timepicker,
    figmaUrl: 'https://www.figma.com/file/0hCktnFvRvSHVDntaaOSEu/Inputs?node-id=4456%3A0',
    type: 'Component',
    searchTerms: ['clock', 'hour', 'minute', 'interval', 'duration', 'period', 'input'],
    relatedPages: ['datepicker', 'datepicker-range', 'popover', 'forms'],
    imageUrl: 'assets/doc-page-icons/components/timepicker.svg',
  },
  {
    title: 'Thumbnail',
    description:
      'Thumbnail is a small preview of an image. A clickable thumbnail can be used to navigate through a collection of images. Choose the image you want to see in larger version, instead of scrolling chronologically with an arrow.',
    docUrl: Pages.Thumbnail,
    absolutePath: '/components/' + Pages.Thumbnail,
    figmaUrl: 'https://www.figma.com/file/cIyfnYdCJ6Nlj5fLVi245M/Thumbnail?node-id=11%3A30',
    type: 'Component',
    searchTerms: ['image', 'preview', 'picture', 'photo', 'gallery'],
    relatedPages: ['carousel', 'file-upload', 'images'],
    imageUrl: 'assets/doc-page-icons/components/thumbnail.svg',
  },
  {
    title: 'Toast',
    description:
      'Toast alert should be used to provide short and simple feedback after a user action (positive or informative). Toast appear in the top right corner, above the content, and disappears after 7 seconds by default. On mobile, the toast will show at the bottom center.',
    docUrl: Pages.Toast,
    absolutePath: '/components/' + Pages.Toast,
    figmaUrl: 'https://www.figma.com/file/rxDEfFvqhgtlUWoEbJnGQW/Alert-message?t=lWHxCnNZBJatqKnV-0',
    type: 'Component',
    searchTerms: ['notifications', 'feedback', 'flag', 'snackbar', 'message', 'confirmation'],
    relatedPages: ['alert', 'popover'],
    imageUrl: 'assets/doc-page-icons/components/toast.svg',
  },
  {
    title: 'Tooltip',
    description:
      'Tooltip is a light popover for showing additional information upon hover or focus. Keep tooltips short.',
    docUrl: Pages.Tooltip,
    absolutePath: '/components/' + Pages.Tooltip,
    figmaUrl: 'https://www.figma.com/file/kisdszIRwlezU3B4ZYRjfG/Tooltip?node-id=1%3A10',
    type: 'Component',
    searchTerms: ['info', 'infotip', 'help', 'hint', 'popup'],
    relatedPages: ['popover', 'icon', 'button'],
    imageUrl: 'assets/doc-page-icons/components/tooltip.svg',
  },
];

// About pages (FERDIG)
const docPagesAbout: DocPage[] = [
  {
    title: 'Get started',
    titleNo: 'Kom i gang',
    description: `We are an open-source design system to be used for Elvia’s external and internal systems to provide a
    comprehensive and user-friendly experience. We offer classes, variables and components, as well as tools
    like accessibility guidelines and design principles.`,
    docUrl: Pages.GetStarted,
    absolutePath: '/about/' + Pages.GetStarted,
    type: 'About',
    isMainPage: true,
    imageUrl: 'assets/doc-page-icons/about/get_started.svg',
  },
  {
    title: 'Contact',
    titleNo: 'Kontakt',
    description: `Currently, no dedicated team is working on the design system. If you have any questions, please use our Slack channel <a class="e-link e-link--inline e-link--new-tab" target="_blank" rel="noopener" href="https://elvia-group.slack.com/archives/C01C1DU9X1Q" >
    <span class="e-link__title">#designsystemet</span>
    </a> or contact Tom Schrier.`,
    docUrl: Pages.Contact,
    absolutePath: '/about/' + Pages.Contact,
    type: 'About',
    imageUrl: 'assets/doc-page-icons/about/contact.svg',
  },
  {
    title: 'The Design System',
    titleNo: 'Designsystemet',
    description:
      'Elvia’s design system – Elvis – is a scalable system of visual language, components, and design assets that enables us to work together towards an ultimate brand experience.',
    docUrl: Pages.TheDesignSystem,
    absolutePath: '/about/' + Pages.TheDesignSystem,
    type: 'About',
    imageUrl: 'assets/doc-page-icons/about/the_design_system.svg',
  },
  {
    title: 'Tutorial',
    description: `This guide assumes you’ve set up a project using one of the approved <a class="e-link e-link--inline e-link--new-tab" target="_blank" rel="noopener" href="https://elvia.atlassian.net/wiki/spaces/Utviklerhandbok/pages/964985018/Approved+programming+languages" >
        <span class="e-link__title">frameworks</span>
        <span class="e-link__icon"><e-icon name="newTabBold"></e-icon></span>
      </a>. You may want to check that your packages are up to date.`,
    docUrl: Pages.Tutorial,
    absolutePath: '/about/' + Pages.Tutorial,
    type: 'About',
    imageUrl: 'assets/doc-page-icons/about/tutorial.svg',
  },
  {
    title: 'FAQ',
    titleNo: 'Vanlige spørsmål',
    description:
      'We try to answer the most asked questions. If you can’t find the answers you were looking for, contact us on Slack.',
    docUrl: Pages.Faq,
    absolutePath: '/about/' + Pages.Faq,
    type: 'About',
    imageUrl: 'assets/doc-page-icons/about/faq.svg',
  },
];

// Brand pages
const docPagesBrand: DocPage[] = [
  {
    title: 'The Concept',
    docUrl: Pages.TheConcept,
    absolutePath: '/brand/' + Pages.TheConcept,
    type: 'Brand',
    isMainPage: true,
    imageUrl: 'assets/doc-page-icons/brand/the_concept.svg',
  },
  {
    title: 'Colors',
    docUrl: Pages.Color,
    absolutePath: '/brand/' + Pages.Color,
    type: 'Brand',
    imageUrl: 'assets/doc-page-icons/brand/colors.svg',
  },
  {
    title: 'Icons',
    docUrl: Pages.Icon,
    absolutePath: '/brand/' + Pages.Icon,
    type: 'Brand',
    imageUrl: 'assets/doc-page-icons/brand/icons.svg',
  },
  {
    title: 'Images',
    docUrl: Pages.Images,
    absolutePath: '/brand/' + Pages.Images,
    type: 'Brand',
    imageUrl: 'assets/doc-page-icons/brand/images.svg',
  },
  {
    title: 'Layout',
    docUrl: Pages.Layout,
    absolutePath: '/brand/' + Pages.Layout,
    type: 'Brand',
    imageUrl: 'assets/doc-page-icons/brand/layout.svg',
  },
  {
    title: 'Logo',
    docUrl: Pages.Logo,
    absolutePath: '/brand/' + Pages.Logo,
    type: 'Brand',
    imageUrl: 'assets/doc-page-icons/brand/logo.svg',
  },
  {
    title: 'Tone of Voice',
    docUrl: Pages.ToneOfVoice,
    absolutePath: '/brand/' + Pages.ToneOfVoice,
    type: 'Brand',
    imageUrl: 'assets/doc-page-icons/brand/tone_of_voice.svg',
  },
  {
    title: 'Typography',
    docUrl: Pages.Typography,
    absolutePath: '/brand/' + Pages.Typography,
    type: 'Brand',
    imageUrl: 'assets/doc-page-icons/brand/typography.svg',
  },
  {
    title: 'Illustrations',
    titleNo: 'Illustrasjoner',
    docUrl: Pages.Illustration,
    absolutePath: '/brand/' + Pages.Illustration,
    type: 'Brand',
    imageUrl: 'assets/doc-page-icons/brand/illustrations.svg',
  },
  {
    title: 'Shadow',
    titleNo: 'Skygge',
    description:
      'Shadow is used to make an element stand out from the surface to create depth. Choosing a shadow is up to each scenario - but the shadow should be "experienced" and should not be prominent.',
    descriptionNo:
      'Skygge brukes til å få et element til å skille seg ut fra overflaten for å skape dybde. Valg av skygge er opp til hvert scenario – men skyggen skal "oppleves" og bør ikke være fremtredende.',
    docUrl: Pages.Shadow,
    absolutePath: '/brand/' + Pages.Shadow,
    type: 'Brand',
    figmaUrl: 'https://www.figma.com/file/E2yRkpqSSuRnq8RDXO4Mly/Shadow?node-id=90%3A24',
    imageUrl: 'assets/doc-page-icons/brand/shadow.svg',
  },
];

// Pattern pages
const docPagesPattern: DocPage[] = [
  {
    title: 'Comments',
    description:
      'With a comment, users can leave notes for themselves or others. The comment is linked to your profile with date and time stamp.',
    docUrl: Pages.Comments,
    absolutePath: '/patterns/' + Pages.Comments,
    type: 'Patterns',
    figmaUrl: 'https://www.figma.com/file/vzIO9S7owUHPlDYpWKRaWW/?node-id=514%3A19826',
    imageUrl: 'assets/doc-page-icons/patterns/comments.svg',
  },
  {
    title: 'Cookies',
    description:
      'Web cookies are data files we can use to keep track of visitors’ preferences or identities, but we have to ask for consent to be able to use them.',
    docUrl: Pages.Cookies,
    absolutePath: '/patterns/' + Pages.Cookies,
    type: 'Patterns',
    figmaUrl: 'https://www.figma.com/file/vzIO9S7owUHPlDYpWKRaWW/?node-id=259%3A4034',
    imageUrl: 'assets/doc-page-icons/patterns/cookies.svg',
  },
  {
    title: 'Empty States',
    docUrl: Pages.EmptyStates,
    absolutePath: '/patterns/' + Pages.EmptyStates,
    type: 'Patterns',
    imageUrl: 'assets/doc-page-icons/patterns/empty_states.svg',
  },
  {
    title: 'Filters',
    docUrl: Pages.Filters,
    absolutePath: '/patterns/' + Pages.Filters,
    type: 'Patterns',
    imageUrl: 'assets/doc-page-icons/patterns/filters.svg',
  },
  {
    title: 'Forms',
    docUrl: Pages.Forms,
    absolutePath: '/patterns/' + Pages.Forms,
    type: 'Patterns',
    imageUrl: 'assets/doc-page-icons/patterns/forms.svg',
  },
  {
    title: 'Graph',
    docUrl: Pages.Graph,
    absolutePath: '/patterns/' + Pages.Graph,
    type: 'Patterns',
    imageUrl: 'assets/doc-page-icons/patterns/graph.svg',
  },
  {
    title: 'Groups',
    docUrl: Pages.Groups,
    absolutePath: '/patterns/' + Pages.Groups,
    type: 'Patterns',
    imageUrl: 'assets/doc-page-icons/patterns/groups.svg',
  },
  {
    title: 'Onboarding',
    docUrl: Pages.Onboarding,
    absolutePath: '/patterns/' + Pages.Onboarding,
    type: 'Patterns',
    imageUrl: 'assets/doc-page-icons/patterns/onboarding.svg',
  },
  {
    title: 'Validations',
    docUrl: Pages.Validations,
    absolutePath: '/patterns/' + Pages.Validations,
    type: 'Patterns',
    imageUrl: 'assets/doc-page-icons/patterns/validations.svg',
  },
];

// Tools
const docPagesTools: DocPage[] = [
  {
    title: 'Accessibility',
    titleNo: 'Tilgjengelighet',
    description:
      'We design inclusive solutions that ensure all users, regardless of permanent, temporary, or situational disabilities, can fully engage with the user experience.',
    docUrl: Pages.Accessibility,
    absolutePath: '/tools/' + Pages.Accessibility,
    type: 'Tools',
    imageUrl: `assets/doc-page-icons/tools/accessibility.svg`,
  },
  {
    title: 'Design Process',
    titleNo: 'Designprosess',
    description:
      'In Elvia, we strive towards working after the Double diamond design process and its four stages: discover, define, develop and deliver. We do this to make sure that we deliver solutions well suited for our end users.',
    descriptionNo:
      'Elvia utvikler interne systemer som brukes av ansatte og løsninger som brukes av eksterne som leverandører, bedrifter og privatkunder. Vi leverer også tjenester relatert til det å bygge ut, drifte og vedlikeholde strømnettet. Når vi utvikler systemer og tjenester etterstreber vi å bruke designprosess der det gir mening.',
    docUrl: Pages.DesignProcess,
    absolutePath: '/tools/' + Pages.DesignProcess,
    type: 'Tools',
    imageUrl: 'assets/doc-page-icons/tools/design_process.svg',
  },
  {
    title: 'Evaluation',
    description:
      'Evaluation is the method of analyzing your results and making the best selections through unbiased appraisal. Use an evaluation method when you already have a set of ideas to choose from.',
    docUrl: Pages.Evaluation,
    absolutePath: '/tools/' + Pages.Evaluation,
    type: 'Tools',
    imageUrl: 'assets/doc-page-icons/tools/evaluation.svg',
  },
  {
    title: 'Icebreakers',
    description:
      'Icebreakers are warm-up exercises that can help group participants get to know each other, spark innovation for workshops or meetings, or just get everyone talking.',
    docUrl: Pages.Icebreakers,
    absolutePath: '/tools/' + Pages.Icebreakers,
    type: 'Tools',
    imageUrl: 'assets/doc-page-icons/tools/icebreakers.svg',
  },
  {
    title: 'Ideation',
    description:
      'Ideation is the creative process of finding new ideas and various solutions to a problem by thinking wide. Before starting generating ideas, some sort of problem statement should be in place.',
    docUrl: Pages.Ideation,
    absolutePath: '/tools/' + Pages.Ideation,
    type: 'Tools',
    imageUrl: 'assets/doc-page-icons/tools/ideation.svg',
  },
  {
    title: 'Personas',
    description:
      'Using personas helps us to ensure quality in our solutions by making it easier to relate and empathize to users and their needs.',
    docUrl: Pages.Personas,
    absolutePath: '/tools/' + Pages.Personas,
    type: 'Tools',
    imageUrl: 'assets/doc-page-icons/tools/personas.svg',
  },
  {
    title: 'Team symbol',
    description:
      "Team symbols are like secret badges meant just for us within Elvia. They are meant to help show off the team's unique identity. This generator will help you create a personalized symbol for your team.",
    docUrl: Pages.TeamSymbol,
    absolutePath: '/tools/' + Pages.TeamSymbol,
    type: 'Tools',
    imageUrl: 'assets/doc-page-icons/tools/team_symbol.svg',
  },
  {
    title: 'Templates',
    description:
      'Here you can find a collection of Elvia’s templates. These are maintained and updated regularly.',
    docUrl: Pages.Templates,
    absolutePath: '/tools/' + Pages.Templates,
    type: 'Tools',
    imageUrl: 'assets/doc-page-icons/tools/templates.svg',
  },
  {
    title: 'User Feedback',
    description:
      'There’s a number of tools we use recurrently to analyze behaviour and test our solutions on real users. Whether it’s for user research or testing solutions, we have summarized a list of the most popular tools in Elvia below.',
    docUrl: Pages.UserFeedback,
    absolutePath: '/tools/' + Pages.UserFeedback,
    type: 'Tools',
    imageUrl: 'assets/doc-page-icons/tools/user_feedback.svg',
  },
  {
    title: 'Utility Classes',
    description:
      'Elvis offers utility classes that can be applied to elements without making extra CSS classes or modifications in your project.',
    docUrl: Pages.UtilityClasses,
    absolutePath: '/tools/' + Pages.UtilityClasses,
    type: 'Tools',
    imageUrl: 'assets/doc-page-icons/tools/utility_classes.svg',
  },
];

export const allDocPages: DocPage[] = [
  ...docPagesComponents,
  ...docPagesAbout,
  ...docPagesBrand,
  ...docPagesPattern,
  ...docPagesTools,
];

export function getDocPage(docUrl: DocPageName) {
  const page = allDocPages.find((page) => page.docUrl === docUrl);
  if (!page) {
    throw new Error(`Page not found: '${docUrl}'`);
  }
  return page;
}

export function getDocPagesByType(type: DocPageType) {
  const pages = allDocPages.filter((page) => page.type === type);
  if (!pages.length) {
    throw new Error(`Pages not found for type: '${type}'`);
  }
  return pages;
}
