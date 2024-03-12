import { series, task, watch } from 'gulp';

import { generateIcons } from './tasks/icons';
import { generateIconsScss } from './tasks/iconsScss';

// Run gulp tasks
task('default', series(generateIcons, generateIconsScss));

// Run gulp watch
task('watch', function () {
  watch(['./icons/svg/src/*.svg', './config/**.*'], series('default'));
});
