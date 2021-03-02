import React, { ElementConfig } from 'react';
// import './style.scss';
// import classnames from 'classnames';
import Select, { components } from 'react-select';

export interface DropdownOptions {
  value: string;
  label?: string;
}

export interface DropdownProps {
  options: DropdownOptions[];
  placeholder: string;
  isDisabled: boolean;
  label: string;
  // Todo: bring iscompact classes with props
  // isCompact?: boolean;
  isMulti: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = 'Placeholder',
  isDisabled = false,
  label = 'Label',
  // Todo: bring iscompact classes with props
  // isCompact,
  isMulti = false,
}) => {
  // Custom styling
  const customElviaStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20,
    }),
  };

  // Custom components for Elvia dropdown
  const ElviaDropdownIndicator = (props: ElementConfig<typeof components.DropdownIndicator>) => {
    return (
      <components.DropdownIndicator {...props}>
        <span className="ewc-dropdown__icon">
          <i
            className="ewc-icon"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.476 5.994a.75.75 0 011.06.012L12 16.707 22.464 6.006a.75.75 0 011.072 1.048l-10.481 10.72A1.483 1.483 0 0112 18.22a1.469 1.469 0 01-1.055-.445L.464 7.054a.75.75 0 01.012-1.061z' fill='black'/%3e%3c/svg%3e")`,
              height: '24px',
              width: '24px',
            }}
          ></i>
        </span>
      </components.DropdownIndicator>
    );
  };

  // const ELviaInput = ({children, ...props}) => {
  //   return (
  //     <components.Input

  //   )
  // }

  const ElviaOption = ({ children, ...props }) => {
    if (!isMulti) {
      return <components.Option {...props}>{children}</components.Option>;
    } else {
      return (
        <components.Option {...props}>
          <label className="e-checkbox">
            <input type="checkbox" readOnly />
            <span className="e-checkbox__mark"></span>
            <span className="e-checkbox__label"> {children}</span>
          </label>
        </components.Option>
      );
    }
  };

  const newValueContainer = ({ children, ...props }) => {
    if (!isMulti) {
      return <components.ValueContainer {...props}>{children}</components.ValueContainer>;
    } else {
      const { getValue } = props;
      const selectedOtions = getValue().length;

      if (selectedOtions <= 1) {
        return <components.ValueContainer {...props}>{children}</components.ValueContainer>;
      } else {
        return <components.ValueContainer {...props}>{`${selectedOtions} valgte`}</components.ValueContainer>;
      }
    }
  };

  // Object containing all components overriden in react-select by Elvis dropdown
  const overRideComponents = {
    DropdownIndicator: ElviaDropdownIndicator,
    Option: ElviaOption,
    ValueContainer: newValueContainer,
    IndicatorSeparator: () => null,
    ClearIndicator: () => null,
  };

  return (
    <span>
      <div>
        {/* <div className={classes}> */}
        {/* <label className="ewc-dropdown__label">{label} </label> */}
        <label>{label} </label>
        <Select
          styles={customElviaStyles}
          isSearchable={false}
          components={overRideComponents}
          options={options}
          placeholder={placeholder}
          isDisabled={isDisabled}
          hideSelectedOptions={false}
          closeMenuOnSelect={!isMulti}
          isMulti={isMulti}
        ></Select>
      </div>
    </span>
  );
};

export default Dropdown;
