import React, { useRef, useState } from 'react';
import './App.scss';
import { Popover } from '@elvia/elvis-popover/react';
import { Accordion } from '@elvia/elvis-accordion/react';
import { Tabs } from '@elvia/elvis-tabs/react';
import { ProgressLinear } from '@elvia/elvis-progress-linear/react';
import { TestingComponent } from '@elvia/elvis-testing/react';
import { Breadcrumb } from '@elvia/elvis-breadcrumb/react';
import { Carousel } from '@elvia/elvis-carousel/react';
import { Chip } from '@elvia/elvis-chip/react';
import { Datepicker } from '@elvia/elvis-datepicker/react';
import { Divider } from '@elvia/elvis-divider/react';
import { Dropdown } from '@elvia/elvis-dropdown/react';
import { Box } from '@elvia/elvis-box/react';
import { Modal } from '@elvia/elvis-modal/react';
import { RadioFilter } from '@elvia/elvis-radio-filter/react';

function App() {

  const deletableChipsList = [
    { value: 2022 },
    { value: 2024, color: 'blue' },
    { value: 2025, color: 'purple', disabled: true }
  ]

  const clickableChips = [
    { value: 2022, color: 'green' },
    { value: 2023, color: 'red' },
    { value: 2024, color: 'blue', selected: true },
    { value: 2025, color: 'purple' },
    { value: 2026, color: 'violet', selected: true, disabled: true }
  ]

  const [chipSelected, setChipSelected] = useState(false)

  const [selectedState, setSelectedState] = useState(2);
  const [chipsValues, setChipsValues] = useState([2018, 2019, 2020, 2021]);
  const [deletableChips, setDeletableChips] = useState(deletableChipsList);
  const [chipValue, setChipValue] = useState([]);
  const items = ['Statistikk', 'Siste kall', 'HAN-port', 'Feilkategorisering'];
  const dateCurr = new Date();
  const [isModalShowing, setIsModalShowingState] = useState(false);
  const [isPopoverShowing, setIsPopoverShowingState] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  function increaseProgress() {
    setProgressValue((prevProgValue) => prevProgValue + 10);
  }
  function decreaseProgress() {
    setProgressValue((prevProgValue) => prevProgValue - 10);
  }
  function resetProgress() {
    setProgressValue(0);
  }

  const defOption = [
    {
      value: 'norge',
      label: 'Norge',
    },
    {
      value: 'sverige',
      label: 'Sverige',
    },
  ];

  const options = [
    {
      value: 'norge',
      label: 'Norge',
    },
    {
      value: 'sverige',
      label: 'Sverige',
    },
    {
      value: 'danmark',
      label: 'Danmark',
    },
    {
      value: 'finland',
      label: 'Finland',
    },
    {
      value: 'island',
      label: 'Island',
    },
    {
      value: 'norge1',
      label: 'Norge1',
    },
    {
      value: 'sverige1',
      label: 'Sverige1',
    },
    {
      value: 'danmark1',
      label: 'Danmark1',
    },
    {
      value: 'finland1',
      label: 'Finland1',
    },
    {
      value: 'island1',
      label: 'Island1',
    },
  ];

  let dropdownValue;

  const consoleDropdownVal = () => {
    console.log(dropdownValue);
  };

  const breadcrumbs = [
    {
      url: 'https://elvia.no',
      title: 'Elvia.no',
    },
    {
      url: 'https://www.elvia.no/nettleie',
      title: 'Nettleie',
    },
    {
      url: 'https://www.elvia.no/nettleie/elvias-leveringsplikt',
      title: 'Elvias leveringsplikt',
    },
  ];

  const JSXCarouselElement = () => (
    <div>
      <p>
        Body text comes here and can go over several lines. It looks like this and when it is two. Body text
        comes here and can go over several lines. It looks like this and when it is two.Body text comes here
        and can go over several lines. It looks like this and when it is two.
      </p>
      <Dropdown
        options={options}
        defaultValue={defOption}
        label="test"
        errorMessage=""
        valueOnChange={(event) => (dropdownValue = event)}
        isMulti
      ></Dropdown>
    </div>
  );

  const elements = [
    {
      title: 'Dette er nytt',
      element: (
        <p style={{ color: 'red' }}>
          Body text comes here and can go over several lines. It looks like this and when it is two. Body text
          comes here and can go over several lines. It looks like this and when it is two.Body text comes here
          and can go over several lines. It looks like this and when it is two. Body text comes here and can
          go over several lines. It looks like this and when it is two.
        </p>
      ),
    },
    {
      title: <h4>Hei til ny tariff!</h4>,
      element:
        'Body text comes here and can go over several lines. It looks like this and when it is two. Body text comes here and can go over several lines.',
    },
    {
      title: 'Strømbruddsvarsel',
      element: JSXCarouselElement(),
    },
    {
      element: (
        <img
          draggable="false"
          src="https://images.unsplash.com/photo-1533591917057-a0b77b40de75?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          alt="pride"
          width="300"
          height="300"
        />
      ),
    },
    {
      element: (
        <img
          src="https://animalso.com/wp-content/uploads/2017/11/golden-retriever-husky-mix-4.jpg"
          alt="pride"
          width="300"
          height="300"
        />
      ),
    },
  ];

  const handleOnDelete1 = (event) => {
    const values = [...chipsValues]
    setChipsValues(values.filter(value => value !== event))
  }

  const handleOnDelete2 = (event) => {
    const values = [...deletableChips]
    setDeletableChips(values.filter(data => data.value !== event))
  }

  const [filteredValues, setFilteredValues] = useState({ 2022: false, 2023: false, 2024: true, 2025: false, 2026: true })

  const handleOnValueChange = (event) => {
    setFilteredValues(prevState => ({
      ...prevState,
      [event.value]: event.isSelected
    }))
  }

  const radioFilterOptions =  [
    {
      name: 'All',
    },
    {
      name: 'Read',
    },
    {
      name: 'Unread',
    },
  ]
  const [selectedRadioFilter, setSelectedRadioFilter] = useState('Read')

  return (
    <div className="App">

      <h1>React preview</h1>

      <h2>Breadcrumbs</h2>
      <Breadcrumb breadcrumbs={breadcrumbs} />

      <h2>Box</h2>
      <Box
        hasBorder={true}
        isColored={true}
        title={<h1>Title for the box component</h1>}
        content={<div>Heisann dette er en box component sendt med som node i react</div>}
      ></Box>

      <h2>Modal</h2>
      <button onClick={() => setIsModalShowingState(true)}>Show modal</button>
      <Modal
        isShowing={isModalShowing}
        className="test"
        hasCloseBtn
        onHide={() => setIsModalShowingState(false)}
        title="Title of content"
        illustration={
          <svg width="205" height="220" viewBox="0 0 205 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              opacity="0.05"
              d="M204.718 102C204.718 158.333 158.954 204 102.5 204C46.0468 204 0.282227 158.333 0.282227 102C0.282227 45.667 46.0468 0 102.5 0C158.954 0 204.718 45.667 204.718 102Z"
              fill="white"
            />
            <path
              d="M124.547 141V157.8C124.547 160.77 123.412 163.619 121.392 165.72C119.371 167.82 116.631 169 113.774 169H92.228C89.3709 169 86.6307 167.82 84.6104 165.72C82.5901 163.619 81.4551 160.77 81.4551 157.8V141"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M103.001 166C104.385 166 105.507 166.863 105.507 167.929L105.507 218.071C105.507 219.137 104.385 220 103.001 220C101.618 220 100.496 219.137 100.496 218.071L100.496 167.929C100.496 166.863 101.618 166 103.001 166Z"
              fill="white"
            />
            <path
              d="M124.547 141H81.4552C73.4371 137.037 66.0403 130.9 61.3718 123.295C56.7033 115.691 54.2871 106.928 54.4013 98.0158C54.5711 88.1655 57.6989 78.6627 63.2826 70.6866L81.4618 63L86.7826 71.8296L100.971 63L109.333 95.0389L125.802 71.8296L128.082 88.4798L146.544 77.1482C149.717 83.5832 151.47 90.6894 151.6 97.9871C151.72 106.904 149.307 115.673 144.638 123.283C139.969 130.894 132.57 137.035 124.547 141Z"
              fill="#E9E9E9"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M91.4211 110.816C90.5571 110.454 89.6067 110.36 88.6898 110.544C87.7729 110.728 86.9301 111.183 86.2682 111.852C85.6062 112.52 85.1549 113.373 84.9721 114.302C84.7892 115.23 84.8831 116.193 85.2417 117.068C85.6003 117.942 86.2073 118.689 86.9853 119.214C87.7632 119.739 88.6773 120.019 89.612 120.019H94.343V115.236C94.343 114.289 94.065 113.363 93.5446 112.576C93.0242 111.79 92.2851 111.177 91.4211 110.816ZM97.7689 120.019V115.236C97.7689 113.608 97.2911 112.016 96.3954 110.662C95.4996 109.308 94.2259 108.251 92.7349 107.627C91.2439 107.004 89.603 106.84 88.0199 107.158C86.4367 107.477 84.9831 108.262 83.8427 109.414C82.7022 110.566 81.9261 112.033 81.6117 113.63C81.2973 115.226 81.4586 116.882 82.0754 118.386C82.6923 119.89 83.7371 121.177 85.0786 122.082C86.4201 122.988 87.9978 123.471 89.612 123.471H94.343V141.274C94.343 142.227 95.1099 143 96.056 143C97.002 143 97.7689 142.227 97.7689 141.274V123.471H107.231V141.274C107.231 142.227 107.998 143 108.944 143C109.89 143 110.657 142.227 110.657 141.274V123.471H115.388C117.002 123.471 118.58 122.988 119.921 122.082C121.263 121.177 122.308 119.89 122.924 118.386C123.541 116.882 123.703 115.226 123.388 113.63C123.074 112.033 122.298 110.566 121.157 109.414C120.017 108.262 118.563 107.477 116.98 107.158C115.397 106.84 113.756 107.004 112.265 107.627C110.774 108.251 109.5 109.308 108.605 110.662C107.709 112.016 107.231 113.608 107.231 115.236V120.019H97.7689ZM110.657 120.019H115.388C116.323 120.019 117.237 119.739 118.015 119.214C118.793 118.689 119.4 117.942 119.758 117.068C120.117 116.193 120.211 115.23 120.028 114.302C119.845 113.373 119.394 112.52 118.732 111.852C118.07 111.183 117.227 110.728 116.31 110.544C115.393 110.36 114.443 110.454 113.579 110.816C112.715 111.177 111.976 111.79 111.455 112.576C110.935 113.363 110.657 114.289 110.657 115.236V120.019Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M99.0053 44.2777C99.8637 43.659 101.062 43.8518 101.682 44.7084L107.118 52.2177C107.738 53.0743 107.545 54.2703 106.687 54.8891C105.828 55.5078 104.63 55.315 104.01 54.4584L98.5737 46.9491C97.9537 46.0925 98.1469 44.8965 99.0053 44.2777Z"
              fill="#29D305"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M124.832 41.662C125.847 41.9604 126.428 43.0241 126.129 44.0378L123.607 52.5855C123.308 53.5992 122.242 54.179 121.227 53.8806C120.211 53.5821 119.63 52.5185 119.929 51.5048L122.451 42.9571C122.75 41.9434 123.816 41.3636 124.832 41.662Z"
              fill="#29D305"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M142.585 54.0189C143.236 54.8526 143.086 56.0548 142.251 56.704L135.409 62.0203C134.573 62.6695 133.368 62.5199 132.718 61.6862C132.067 60.8525 132.217 59.6503 133.053 59.0011L139.894 53.6848C140.73 53.0356 141.935 53.1851 142.585 54.0189Z"
              fill="#29D305"
            />
          </svg>
        }
        primaryButton={
          <button onClick={() => setIsModalShowingState(false)} className="e-btn e-btn--primary e-btn--lg">
            Primary action
          </button>
        }
        secondaryButton={
          <button onClick={() => setIsModalShowingState(false)} className="e-btn e-btn--secondary e-btn--lg">
            Cancel
          </button>
        }
        content={
          <>
            <div>
              Body text comes here and can go over several lines. It looks like this when it is two lines.
            </div>
            <div>
              Body text comes here and can go over several lines. It looks like this when it is two lines.
            </div>
            <div>
              Body text comes here and can go over several lines. It looks like this when it is two lines.
            </div>
            <div>
              Body text comes here and can go over several lines. It looks like this when it is two lines.
            </div>
            <div>
              Body text comes here and can go over several lines. It looks like this when it is two lines.
            </div>
            <div>
              Body text comes here and can go over several lines. It looks like this when it is two lines.
            </div>
            <div>
              Body text comes here and can go over several lines. It looks like this when it is two lines.
            </div>
            <div>
              Body text comes here and can go over several lines. It looks like this when it is two lines.
            </div>
          </>
        }
      >
      </Modal>

      <div>
        <button
          onClick={() => {
            setChipsValues(values => [...values, `20${Math.floor(Math.random() * 30) + 1}`])
          }
          }
        >
          Add chip
        </button>
      </div>
      <div>
      <div>
      <h1>Radio filter</h1>
      <RadioFilter 
        items={radioFilterOptions} 
        ariaLabel={`${selectedRadioFilter} filtrering valgt`}
        valueOnChange={selected => {
          setSelectedRadioFilter(selected)
        }}
        value={selectedRadioFilter}
        name={'radioFilterTest'}
        >
          </RadioFilter>
      </div>
      </div>
      <div>
        <h1>Test av chip</h1>
        <button onClick={() => setChipSelected(!chipSelected)}>TEST</button>
        <Chip
          type="legend"
          valueOnChange={(e) => {
            setChipSelected(!chipSelected)
          }}
          selected={chipSelected}
          value="Test">
        </Chip>
        <hr></hr>
      </div>

      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {chipsValues.map(value => (
          <Chip value={value} onDelete={handleOnDelete1}>
          </Chip>
        ))
        }
      </div>
      Deletable Chips
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {deletableChips.map(data => (
          <Chip value={data.value} color={data.color} disabled={data.disabled} ariaLabel={`Fjern filtreringen for ${data.value}`} onDelete={handleOnDelete2}>
          </Chip>
        ))
        }
      </div>
      Clickable Chips
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {clickableChips.map(data => (
          <Chip value={data.value} color={data.color} selected={data.selected} disabled={data.disabled} type='legend' valueOnChange={handleOnValueChange}>
          </Chip>
        ))
        }
      </div>
      Filters to apply: {`${Object.keys(filteredValues).filter(chip => filteredValues[chip])}`}

      <div style={{ margin: '40px 0' }}>
        <h2>Clickable chip initally checkmark</h2>
        <Chip value="Clickable3" type='choice' selected valueOnChange={setChipValue}>
        </Chip>
      </div>
      <div>{"Selected chip: "}</div>
      <div>{chipValue.isSelected ? chipValue.value : ''}</div>


      <h2>Dropdown</h2>
      <button onClick={consoleDropdownVal}>Console dropdown value</button>
      <div style={{ marginTop: '24px' }}>
        <Dropdown
          options={options}
          defaultValue={defOption}
          label="test"
          errorMessage=""
          valueOnChange={(event) => (dropdownValue = event)}
          isMulti
        ></Dropdown>
      </div>
      <div style={{ margin: '40px 0' }}>
        <h2>Carousel component</h2>
        <Carousel elements={elements} valueOnChange={setSelectedState}></Carousel>
      </div>
      <div style={{ margin: '40px 0' }}>
        <h2>Carousel component with hidden arrows and onboarding checkmark</h2>
        <Carousel
          elements={elements}
          valueOnChange={setSelectedState}
          hideArrows
          useOnboardingCheckmark
        ></Carousel>
      </div>
      <div style={{ margin: '40px 0' }}>
        <h2>Without elements</h2>
        <Carousel elements={elements.length} valueOnChange={setSelectedState}></Carousel>
      </div>
      <div style={{ margin: '40px 0' }}>
        <h2>Without elements and hidden arrows</h2>
        <Carousel elements={elements.length} valueOnChange={setSelectedState} hideArrows></Carousel>
      </div>
      <div>{'Selected page: ' + selectedState.toString()}</div>

      <h2>Date picker</h2>
      <div
        style={{
          marginTop: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Datepicker
          isRequired
          minDate={dateCurr}
          valueOnChange={(dateCurr) => console.log(dateCurr)}
        ></Datepicker>
        <Datepicker maxDate={dateCurr}></Datepicker>
        <Datepicker minDate={dateCurr}></Datepicker>
        <Datepicker isFullWidth id="datepicker1" customError="Error"></Datepicker>
        <Datepicker isDisabled={true} valueOnChange={(dateCurr) => console.log(dateCurr)}></Datepicker>
        <Datepicker isCompact={true} valueOnChange={(dateCurr) => console.log(dateCurr)}></Datepicker>
      </div>

      <div style={{ margin: '40px 0' }}>
        <TestingComponent></TestingComponent>
      </div>

      <hr style={{ margin: '40px 0' }} />
      <h2>Divider</h2>
      <div style={{ marginBottom: '16px', padding: '8px' }}>
        <Divider />
      </div>
      <div style={{ marginBottom: '16px', padding: '8px' }}>
        <Divider title={<h2>Dette er en</h2>} type="title" typography="caps" />
      </div>
      <div style={{ marginBottom: '16px', padding: '8px' }}>
        <Divider type="curved" />
      </div>
      <div style={{ background: '#262626', padding: '8px' }}>
        <Divider isInverted />
      </div>
      <div style={{ background: '#262626', padding: '8px' }}>
        <Divider title="Dette er en tittel" type="title" isInverted />
      </div>
      <div style={{ background: '#262626', padding: '8px' }}>
        <Divider type="curved" isInverted />
      </div>

      <h2>Accordion</h2>
      <div style={{ marginTop: '24px', marginBottom: '24px' }}>
        <Accordion
          labelPosition="center"
          type="overflow"
          openLabel="open"
          size="large"
          closeLabel="close"
          content="Bacon ipsum dolor amet pork loin bacon jowl turkey. Biltong sausage swine, shankle venison hamburger alcatra spare ribs bacon ham ribeye strip steak. Swine capicola picanha kevin drumstick. Chuck landjaeger pastrami, cow shoulder boudin short loin leberkas t-bone turkey prosciutto jowl. Turkey tail tongue cow shankle chicken tri-tip swine. Prosciutto pig ball tip kielbasa hamburger picanha pork chop tongue chicken shankle short loin filet mignon. T-bone shankle capicola, shoulder hamburger pancetta cupim chuck meatloaf turducken porchetta rump sausage strip steak ribeye."
        ></Accordion>
      </div>

      <h3>Custom Accordion content</h3>
      <div style={{ marginTop: '24px', marginBottom: '24px' }}>
        <Accordion
          type="normal"
          position="center"
          content={
            <div>
              <div style={{ color: 'white' }}>Hello!</div>
              <div style={{ color: 'green' }}>Is</div>
              <div style={{ color: 'black' }}>It</div>
              <div style={{ color: 'purple' }}>Me</div>
              <div style={{ color: 'yellow' }}>You´re</div>
              <div style={{ color: 'blue' }}>Looking</div>
              <div style={{ color: 'red' }}>For</div>
            </div>
          }
        ></Accordion>
      </div>

      <h2>Tabs</h2>
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
        <Tabs items={items} value={2} valueOnChange={setSelectedState}></Tabs>
        <div>{selectedState.toString()}</div>
      </div>

      <hr style={{ margin: '40px 0' }} />
      <hr style={{ margin: '40px 0' }} />

      <h2>Popover</h2>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Popover
          header="BankID"
          content={
            <div
              style={{
                boxSizing: 'border-box',
                padding: '50px',
                width: '100%',
                border: '2px dashed lightgray',
              }}
            >
              Custom content custom content custom content custom content
              <Tabs items={items} value={2} valueOnChange={setSelectedState}></Tabs>
              <button onClick={() => setIsPopoverShowingState(false)}>Close</button>
            </div>
          }
          trigger={<button>Right top</button>}
          posX="right"
          isShowing={isPopoverShowing}
          isShowingOnChange={(value) => setIsPopoverShowingState(value)}
        ></Popover>
        <span style={{ marginTop: '16px' }}>
          <Popover
            header="BankID"
            content={
              <div
                style={{
                  boxSizing: 'border-box',
                  padding: '50px',
                  width: '100%',
                  border: '2px dashed lightgray',
                }}
              >
                Custom content custom content custom content custom content
                <Tabs items={items} value={2} valueOnChange={setSelectedState}></Tabs>
              </div>
            }
            trigger={<button>Right top</button>}
            posX="right"
          ></Popover>
        </span>
        <div style={{ marginTop: '16px' }}>
          <Popover
            content="Alle privatkunder må bruke BankID."
            trigger={<button>Left top</button>}
            posX="left"
            noTitle="true"
          ></Popover>
        </div>
        <div style={{ marginTop: '16px' }}>
          <Popover
            header="BankID"
            content="Alle privatkunder må bruke BankID første gang de logger inn på Min side."
            trigger={<button>Center top</button>}
            hasCloseBtn={false}
          ></Popover>
        </div>
      </div>
      <div style={{ marginTop: '16px' }}>
        <Popover
          content="Alle privatkunder må bruke BankID første gang."
          trigger={<button>Center bottom</button>}
          hasCloseBtn={false}
          posY="bottom"
        ></Popover>
      </div>
      <div style={{ marginTop: '16px' }}>
        <Popover
          header="BankID"
          content="Alle privatkunder må bruke BankID første gang."
          trigger={<button>Right bottom</button>}
          posY="bottom"
          posX="right"
        ></Popover>
      </div>
      <div style={{ marginTop: '16px' }}>
        <Popover
          content={
            <div
              style={{
                boxSizing: 'border-box',
                padding: '50px',
                width: '100%',
                border: '2px dashed lightgray',
              }}
            >
              Custom content custom content custom content custom content
              <Tabs items={items} value={2} valueOnChange={setSelectedState}></Tabs>
            </div>
          }
          trigger={<button>Left bottom</button>}
          posY="bottom"
          posX="left"
        ></Popover>
      </div>

      <h2>Progressbar</h2>

      <ProgressLinear value={progressValue}></ProgressLinear>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
        <button onClick={increaseProgress}>Increase</button>
        <button onClick={decreaseProgress}>Decrease</button>
        <button onClick={resetProgress}>reset</button>
      </div>
      <div>{progressValue}</div>

      <h2>Progressbar indeterminate</h2>

      <div>
        <ProgressLinear isIndeterminate></ProgressLinear>
      </div>
      <h2>Progressbar Error</h2>

      <div>
        <ProgressLinear isError></ProgressLinear>
      </div>
    </div>
  );
}

export default App;
