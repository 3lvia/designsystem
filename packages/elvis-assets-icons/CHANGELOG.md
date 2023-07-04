# Elvis-assets-icon

## 3.2.1 (26.06.23)

### Bug fix

- Re-exported the `shortcut` icon as the inverted version was not working.

## 3.2.0 (26.06.23)

### New feature

- `hand_pointer` added

## 3.1.0 (26.06.23)

### New feature

- `light_theme` added
- `dark_theme` added

## 3.0.1 (02.06.2023)

### Bug fix

- Re-exported the `piggy_bank-color` icon to fix an issue.

## 3.0.0 (28.04.23)

### Breaking changes

- All icons now use `getThemeColor` instead of `getColor` when used through this package. This causes the
  icons to now use the new color labels instead of the old ones.

### Patch

- Now using the newest color labels to set colors in icons.

## 2.14.0 (28.05.23)

### New feature

All these icons now points to another sorting icon.

- `sorting_alfabetical_a_to_z` deprecated
- `sorting_alfabetical_z_to_a` deprecated
- `sorting_date_earliest_to_latest` deprecated
- `sorting_date_latest_to_earliest` deprecated
- `sorting_number_high_to_low` deprecated
- `sorting_number_low_to_high` deprecated
- `sorting_time_earliest_to_latest` deprecated
- `sorting_time_latest_to_earliest` deprecated.

## 2.13.0 (25.05.23)

### New feature

- `paper_plane_speed_color` deprecated
- `paper_plane_speed-color` added
- `laptop-color` updated

- `car-color` added
- `graph_down-color` added
- `graph_down` added
- `home_office` added
- `mail-color` added
- `office-color` added
- `office` added
- `paper_plane-color` added
- `recycle-color` added
- `recycle` added
- `wrench-color` added

## 2.12.0 (20.05.23)

### New feature

- New icons:
  1. `columns`.
  2. `step_6`.
  3. `step_7`.
  4. `step_8`.
  5. `step_9`.
  6. `step_10`.

## 2.11.0 (09.03.23)

### New feature

- The color of the icons are now set using css-variables. The variables are defined in `@elvia/elvis`, but
  have a fallback value in case Elvis is not present. This introduces support for dark theme.

### Patch

- Migrated the build system to Typescript.

### Bug fix

- Fixed an issue with the `step_` icons.

## 2.10.2 (07.03.23)

### Patch

- Added missing file export for the Typescript declaration file.

## 2.10.1 (06.03.23)

### Patch

- Renamed icon `movie` to `media-color`.

## 2.10.0 (06.03.23)

### New feature

- New icons:
  1. `fearless`.
  2. `link`.
  3. `magic`.
  4. `movie`.
  5. `shortcut`.

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
