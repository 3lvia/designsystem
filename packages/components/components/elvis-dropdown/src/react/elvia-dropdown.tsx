import * as React from 'react';
import './style.scss';
// import classnames from 'classnames';
import Select from 'react-select';
// import { useState } from 'react';

export interface DropdownProps {
  test: string;
}

const Dropdown: React.FC<DropdownProps> = ({ test }) => {
  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      border: '2px solid green',
      color: state.isSelected ? 'pink' : 'black',
    }),

    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20,
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

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
      <Select isSearchable={false} styles={customStyles} options={options}></Select>

      <div>{test}</div>
    </div>
  );
};

export default Dropdown;
