import fs from 'node:fs/promises';
import tinyGlob from 'tiny-glob';

const cleanDistFolders = async () => {
  const paths = await tinyGlob('components/elvis-*/dist');
  paths.forEach(async (distPath) => await fs.rm(distPath, { recursive: true, force: true }));
};

export default cleanDistFolders;
