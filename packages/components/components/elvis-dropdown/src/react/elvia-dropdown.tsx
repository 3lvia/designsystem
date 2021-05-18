import React, { useState, useEffect, useRef } from 'react';
import Select, { components } from 'react-select';
import toolbox from '@elvia/elvis-toolbox';
import * as StyledDropdown from './styledComponents';

export type DropdownMenuPosition = 'top' | 'bottom' | 'auto';
export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  defaultOption?: DropdownOption;
  errorMessage?: string;
  isCompact?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  label?: string;
  labelId?: string;
  menuPosition?: DropdownMenuPosition;
  noOptionsMessage?: string;
  options: DropdownOption[];
  optionOnChange?: (selectedOptions: DropdownOption | Array<DropdownOption> | undefined) => void;
  placeholder?: string;
  webcomponent?: any;
}

// Custom ValueContainer for Elvia Dropdown, defined outside of Dropdown due to focus issues with react-select package.
// Enables multiselect with checkboxes in a dropdown.
const ElviaValueContainer = ({ ...props }) => {
  const optionsCount = props.children[0].length;
  const selectedOptions = [...props.children];
  if (optionsCount >= 2) {
    selectedOptions[0] = `${optionsCount} valgte`;
  }
  return <components.ValueContainer {...props}>{selectedOptions}</components.ValueContainer>;
};

