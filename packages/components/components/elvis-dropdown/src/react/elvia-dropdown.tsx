import * as React from 'react';
import './style.scss';
// import classnames from 'classnames';
import Select from 'react-select';
// import { useState } from 'react';

export interface DropdownProps {
  test: string;
}

const Dropdown: React.FC<DropdownProps> = ({ test }) => {
  // const customStyles = {

  //   clearIndicator: (provided: any, state: any) => ({
  //     ...provided,
  //     // position: 'relative',
  //     // boxSizing: 'border- box',
  //     // border: '2px solid #29d305',
  //     // color: '#000000'
  //   }),
  //   container: (provided: any, state: any) => ({
  //     ...provided,
  //     position: 'relative',
  //     boxSizing: 'border- box',
  //     // border: '2px solid #29d305',
  //     // color: '#000000'
  //   }),

  //   control: (provided: any, state: any) => ({
  //     ...provided,
  //     border: '2px solid green',
  //     color: state.isSelected ? 'pink' : 'black',
  //     alignItems: 'center',
  //     backgroundColor: 'hsl(0, 0 %, 100 %)',
  //     borderColor: 'hsl(0, 0 %, 80 %)',
  //     borderRadius: '4px',
  //     borderStyle: 'solid',
  //     borderWidth: '1px',
  //     cursor: 'default',
  //     display: 'flex',
  //     flexWrap: 'wrap',
  //     justifyContent: 'space-between',
  //     minHeight: '38px',
  //     outline: '0!important',
  //     position: 'relative',
  //     transition: 'all 100ms',
  //     boxSizing: 'border - box',
  //     ':hover': {
  //       borderColor: 'yellow'
  //     }
  //   }),

  //   dropdownIndicator: (provided: any, state: any) => ({
  //     ...provided,

  //   }),
  //   group: (provided: any, state: any) => ({
  //     ...provided,

  //   }),
  //   groupHeading: (provided: any, state: any) => ({
  //     ...provided,

  //   }),
  //   indicatorsContainer: (provided: any, state: any) => ({
  //     ...provided,

  //   }),
  //   indicatorSeparator: (provided: any, state: any) => ({
  //     ...provided,

  //   }),
  //   input: (provided: any, state: any) => ({
  //     ...provided,

  //   }),
  //   loadingIndicator: (provided: any, state: any) => ({
  //     ...provided,

  //   }),
  //   loadingMessage: (provided: any, state: any) => ({
  //     ...provided,

  //   }),
  //   menu: (provided: any, state: any) => ({
  //     ...provided,

  //   }),
  //   menuList: (provided: any, state: any) => ({
  //     ...provided,

  //   }),
  //   menuPortal: (provided: any, state: any) => ({
  //     ...provided,

  //   }),
  //   multiValue: (provided: any, state: any) => ({
  //     ...provided,

  //   }),
  //   multiValueLabel: (provided: any, state: any) => ({
  //     ...provided,

  //   }),
  //   multiValueRemove: (provided: any, state: any) => ({
  //     ...provided,

  //   }),
  //   noOptionsMessage: (provided: any, state: any) => ({
  //     ...provided,

  //   }),
  //   option: (provided: any, state: any) => ({
  //     ...provided,

  //   }),
  //   placeholder: () => ({
  //     color: 'red'
  //   }),
  //   singleValue: (provided: any, state: any) => {
  //     const opacity = state.isDisabled ? 0.5 : 1;
  //     const transition = 'opacity 300ms';

  //     return { ...provided, opacity, transition };
  //   },
  //   valueContainer: (provided: any, state: any) => ({
  //     ...provided,

  //   }),

  // };

  // const dropdownOptionsObject = options.map(dropdownOptions => {
  //   value: dropdownOptions.returnValue || dropdownOptions.name,
  //   label: dropdownOptions.name,
  //   // tonedown? from kundeweb
  // });

  // const classes = classnames({
  // });

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  return (
    <div>
      <Select
        isSearchable={false}
        options={options}
        className={'react-select-container'}
        classNamePrefix="react-select"
      ></Select>

      <div>{test}</div>
    </div>
  );
};

export default Dropdown;
