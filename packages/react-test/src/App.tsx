import { useState } from 'react';
import './App.scss';
import { Accordion } from '@elvia/elvis-accordion/react';
import { Autocomplete } from '@elvia/elvis-autocomplete/react';
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
import { Stepper } from '@elvia/elvis-stepper/react';
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
  const dateFromToday = (diff: number): Date => {
    const d = new Date();
    d.setDate(d.getDate() + diff);
    return d;
  };
  let minDate = dateFromToday(-5);
  let maxDate = dateFromToday(-1);
  const [datepickerValue, setDatepickerValue] = useState<Date | null>(null);

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
              <div className="e-bg-white">
                <Autocomplete items={[]}></Autocomplete>
              </div>
              {/* Inverted version */}
              <div className="e-bg-grey"></div>
            </div>
            {/* ACCORDION */}
            <div className="example-wrapper">
              <h3>Accordion</h3>
              <button onClick={() => setIsOpenContent((prevIsOpen) => !prevIsOpen)}>Trigger animation</button>
              <Accordion
                isOpen={isOpenContent}
                type={'overflow'}
                openLabel={'Show'}
                closeLabel={'Hide'}
                overflowHeight={100}
                labelPosition={'center'}
                size={'medium'}
                content={
                  'It is not only outdoors that you should watch for dangerous conditions. It is not only outdoors that you should watch for dangerous conditions. It is not only outdoors that you should watch for dangerous conditions. It is not only outdoors that you should watch for dangerous conditions. It is not only outdoors that you should watch for dangerous conditions. It is not only outdoors that you should watch for dangerous conditions. It is not only outdoors that you should watch for dangerous conditions. It is not only outdoors that you should watch for dangerous conditions. '
                }
              ></Accordion>
            </div>

            {/* BADGE */}
            <div className="example-wrapper">
              <h3>Badge</h3>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Badge
                  content={
                    <button
                      className="e-thumbnail"
                      aria-label="Thumbnail button that opens the image in a larger view"
                    >
                      <img src="https://picsum.photos/200" alt="Thumbnail example image" />
                    </button>
                  }
                />

                <Badge
                  badgeColor={'red'}
                  count={8}
                  content={
                    <button
                      className="e-thumbnail"
                      aria-label="Thumbnail button that opens the image in a larger view"
                    >
                      <img src="https://picsum.photos/200" alt="Thumbnail example image" />
                    </button>
                  }
                />

                <Badge
                  badgeColor={'neutral'}
                  count={101}
                  content={
                    <button
                      className="e-thumbnail"
                      aria-label="Thumbnail button that opens the image in a larger view"
                    >
                      <img src="https://picsum.photos/200" alt="Thumbnail example image" />
                    </button>
                  }
                />

                <Badge
                  badgeColor={'neutral'}
                  content={
                    <button
                      className="e-thumbnail"
                      aria-label="Thumbnail button that opens the image in a larger view"
                    >
                      <img src="https://picsum.photos/200" alt="Thumbnail example image" />
                    </button>
                  }
                />
              </div>
            </div>
            {/* BOX */}
            <div className="example-wrapper">
              <h3>Box</h3>
              <Box
                isColored={true}
                heading={<h1>Title for the box component</h1>}
                content={<div>Heisann dette er en box component sendt med som node i react</div>}
              ></Box>
            </div>

            {/* BREADCRUMB */}
            <div className="example-wrapper">
              <h3>Breadcrumb</h3>
              <Breadcrumb items={breadcrumbsNoUrl} />
            </div>
            {/* CARD */}
            <div className="example-wrapper">
              <h3>Card</h3>
              <Card
                heading={'Title1'}
                borderColor={'red'}
                icon={<i className="e-icon e-icon--search-bold e-icon--md" aria-hidden="true"></i>}
                iconHover={<i className="e-icon e-icon--search-bold-color e-icon--md" aria-hidden="true"></i>}
                cornerIcon={<Icon name="unlock" size="xs" />}
              ></Card>
            </div>
            {/* CAROUSEL */}
            <div className="example-wrapper">
              <h3>Carousel</h3>
              <Carousel
                type="linear"
                hasConfirmationCheckmark={true}
                items={[
                  { heading: <h3 className="e-title-sm">HAN-port</h3>, item: <div>Hallo</div> },
                  { heading: <h3 className="e-title-sm">AMS-meter</h3>, item: 'Hei' },
                  {
                    heading: <h3 className="e-title-sm">About login</h3>,
                    item: <p>Halla</p>,
                  },
                ]}
                onFinish={() => console.log('Hide')}
              />
            </div>
            {/* CHIP */}
            <div className="example-wrapper">
              <h3>Chip</h3>
              <Chip type={'choice'} value={2022} isSelected={true}></Chip>
              <Chip type={'choice'} value={'Disabled'} isDisabled></Chip>

              <Chip
                type="legend"
                isSelectedOnChange={() => {
                  setChipSelected(!chipSelected);
                  setIsChipLoading(!isChipLoading);
                  setTimeout(() => {
                    setIsChipLoading(false);
                  }, 2000);
                }}
                isSelected={chipSelected}
                isLoading={isChipLoading}
                value="Selectable"
                color="red"
              ></Chip>
            </div>
            {/* CONTEXT MENU */}
            <div className="example-wrapper">
              <h3>Context menu</h3>
              <ContextMenu
                onOpen={() => setIsContextMenuShowing(true)}
                onClose={() => setIsContextMenuShowing(false)}
                trigger={
                  <button
                    className={`e-btn e-btn--icon ${isContextMenuShowing ? 'e-btn---selected' : ''}`}
                    aria-label="More menu"
                  >
                    <span className="e-btn__icon">
                      <i className="e-icon e-icon--more_menu e-icon--inverted" aria-hidden="true"></i>
                      <i className="e-icon e-icon--more_menu" aria-hidden="true"></i>
                    </span>
                  </button>
                }
                content={
                  <>
                    <div className="ewc-context-menu__list-group">
                      <button>
                        <span>Be om tilgang</span>
                      </button>
                      <button>
                        <span>Legg til bruker</span>
                      </button>
                    </div>
                    <div className="ewc-context-menu__list-group">
                      <a>
                        <span>Endre passord</span>
                      </a>
                    </div>
                  </>
                }
              ></ContextMenu>
            </div>
            {/* DATEPICKER */}
            <div className="example-wrapper">
              <h3>Datepicker</h3>
              <Datepicker
                valueOnChange={(value) => console.log(value)}
                hasSelectDateOnOpen={false}
              ></Datepicker>
            </div>
            {/* DATE RANGE PICKER */}
            <div className="example-wrapper">
              <h3>Date range picker</h3>
              <DatepickerRange valueOnChange={(event) => console.log(event)}></DatepickerRange>
            </div>
            {/* DIVIDER */}
            <div className="example-wrapper">
              <h3>Divider</h3>
              <Divider />
            </div>
            {/* DROPDOWN */}
            <div className="example-wrapper">
              <h3>Dropdown</h3>
              <Dropdown
                value={defaultDropdownOptions}
                placeholder="Select country"
                label="New dropdown"
                isSearchable
                items={dropdownOptions}
                isMulti
                isLoadingMoreItems={isLoadingMoreItems}
                onLoadMoreItems={onLoadMoreItems}
              ></Dropdown>
            </div>
            {/* ICON */}
            <div className="example-wrapper">
              <h3>Icon</h3>
              <Icon name="arrowLeftBold"></Icon>
              <Icon name="arrowRightBold"></Icon>
            </div>
            {/* MODAL */}
            <div className="example-wrapper">
              <h3>Modal</h3>
              <button className="e-btn" onClick={() => setIsModalShowingState(true)}>
                Show modal
              </button>
              <Modal
                isShowing={isModalShowing}
                hasCloseButton
                onClose={() => setIsModalShowingState(false)}
                heading="Title of content"
                content={<div>Body text comes here and can go over several lines.</div>}
                primaryButton={<button className="e-btn e-btn--primary">Primary</button>}
                secondaryButton={<button className="e-btn e-btn--secondary">Secondary</button>}
              ></Modal>
            </div>
            {/* PAGINATION */}
            <div className="example-wrapper">
              <h3>Pagination</h3>
              <Pagination
                numberOfElements={100}
                lastNumberLimit={99}
                dropdownMenuPosition="top"
                labelOptions={{ displaying: 'Showing' }}
                alignment={'left'}
              ></Pagination>
            </div>
            {/* POPOVER */}
            <div className="example-wrapper">
              <h3>Popover</h3>
              <Popover
                heading="BankID"
                hasCloseButton
                content={<Tabs items={tabsItems} value={2}></Tabs>}
                trigger={<button className="e-btn">Show popover</button>}
                horizontalPosition="left"
                verticalPosition="top"
                isShowing={isPopoverShowing}
                onOpen={() => setIsPopoverShowingState(true)}
                onClose={() => setIsPopoverShowingState(false)}
              ></Popover>
            </div>
            {/* PROGRESS LINEAR */}
            <div className="example-wrapper">
              <h3>ProgressLinear</h3>
              <ProgressLinear value={progressValue}></ProgressLinear>
              <button className="e-btn e-mr-8" onClick={decreaseProgress}>
                Decrease
              </button>
              <button className="e-btn" onClick={increaseProgress}>
                Increase
              </button>
            </div>
            {/* RADIO FILTER */}
            <div className="example-wrapper">
              <h3>Radio filter</h3>
              <RadioFilter
                items={radioFilterOptions}
                ariaLabel={`${selectedRadioFilter} filtrering valgt`}
                valueOnChange={(selected) => {
                  setSelectedRadioFilter(selected);
                }}
                value={selectedRadioFilter}
                name={'radioFilterTest'}
              ></RadioFilter>
            </div>
            {/* SEGMENTED CONTROL */}
            <div className="example-wrapper">
              <h3>Segmented Control</h3>
              <SegmentedControl
                items={[{ label: 'Different' }, { label: 'Length' }, { label: 'Woords' }]}
                size={'medium'}
                value={0}
                valueOnChange={(value) => console.log(value)}
              ></SegmentedControl>
              <div className="e-mt-8">
                <SegmentedControl
                  type="icon"
                  items={[
                    {
                      icon: '<i class="e-icon e-icon--access_control"></i>',
                      iconSelected: '<i class="e-icon e-icon--access_control-color"></i>',
                      ariaLabel: '',
                    },
                    {
                      icon: '<i class="e-icon e-icon--list"></i>',
                      iconSelected: '<i class="e-icon e-icon--list-color"></i>',
                      ariaLabel: '',
                    },
                  ]}
                  size={'large'}
                  value={0}
                  valueOnChange={(value) => console.log(value)}
                ></SegmentedControl>
              </div>
            </div>
            {/* SLIDER */}
            <div className="example-wrapper">
              <h3>Slider</h3>
              <h4>Simple</h4>
              <Slider />
              <h4>Range</h4>
              <Slider type={'range'} />
            </div>
            {/* SPOTLIGHT */}
            <div className="example-wrapper">
              <h3>Spotlight</h3>
              {spotlightIsShowing && (
                <Spotlight position={spotlightState.pos} radius={spotlightState.size}></Spotlight>
              )}
              <button
                onClick={() => setSpotlightIsShowing((prevVal) => !prevVal)}
                style={{ position: 'relative', zIndex: 999999 }}
                className="e-btn e-mr-8"
              >
                Show spotlight
              </button>
              <button
                onClick={updateSpotlight}
                style={{ position: 'relative', zIndex: 999999 }}
                className="e-btn"
              >
                Update spotlight
              </button>
            </div>
            {/* TABS */}
            <div className="example-wrapper">
              <h3>Tabs</h3>
              <Tabs items={tabsItems} value={2} valueOnChange={(event) => logValue('Tabs', event)}></Tabs>
            </div>

            {/* TIMEPICKER */}
            <div className="example-wrapper">
              <h3>Timepicker</h3>
              <Timepicker />
            </div>

            {/* TOAST */}
            <button className="e-btn" onClick={showToast}>
              Show toast
            </button>
          </div>
        </div>
      }
    ></Header>
  );
}

export default App;
