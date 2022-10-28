# Elvis-assets-icons

## Usage

`import * as icons from '@elvia/elvis-assets-icons'`

`icons['ICONNAME'].getIcon(color*)`

`*color is optional`

color: 'inverted' -> Inverts the icon correctly <br> color: 'red' -> Makes the icon red

### Example

- `icons['add_circle-filled']`
- `icons['add_circle'].getIcon(red)`
- `icons['add_circle-filled'].getIcon('inverted')`

## Icon usage

Our icon library is based on Streamline icons. The icons that are from Streamline is not made accessible under
the same license as this npm package. Those icons are still the property of Webablys LLC. Elvia has bought a
license for the use of these icons in the organization. They can also be used in open source projects as long
as you follow their license.

Streamline license information: https://help.streamlineicons.com/license-premium

## How to publish new icons

- Add the new icons to `icons/svg/src`. Ensure that the icons follow the naming pattern.
- Add the icon definitions to `config/icons.config.js`. Add appropriate terms.
- Build the icons using `yarn build`.
- Build `elvis`.
- Update changelog and version for both `elvis-assets-icons` and `elvis`.
- Make a PR to main.
