/* eslint-disable no-console */
import { Parcel } from '@parcel/core';
import glob from 'tiny-glob';

(async () => {
  const watchMode = process.argv.includes('--watch');
  const paths = await glob('components/elvis-*');
  const orderedPaths = new Set([
    'components/elvis-toolbox',
    'components/elvis-tooltip',
    'components/elvis-dropdown',
    'components/elvis-datepicker',
    'components/elvis-timepicker',
    ...paths,
  ]);

  const bundler = new Parcel({
    entries: Array.from(orderedPaths),
    defaultConfig: '@parcel/config-default',
    shouldDisableCache: !watchMode,
    defaultTargetOptions: {
      isLibrary: true,
      sourceMaps: watchMode,
    },
  });

  if (watchMode) {
    await bundler.watch((err, event) => {
      if (err) {
        // fatal error
        throw err;
      }

      if (event && event.type === 'buildSuccess') {
        const bundles = event.bundleGraph.getBundles();
        console.log(`✨ Built ${bundles.length} React bundles in ${event.buildTime}ms!`);
      } else if (event && event.type === 'buildFailure') {
        console.log(event.diagnostics);
      }
    });
  } else {
    try {
      const { bundleGraph, buildTime } = await bundler.run();
      const bundles = bundleGraph.getBundles();
      console.log(`✨ Built ${bundles.length} React bundles in ${buildTime}ms!`);
    } catch (err) {
      console.log(err.diagnostics);
    }
  }
})();