const Dropdown: React.FC<DropdownProps> = ({
  defaultOption,
  errorMessage = '',
  isCompact = false,
  isDisabled = false,
  isMulti = false,
  menuPosition = 'auto',
  noOptionsMessage = 'Ingen tilgjengelige valg',
  label,
  labelId,
  options,
  optionOnChange,
  placeholder = 'Placeholder',
  webcomponent,
}) => {
  const [currentVal, setCurrentVal] = useState(defaultOption);
  const [isError, setIsError] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLSpanElement>(null);

  // styling functions for react select
  const decideControlBorder = (disabled: boolean, error: boolean) => {
    if (disabled) {
      return '1px solid #BDBDBD';
    }
    if (error) {
      return '2px solid #FF0000';
    }
    return '1px solid #000000';
  };

  const decideOptionBg = (focused: boolean, selected: boolean, isMulti: boolean) => {
    if (focused && selected && isMulti) {
      return '#F4F4F4';
    }
    if (focused && !selected) {
      return '#F4F4F4';
    }
    if (selected && !isMulti) {
      return '#E9E9E9';
    }
    return '#ffffff';
  };

  const decideOptionHoverBg = (selected: boolean, isMulti: boolean) => {
    if (selected && isMulti) {
      return '#F4F4F4';
    }
    if (selected && !isMulti) {
      return '#E9E9E9';
    }
    return '#F4F4F4';
  };

  // Custom styling for dropdown using emotion from react-select package.
  const customElviaStyles = {
    container: (provided: any) => ({
      ...provided,
      maxWidth: '400px',
    }),

    control: () => ({
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: '4px',
      border: decideControlBorder(isDisabled, isError),
      maxHeight: isCompact ? '33px' : '48px',
      minHeight: isCompact ? '33px' : '48px',
      minWidth: '72px',
      marginBottom: '0px',
      padding: !isError ? '1px' : '0px',
      cursor: 'pointer',
      boxShadow: '0',
      '&:hover': {
        border: '2px solid #29d305',
        padding: '0px',
      },
    }),

    dropdownIndicator: (provided: any) => ({
      ...provided,
      height: isCompact ? '16px' : '20px',
      width: isCompact ? '16px' : '20px',
      padding: '0px',
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
      minWidth: '72px',
      zIndex: 100,
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
      fontSize: isCompact ? '14px' : '16px',
      lineHeight: '22px',
      color: '#000',
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
    }),

    option: (provided: any, state: any) => ({
      ...provided,
      display: 'flex',
      alignContent: 'center',
      backgroundColor: decideOptionBg(state.isFocused, state.isSelected, state.isMulti),
      color: '#000000',
      height: isCompact ? '36px' : '48px',
      paddingLeft: isCompact ? '9px' : '15px',
      fontSize: isCompact ? '14px' : '16px',
      lineHeight: isCompact ? '18px' : '30px',
      border: '1px solid transparent',
      cursor: 'pointer',
      overflowX: 'hidden',
      textOverflow: 'ellipsis',
      '&:hover': {
        backgroundColor: decideOptionHoverBg(state.isSelected, state.isMulti),
        '#ewc-dropdown-checkbox__mark': {
          backgroundColor: '#29d305',
        },
      },
      '#ewc-dropdown-checkbox__mark': {
        background: state.isFocused ? '#29d305' : state.isSelected ? '#29d305' : '#ffffff',
      },
      '.ewc-dropdown-checkbox .ewc-dropdown-checkbox__mark': {
        background: state.isFocused ? '#29d305' : state.isSelected ? '#29d305' : '#ffffff',
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
      display: 'block',
      overflowX: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: 'calc(100% - 20px)',
    }),

    singleValue: (provided: any) => ({
      ...provided,
      fontFamily: 'Red Hat Text',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: isCompact ? '14px' : '16px',
      lineHeight: '22px',
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
      fontSize: isCompact ? '14px' : '16px',
      lineHeight: '22px',
      paddingLeft: isCompact ? '8px' : '15px',
    }),
  };

  // Custom components for Elvia dropdown
  const ElviaDropdownIndicator = ({ ...props }) => {
    return (
      <components.DropdownIndicator {...props}>
        <StyledDropdown.DropdownIndicatorIcon
          isDisabled={isDisabled}
          isCompact={isCompact}
          menuIsOpen={menuIsOpen}
        />
      </components.DropdownIndicator>
    );
  };

  const ElviaOption = ({ ...props }) => {
    if (!isMulti) {
      return <components.Option {...props}>{props.children}</components.Option>;
    }
    return (
      <components.Option {...props}>
        <StyledDropdown.DropdownCheckbox>
          <StyledDropdown.DropdownCheckboxMark
            id="ewc-dropdown-checkbox__mark"
            isSelected={props.isSelected}
            isCompact={isCompact}
          />
          <StyledDropdown.DropdownCheckboxLabel isCompact={isCompact}>
            {props.children}
          </StyledDropdown.DropdownCheckboxLabel>
        </StyledDropdown.DropdownCheckbox>
      </components.Option>
    );
  };

  const ElviaError = ({ ...props }) => {
    return (
      <StyledDropdown.ErrorMessageWrapper {...props}>
        <StyledDropdown.ErrorMessageIcon />
        <StyledDropdown.ErrorMessageText>{errorMessage}</StyledDropdown.ErrorMessageText>
      </StyledDropdown.ErrorMessageWrapper>
    );
  };
  // Object containing all components overriden in react-select by Elvis dropdown
  const overrideComponents = {
    DropdownIndicator: ElviaDropdownIndicator,
    Option: ElviaOption,
    ValueContainer: ElviaValueContainer,
    IndicatorSeparator: () => null,
    ClearIndicator: () => null,
    MultiValueRemove: () => null,
  };

  // handle focus on dropdown, running on first render only (on mount)
  useEffect(() => {
    // Start outline listener
    toolbox.outlineListener(dropdownRef.current);
    return () => {
      // Remove outline listener
      toolbox.outlineListener(dropdownRef.current, true);
    };
  }, []);

  useEffect(() => {
    updateValue();
  }, [currentVal]);

  useEffect(() => {
    if (errorMessage != '') {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [errorMessage]);

  // set selected options as current values
  const onChangeHandler = (event: any) => {
    setCurrentVal(event);
  };

  const updateValue = () => {
    if (!webcomponent && optionOnChange) {
      optionOnChange(currentVal);
    }
    if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: currentVal }, true);
    }
    return;
  };

  return (
    <StyledDropdown.DropdownWrapper isDisabled={isDisabled} ref={dropdownRef}>
      <StyledDropdown.DropdownLabel id={labelId} aria-label={label} isCompact={isCompact}>
        {label}
      </StyledDropdown.DropdownLabel>
      <Select
        aria-labelledby={labelId}
        classNamePrefix={'ewc-dropdown'}
        closeMenuOnSelect={!isMulti}
        components={overrideComponents}
        defaultValue={defaultOption}
        hasValue={false}
        hideSelectedOptions={false}
        isDisabled={isDisabled}
        isMulti={isMulti}
        isSearchable={false}
        menuIsOpen={menuIsOpen}
        menuPlacement={menuPosition}
        noOptionsMessage={() => noOptionsMessage}
        onChange={onChangeHandler}
        onKeyDown={(event) => {
          if (event.code === 'Enter' && !menuIsOpen) {
            setMenuIsOpen(true);
          }
        }}
        onMenuClose={() => setMenuIsOpen(false)}
        onMenuOpen={() => setMenuIsOpen(true)}
        options={options}
        placeholder={placeholder}
        value={currentVal}
        styles={customElviaStyles}
      ></Select>

      {isError ? <ElviaError errorMessage={errorMessage}></ElviaError> : null}
    </StyledDropdown.DropdownWrapper>
  );
};

export default Dropdown;
