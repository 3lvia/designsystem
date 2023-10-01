import tinyGlob from 'tiny-glob';
import fs from 'fs/promises';

const cleanDistFolders = async () => {
  const paths = await tinyGlob('components/elvis-*/dist');
  paths.forEach(async (distPath) => await fs.rm(distPath, { recursive: true, force: true }));
};

export default cleanDistFolders;
