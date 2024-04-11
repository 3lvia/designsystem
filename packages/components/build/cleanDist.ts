import fs from 'fs/promises';
import path from 'path';
import tinyGlob from 'tiny-glob';

const cleanDistFolders = async () => {
  const paths = await tinyGlob(`components${path.sep}elvis-*${path.sep}dist`);
  paths.forEach(async (distPath) => await fs.rm(distPath, { recursive: true, force: true }));
};

export default cleanDistFolders;
