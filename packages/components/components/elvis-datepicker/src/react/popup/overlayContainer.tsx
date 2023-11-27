import React, { useEffect, useState } from 'react';

import { Calendar } from '../calendar/calendar';
import {
  OverlayContainer as Container,
  PopoverBody,
  PopoverHeader,
  RotatingContainer,
  SelectedDateName,
} from './popupStyles';
import { YearPicker } from '../yearPicker/yearPicker';
import { formatDate, isAfter, isBefore } from '../dateHelpers';
import { DatepickerRangeProps } from '../elviaDatepicker.types';
import { TertiaryButton, Overlay, IconWrapper } from '@elvia/elvis-toolbox';
import arrowDown from '@elvia/elvis-assets-icons/dist/icons/arrowDown';

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
    const [viewedDate, setViewedDate] = useState(new Date());

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

    const resetDate = (): void => {
      onChange(null);
      onReset();
      setViewedDate(new Date());
    };

    useEffect(() => {
      if (selectedDate) {
        setViewedDate(selectedDate);
      }
    }, [selectedDate]);

    useEffect(() => {
      const initializeViewedDate = () => {
        if (selectedDate) {
          setViewedDate(selectedDate);
        } else if (minDate && isBefore(viewedDate, minDate)) {
          setViewedDate(minDate);
        } else if (maxDate && isAfter(viewedDate, maxDate)) {
          setViewedDate(maxDate);
        }
      };
      initializeViewedDate();
    }, []);

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
                  resetDate={resetDate}
                  clearButtonText={clearButtonText}
                  dateRangeProps={dateRangeProps}
                />
              </>
            )}
          </PopoverBody>
        </Container>
      </Overlay>
    );
  },
);

OverlayContainer.displayName = 'DatepickerOverlayContainer';
