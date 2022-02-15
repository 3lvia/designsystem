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
import { Tabs } from '@elvia/elvis-tabs/react';

function App() {
  const logValue = (component, value) => {
    console.log(component, ': ', value);
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

  // Tabs
  const tabsItems = ['Statistikk', 'Siste kall', 'HAN-port', 'Feilkategorisering'];

  return (
    <div className="App">
      <h1>React Preview</h1>
      <div className="components-examples">
        {/* CURRENTLY TESTING */}
        <div className="example-wrapper">
          <h3>Test your component here</h3>
          {/* Normal version */}
          <div className="e-bg-white"></div>
          {/* Inverted version */}
          <div className="e-bg-grey"></div>
        </div>
        {/* ALL COMPONENTS */}
        {/* ACCORDION */}
        <div className="example-wrapper">
          <h3>Accordion</h3>
          <Accordion
            type={'normal'}
            openLabel={'Show'}
            closeLabel={'Hide'}
            labelPosition={'center'}
            size={'medium'}
            content={'It is not only outdoors that you should watch for dangerous conditions.'}
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
          ></Box>
        </div>
        {/* BREADCRUMB */}
        <div className="example-wrapper">
          <h3>Breadcrumb</h3>
          <Breadcrumb
            breadcrumbs={breadcrumbsNoUrl}
            breadcrumbsOnChange={(event) => logValue('Breadcrumb', breadcrumbsNoUrl[event].title)}
          />
        </div>
        {/* CARD */}
        <div className="example-wrapper">
          <h3>Card</h3>
          <Card
            header={'Title1'}
            borderColor={'red'}
            icon={<i className="e-icon e-icon--search-bold e-icon--md"></i>}
            iconHover={<i className="e-icon e-icon--search-bold-color e-icon--md"></i>}
            cornerIcon={<Icon name="unlock" size="xs" />}
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
            valueOnChange={(event) => logValue('Carousel', event)}
          ></Carousel>
        </div>
        {/* CHIP */}
        <div className="example-wrapper">
          <h3>Chip</h3>
          <Chip type={'removable'} value={2022} selected={true}></Chip>
          <Chip type={'choice'} value={2022} selected={true}></Chip>
          <Chip
            type="legend"
            valueOnChange={() => setChipSelected(!chipSelected)}
            selected={chipSelected}
            value="2022"
          ></Chip>
        </div>
        {/* DATEPICKER */}
        <div className="example-wrapper">
          <h3>Datepicker</h3>
          <Datepicker
            isRequired
            maxDate={maxDate}
            hasSelectDateOnOpen={false}
            valueOnChange={(event) => logValue('Datepicker', event)}
          ></Datepicker>
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
            options={dropdownOptions}
            defaultValue={defaultDropdownOptions}
            label="test"
            valueOnChange={(event) => logValue('Dropdown', event)}
            isMulti
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
            hasCloseBtn
            onHide={() => setIsModalShowingState(false)}
            title="Title of content"
            content={<div>Body text comes here and can go over several lines.</div>}
          ></Modal>
        </div>
        {/* PAGINATION */}
        <div className="example-wrapper">
          <h3>Pagination</h3>
          <Pagination
            numberOfElements={100}
            lastNumberLimit={99}
            valueOnChange={(event) => logValue('Pagination', event)}
            dropdownMenuPos="top"
          ></Pagination>
        </div>
        {/* POPOVER */}
        <div className="example-wrapper">
          <h3>Popover</h3>
          <Popover
            header="BankID"
            content={
              <Tabs items={tabsItems} value={2} valueOnChange={(event) => logValue('Tabs', event)}></Tabs>
            }
            trigger={<button className="e-btn">Show popover</button>}
            posX="right"
            isShowing={isPopoverShowing}
            isShowingOnChange={(value) => setIsPopoverShowingState(value)}
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
        {/* TABS */}
        <div className="example-wrapper">
          <h3>Tabs</h3>
          <Tabs items={tabsItems} value={2} valueOnChange={(event) => logValue('Tabs', event)}></Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;
