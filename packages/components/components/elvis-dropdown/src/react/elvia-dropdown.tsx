import React, { useState, useEffect, useRef } from 'react';
import Select, { components } from 'react-select';
import './style.scss';
import classnames from 'classnames';
import toolbox from '@elvia/elvis-toolbox';

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
  const [currentVal, setCurrentVal] = useState();
  // custom handling for opening dropdown with keydown on "Enter"
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
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor:
        '#ffffff' && state.isFocused ? '#F4F4F4' : '#ffffff' && state.isSelected ? '#E9E9E9' : '#ffffff',
      height: isCompact ? '36px' : '48px',
      color: '#000000',
      paddingLeft: isCompact ? '9px' : '15px',
      alignItems: 'center',
      fontSize: isCompact ? '14px' : '16px',
      border: '1px solid transparent',
      '&:hover': {
        backgroundColor: '#F4F4F4',
      },
      cursor: 'pointer',
      overflowX: 'hidden',
      textOverflow: 'ellipsis',
    }),
    menuList: (provided: any) => ({
      ...provided,
      maxHeight: isCompact ? '181px' : '241px',
      padding: '0',
      zIndex: 10,
    }),

    container: (provided: any) => ({
      ...provided,
      maxWidth: '400px',
    }),

    control: () => ({
      borderRadius: '4px',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      border: isDisabled
        ? '1px solid #BDBDBD'
        : '1px solid #000000' && isError
        ? '2px solid #FF0000'
        : '1px solid #000000',
      backgroundColor: isDisabled ? '#FFFFFF' : '#FFFFFF',
      cursor: 'pointer',
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

    menu: (provided: any) => ({
      ...provided,
      boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.06);',
      zIndex: 10,
    }),

    multiValue: (provided: any) => ({
      ...provided,
      margin: '0px',
      background: '#ffffff',
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

    indicatorsContainer: (provided: any) => ({
      ...provided,
      paddingTop: isCompact ? '7px' : '13px',
      paddingBottom: isCompact ? '7px' : '13px',
      paddingRight: isCompact ? '11px' : '15px',
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      height: isCompact ? '16px' : '20px',
      width: isCompact ? '16px' : '20px',
      padding: '0px',
      transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
      transition: 'transform 250ms',
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
      margin: '0px',
      color: '#000',
      maxWidth: 'calc(100% - 20px)',
    }),
  };

  // Custom components for Elvia dropdown
  const ElviaDropdownIndicator = ({ ...props }) => {
    const Icon = isDisabled
      ? `url("data:image/svg+xml,%3csvg width='24' height='24' fill=' % 23BDBDBD' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.476 5.994a.75.75 0 011.06.012L12 16.707 22.464 6.006a.75.75 0 011.072 1.048l-10.481 10.72A1.483 1.483 0 0112 18.22a1.469 1.469 0 01-1.055-.445L.464 7.054a.75.75 0 01.012-1.061z' fill='%23BDBDBD'/%3e%3c/svg%3e")`
      : `url("data:image/svg+xml,%3csvg width='24' height='24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M.476 5.994a.75.75 0 011.06.012L12 16.707 22.464 6.006a.75.75 0 011.072 1.048l-10.481 10.72A1.483 1.483 0 0112 18.22a1.469 1.469 0 01-1.055-.445L.464 7.054a.75.75 0 01.012-1.061z' fill='black'/%3e%3c/svg%3e")`;
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
    updateReactComponent();
    updateWebcomponent();
  }, [currentVal]);

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
