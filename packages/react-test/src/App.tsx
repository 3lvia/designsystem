import { useState } from 'react';
import './App.scss';
import { Accordion } from '@elvia/elvis-accordion/react';
import { Badge } from '@elvia/elvis-badge/react';
import { Box } from '@elvia/elvis-box/react';
import { Breadcrumb } from '@elvia/elvis-breadcrumb/react';
import { Card } from '@elvia/elvis-card/react';
import { Carousel } from '@elvia/elvis-carousel/react';
import { Chip } from '@elvia/elvis-chip/react';
import { ContextMenu } from '@elvia/elvis-context-menu/react';
import { Datepicker } from '@elvia/elvis-datepicker/react';
import { DatepickerRange } from '@elvia/elvis-datepicker-range/react';
import { Divider } from '@elvia/elvis-divider/react';
import { Dropdown } from '@elvia/elvis-dropdown/react';
import { Header } from '@elvia/elvis-header/react';
import { Icon } from '@elvia/elvis-icon/react';
import { Modal } from '@elvia/elvis-modal/react';
import { Pagination } from '@elvia/elvis-pagination/react';
import { Popover } from '@elvia/elvis-popover/react';
import { ProgressLinear } from '@elvia/elvis-progress-linear/react';
import { RadioFilter } from '@elvia/elvis-radio-filter/react';
import { SegmentedControl } from '@elvia/elvis-segmented-control/react';
import { Slider } from '@elvia/elvis-slider/react';
import { Spotlight } from '@elvia/elvis-spotlight/react';
import { Tabs } from '@elvia/elvis-tabs/react';
import { Timepicker } from '@elvia/elvis-timepicker/react';
import { Toast, openElviaToast } from '@elvia/elvis-toast/react';

