import React, { useState, useEffect, useRef } from 'react';
import Select, { components } from 'react-select';
import classnames from 'classnames';
import toolbox from '@elvia/elvis-toolbox';
import './style.scss';

export interface DropdownOptions {
  value: string;
  label: string;
}

export interface DropdownProps {
  isCompact: boolean;
  isDisabled: boolean;
  isError: boolean;
  isMulti: boolean;
  label?: string;
  options: DropdownOptions[];
  placeholder: string;
  valueOnChange: (selectedOptions: DropdownOptions | Array<DropdownOptions> | undefined) => void;
  webcomponent?: any;
}

// custom ValueContainer for Elvia Dropdown
// defined outside of Dropdown due to focus issues with react-select package
const ElviaValueContainer = ({ ...props }) => {
  const length = props.children[0].length;
  const selectedOptions = [...props.children];
  if (length >= 2) {
    selectedOptions[0] = `${length} valgte`;
  }
  return <components.ValueContainer {...props}>{selectedOptions}</components.ValueContainer>;
};

const Dropdown: React.FC<DropdownProps> = ({
  isCompact = false,
  isDisabled = false,
  isError = false,
  isMulti = false,
  label,
  options,
  placeholder = 'Placeholder',
  valueOnChange,
  webcomponent,
}) => {
  const [currentVal, setCurrentVal] = useState();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLSpanElement>(null);

  // handle focus on dropdown, running on first render only (on mount)
  useEffect(() => {
    // Start outline listener
    toolbox.outlineListener(dropdownRef.current);

    return () => {
      // Remove outline listener
      toolbox.outlineListener(dropdownRef.current, true);
    };
  }, []);

  // styling for custom Elvia labels
  const classes = classnames({
    ['ewc-dropdown']: !isCompact,
    ['ewc-dropdown ewc-dropdown--compact']: isCompact,
    ['ewc-dropdown ewc-dropdown--disabled']: isDisabled,
  });

  // Custom styling for react-select
  const customElviaStyles = {
    container: (provided: any) => ({
      ...provided,
      maxWidth: '400px',
    }),

    control: () => ({
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: isDisabled ? '#FFFFFF' : '#FFFFFF',
      borderRadius: '4px',
      border: isDisabled
        ? '1px solid #BDBDBD'
        : '1px solid #000000' && isError
        ? '2px solid #FF0000'
        : '1px solid #000000',
      maxHeight: isCompact ? '33px' : '48px',
      minHeight: isCompact ? '33px' : '48px',
      minWidth: '264px',
      marginBottom: '0px',
      padding: !isError ? '1px' : '0px',
      cursor: 'pointer',
      boxShadow: '0',
      '&:hover': {
        border: '2px solid #29d305',
        padding: '0px',
      },
    }),

    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      height: isCompact ? '16px' : '20px',
      width: isCompact ? '16px' : '20px',
      padding: '0px',
      transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
      transition: 'transform 250ms',
    }),

    indicatorsContainer: (provided: any) => ({
      ...provided,
      paddingTop: isCompact ? '7px' : '13px',
      paddingBottom: isCompact ? '7px' : '13px',
      paddingRight: isCompact ? '11px' : '15px',
    }),

    menu: (provided: any) => ({
      ...provided,
      boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.06);',
      zIndex: 10,
    }),

    menuList: (provided: any) => ({
      ...provided,
      maxHeight: isCompact ? '181px' : '241px',
      padding: '0',
      zIndex: 10,
    }),

    multiValue: (provided: any) => ({
      ...provided,
      background: '#ffffff',
      margin: '0px',
    }),

    multiValueLabel: (provided: any) => ({
      ...provided,
      fontFamily: 'Red Hat Text',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: '16px',
      lineHeight: '22px',
      color: '#000',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
    }),

    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor:
        '#ffffff' && state.isFocused ? '#F4F4F4' : '#ffffff' && state.isSelected ? '#E9E9E9' : '#ffffff',
      color: '#000000',
      height: isCompact ? '36px' : '48px',
      paddingLeft: isCompact ? '9px' : '15px',
      fontSize: isCompact ? '14px' : '16px',
      border: '1px solid transparent',
      cursor: 'pointer',
      overflowX: 'hidden',
      textOverflow: 'ellipsis',
      '&:hover': {
        backgroundColor: '#F4F4F4',
      },
    }),

    placeholder: (provided: any) => ({
      ...provided,
      fontFamily: 'Red Hat Text',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: isCompact ? '14px' : '16px',
      lineHeight: '22px',
      color: isDisabled ? '#BDBDBD' : '#676767',
      margin: '0px',
    }),

    singleValue: (provided: any) => ({
      ...provided,
      color: '#000',
      margin: '0px',
      maxWidth: 'calc(100% - 20px)',
    }),

    valueContainer: (provided: any) => ({
      ...provided,
      display: 'flex',
      color: '#000',
      fontFamily: 'Red Hat Text',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: '16px',
      lineHeight: '22px',
      paddingLeft: isCompact ? '8px' : '15px',
    }),
  };

  // Custom components for Elvia dropdown
  const ElviaDropdownIndicator = ({ ...props }) => {
    const Icon = isDisabled
      ? `url("data:image/svg+xml,%3csvg width='24' height='24' fill='%23BDBDBD' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.389 5.869a1.328 1.328 0 011.878 0L12 15.6l9.733-9.732a1.328 1.328 0 011.878 1.878L13.443 17.915h-.001a2.04 2.04 0 01-2.885 0L.39 7.747a1.328 1.328 0 010-1.878z' fill='%23BDBDBD'/%3e%3c/svg%3e")`
      : `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.389 5.869a1.328 1.328 0 011.878 0L12 15.6l9.733-9.732a1.328 1.328 0 011.878 1.878L13.443 17.915h-.001a2.04 2.04 0 01-2.885 0L.39 7.747a1.328 1.328 0 010-1.878z' fill='black'/%3e%3c/svg%3e")`;
    return (
      <components.DropdownIndicator {...props}>
        <i
          style={{
            backgroundImage: Icon,
            height: isCompact ? '16px' : '20px',
            width: isCompact ? '16px' : '20px',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: 'inline-block',
          }}
        ></i>
      </components.DropdownIndicator>
    );
  };

  const ElviaOption = ({ ...props }) => {
    if (isMulti) {
      return (
        <components.Option {...props}>
          <label
            className={
              isCompact ? 'ewc-dropdown-checkbox ewc-dropdown-checkbox--sm' : 'ewc-dropdown-checkbox '
            }
          >
            <input type="checkbox" readOnly />
            <span className="ewc-dropdown-checkbox__mark"></span>
            <span className="ewc-dropdown-checkbox__label"> {props.children}</span>
          </label>
          <div></div>
        </components.Option>
      );
    }
    return <components.Option {...props}>{props.children}</components.Option>;
  };

  // Object containing all components overriden in react-select by Elvis dropdown
  const overRideComponents = {
    DropdownIndicator: ElviaDropdownIndicator,
    Option: ElviaOption,
    ValueContainer: ElviaValueContainer,
    IndicatorSeparator: () => null,
    ClearIndicator: () => null,
    MultiValueRemove: () => null,
  };

  // set  selected options as current values
  const onChangeHandler = (event: any) => {
    setCurrentVal(event);
  };

  useEffect(() => {
    updateValue();
  }, [currentVal]);

  const updateValue = () => {
    if (!webcomponent && valueOnChange) {
      valueOnChange(currentVal);
    }
    if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: currentVal }, true);
    }
    return;
  };

  return (
    <span className={classes} ref={dropdownRef}>
      <label className="ewc-dropdown__label" style={{ color: isDisabled ? '#BDBDBD' : '#000000' }}>
        {label}
      </label>
      <Select
        classNamePrefix={'ewc-dropdown'}
        closeMenuOnSelect={!isMulti}
        components={overRideComponents}
        hasValue={false}
        hideSelectedOptions={false}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isSearchable={false}
        noOptionsMessage={() => 'Ingen tilgjengelige valg'}
        placeholder={placeholder}
        onChange={onChangeHandler}
        menuIsOpen={menuIsOpen}
        onKeyDown={(event) => {
          if (event.code === 'Enter' && !menuIsOpen) {
            setMenuIsOpen(true);
          }
        }}
        onMenuClose={() => setMenuIsOpen(false)}
        onMenuOpen={() => setMenuIsOpen(true)}
        options={options}
        styles={customElviaStyles}
      ></Select>
    </span>
  );
};

export default Dropdown;
