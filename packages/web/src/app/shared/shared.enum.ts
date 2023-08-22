export enum DocPageStatus {
  Coming = 'Coming',
  Done = 'Done',
  Ignore = 'Ignore',
  Progress = 'In progress',
}

export enum Pages {
  // Home
  Index = '',
  Home = 'home',

  // Component Pages
  Accordion = 'accordion',
  Alert = 'alert',
  Autocomplete = 'autocomplete',
  Badge = 'badge',
  Box = 'box',
  Breadcrumb = 'breadcrumb',
  Button = 'button',
  Card = 'card',
  Carousel = 'carousel',
  Checkbox = 'checkbox',
  Chip = 'chip',
  ComponentsStart = 'components',
  ContentLoader = 'content-loader',
  ContextMenu = 'context-menu',
  Datepicker = 'datepicker',
  DatepickerRange = 'datepicker-range',
  Divider = 'divider',
  DragAndDrop = 'drag-and-drop',
  Dropdown = 'dropdown',
  FileUpload = 'file-upload',
  Header = 'header',
  Input = 'input',
  Link = 'link',
  List = 'list',
  Modal = 'modal',
  Outline = 'outline',
  OverviewComp = 'overview-comp',
  Pagination = 'pagination',
  Popover = 'popover',
  Progressbar = 'progressbar',
  RadioFilter = 'radio-filter',
  Radiobutton = 'radiobutton',
  Search = 'search',
  SegmentedControl = 'segmented-control',
  Slider = 'slider',
  Spotlight = 'spotlight',
  Stepper = 'stepper',
  Table = 'table',
  Tabs = 'tabs',
  Tag = 'tag',
  Thumbnail = 'thumbnail',
  Timepicker = 'timepicker',
  Toast = 'toast',
  Toggle = 'toggle',
  Tooltip = 'tooltip',

  // Pages not from CMS
  Changelog = 'whats-new',
  Contact = 'contact',
  Contribute = 'contribute',
  Faq = 'faq',
  GetStarted = 'get-started',
  Shadow = 'shadow',
  TheDesignSystem = 'the-design-system',
  Utilities = 'utility-classes',

  // Brand pages
  TheConcept = 'the-concept',
  Color = 'color',
  Icon = 'icon',
  Images = 'images',
  Layout = 'layout',
  Logo = 'logo',
  ToneOfVoice = 'tone-of-voice',
  Typography = 'typography',
  Illustration = 'illustration',

  // Pattern pages
  Comments = 'comments',
  Cookies = 'cookies',
  EmptyStates = 'empty-states',
  Filters = 'filters',
  Forms = 'forms',
  Groups = 'groups',
  Onboarding = 'onboarding',
  Validations = 'validations',

  Accessibility = 'accessibility',

  // Dev
  DevelopmentPlayground = 'playground',
  DevelopmentStart = 'dev',
}

export type DocPageName = `${Pages}`;
