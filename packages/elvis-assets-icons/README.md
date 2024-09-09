# Elvis-assets-icons

## Usage

```ts
import { clock } from '@elvia/elvis-assets-icons';

const clockSvg = clock.getIcon(color); // Color is optional
```

color: 'red' -> Makes the icon red

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
