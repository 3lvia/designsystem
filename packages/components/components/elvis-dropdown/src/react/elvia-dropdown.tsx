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
  // necessary for clickevents on dropdown in webcomps
  // const [openMenu, setOpenMenu] = useState(false);
  // const handleOnclick = () => {
  //   setOpenMenu(prevState => !prevState);
  // }

  return (
    // might need listeners outside also with this if the click event does noe work in webcomps.
    // <span onClick={handleOnclick}>
    <Select
      isSearchable={isSearchable}
      options={options}
      className={'react-select-container'}
      classNamePrefix="react-select"
    ></Select>
    // </span>
  );
};

export default Dropdown;