function App() {
  const logValue = (component: string, value: string | number) => {
    console.log(component, ': ', value);
  };
  const updateSpotlight = () => {
    const { innerWidth, innerHeight } = window;
    const newSize = 30 + Math.random() * 100;
    const newPos = {
      vertical: Math.random() * (innerHeight - 2 * newSize) + newSize,
      horizontal: Math.random() * (innerWidth - 2 * newSize) + newSize,
    };
    setSpotlightState({ pos: newPos, size: newSize });
  };

  // Accordion
  const [isOpenContent, setIsOpenContent] = useState(false);

  // Breadcrumb
  const breadcrumbsNoUrl = [
    {
      text: 'Elvia.no',
    },
    {
      text: 'Nettleie',
    },
  ];

  // Chip
  const [chipSelected, setChipSelected] = useState(false);

  // Context menu
  const [isContextMenuShowing, setIsContextMenuShowing] = useState(false);

  // Datepicker
  let minDate = new Date();
  minDate.setDate(minDate.getDate() - 5);
  let maxDate = new Date();
  maxDate.setDate(maxDate.getDate() - 1);

  // Dropdown
  const defaultDropdownOptions = 'norge';
  const dropdownOptions = [
    { value: 'norge', label: 'Norge' },
    { value: 'sverige', label: 'Sverige' },
    { value: 'danmark', label: 'Danmark' },
    {
      value: 'england',
      label: 'England',
      children: [
        { value: 'london', label: 'London' },
        { value: 'manchester', label: 'Manchester' },
        { value: 'birmingham', label: 'Birmingham' },
      ],
    },
    { value: 'russland', label: 'Russland' },
    { value: 'polen', label: 'Polen' },
    { value: 'romania', label: 'Romania' },
    { value: 'frankrike', label: 'Frankrike' },
    { value: 'spania', label: 'Spania' },
    { value: 'portugal', label: 'Portugal' },
    { value: 'italia', label: 'Italia' },
    { value: 'finland', label: 'Finland' },
    { value: 'østerriket', label: 'Østerriket' },
  ];

  const [isLoadingMoreItems, setIsLoadingMoreItems] = useState(false);
  const onLoadMoreItems = () => {
    setIsLoadingMoreItems(true);
    setTimeout(() => {
      setIsLoadingMoreItems(false);
    }, 2000);
  };

  // Modal
  const [isModalShowing, setIsModalShowingState] = useState(false);

  // Popover
  const [isPopoverShowing, setIsPopoverShowingState] = useState(false);

  // Progressbar
  const [progressValue, setProgressValue] = useState(0);
  function increaseProgress() {
    setProgressValue((prevProgValue) => prevProgValue + 10);
  }
  function decreaseProgress() {
    setProgressValue((prevProgValue) => prevProgValue - 10);
  }

  // Radio filter
  const [selectedRadioFilter, setSelectedRadioFilter] = useState('read');
  const radioFilterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Read', value: 'read' },
    { label: 'Unread', value: 'unread' },
  ];

  // Spotlight
  const [spotlightIsShowing, setSpotlightIsShowing] = useState(false);
  const [spotlightState, setSpotlightState] = useState({
    pos: { vertical: window.innerWidth / 2 - 200, horizontal: window.innerHeight / 2 + 200 },
    size: 100,
  });

  // Tabs
  const tabsItems = ['Statistikk', 'Siste kall', 'HAN-port', 'Feilkategorisering'];
  const [isChipLoading, setIsChipLoading] = useState(false);

  // Toast
  const showToast = () => {
    openElviaToast({
      title: 'Test title',
      body: 'This is an information toast',
      status: 'informative',
      closable: true,
      duration: 2000000,
    });
  };

  return (
    <Header
      appTitle="Louvre"
      email="kristine.leonardsen@elvia.no"
      username="Kristine Leonardsen"
      navItems={
        <div className="e-sidenav__container">
          <a href="/" className="e-sidenav__item e-sidenav__item--active" aria-label="Dashbord">
            <div className="e-sidenav__icon-container">
              <Icon name="dashboard" size="sm"></Icon>
            </div>
            <div className="e-sidenav__item-text">Dashbord</div>
          </a>
          <a href="/search" className="e-sidenav__item" aria-label="Søk">
            <div className="e-sidenav__icon-container">
              <Icon name="search" size="sm"></Icon>
            </div>
            <div className="e-sidenav__item-text">Søk</div>
          </a>
          <a href="/pin" className="e-sidenav__item" aria-label="Analyse">
            <div className="e-sidenav__icon-container">
              <Icon name="pin" size="sm"></Icon>
            </div>
            <div className="e-sidenav__item-text">Analyse</div>
          </a>
        </div>
      }
      pageTitle="Components"
      appContent={
        <div className="App e-pt-40">
          <Toast />
          <h1 className="e-mt-0">React Preview</h1>
          <div className="components-examples">
            {/* CURRENTLY TESTING */}
            <div className="example-wrapper">
              {/* Test the component here (delete what was here previously). When done add it to the list alphabetically */}
              <h3>Test your component here</h3>
              {/* Normal version */}
              <i className="e-icon e-icon--add_circle e-icon--sm"></i>
              <div className="e-bg-white">
                <Pagination
                  value={{ start: 31, end: 40 }}
                  numberOfElements={100}
                  valueOnChange={(value) => console.log('Pagination 1: ', value)}
                ></Pagination>
              </div>
              {/* Inverted version */}
              <div className="e-bg-grey"></div>
            </div>
            {/* ACCORDION */}

            {/* BADGE */}

            {/* BOX */}

            {/* BREADCRUMB */}

            {/* CARD */}

            {/* CAROUSEL */}

            {/* CHIP */}

            {/* CONTEXT MENU */}

            {/* DATEPICKER */}

            {/* DATE RANGE PICKER */}

            {/* DIVIDER */}

            {/* DROPDOWN */}

            {/* ICON */}

            {/* MODAL */}

            {/* POPOVER */}

            {/* PROGRESS LINEAR */}

            {/* RADIO FILTER */}

            {/* SEGMENTED CONTROL */}

            {/* SLIDER */}

            {/* SPOTLIGHT */}

            {/* TABS */}

            {/* TIMEPICKER */}

            {/* TOAST */}
          </div>
        </div>
      }
    ></Header>
  );
}

export default App;
