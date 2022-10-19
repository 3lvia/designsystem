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
      const newDate = new Date(selectedDate ? selectedDate : new Date());
      newDate.setFullYear(selectedYear);
      onChange(newDate);
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

    return createPortal(
      <>
        <Backdrop onClick={() => setFadeOut(true)} data-testid="backdrop" />
        <Container
          ref={ref}
          data-testid="popover"
          role="dialog"
          aria-modal="true"
          fadeOut={fadeOut}
          onAnimationEnd={onAnimationEnd}
        >
          <PopoverHeader>
            <SelectedDateName>
              {selectedDate?.toLocaleDateString('nb-NO', { weekday: 'long', day: 'numeric', month: 'long' })}
            </SelectedDateName>
            <TertiaryButton onClick={() => toggleView()} aria-label="Endre år">
              {viewedDate?.toLocaleDateString('nb-NO', { year: 'numeric' })}
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
                />
                <PopoverFooter>
                  <TertiaryButton
                    onClick={() => {
                      onChange(null);
                      onReset();
                    }}
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
