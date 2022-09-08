import React, { useState, useEffect, useRef, CSSProperties, useMemo } from 'react';
import Select, {
  components,
  DropdownIndicatorProps,
  MultiValueProps,
  OptionProps,
  PlaceholderProps,
  SingleValueProps,
  StylesConfig,
} from 'react-select';
import { Icon, IconName } from '@elvia/elvis-icon/react';
import {
  DropdownCheckbox,
  DropdownCheckboxLabel,
  DropdownCheckboxMark,
  DropdownWrapper,
  DropdownErrorMessageText,
  DropdownErrorMessageWrapper,
  DropdownLabel,
  DropdownSingleValueOverflowWrapper,
  DropdownOptionWithStatusWrapper,
} from './styledComponents';
import uniqueId from 'lodash.uniqueid';
import isEqual from 'lodash.isequal';
import { getColor } from '@elvia/elvis-colors';
import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { warnDeprecatedProps, outlineListener } from '@elvia/elvis-toolbox';
import { config } from './config';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { DropdownItemStatus, statusToIconMap } from './statusToIconMap';

export type DropdownMenuPosition = 'top' | 'bottom' | 'auto';
export interface DropdownItem {
  value: string;
  label: string;
  icon?: IconName;
  isDisabled?: boolean;
  status?: DropdownItemStatus;
  tooltip?: string;
}

export interface DropdownProps {
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `items`.
   */
  options?: never;
  items: DropdownItem[];
  /**
   * @deprecated Removed in version 3.0.0. Replaced by `value`.
   */
  defaultValue?: never;
  value?: DropdownItem | Array<DropdownItem> | undefined;
  isCompact?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  isFullWidth?: boolean;
  isSearchable?: boolean;
  hasSelectAllOption?: boolean;
  selectAllOption?: Partial<DropdownItem>;
  allOptionsSelectedLabel?: string;
  errorMessage?: string;
  label?: string;
  menuPosition?: DropdownMenuPosition;
  noOptionsMessage?: string;
  placeholder?: string;
  placeholderIcon?: IconName;
  valueOnChange?: (selectedOptions: DropdownItem | Array<DropdownItem> | undefined) => void;
  hoveredItemOnChange?: (hoveredItem: DropdownItem | undefined) => void;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}

