import React, { useState } from 'react';
import './App.scss';
import { Accordion } from '@elvia/elvis-accordion/react';
import { Box } from '@elvia/elvis-box/react';
import { Breadcrumb } from '@elvia/elvis-breadcrumb/react';
import { Card } from '@elvia/elvis-card/react';
import { Carousel } from '@elvia/elvis-carousel/react';
import { Chip } from '@elvia/elvis-chip/react';
import { Datepicker } from '@elvia/elvis-datepicker/react';
import { Divider } from '@elvia/elvis-divider/react';
import { Dropdown } from '@elvia/elvis-dropdown/react';
import { Icon } from '@elvia/elvis-icon/react';
import { Modal } from '@elvia/elvis-modal/react';
import { Pagination } from '@elvia/elvis-pagination/react';
import { Popover } from '@elvia/elvis-popover/react';
import { ProgressLinear } from '@elvia/elvis-progress-linear/react';
import { RadioFilter } from '@elvia/elvis-radio-filter/react';
import { Spotlight } from '@elvia/elvis-spotlight/react';
import { Tabs } from '@elvia/elvis-tabs/react';

function App() {
  const logValue = (component, value) => {
    console.log(component, ': ', value);
  };
  const updateSpotlight = () => {
    setSpotlightPos({ vertical: '600', horizontal: '600' });
  };

  // Breadcrumb
  const breadcrumbsNoUrl = [
    {
      title: 'Elvia.no',
    },
    {
      title: 'Nettleie',
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
  const defaultDropdownOptions = [
    { value: 'norge', label: 'Norge' },
    { value: 'sverige', label: 'Sverige' },
  ];
  const dropdownOptions = [
    { value: 'norge', label: 'Norge' },
    { value: 'sverige', label: 'Sverige' },
    { value: 'danmark', label: 'Danmark' },
  ];

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
  const [spotlightPos, setSpotlightPos] = useState({ verticalPosition: '500', horizontalPosition: '500' });

  // Tabs
  const tabsItems = ['Statistikk', 'Siste kall', 'HAN-port', 'Feilkategorisering'];

  return (
    <div className="App">
      <h1>React Preview</h1>
      <div className="components-examples">
        {/* CURRENTLY TESTING */}
        <div className="example-wrapper">
          {/* Test the component here (delete what was here previously). When done add it to the list alphabetically */}
          <h3>Test your component here</h3>
          {/* Normal version */}
          <div className="e-bg-white">
            <Popover
              type={'list'}
              posY={'top'}
              trigger={
                <button className="e-btn e-btn--icon e-btn--circled">
                  <span className="e-btn__icon">
                    <Icon name="informationCircle"></Icon>
                    <Icon name="informationCircleFilledColor"></Icon>
                  </span>
                </button>
              }
              content={
                <div className="ewc-popover__list">
                  <button>
                    <span>Be om tilgang</span>
                  </button>
                  <button>
                    <span>Legg til bruker</span>
                  </button>
                  <a>
                    <span>Endre passord</span>
                  </a>
                </div>
              }
            ></Popover>
          </div>
          {/* Inverted version */}
          <div className="e-bg-grey"></div>
        </div>
        {/* ACCORDION */}
        <div className="example-wrapper">
          <h3>Accordion</h3>
          <Accordion
            type={'overflow'}
            openLabel={'Show'}
            closeLabel={'Hide'}
            overflowHeight={100}
            labelPosition={'center'}
            size={'medium'}
            content={
              'It is not only outdoors that you should watch for dangerous conditions. It is not only outdoors that you should watch for dangerous conditions. It is not only outdoors that you should watch for dangerous conditions. It is not only outdoors that you should watch for dangerous conditions. It is not only outdoors that you should watch for dangerous conditions. It is not only outdoors that you should watch for dangerous conditions. It is not only outdoors that you should watch for dangerous conditions. It is not only outdoors that you should watch for dangerous conditions. '
            }
            onClick={() => console.log('Clicked')}
          ></Accordion>
        </div>
        {/* BOX */}
        <div className="example-wrapper">
          <h3>Box</h3>
          <Box
            hasBorder={true}
            isColored={true}
            title={<h1>Title for the box component</h1>}
            content={<div>Heisann dette er en box component sendt med som node i react</div>}
            onClick={() => console.log('Clicked')}
          ></Box>
        </div>
        {/* BREADCRUMB */}
        <div className="example-wrapper">
          <h3>Breadcrumb</h3>
          <Breadcrumb breadcrumbs={breadcrumbsNoUrl} onClick={() => console.log('Clicked')} />
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
            onClick={() => console.log('Clicked')}
          ></Card>
        </div>
        {/* CAROUSEL */}
        <div className="example-wrapper">
          <h3>Carousel</h3>
          <Carousel
            elements={[
              { title: <h3 className="e-title-sm">HAN-port</h3>, element: <div>Hallo</div> },
              { title: <h3 className="e-title-sm">AMS-meter</h3>, element: 'Hei' },
              { title: <h3 className="e-title-sm">About login</h3>, element: <p>Halla</p> },
            ]}
            onClick={() => console.log('Clicked')}
          ></Carousel>
        </div>
        {/* CHIP */}
        <div className="example-wrapper">
          <h3>Chip</h3>
          <Chip type={'removable'} value={2022} selected={true} onClick={() => console.log('Clicked')}></Chip>
          <Chip type={'choice'} value={2022} selected={true} onClick={() => console.log('Clicked')}></Chip>
          <Chip
            type="legend"
            valueOnChange={() => setChipSelected(!chipSelected)}
            selected={chipSelected}
            value="2022"
            onClick={() => console.log('Clicked')}
          ></Chip>
        </div>
        {/* DATEPICKER */}
        <div className="example-wrapper">
          <h3>Datepicker</h3>
          <Datepicker
            isRequired
            maxDate={maxDate}
            hasSelectDateOnOpen={false}
            onClick={() => console.log('Clicked')}
          ></Datepicker>
        </div>
        {/* DIVIDER */}
        <div className="example-wrapper">
          <h3>Divider</h3>
          <Divider onClick={() => console.log('Clicked')} inlineStyle={{ height: '10px' }} />
        </div>
        {/* DROPDOWN */}
        <div className="example-wrapper">
          <h3>Dropdown</h3>
          <Dropdown
            options={dropdownOptions}
            defaultValue={defaultDropdownOptions}
            label="test"
            isMulti
            onClick={() => console.log('Clicked')}
          ></Dropdown>
        </div>
        {/* ICON */}
        <div className="example-wrapper">
          <h3>Icon</h3>
          <Icon name="arrowLeftBold" onClick={() => console.log('Clicked')}></Icon>
          <Icon name="arrowRightBold" onClick={() => console.log('Clicked')}></Icon>
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
            onClick={() => console.log('Clicked')}
          ></Modal>
        </div>
        {/* PAGINATION */}
        <div className="example-wrapper">
          <h3>Pagination</h3>
          <Pagination
            numberOfElements={100}
            lastNumberLimit={99}
            dropdownMenuPos="top"
            onClick={() => console.log('Clicked')}
          ></Pagination>
        </div>
        {/* POPOVER */}
        <div className="example-wrapper">
          <h3>Popover</h3>
          <Popover
            header="BankID"
            content={<Tabs items={tabsItems} value={2}></Tabs>}
            trigger={<button className="e-btn">Show popover</button>}
            posX="right"
            isShowing={isPopoverShowing}
            isShowingOnChange={(value) => setIsPopoverShowingState(value)}
          ></Popover>
        </div>
        {/* PROGRESS LINEAR */}
        <div className="example-wrapper">
          <h3>ProgressLinear</h3>
          <ProgressLinear value={progressValue} onClick={() => console.log('Clicked')}></ProgressLinear>
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
            onClick={() => console.log('Clicked')}
          ></RadioFilter>
        </div>
        {/* SPOTLIGHT */}
        <div className="example-wrapper">
          <h3>Spotlight</h3>
          {/* <Spotlight position={spotlightPos} radius="40"></Spotlight> */}
          <button
            onClick={updateSpotlight}
            style={{ position: 'relative', zIndex: 999999 }}
            className="e-btn"
          >
            Update
          </button>
        </div>
        {/* TABS */}
        <div className="example-wrapper">
          <h3>Tabs</h3>
          <Tabs
            items={tabsItems}
            value={2}
            valueOnChange={(event) => logValue('Tabs', event)}
            onClick={() => console.log('Clicked')}
          ></Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;
