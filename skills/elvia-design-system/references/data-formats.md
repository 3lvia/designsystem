- [Data Formats](#data-formats)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Guidelines](#guidelines)
    - [Date and time](#date-and-time)
    - [Numbers](#numbers)
    - [Phone numbers](#phone-numbers)
  - [Examples](#examples)

# Data Formats

## Reference

https://design.elvia.io/patterns/data-formats

Data Formats is a pattern, not a component.

## Installation

This pattern has no package dependency. See the [Elvis installation reference](./installation.md) for general
setup.

## Use

- Use these formats for dates, times, numbers, and phone numbers.
- Check the project for an existing formatter before you add one. Reuse the existing formatter and locale
  configuration.
- Use locale-aware formatting for values that vary by language or locale, based on the active UI locale. Keep
  the fixed Elvia formats below where specified.

## Guidelines

### Date and time

- Use `dd.mm.yyyy` for numeric dates and `hh.mm` for times, including when the locale is `en-US`.
- Use two digits for the day and month, and four digits for the year.
- Write the full month name in continuous text. Match the word order and casing to the text language, such as
  `January 1` in English or `1. januar` in Norwegian.
- In Norwegian text, use a lowercase month name and a period after the day.
- Add a period after the day and month when you omit the year, such as `01.01.`.
- Include seconds only when necessary.
- Use an en dash without spaces to connect days, dates, and times.

### Numbers

- Group large numbers in sets of three digits, separated by spaces.
- Write numbers of three digits or fewer without spaces.
- Use a comma for decimal numbers.

### Phone numbers

- Group phone numbers in pairs of digits.
- Write numbers in the 8xx series as three, two, and three digits.
- Write phone numbers with three, four, or five digits as one group.

## Examples

**Input:** `01/01/21`, `1. Jan 2021`, `12:00`

**Output:** `01.01.2021`, `1. januar 2021`, `12.00`

**Input:** `2500000`, `0.003`

**Output:** `2 500 000`, `0,003`

**Input:** `222 22 222`, `80 02 22 22`

**Output:** `22 22 22 22`, `800 22 222`