const Dropdown: React.FC<DropdownProps> = function ({
  items = [],
  value = undefined,
  isCompact,
  isDisabled,
  isMulti,
  isFullWidth,
  isSearchable = false,
  hasSelectAllOption = false,
  selectAllOption,
  allOptionsSelectedLabel = 'Alle',
  label,
  errorMessage = '',
  menuPosition = 'auto',
  noOptionsMessage = 'Ingen tilgjengelige valg',
  placeholder = '',
  placeholderIcon,
  valueOnChange,
  hoveredItemOnChange,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) {
  // eslint-disable-next-line prefer-rest-params
  warnDeprecatedProps(config, arguments[0]);

  const [currentVal, setCurrentVal] = useState(value);
  const [isError, setIsError] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectAllOptionState, setSelectAllOptionState] = useState<DropdownItem>({
    label: 'Alle',
    value: '*',
  });
  const [hoveredItem, setHoveredItem] = useState<DropdownItem>();
  const dropdownRef = useRef<HTMLSpanElement>(null);

  /** Set the "Select all" option inside an open multiselect dropdown.
   * Doing it this way adds support for supplying the prop as a partial prop
   * (e.g. {label: 'Alle'} instead of {value: '*', label: 'Alle'}).
   */
  useEffect(() => {
    if (selectAllOption) {
      setSelectAllOptionState((oldSelectAllOptionState) => {
        return { ...oldSelectAllOptionState, ...selectAllOption };
      });
    }
  }, [selectAllOption]);

  useEffect(() => {
    if (!webcomponent) {
      hoveredItemOnChange?.(hoveredItem);
    } else {
      webcomponent.triggerEvent('hoveredItemOnChange', hoveredItem);
    }
  }, [hoveredItem]);

  /** Memoized variable with all the items that are not disabled. Updates when `items` changes. */
  const itemsNotDisabled = useMemo(() => {
    return items.filter((item) => !item.isDisabled);
  }, [items]);

  const selectId = uniqueId('ewc-dropdown-');

  /** Styling functions for react select */
  const decideControlBorder = (disabled?: boolean, error?: boolean) => {
    if (disabled) {
      return `1px solid ${getColor('disabled')}`;
    }
    if (error) {
      return `2px solid ${getColor('error')}`;
    }
    return `1px solid ${getColor('black')}`;
  };

  const decideOptionBg = (focused: boolean, selected: boolean, isMulti: boolean) => {
    if (focused && selected && isMulti) {
      return getColor('grey-05');
    }
    if (focused && !selected) {
      return getColor('grey-05');
    }
    if (selected && !isMulti) {
      return getColor('grey-10');
    }
    return getColor('white');
  };

  const decideOptionHoverBg = (selected: boolean, isMulti: boolean, optionIsDisabled: boolean) => {
    if (optionIsDisabled) {
      return getColor('white');
    }
    if (selected && isMulti) {
      return getColor('grey-05');
    }
    if (selected && !isMulti) {
      return getColor('grey-10');
    }
    return getColor('grey-05');
  };

  const decideSingleValueColor = (isMenuOpen: boolean, searchable: boolean, disabled?: boolean) => {
    if (disabled) {
      return getColor('disabled');
    }
    if (isMenuOpen && searchable) {
      return getColor('grey-70');
    }
    return getColor('black');
  };

  /** Decide color of background of a checkbox inside a multi-select dropdown */
  const decideBackgroundColor = (focused: boolean, selected: boolean, currentOptionLabel: string): string => {
    if (focused || selected) {
      return getColor('elvia-charge');
    } else if (
      // "select all"-option should have green background if any options are selected
      Array.isArray(currentVal) &&
      currentVal.length > 0 &&
      currentOptionLabel === selectAllOptionState.label
    ) {
      return getColor('elvia-charge');
    } else {
      return getColor('white');
    }
  };

  const decideValueContainerHeight = (): string => {
    if (allOptionsHaveIconAttribute && !isMulti) {
      return 'inherit';
    }
    return '22px';
  };

  /** Custom styling for dropdown using emotion from react-select package. */
  const customElviaStyles: StylesConfig = {
    container: (provided) => ({
      ...provided,
      maxWidth: isFullWidth ? '' : '448px',
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
      minWidth: '100%',
      width: 'fit-content',
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
      alignItems: 'center',
      gap: '8px',
      backgroundColor: decideOptionBg(state.isFocused, state.isSelected, state.isMulti),
      color: state.isDisabled ? getColor('disabled') : getColor('black'),
      height: '100%',
      paddingTop: '7px',
      paddingBottom: '7px',
      paddingLeft: isCompact ? '9px' : '15px',
      fontSize: isCompact ? '14px' : '16px',
      lineHeight: isCompact ? '18px' : '26px',
      border: '1px solid transparent',
      cursor: state.isDisabled ? 'not-allowed' : 'pointer',
      overflowX: 'hidden',
      textOverflow: 'ellipsis',
      '&:hover': {
        backgroundColor: decideOptionHoverBg(state.isSelected, state.isMulti, state.isDisabled),
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
      borderBottom: state.label === selectAllOptionState.label ? `1px solid ${getColor('grey-10')}` : '',
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
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: '8px',
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
      display: 'flex',
      alignItems: 'center',
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      display: 'flex',
      color: state.isDisabled ? getColor('disabled') : getColor('black'),
      fontFamily: 'Red Hat Text',
      fontWeight: '400',
      fontStyle: 'normal',
      fontSize: isCompact ? '14px' : '16px',
      lineHeight: '22px',
      paddingLeft: isCompact ? '8px' : '15px',
      paddingRight: '2px',
      paddingTop: 0,
      paddingBottom: 0,
      height: decideValueContainerHeight(),
      whiteSpace: 'nowrap',
    }),

    input: (provided) => ({
      ...provided,
      padding: 0,
      margin: 0,
    }),
  };

  /** Helper memoized variable to determine if the options array has valid icon attributes (all or none should have icon). */
  const allOptionsHaveIconAttribute = useMemo((): boolean => {
    return (
      items.length > 0 &&
      items.every((item) => {
        return item.icon !== undefined;
      })
    );
  }, [items]);

  /** Custom components for Elvia dropdown */
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
    const optionData = props.data as DropdownItem;
    const optionIsDisabled = optionData.isDisabled ?? false;

    const handleOnPointerEnter = () => {
      setHoveredItem(optionData);
    };

    if (!isMulti) {
      return (
        <components.Option
          {...props}
          innerProps={{
            ...props['innerProps'],
            onPointerEnter: handleOnPointerEnter,
          }}
          isDisabled={optionIsDisabled}
        >
          {allOptionsHaveIconAttribute ? (
            <Icon
              inlineStyle={{ marginRight: '16px' }}
              name={optionData.icon as IconName}
              size={isCompact ? 'xs' : 'sm'}
              color={optionIsDisabled ? getColor('disabled') : undefined}
            />
          ) : (
            ''
          )}
          <DropdownOptionWithStatusWrapper>
            {props.children}
            {optionData.status && (
              <Icon
                name={statusToIconMap[optionData.status].name}
                color={statusToIconMap[optionData.status].color}
                size={'xs'}
              />
            )}
          </DropdownOptionWithStatusWrapper>
        </components.Option>
      );
    }
    const isSelectAllWithPartialSelected =
      hasSelectAllOption &&
      props.children === selectAllOptionState.label &&
      Array.isArray(currentVal) &&
      currentVal.length > 0 &&
      !props.isSelected;
    return (
      <components.Option
        {...props}
        innerProps={{
          ...props['innerProps'],
          onPointerEnter: handleOnPointerEnter,
        }}
        isDisabled={optionIsDisabled}
      >
        <DropdownOptionWithStatusWrapper>
          <DropdownCheckbox>
            <DropdownCheckboxMark
              id="ewc-dropdown-checkbox__mark"
              isSelected={props.isSelected}
              isCompact={isCompact}
              isSelectAllWithPartialSelected={isSelectAllWithPartialSelected}
              isDisabled={optionIsDisabled}
            />
            <DropdownCheckboxLabel isCompact={isCompact}>{props.children}</DropdownCheckboxLabel>
          </DropdownCheckbox>
          {optionData.status && (
            <Icon
              name={statusToIconMap[optionData.status].name}
              color={statusToIconMap[optionData.status].color}
              size={'xs'}
            />
          )}
        </DropdownOptionWithStatusWrapper>
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

  const ElviaPlaceholder = (props: PlaceholderProps) => {
    if (menuIsOpen && isSearchable) {
      return null;
    }
    if (placeholderIcon) {
      return (
        <components.Placeholder {...props}>
          <Icon
            name={placeholderIcon}
            color={isDisabled ? getColor('disabled') : getColor('placeholder')}
            size="xs"
          />
          {props.children}
        </components.Placeholder>
      );
    }
    return <components.Placeholder {...props}>{props.children}</components.Placeholder>;
  };

  const ElviaMultiValue = (props: MultiValueProps): any => {
    if (menuIsOpen && isSearchable) {
      return null;
    }
    if (props.getValue().length === 1) {
      return (props.getValue()[0] as DropdownItem).label;
    }

    if (isMulti && hasSelectAllOption) {
      const allOptionsSelected =
        Array.isArray(currentVal) &&
        currentVal.find((option) => isEqual(option, selectAllOptionState)) !== undefined;

      if (allOptionsSelected) {
        return !props.index && allOptionsSelectedLabel;
      }
    }
    return !props.index && `${props.getValue().length} valgte`;
  };

  const ElviaSingleValue = (props: SingleValueProps) => {
    if (menuIsOpen && isSearchable) {
      return null;
    }
    return (
      <components.SingleValue {...props}>
        {allOptionsHaveIconAttribute ? (
          <Icon
            inlineStyle={{ marginRight: '16px' }}
            name={(props.data as DropdownItem).icon as IconName}
            size={isCompact ? 'xs' : 'sm'}
            color={decideSingleValueColor(menuIsOpen, isSearchable, isDisabled)}
          />
        ) : (
          ''
        )}
        <DropdownSingleValueOverflowWrapper>{props.children}</DropdownSingleValueOverflowWrapper>
      </components.SingleValue>
    );
  };

  /** Object containing all components overridden in react-select by Elvis dropdown */
  const overrideComponents = {
    DropdownIndicator: ElviaDropdownIndicator,
    Option: ElviaOption,
    IndicatorSeparator: () => null,
    ClearIndicator: () => null,
    MultiValue: ElviaMultiValue,
    MultiValueRemove: () => null,
    Placeholder: ElviaPlaceholder,
    SingleValue: ElviaSingleValue,
  };

  /** Start listener for adding and removing outline on dropdown when elements in focus */
  useEffect(() => {
    if (dropdownRef && dropdownRef.current) {
      outlineListener(dropdownRef.current);
    }
    return () => {
      if (dropdownRef && dropdownRef.current) {
        outlineListener(dropdownRef.current, true);
      }
    };
  }, []);

  /** Needed for webcomponent -> To update the default value */
  useEffect(() => {
    setCurrentVal(value);
    updateValue(value);
  }, [value]);

  /** Update current value of dropdown and call updateValue to dispatch the new values*/
  const onChangeHandler = (event: Parameters<NonNullable<DropdownProps['valueOnChange']>>[0]) => {
    if (hasSelectAllOption && isMulti && Array.isArray(event)) {
      // Handle the logic for the "select all"-button in all different situations
      if (
        // selectAllOption is not currently selected, but becomes selected => select all
        // currentVal is not an array, selectAllOption is not selected, and selectAllOption is in the new values from the event
        (!Array.isArray(currentVal) &&
          currentVal !== selectAllOptionState &&
          event.includes(selectAllOptionState)) ||
        // currentVal is an array that does not have selectAllOption in it, and selectAllOption is in the new values from the event
        (Array.isArray(currentVal) &&
          !currentVal.find((option) => isEqual(option, selectAllOptionState)) &&
          event.includes(selectAllOptionState))
      ) {
        setCurrentVal([selectAllOptionState, ...itemsNotDisabled]);
        updateValue([selectAllOptionState, ...itemsNotDisabled]);
      } else if (
        // selectAllOption is selected, but becomes unselected => unselect all
        // Check that selectAllOption is currently selected
        Array.isArray(currentVal) &&
        currentVal.find((option) => isEqual(option, selectAllOptionState)) &&
        // Check that selectAllOption is no longer selected
        !event.find((option) => isEqual(option, selectAllOptionState))
      ) {
        setCurrentVal([]);
        updateValue([]);
      } else if (
        // selectAllOption is selected, but not all options are selected any more => unselect selectAllOption
        // Check that selectAllOption is selected
        Array.isArray(currentVal) &&
        currentVal.find((option) => isEqual(option, selectAllOptionState)) &&
        // Check that not all elements in options are selected any more  (length + 1 because of selectAllOption being added)
        event.length !== itemsNotDisabled.length + 1
      ) {
        // Filter out selectAllOption from the selected options
        const newSelectedValue = event.filter((option) => !isEqual(option, selectAllOptionState));
        setCurrentVal(newSelectedValue);
        updateValue(newSelectedValue);
      } else if (
        // selectAllOption is not selected, but all options are selected => select selectAllOption
        // Check that selectAllOption is not selected
        Array.isArray(currentVal) &&
        !currentVal.find((option) => isEqual(option, selectAllOptionState)) &&
        // Check that all options are selected
        event.length == itemsNotDisabled.length
      ) {
        setCurrentVal([selectAllOptionState, ...event]);
        updateValue([selectAllOptionState, ...event]);
      } else {
        setCurrentVal(event);
        updateValue(event);
      }
    } else {
      // If there is no "select all"-button, this logic is simple
      setCurrentVal(event);
      updateValue(event);
    }
  };

  /** Dispatch valueOnChange events */
  const updateValue = (event: Parameters<NonNullable<DropdownProps['valueOnChange']>>[0]) => {
    // return if value undefined, need this check on initation to remove value undefined callback
    if (event === undefined) {
      return;
    }
    // Filter out selectAllOption from the dispatched selected options
    const eventToDispatch =
      hasSelectAllOption && Array.isArray(event)
        ? event.filter((option) => !isEqual(option, selectAllOptionState))
        : event;
    if (!webcomponent) {
      valueOnChange?.(eventToDispatch);
    } else {
      webcomponent.triggerEvent('valueOnChange', eventToDispatch);
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

  // Cache is used for CSP nonce support
  const cache = useMemo(
    () =>
      createCache({
        key: 'elvia-dropdown',
        nonce: window && (window as any).__webpack_nonce__ ? (window as any).__webpack_nonce__ : '',
        prepend: true,
      }),
    [],
  );

  return (
    <CacheProvider value={cache}>
      <div className={className ?? ''} style={inlineStyle} {...rest}>
        <DropdownWrapper
          isFullWidth={isFullWidth}
          isDisabled={isDisabled}
          ref={dropdownRef}
          data-testid="wrapper"
        >
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
            options={items && isMulti && hasSelectAllOption ? [selectAllOptionState, ...items] : items}
            placeholder={placeholder}
            value={currentVal}
            styles={customElviaStyles}
          ></Select>
          {isError ? <ElviaError errorMessage={errorMessage} data-testid="error"></ElviaError> : null}
        </DropdownWrapper>
      </div>
    </CacheProvider>
  );
};

export default Dropdown;
