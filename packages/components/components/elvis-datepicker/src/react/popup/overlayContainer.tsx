import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Icon } from '@elvia/elvis-icon/react';
import { Calendar } from '../calendar/calendar';
import {
  Backdrop,
  OverlayContainer as Container,
  PopoverBody,
  PopoverFooter,
  PopoverHeader,
  SelectedDateName,
  TertiaryButton,
} from './popupStyles';
import { YearPicker } from '../yearPicker/yearPicker';
import { formatDate } from '../dateHelpers';
import { DatepickerRangeProps } from '../elviaDatepicker.types';

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

    const onAnimationEnd = () => {
      if (fadeOut) {
        onClose();
      }
    };

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
      const closeOnEsc = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape') {
          setFadeOut(true);
        }
      };

      window.addEventListener('keydown', closeOnEsc);

      return () => {
        window.removeEventListener('keydown', closeOnEsc);
      };
    }, []);

    useEffect(() => {
      if (selectedDate) {
        setViewedDate(selectedDate);
      }
    }, [selectedDate]);

    return createPortal(
      <>
        <Backdrop onClick={() => setFadeOut(true)} data-testid="backdrop" />
        <Container
          ref={ref}
          data-testid="popover"
          role="dialog"
          aria-label="Datovelger popup"
          aria-modal="true"
          fadeOut={fadeOut}
          onAnimationEnd={onAnimationEnd}
        >
          <PopoverHeader>
            <SelectedDateName>
              {formatDate(selectedDate, { weekday: 'long', day: 'numeric', month: 'long' })}
            </SelectedDateName>
            <TertiaryButton onClick={() => toggleView()} aria-label="Endre år" data-testid="year-view-toggle">
              {formatDate(viewedDate, { year: 'numeric' })}
              <Icon name={yearPickerIsOpen ? 'arrowUp' : 'arrowDown'} size="xs" />
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
                  >
                    <Icon name="reset" size="xs" />
                    {clearButtonText}
                  </TertiaryButton>
                </PopoverFooter>
              </>
            )}
          </PopoverBody>
        </Container>
      </>,
      document.body,
    );
  },
);

OverlayContainer.displayName = 'DatepickerOverlayContainer';
