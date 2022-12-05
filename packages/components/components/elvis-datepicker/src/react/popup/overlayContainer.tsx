import React, { useEffect, useState } from 'react';

import { Calendar } from '../calendar/calendar';
import {
  OverlayContainer as Container,
  PopoverBody,
  PopoverFooter,
  PopoverHeader,
  RotatingContainer,
  SelectedDateName,
} from './popupStyles';
import { YearPicker } from '../yearPicker/yearPicker';
import { formatDate } from '../dateHelpers';
import { DatepickerRangeProps } from '../elviaDatepicker.types';
import { TertiaryButton, Overlay, IconWrapper } from '@elvia/elvis-toolbox';
import arrowDown from '@elvia/elvis-assets-icons/dist/icons/arrowDown';
import reset from '@elvia/elvis-assets-icons/dist/icons/reset';

interface Props {
  onClose: () => void;
  onChange: (newValue: Date | null) => void;
  onCalendarViewToggle: () => void;
  onReset: () => void;
  selectedDate?: Date | null;
  clearButtonText: string;
  minDate?: Date;
  maxDate?: Date;
  disableDate?: (date: Date) => boolean;
  dateRangeProps?: DatepickerRangeProps;
}

export const OverlayContainer = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      onClose,
      onChange,
      onCalendarViewToggle,
      onReset,
      selectedDate,
      clearButtonText,
      minDate,
      maxDate,
      disableDate,
      dateRangeProps,
    },
    ref,
  ) => {
    const [fadeOut, setFadeOut] = useState(false);
    const [yearPickerIsOpen, setYearPickerIsOpen] = useState(false);
    const [viewedDate, setViewedDate] = useState(selectedDate || new Date());

    const onYearChange = (selectedYear: number): void => {
      const newDate = new Date(viewedDate);
      newDate.setFullYear(selectedYear);
      setViewedDate(newDate);
      setYearPickerIsOpen(false);
    };

    const toggleView = () => {
      setYearPickerIsOpen(!yearPickerIsOpen);
      onCalendarViewToggle();
    };

    useEffect(() => {
      if (selectedDate) {
        setViewedDate(selectedDate);
      }
    }, [selectedDate]);

    return (
      <Overlay onClose={onClose} ref={ref} startFade={fadeOut}>
        <Container data-testid="popover" role="dialog" aria-label="Datovelger popup" aria-modal="true">
          <PopoverHeader>
            <SelectedDateName>
              {formatDate(selectedDate, { weekday: 'long', day: 'numeric', month: 'long' })}
            </SelectedDateName>
            <TertiaryButton
              size="sm"
              onClick={() => toggleView()}
              aria-label="Endre år"
              data-testid="year-view-toggle"
            >
              {formatDate(viewedDate, { year: 'numeric' })}
              <RotatingContainer isRotated={yearPickerIsOpen}>
                <IconWrapper icon={arrowDown} size="xs" />
              </RotatingContainer>
            </TertiaryButton>
          </PopoverHeader>
          <PopoverBody>
            {yearPickerIsOpen ? (
              <YearPicker
                selectedDate={selectedDate}
                onYearChange={onYearChange}
                minDate={minDate}
                maxDate={maxDate}
              ></YearPicker>
            ) : (
              <>
                <Calendar
                  selectedDate={selectedDate}
                  viewedDate={viewedDate}
                  onDateChange={(newDate, closeOverlay) => {
                    onChange(newDate);

                    if (closeOverlay) {
                      setFadeOut(true);
                    }
                  }}
                  setViewedDate={setViewedDate}
                  minDate={minDate}
                  maxDate={maxDate}
                  disableDate={disableDate}
                  dateRangeProps={dateRangeProps}
                />
                <PopoverFooter>
                  <TertiaryButton
                    onClick={() => {
                      onChange(null);
                      onReset();
                    }}
                    aria-label="Nullstill dato"
                    size="sm"
                  >
                    <IconWrapper icon={reset} size="xs" />
                    {clearButtonText}
                  </TertiaryButton>
                </PopoverFooter>
              </>
            )}
          </PopoverBody>
        </Container>
      </Overlay>
    );
  },
);

OverlayContainer.displayName = 'DatepickerOverlayContainer';
