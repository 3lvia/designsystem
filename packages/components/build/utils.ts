import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

// We create a hash of the new output to see if it differs from the old
// If the file content is the same, we don't move it. This increases performance.
export const getMd5 = (fileName: string): string | null => {
  if (!fs.existsSync(fileName) || fs.statSync(fileName).isDirectory()) {
    return null;
  }

  return getMd5FromFile(fs.readFileSync(fileName, 'utf-8'));
};

export const getMd5FromFile = (file?: string): string => {
  if (!file) {
    return '';
  }

  const hash = crypto.createHash('md5');
  const data = hash.update(file, 'utf-8');
  return data.digest('hex');
};

export const toInOutTuple = (filePath: string, outFolder?: string, fileName?: string) => {
  const componentFolder = filePath.split('/')[1];
  const outName = fileName ?? path.parse(filePath).name;
  const subFolder = outFolder ? outFolder : outName.endsWith('.public') ? 'public-api' : 'react';

  return { in: filePath, out: path.join(componentFolder, 'dist', subFolder, outName) };
};

export const getComponentName = (filePath: string): string => {
  return filePath.split(path.sep).find((part) => part.startsWith('elvis')) || '';
};
