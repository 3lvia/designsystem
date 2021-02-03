import React, { ElementConfig } from 'react';
import './style.scss';
// import classnames from 'classnames';
import Select, { components } from 'react-select';
// import { useState } from 'react';

export interface DropdownOptions {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOptions[];
  placeholder: string
  isDisabled: boolean
}



const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = 'Placeholder',
  isDisabled = false,
}) => {

  const DropdownIndicator = (
    props: ElementConfig<typeof components.DropdownIndicator>
  ) => {
    return (
      <components.DropdownIndicator {...props}>
        <span className="ewc-dropdown__icon">
          <i
            className="ewc-icon ewc-icon--close-bold ewc-icon--xs"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.476 5.994a.75.75 0 011.06.012L12 16.707 22.464 6.006a.75.75 0 011.072 1.048l-10.481 10.72A1.483 1.483 0 0112 18.22a1.469 1.469 0 01-1.055-.445L.464 7.054a.75.75 0 01.012-1.061z' fill='black'/%3e%3c/svg%3e")`,
            }}
          ></i>
        </span>
      </components.DropdownIndicator>
    );
  };

  return (

    <Select
      className={'react-select-container'}
      classNamePrefix="react-select"
      components={{ DropdownIndicator }}
      options={options}
      placeholder={placeholder}
      isDisabled={isDisabled}
    ></Select >

  );
};

export default Dropdown;
