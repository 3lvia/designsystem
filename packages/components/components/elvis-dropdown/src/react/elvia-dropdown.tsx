import * as React from 'react';
import './style.scss';
// import classnames from 'classnames';
import Select from 'react-select';
// import { useState } from 'react';

export interface DropdownOptions {
  value: string;
  label: string;
}

export interface DropdownProps {
  isSearchable: boolean;
  options: DropdownOptions[];
}

const Dropdown: React.FC<DropdownProps> = ({ isSearchable = false, options }) => {
  return (
    <Select
      isSearchable={isSearchable}
      options={options}
      className={'react-select-container'}
      classNamePrefix="react-select"
      // menuIsOpen
    ></Select>
  );
};

export default Dropdown;
