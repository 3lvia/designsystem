import * as icons from '@elvia/elvis-assets-icons';
import { addIcons } from '@elvia/elvis-icons';

// This adds all the icons from the icons package, with the names from the package
const iconObj = Object.entries(icons).reduce(
  (acc, [name, icon]) => {
    acc[name] = { svg: icon.getIcon() };
    return acc;
  },
  {} as Parameters<typeof addIcons>[0],
);

addIcons(iconObj);

// This way to add single icons
// addIcons({
//   bookmark: { svg: bookmark.getIcon() },
//   bookmarkFilled: { svg: bookmarkFilled.getIcon() },
//   han: { svg: han.getIcon() },
//   download: { svg: download.getIcon() },
//   upload: { svg: upload.getIcon() },
//   removeCircle: { svg: removeCircle.getIcon() },
//   informationCircle: { svg: informationCircle.getIcon() },
//   informationCircleFilledColor: { svg: informationCircleFilledColor.getIcon() },
//   viewOn: { svg: viewOn.getIcon() },
//   search: { svg: search.getIcon() },
//   searchColor: { svg: searchColor.getIcon() },
//   fullBattery: { svg: fullBattery.getIcon() },
//   fullBatteryColor: { svg: fullBatteryColor.getIcon() },
//   dashboard: { svg: dashboard.getIcon() },
//   dashboardColor: { svg: dashboardColor.getIcon() },
// });
