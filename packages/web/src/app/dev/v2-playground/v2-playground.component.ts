import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { openElviaToast } from '@elvia/elvis-toast';
import { dropdownData } from './dropdown-data';

interface StepState {
  heading: string;
  isError: boolean;
  isCompleted: boolean;
}
interface StepStates {
  [step: number]: Partial<StepState>;
}
@Component({
  selector: 'app-v2-playground',
  templateUrl: './v2-playground.component.html',
  styleUrls: ['./v2-playground.component.scss'],
})
export class v2PlaygroundComponent {
  // Accordion
  accordionContent = 'Bacon ipsum dolor amet pork loin bacon jowl turkey.';
  accordionHtmlContent = `<div>HTML content<div>`;
  isOpen = false;

  //autocomplete
  autocompleteItems = [
    { value: 'animal crossing: new horizons', label: 'Animal Crossing: New Horizons asd asd asd' },
    {
      value: 'grand theft auto iv',
      label: 'Grand Theft Auto IV ads asd asd jksdgf sdkjfhsd fjhsdkf sdhjfk sjfjsfkjdhf skdjf',
    },
    { value: 'grand theft auto iv: the lost and damned', label: 'Grand Theft Auto IV: The Lost and Damned' },
    { value: 'grand theft auto v', label: 'Grand Theft Auto V a sda sdasdasd ' },
    { value: 'grand theft auto: london 1961', label: 'Grand Theft Auto: London 1961 aksjdhakjsdhjkas' },
    { value: 'grand theft auto: london 1969', label: 'Grand Theft Auto: London 1969 as da sda sdas d' },
    { value: 'grand theft auto: san andreas', label: 'Grand Theft Auto: San Andreas asda s dasdasd' },
    { value: 'grand theft auto: the ballad of gay tony', label: 'Grand Theft Auto: The Ballad of Gay Tony' },
    { value: 'grand theft auto: vice city', label: 'Grand Theft Auto: Vice City' },
    { value: 'human: fall flat', label: 'Human: Fall Flat' },
    { value: 'mario kart 8 / deluxe', label: 'Mario Kart 8 / Deluxe' },
    { value: 'mario kart wii', label: 'Mario Kart Wii' },
    { value: 'minecraft', label: 'Minecraft' },
    { value: 'minecraft: education edition ', label: 'Minecraft: Education Edition ' },
    { value: 'minecraft: ps3 edition', label: 'Minecraft: PS3 Edition' },
    { value: 'minecraft: ps4 edition', label: 'Minecraft: PS4 Edition' },
    { value: 'minecraft: wii u edition', label: 'Minecraft: Wii U Edition' },
    { value: 'minecraft: xbox 360 edition', label: 'Minecraft: Xbox 360 Edition' },
    { value: 'minecraft: xbox one edition', label: 'Minecraft: Xbox One Edition' },
    { value: 'overwatch', label: 'Overwatch' },
    { value: 'pac-man', label: 'Pac-Man' },
    { value: 'pokémon red / green / blue / yellow', label: 'Pokémon Red / Green / Blue / Yellow' },
    { value: 'pubg: battlegrounds', label: 'PUBG: Battlegrounds' },
    { value: 'red dead redemption', label: 'Red Dead Redemption' },
    { value: 'red dead redemption 2', label: 'Red Dead Redemption 2' },
    { value: 'super mario bros.', label: 'Super Mario Bros.' },
    { value: 'super smash bros. ultimate', label: 'Super Smash Bros. Ultimate' },
    { value: 'terraria', label: 'Terraria' },
    { value: 'tetris', label: 'Tetris (EA)' },
    { value: 'the legend of zelda: breath of the wild', label: 'The Legend of Zelda: Breath of the Wild' },
    { value: 'the witcher 3: wild hunt', label: 'The Witcher 3: Wild Hunt' },
    { value: 'wii fit / plus', label: 'Wii Fit / Plus' },
    { value: 'wii sports resort', label: 'Wii Sports Resort' },
    { value: 'wii sports', label: 'Wii Sports' },
    { value: 'pokémon ruby / sapphire / emerald', label: 'Pokémon Ruby / Sapphire / Emerald' },
    { value: 'sonic the hedgehog', label: 'Sonic the Hedgehog' },
    { value: 'mario kart ds', label: 'Mario Kart DS' },
    { value: 'call of duty: black ops ii', label: 'Call of Duty: Black Ops II' },
    { value: 'super mario bros. 3', label: 'Super Mario Bros. 3' },
    { value: 'pokémon diamond / pearl / platinum', label: 'Pokémon Diamond / Pearl / Platinum' },
    { value: 'pokémon sword / shield', label: 'Pokémon Sword / Shield' },
    {
      value: 'pokémon sun / moon / ultra sun / ultra moon',
      label: 'Pokémon Sun / Moon / Ultra Sun / Ultra Moon',
    },
    { value: 'call of duty: modern warfare 3', label: 'Call of Duty: Modern Warfare 3' },
    { value: 'call of duty: modern warfare', label: 'Call of Duty: Modern Warfare' },
    {
      value: 'teenage mutant ninja turtles iii: the manhattan project',
      label: 'Teenage Mutant Ninja Turtles III: The Manhattan Project',
    },
    {
      value: 'spongebob squarepants: battle for bikini bottom rehydrated',
      label: 'SpongeBob SquarePants: Battle For Bikini Bottom Rehydrated',
    },
    {
      value: 'spongebob squarepants: a day in the life of a sponge',
      label: 'SpongeBob SquarePants: A Day in the Life of a Sponge',
    },
    {
      value: 'spongebob squarepants: revenge of the flying dutchman',
      label: 'SpongeBob SquarePants: Revenge of the Flying Dutchman',
    },
  ];

