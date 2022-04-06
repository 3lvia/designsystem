import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import Select, {
  components,
  DropdownIndicatorProps,
  MultiValueProps,
  OptionProps,
  PlaceholderProps,
  StylesConfig,
} from 'react-select';
import toolbox from '@elvia/elvis-toolbox';
import { Icon } from '@elvia/elvis-icon/react';
import {
  DropdownCheckbox,
  DropdownCheckboxLabel,
  DropdownCheckboxMark,
  DropdownWrapper,
  DropdownErrorMessageText,
  DropdownErrorMessageWrapper,
  DropdownLabel,
} from './styledComponents';
import uniqueId from 'lodash.uniqueid';
import { getColor } from '@elvia/elvis-colors';
import { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper/src/elvia-component';

export type DropdownMenuPosition = 'top' | 'bottom' | 'auto';
export interface DropdownOption {
  value: string;
  label: string;
}

export interface DropdownProps {
  defaultValue?: DropdownOption | Array<DropdownOption> | undefined;
  errorMessage?: string;
  isCompact: boolean;
  isDisabled: boolean;
  isMulti: boolean;
  isSearchable: boolean;
  hasSelectAllOption: boolean;
  label?: string;
  menuPosition?: DropdownMenuPosition;
  noOptionsMessage?: string;
  options: DropdownOption[];
  placeholder?: string;
  valueOnChange?: (selectedOptions: DropdownOption | Array<DropdownOption> | undefined) => void;
  value?: DropdownOption | Array<DropdownOption> | undefined;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
  webcomponent?: ElvisComponentWrapper;
}

const Dropdown: React.FC<DropdownProps> = ({
  defaultValue = undefined,
  errorMessage = '',
  isCompact,
  isDisabled,
  isMulti,
  isSearchable = false,
  hasSelectAllOption = false,
  label,
  menuPosition = 'auto',
  noOptionsMessage = 'Ingen tilgjengelige valg',
  options,
  placeholder = '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value,
  valueOnChange,
  className,
  inlineStyle,
  webcomponent,
}) => {
  const [currentVal, setCurrentVal] = useState(defaultValue);
  const [isError, setIsError] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLSpanElement>(null);

  const selectId = uniqueId('ewc-dropdown-');

  /** Default value for the select all-option. */
  const selectAllOption: DropdownOption = { label: 'Alle', value: '*' };

  // styling functions for react select
  const decideControlBorder = (disabled: boolean, error: boolean) => {
    if (disabled) {
      return '1px solid #BDBDBD';
    }
    if (error) {
      return '2px solid #EE0701';
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

  const decideSingleValueColor = (isMenuOpen: boolean, searchable: boolean, disabled: boolean) => {
    if (disabled) {
      return getColor('disabled');
    }
    if (isMenuOpen && searchable) {
      return getColor('grey-70');
    }
    return '#000';
  };

  /** Decide color of background of a checkbox inside a multiselect dropdown */
  const decideBackgroundColor = (isFocused: boolean, isSelected: boolean, label: string): string => {
    if (isFocused || isSelected) {
      return getColor('elvia-charge');
    } else if (
      // "select all"-option should have green background if any options are selected
      Array.isArray(currentVal) &&
      currentVal.length > 0 &&
      label === selectAllOption.label
    ) {
      return getColor('elvia-charge');
    }
    return getColor('white');
  };

  /** Custom styling for dropdown using emotion from react-select package. */
  const customElviaStyles: StylesConfig = {
    container: (provided) => ({
      ...provided,
      maxWidth: '448px',
    }),

    control: () => ({
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: getColor('white'),
      borderRadius: '4px',
      border: decideControlBorder(isDisabled, isError),
      maxHeight: isCompact ? '34px' : '48px',
      minHeight: isCompact ? '34px' : '48px',
      minWidth: '72px',
      marginBottom: '0px',
      padding: !isError ? '1px' : '0px',
      cursor: 'pointer',
      boxShadow: '0',
      '&:hover': {
        border: `2px solid ${getColor('elvia-charge')}`,
        padding: '0px',
      },
    }),

    dropdownIndicator: (provided) => ({
      ...provided,
      height: isCompact ? '16px' : '20px',
      width: isCompact ? '16px' : '20px',
      padding: '0px',
    }),

    indicatorsContainer: (provided) => ({
      ...provided,
      paddingTop: isCompact ? '7px' : '13px',
      paddingBottom: isCompact ? '7px' : '13px',
      paddingRight: isCompact ? '11px' : '15px',
    }),

    menu: (provided) => ({
      ...provided,
      boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.06);',
      minWidth: '72px',
      zIndex: 100,
    }),

    menuList: (provided) => ({
      ...provided,
      maxHeight: isCompact ? '181px' : '241px',
      padding: '0',
      zIndex: 10,
    }),

    multiValue: (provided, state) => ({
      ...provided,
      background: getColor('white'),
      margin: '0px',
      color: state.isDisabled ? getColor('disabled') : getColor('black'),
    }),

    multiValueLabel: (provided, state) => ({
      ...provided,
      fontFamily: 'Red Hat Text',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: isCompact ? '14px' : '16px',
      lineHeight: '22px',
      color: state.isDisabled ? getColor('disabled') : getColor('black'),
      paddingTop: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
    }),

    noOptionsMessage: (provided) => ({
      ...provided,
      fontFamily: 'Red Hat Text',
      color: getColor('grey-70'),
      textAlign: 'left',
    }),

    option: (provided, state) => ({
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
          backgroundColor: getColor('elvia-charge'),
        },
      },
      '#ewc-dropdown-checkbox__mark': {
        background: decideBackgroundColor(state.isFocused, state.isSelected, state.label),
      },
      '.ewc-dropdown-checkbox .ewc-dropdown-checkbox__mark': {
        background: decideBackgroundColor(state.isFocused, state.isSelected, state.label),
      },
      borderBottom: state.label === selectAllOption.label ? `1px solid ${getColor('grey-10')}` : '',
    }),

    placeholder: (provided) => ({
      ...provided,
      fontFamily: 'Red Hat Text',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: isCompact ? '14px' : '16px',
      lineHeight: '22px',
      color: isDisabled ? getColor('disabled') : getColor('grey-70'),
      margin: '0px',
      display: 'block',
      overflowX: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      maxWidth: 'calc(100% - 12px)',
    }),

    singleValue: (provided) => ({
      ...provided,
      fontFamily: 'Red Hat Text',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: isCompact ? '14px' : '16px',
      lineHeight: '22px',
      color: decideSingleValueColor(menuIsOpen, isSearchable, isDisabled),
      margin: '0px',
      maxWidth: 'calc(100% - 12px)',
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      display: 'flex',
      color: state.isDisabled ? getColor('disabled') : '#000',
      fontFamily: 'Red Hat Text',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: isCompact ? '14px' : '16px',
      lineHeight: '22px',
      paddingLeft: isCompact ? '8px' : '15px',
    }),
  };

  // Custom components for Elvia dropdown
  const ElviaDropdownIndicator = (props: DropdownIndicatorProps) => {
    return (
      <components.DropdownIndicator {...props}>
        <Icon
          name={menuIsOpen ? 'arrowUpBold' : 'arrowDownBold'}
          color={isDisabled ? getColor('disabled') : undefined}
          customSize={isCompact ? '16px' : '20px'}
        />
      </components.DropdownIndicator>
    );
  };

  const ElviaOption = (props: OptionProps) => {
    if (!isMulti) {
      return <components.Option {...props}>{props.children}</components.Option>;
    }
    const isSelectAllWithPartialSelected =
      hasSelectAllOption &&
      props.children === selectAllOption.label &&
      currentVal !== undefined &&
      Array.isArray(currentVal) &&
      currentVal.length > 0 &&
      !props.isSelected;
    return (
      <components.Option {...props}>
        <DropdownCheckbox>
          <DropdownCheckboxMark
            id="ewc-dropdown-checkbox__mark"
            isSelected={props.isSelected}
            isCompact={isCompact}
            isSelectAllWithPartialSelected={
              isSelectAllWithPartialSelected ? isSelectAllWithPartialSelected : false
            }
          />
          <DropdownCheckboxLabel isCompact={isCompact}>{props.children}</DropdownCheckboxLabel>
        </DropdownCheckbox>
      </components.Option>
    );
  };

  const ElviaError = ({ ...props }) => {
    return (
      <DropdownErrorMessageWrapper {...props}>
        <Icon name="removeCircle" color={getColor('red')} size="xs" />
        <DropdownErrorMessageText>{errorMessage}</DropdownErrorMessageText>
      </DropdownErrorMessageWrapper>
    );
  };

  const ElviaMultiValue = (props: MultiValueProps): any => {
    if (menuIsOpen && isSearchable) {
      return null;
    }
    if (props.getValue().length === 1) {
      return (props.getValue()[0] as DropdownOption).label;
    }

    if (isMulti && hasSelectAllOption) {
      const allSelected =
        Array.isArray(currentVal) &&
        currentVal.find(
          (el: DropdownOption) => el.label === selectAllOption.label && el.value === selectAllOption.value,
        ) !== undefined;

      if (allSelected) {
        return !props.index && `Alle`;
      }
    }
    return !props.index && `${props.getValue().length} valgte`;
  };

  const ElviaPlaceholder = (props: PlaceholderProps) => {
    if (menuIsOpen && isSearchable) {
      return null;
    }
    return <components.Placeholder {...props}>{props.children}</components.Placeholder>;
  };

  /** Object containing all components overriden in react-select by Elvis dropdown */
  const overrideComponents = {
    DropdownIndicator: ElviaDropdownIndicator,
    Option: ElviaOption,
    IndicatorSeparator: () => null,
    ClearIndicator: () => null,
    MultiValue: ElviaMultiValue,
    MultiValueRemove: () => null,
    Placeholder: ElviaPlaceholder,
  };

  // handle focus on dropdown, running on first render only (on mount)
  useEffect(() => {
    // Start outline listener
    if (dropdownRef && dropdownRef.current) {
      toolbox.outlineListener(dropdownRef.current);
    }
    return () => {
      // Remove outline listener
      if (dropdownRef && dropdownRef.current) {
        toolbox.outlineListener(dropdownRef.current, true);
      }
    };
  }, []);

  // Needed for webcomponent -> To update the default value
  useEffect(() => {
    setCurrentVal(defaultValue);
    updateValue(defaultValue);
  }, [defaultValue]);

  const onChangeHandler = (event: DropdownProps['value']) => {
    // If there is no "select all"-button, this logic is simple
    if (!hasSelectAllOption) {
      setCurrentVal(event);
      updateValue(event);
    } else {
      // Handle the logic for the "select all"-button in all different situations
      if (
        // selectAllOption is not currently selected, but becomes selected => select all
        // currentVal is not an array, selectAllOption is not selected, and selectAllOption is in the new values from the event
        (!Array.isArray(currentVal) &&
          currentVal !== selectAllOption &&
          Array.isArray(event) &&
          event.includes(selectAllOption)) ||
        // currentVal is an array that does not have selectAllOption in it, and selectAllOption is in the new values from the event
        (Array.isArray(currentVal) &&
          currentVal.find(
            (option) => option.value === selectAllOption.value && option.label === selectAllOption.label,
          ) === undefined &&
          Array.isArray(event) &&
          event.includes(selectAllOption))
      ) {
        setCurrentVal([selectAllOption, ...options]);
        updateValue([selectAllOption, ...options]);
      } else if (
        // selectAllOption is selected, but becomes unselected => unselect all
        // Check that selectAllOption is currently selected
        Array.isArray(currentVal) &&
        currentVal.find(
          (option) => option.value === selectAllOption.value && option.label === selectAllOption.label,
        ) &&
        // Check that selectAllOption is no longer selected
        Array.isArray(event) &&
        event.find(
          (option) => option.value === selectAllOption.value && option.label === selectAllOption.label,
        ) === undefined
      ) {
        setCurrentVal([]);
        updateValue([]);
      } else if (
        // selectAllOption is selected, but not all options are selected any more => unselect selectAllOption (will be marked with a line)
        // Check that selectAllOption is selected
        Array.isArray(currentVal) &&
        currentVal.find(
          (option) => option.value === selectAllOption.value && option.label === selectAllOption.label,
        ) &&
        // Check that not all elements in options are selected any more  (length + 1 because of selectAllOption being added)
        Array.isArray(event) &&
        event.length !== options.length + 1
      ) {
        setCurrentVal(
          // Filter out selectAllOption from the selected options
          event.filter(
            (option) => option.value !== selectAllOption.value && option.label !== selectAllOption.label,
          ),
        );
        updateValue(
          // Filter out selectAllOption from the selected options
          event.filter(
            (option) => option.value !== selectAllOption.value && option.label !== selectAllOption.label,
          ),
        );
      } else if (
        // selectAllOption is not selected, but all options are selected => select selectAllOption
        // Check that selectAllOption is not selected
        Array.isArray(currentVal) &&
        currentVal.find(
          (option) => option.value === selectAllOption.value && option.label === selectAllOption.label,
        ) === undefined &&
        // Check that all options are selected
        Array.isArray(event) &&
        event.length == options.length
      ) {
        setCurrentVal([selectAllOption, ...event]);
        updateValue([selectAllOption, ...event]);
      } else {
        setCurrentVal(event);
        updateValue(event);
      }
    }
  };

  /** Call valueOnChange (React) or dispatch on change-event (webcomponent) */
  const updateValue = (event: DropdownProps['value']) => {
    if (!webcomponent && valueOnChange) {
      valueOnChange(
        Array.isArray(event)
          ? // Do not include selectAllOption in dispatched event if event is array
            event.filter(
              (option: DropdownOption) =>
                option.label !== selectAllOption.label && option.value !== selectAllOption.value,
            )
          : event,
      );
    }
    if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps(
        {
          value: Array.isArray(event)
            ? // Do not include selectAllOption in dispatched event if event is array
              event.filter(
                (option: DropdownOption) =>
                  option.label !== selectAllOption.label && option.value !== selectAllOption.value,
              )
            : event,
        },
        true,
      );
    }
    return;
  };

  useEffect(() => {
    if (errorMessage != '') {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [errorMessage]);

  return (
    <div className={`${className ? className : ''}`} style={inlineStyle}>
      <DropdownWrapper isDisabled={isDisabled} ref={dropdownRef} data-testid="wrapper">
        <DropdownLabel aria-label={label} isCompact={isCompact} htmlFor={selectId} data-testid="label">
          {label}
        </DropdownLabel>
        <Select
          blurInputOnSelect={!isMulti}
          classNamePrefix={'ewc-dropdown'}
          closeMenuOnSelect={!isMulti}
          components={overrideComponents}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          hasValue={false}
          hideSelectedOptions={false}
          inputId={selectId}
          isDisabled={isDisabled}
          isMulti={isMulti}
          isSearchable={isSearchable}
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
          options={options && isMulti && hasSelectAllOption ? [selectAllOption, ...options] : options}
          placeholder={placeholder}
          value={currentVal}
          styles={customElviaStyles}
        ></Select>

        {isError ? <ElviaError errorMessage={errorMessage} data-testid="error"></ElviaError> : null}
      </DropdownWrapper>
    </div>
  );
};

export default Dropdown;
