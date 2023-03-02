# Elvis-assets-icon

## 2.10.0 (02.03.23)

### New feature

- The color of the icons are now set using css-variables. The variables are defined in `@elvia/elvis`, but
  have a fallback value in case Elvis is not present.

### Patch

- Migrated the build system to Typescript.

## 2.9.0 (07.02.23)

### New feature

- New icons:
  1. `cables_connected`.
  2. `cables_connected-color`.
  3. `cables_connecting-color`.
  4. `cables_disconnected`.
  5. `cables_disconnected-color`.
  6. `community`.
  7. `decent`.
  8. `diversity`.
  9. `health_safety_environment`.
  10. `image-color`.
  11. `open`.

## 2.8.0 (01.02.23)

### New feature

- Added new icon `piggy_bank-color`.

## 2.7.1 (30.01.23)

### Patch

- Added support for using css-variables to set the color of icons.
- Bumped dependency on `@elvia/elvis-colors` to 1.5.0.

## 2.7.0 (04.01.23)

### New feature

- New icons:
  1. `note_approved`
  2. `note_not_approved`
  3. `note_not_approved-color`

## 2.6.1 (28.11.22)

### Bug fix

- Fixed a bug where the Wrench icon would be cut off

## 2.6.0 (27.10.22)

### New feature

- New icons:
  1. `future`
  2. `history`
  3. `it_systems-color`
  4. `notification`
  5. `laws-color`
  6. `laws`
  7. `process-color`

## 2.5.3 (05.10.22)

### Patch

- No changes. Republish due to missing dist-folder.

## 2.5.2 (29.09.22)

### Patch

- All icons are now defined in their own files to help reduce bundle size. The API of the package is
  unchanged.

## 2.5.1 (15.09.22)

### Patch

- Bumped dependency on `@elvia/elvis-colors` to make newer color labels work properly.

## 2.5.0 (29.08.22)

### New feature

- Added a new icon: `new_tab`.

## 2.4.3 (19.08.22)

### Patch

- Updated from gulp-svgo til gulp-svgmin. Fixes a bug that made svg not possible to open in Adobe programs.

## 2.4.2 (16.08.22)

### Patch

- Fixed the type declaration for the `getIcon`-function.

## 2.4.1 (15.08.22)

### Bug fix

- Fixed a bug that caused the color property to not work properly for filled icons.

## 2.4.0 (05.08.22)

### New feature

- New icons:
  1. `access_control`
  2. `access_control-color`
  3. `exit_full_screen`
  4. `exit_full_screen-color`
  5. `full_screen`
  6. `full_screen-color`
  7. `sorting_alfabetical_a_to_z`
  8. `sorting_alfabetical_z_to_a`
  9. `sorting_date_earliest_to_latest`
  10. `sorting_date_latest_to_earliest`
  11. `sorting_number_high_to_low`
  12. `sorting_number_low_to_high`
  13. `sorting_time_earliest_to_latest`
  14. `sorting_time_latest_to_earliest`
  15. `transformer`
  16. `transformer-color`
  17. `transformer_change`
  18. `transformer_change-color`

## 2.3.4 (26.07.22)

### Bug fix

- Fixed one icon that was not working: `cookie`.

## 2.3.3 (03.05.22)

### Bug fix

- Fixed two icons that were not working: `play_circle-color` and `play_circle-filled-color`.

## 2.3.2 (08.04.22)

### Patch

- Fixed CommonJS elvis-colors import method.

## 2.3.1 (22.03.22)

### Patch

- Fixed CommonJS template not including elvis-colors support.

## 2.3.0 (03.03.22)

### New feature

- Thumbnail-color and adjust icons

## 2.2.0 (23.02.22)

### New feature

- Now supports setting colors from elvis-colors. If the color value that is sent in is not 'inverted' or
  starts with a '#' (i.e. is a hex value) the color will be fetched from elvis-colors.

## 2.1.0 (15.02.22)

### New feature

- Added new icons "layers", "sorting-2-bold", "select_area", "pin-filled_color", and "check_circle-color".
- Updated all icons to fix a bug that caused some icons to be cropped by one pixel at the bottom.

## 2.0.0 (17.01.22)

### Breaking changes

- Removed figma icon.
- Renamed the icon "settings\_\_vertical" to "configurations"

### Patch

- Added "Grid" to searchable term list for thumbnail icon