  // Breadcrumb
  breadcrumbsTestNoUrl = [{ text: 'Elvia.no' }, { text: 'Nettleie' }, { text: 'Elvias leveringsplikt' }];

  // Carousel
  carouselParagraph = `
  Body text comes here and can go over several lines. It looks like this and when it is two. Body text comes here and can go over several lines.

  It looks like this and when it is two.Body text comes here and can go over several lines. It looks like this and when it is two. Body text comes here and can go over several lines. It looks like this and when it is two.
  `;

  // Chips
  deleteValue = 0;
  filteredValues = { 2021: false, 2022: true, 2023: true, 2024: true };
  filteredKeys = Object.keys(this.filteredValues) as unknown as Array<keyof typeof this.filteredValues>;
  deletableChipsList = [
    { value: 2023, color: 'red' },
    { value: 2025, color: 'red', isDisabled: true },
  ];
  choiceChipsList = [
    { value: 2025, color: 'purple' },
    { value: 2025, color: 'purple', isSelected: true },
  ];
  legendChipsList = [
    { value: 2024, color: 'blue' },
    { value: 2025, color: 'blue', isSelected: true },
    { value: 2025, color: 'blue', isLoading: true },
  ];

  // Context menu
  isContextMenuShowing = false;

  // Datepicker
  date = new Date(2022, 9, 10, 22, 42, 42, 42);
  minDate = new Date(2022, 9, 5);
  maxDate = new Date(2023, 9, 25);
  errorOptions = { hasErrorPlaceholder: false, isErrorState: true, text: 'Hello' };
  disableDate = (date: Date) => date.getDate() % 3 === 0;
  writeDate = (d: Date) => console.log('Retrieving in Angular: ', d);
  dateOnClose = () => console.log('Datepicker closed');
  dateOnOpen = () => console.log('Datepicker opened');
  dateOnReset = () => console.log('Datepicker was reset');
  changeISO = (value: string) => console.log('Change iso: ', value);

  // Datepicker range
  dateRangeDates = { start: new Date(2022, 9, 10), end: new Date(2022, 9, 20) };
  errorOptionsRange = {
    start: { hasErrorPlaceholder: false, text: 'hei' },
    end: { isErrorState: true, hasErrorPlaceholder: false },
  };
  labelOptions = { start: 'Start-dato', end: 'Sluttdato' };
  minDateRange = new Date(2022, 6, 26, 14, 0);
  maxDateRange = new Date(2022, 6, 30, 23, 0);
  disableDates = {
    start: (date: Date) => date.getDate() % 3 === 0,
    end: (date: Date) => date.getDate() % 7 === 0,
  };

  // Dropdown
  selectedDropdownItem = 'sverige';
  longDropdownList = dropdownData;
  dropdownItems = [
    {
      value: 0,
      label: 'Norge',
      children: [
        { label: 'Oslo', value: 'oslo' },
        {
          label: 'Bergen',
          value: 'bergen',
          children: [
            { label: 'Arna', value: 'arna' },
            { label: 'Bergenhus', value: 'bergenhus' },
            { label: 'Fana', value: 'fana' },
            { label: 'Fyllingsdalen', value: 'fyllingsdalen' },
            { label: 'Laksevåg', value: 'Laksevåg' },
          ],
        },
        { label: 'Trondheim', value: 'trondheim' },
        { label: 'Stavanger', value: 'stavanger' },
        { label: 'Kristiansand', value: 'kristiansand' },
      ],
    },
    {
      value: 1,
      label: 'Sverige',
      isDisabled: true,
      status: 'info',
      tooltip: 'Sweden is a country',
    },
    { value: 'danmark', label: 'Danmark' },
    {
      value: 'finland',
      label: 'Finland  med en veldig lang tekst som kommer til å overflowe',
    },
    { value: 'spania', label: 'Spania' },
    { value: 'tyskland', label: 'Tyskland' },
    {
      value: 'england',
      label: 'England',
      children: [
        { value: 'london', label: 'London', icon: 'adjust' },
        { value: 'manchester', label: 'Manchester', icon: 'addCircle' },
        { value: 'birmingham', label: 'Birmingham', icon: 'search' },
      ],
    },
  ];
  isLoadingMoreItems = false;
  setLoading = () => {
    this.isLoadingMoreItems = true;
    setTimeout(() => (this.isLoadingMoreItems = false), 4000);
  };
  onDropdownSelect = (value: string | number) =>
    console.log(typeof value === 'number' ? value + value : value, typeof value);

