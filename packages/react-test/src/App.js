// @ts-check
import React, { useState } from 'react';
import './App.scss';
import { Accordion } from '@elvia/elvis-accordion/react';
import { Badge } from '@elvia/elvis-badge/react';
import { Box } from '@elvia/elvis-box/react';
import { Breadcrumb } from '@elvia/elvis-breadcrumb/react';
import { Card } from '@elvia/elvis-card/react';
import { Carousel } from '@elvia/elvis-carousel/react';
import { Chip } from '@elvia/elvis-chip/react';
import { Datepicker } from '@elvia/elvis-datepicker/react';
import { DatepickerRange } from '@elvia/elvis-datepicker-range/react';
import { Divider } from '@elvia/elvis-divider/react';
import { Dropdown } from '@elvia/elvis-dropdown/react';
import { Icon } from '@elvia/elvis-icon/react';
import { Modal } from '@elvia/elvis-modal/react';
import { Pagination } from '@elvia/elvis-pagination/react';
import { Popover } from '@elvia/elvis-popover/react';
import { ProgressLinear } from '@elvia/elvis-progress-linear/react';
import { RadioFilter } from '@elvia/elvis-radio-filter/react';
import { Slider } from '@elvia/elvis-slider/react';
import { Spotlight } from '@elvia/elvis-spotlight/react';
import { Tabs } from '@elvia/elvis-tabs/react';
import { Timepicker } from '@elvia/elvis-timepicker/react';

function App() {
  const logValue = (component, value) => {
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

  // Datepicker
  let minDate = new Date();
  minDate.setDate(minDate.getDate() - 5);
  let maxDate = new Date();
  maxDate.setDate(maxDate.getDate() - 1);

  // Dropdown
  const defaultDropdownOptions = [{ value: 'norge', label: 'Norge' }];
  const dropdownOptions = [
    { value: 'norge', label: 'Norge' },
    { value: 'sverige', label: 'Sverige' },
    { value: 'danmark', label: 'Danmark' },
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

  return (
    <div className="App">
      <h1>React Preview</h1>
      <div className="components-examples">
        {/* CURRENTLY TESTING */}
        <div className="example-wrapper">
          {/* Test the component here (delete what was here previously). When done add it to the list alphabetically */}
          <h3>Test your component here</h3>
          {/* Normal version */}
          <div className="e-bg-white"></div>
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
              badgeColor={'black'}
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
              badgeColor={'black'}
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
            hasBorder={true}
            isColored={true}
            title={<h1>Title for the box component</h1>}
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
            header={'Title1'}
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
            loop={false}
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
          ></Carousel>
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
        {/* DATEPICKER */}
        <div className="example-wrapper">
          <h3>Datepicker</h3>
          <Datepicker valueOnChange={(value) => console.log(value)} hasSelectDateOnOpen={false}></Datepicker>
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
            items={dropdownOptions}
            value={defaultDropdownOptions}
            label="test"
            hasLoadMoreItemsButton
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
        {/* SLIDER */}
        <div className="example-wrapper">
          <h3>Slider</h3>
          <h4>Simple</h4>
          <Slider min={0} max={100} hasHintValues={true} />
          <h4>Range</h4>
          <Slider min={0} max={100} type={'range'} hasHintValues={true} />
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
        <div className="example-wrapper">
          <h3>Timepicker</h3>
          <Timepicker />
        </div>
      </div>
    </div>
  );
}

export default App;
