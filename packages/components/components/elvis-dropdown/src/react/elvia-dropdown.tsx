import React, { ElementConfig, useEffect } from 'react';
import Select, { components } from 'react-select';
import './style.scss';
import classnames from 'classnames';
import { useState } from 'react';

export interface DropdownOptions {
  value: string;
  label: string;
}

export interface DropdownProps {
  options: DropdownOptions[];
  placeholder: string;
  label?: string;
  isDisabled: boolean;
  isCompact: boolean;
  isMulti: boolean;
  isError: boolean;
  valueOnChange: (selectedOptions: DropdownOptions | Array<DropdownOptions> | undefined) => void;
  webcomponent?: any;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = 'Placeholder',
  isDisabled = false,
  label,
  isCompact = false,
  isMulti = false,
  isError = false,
  valueOnChange,
  webcomponent,
}) => {
  // handle rotation of dropdown arrow
  const [currentVal, setCurrentVal] = useState();
  const [isMenuOpen, setMenuOpen] = useState(false);

  // styling for custom Elvia labels
  const classes = classnames({
    ['ewc-dropdown']: !isCompact,
    ['ewc-dropdown ewc-dropdown--compact']: isCompact,
  });

  // Custom styling
  const customElviaStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      background: state.isSelected ? '#E9E9E9' : state.isFocused ? '#F4F4F4' : '#ffffff',
      height: isCompact ? '36px' : '48px',
      color: '#000000',
      paddingLeft: '16px',
      display: 'flex',
      alignItems: 'center',
      fontSize: isCompact ? '14px' : '16px',
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: '#F4F4F4',
      },
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: isCompact ? '181px' : '241px',
      padding: '0',
    }),

    container: (provided: any) => ({
      ...provided,
      maxWidth: '400px',
    }),

    control: (provided: any) => ({
      ...provided,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      border: !isError ? '1px solid black' : '2px solid #FF0000',
      maxHeight: isCompact ? '33px' : '48px',
      minHeight: isCompact ? '33px' : '48px',
      minWidth: '264px',
      marginBottom: '0px',
      padding: !isError ? '1px' : '0px',
      boxShadow: '0',
      '&:hover': {
        border: '2px solid #29d305',
        padding: '0px',
      },
      '&:focus': {
        border: '2px solid #29d305',
        padding: '0px',
      },
    }),

    valueContainer: () => ({
      display: 'flex',
      paddingLeft: '15px',
      fontFamily: 'Red Hat Text',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: '16px',
      lineHeight: '22px',
    }),

    menu: (provided: any) => ({
      ...provided,
      boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.06);',
    }),

    multiValue: (provided: any) => ({
      ...provided,
      margin: '0px',
      background: '#ffffff',
    }),

    multiValueLabel: () => ({
      fontFamily: 'Red Hat Text',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: '16px',
      lineHeight: '22px',
    }),

    indicatorsContainer: (provided: any) => ({
      ...provided,
      paddingTop: isCompact ? '7px' : '11px',
      paddingBottom: isCompact ? '7px' : '11px',
    }),
    dropdownIndicator: () => ({
      height: isCompact ? '16px' : '24px',
      width: isCompact ? '16px' : '24px',
      paddingRight: isCompact ? '11px' : '15px',
    }),

    placeholder: (provided: any) => ({
      ...provided,
      fontFamily: 'Red Hat Text',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: isCompact ? '14px' : '16px',
      lineHeight: '22px',
      color: '#676767',
      margin: '0px',
    }),

    singleValue: (provided: any) => ({
      ...provided,
      margin: '0px',
    }),
  };

  // Custom components for Elvia dropdown
  const ElviaDropdownIndicator = (props: ElementConfig<typeof components.DropdownIndicator>) => {
    return (
      <components.DropdownIndicator {...props}>
        <i
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.476 5.994a.75.75 0 011.06.012L12 16.707 22.464 6.006a.75.75 0 011.072 1.048l-10.481 10.72A1.483 1.483 0 0112 18.22a1.469 1.469 0 01-1.055-.445L.464 7.054a.75.75 0 01.012-1.061z' fill='black'/%3e%3c/svg%3e")`,
            height: isCompact ? '16px' : '24px',
            width: isCompact ? '16px' : '24px',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'inline-block',
            transform: isMenuOpen ? 'rotate(180deg)' : 'none',
          }}
        ></i>
      </components.DropdownIndicator>
    );
  };

  const ElviaOption = ({ children, ...props }) => {
    if (!isMulti) {
      return <components.Option {...props}>{children}</components.Option>;
    } else {
      return (
        <components.Option {...props}>
          <label
            className={
              isCompact ? 'ewc-dropdown-checkbox ewc-dropdown-checkbox--sm' : 'ewc-dropdown-checkbox '
            }
          >
            <input type="checkbox" readOnly />
            <span className="ewc-dropdown-checkbox__mark"></span>
            <span className="ewc-dropdown-checkbox__label"> {children}</span>
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
    MultiValueRemove: () => null,
  };

  // set  selected options as current values
  const onChangeHandler = (event: any) => {
    setCurrentVal(event);
  };

  // update react component to emit selected values
  const updateReactComponent = () => {
    if (!webcomponent && valueOnChange) {
      valueOnChange(currentVal);
    }
  };
  // update currentvalue to be emited to webcomp
  const updateWebcomponent = () => {
    if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: currentVal }, true);
    }
  };

  useEffect(() => {
    updateReactComponent();
    updateWebcomponent();
  }, [currentVal]);

  return (
    <span className={classes}>
      <label className="ewc-dropdown__label">{label}</label>
      <Select
        onChange={onChangeHandler}
        classNamePrefix={'ewc-dropdown'}
        components={overRideComponents}
        closeMenuOnSelect={!isMulti}
        hideSelectedOptions={false}
        isDisabled={isDisabled}
        isSearchable={false}
        isMulti={isMulti}
        options={options}
        placeholder={placeholder}
        styles={customElviaStyles}
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
        noOptionsMessage={() => 'Ingen tilgjengelige valg'}
      ></Select>
    </span>
  );
};

export default Dropdown;