  // Modal
  isModalShowing = false;
  isIllustrationModalShowing = false;
  isMultiPageModalShowing = false;

  // Pagination
  defaultPaginationValue = { start: 76, end: 100 };
  paginationDropdownItems = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '25', label: '25' },
    { value: '50', label: '50' },
  ];
  dropdownSelectedItemIndex = 3;

  // Popover
  isPopoverShowing = false;
  isPopoverListShowing = false;
  isPopoverListHeadingShowing = false;
  isPopoverListIconsShowing = false;
  isPopoverLIstCheckedShowing = false;
  isPopoverShowing1 = false;

  // Progress linear
  progressValue = 0;
  progressError = false;
  indeterminate = false;

  // Radio filter
  radioFilterValues = [
    { label: 'All', value: 'all' },
    { label: 'Read', value: 'read' },
    { label: 'Unread', value: 'unread' },
    { label: '<i class="e-icon e-icon--bookmark-filled e-icon--xs"></i>Flagged', value: 'flagged' },
  ];

  // Spotlight
  showSpotlight = false;
  toggleSpotlight = () => (this.showSpotlight = !this.showSpotlight);

  // Tabs
  items = [
    { label: 'Epler' },
    { label: 'Appelsin' },
    { label: 'Bananer' },
    { label: 'Druer' },
    { label: 'Kiwi', isDisabled: true },
  ];

  stepperStates: StepStates = {
    '1': { isCompleted: true, heading: 'Title #1' },
    '2': { heading: 'Title #2' },
    '3': { isError: true, heading: 'Title #3' },
    '4': { heading: 'Title #4' },
    '5': { heading: 'Title #5' },
    '6': { heading: 'Title #6' },
    '7': { heading: 'Title #7' },
    '8': { heading: 'Title #8' },
  };
  toggleState = () =>
    (this.stepperStates = { ...this.stepperStates, '2': { isCompleted: true, heading: 'Title #2' } });

  // Timepicker
  timepickerValue = new Date();

  // Toast
  showToast = () => {
    openElviaToast({
      title: 'First title',
      body: 'First body. This is a long one though. It should probably wrap over several lines so that we can check how that looks.',
      closable: true,
      duration: 4000,
    });
  };

  // Tooltip
  tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';
  customTooltipText = 'This is a custom text';
  onCustomTextHover = () => {
    setTimeout(() => (this.customTooltipText = 'That now changed into a much longer text'), 2500);
  };

  shuffleTooltipPosition = (): void => {
    if (this.tooltipPosition === 'top') {
      this.tooltipPosition = 'right';
    } else if (this.tooltipPosition === 'right') {
      this.tooltipPosition = 'bottom';
    } else if (this.tooltipPosition === 'bottom') {
      this.tooltipPosition = 'left';
    } else {
      this.tooltipPosition = 'top';
    }
  };

  logValue = (component: string, value: Event): void => {
    console.log(component, ': ', value);
  };
  log = (event: string): void => {
    console.log(event);
  };

  // Accordion
  onOpen = (): void => {
    this.isOpen = true;
    console.log('Trigger onOpen');
  };
  onClose = (): void => {
    this.isOpen = false;
    console.log('Trigger onClose');
  };
  // Chips
  handleOnChange = (event: { target: { value: string }; detail: { value: boolean } }): void => {
    console.log(`handleOnChange ${event.target.value}: ${event.detail.value}`);
    this.filteredValues = { ...this.filteredValues, [event.target.value]: event.detail.value };
  };
  changeChipStates = (): void => {
    this.filteredValues = Object.fromEntries(
      Object.entries(this.filteredValues).map(([key, value]) => [key, !value]),
    ) as typeof this.filteredValues;
  };
  handleOnDelete = (event: number): void => {
    this.deleteValue = event;
    const values = [...this.deletableChipsList];
    this.deletableChipsList = values.filter((value) => value.value !== event);
  };

  // Popover
  popoverOnOpen = (): void => {
    console.log('Popover opened');
  };
  popoverOnClose = (): void => {
    console.log('Popover closed');
  };

  sliderOnValueChange = (event: CustomEvent): void => {
    console.log('Slider value changed: ', event.detail.value);
  };

  constructor(private titleService: Title) {
    this.titleService.setTitle('DEV-playground | Elvia design system');
  }
}
