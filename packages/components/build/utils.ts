import crypto from 'crypto';
import fs from 'node:fs';
import path from 'node:path';

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
  const outName = fileName ?? path.parse(filePath).name;
  let dir = path.dirname(filePath).replace(`components${path.sep}`, '');
  if (outFolder) {
    dir = dir.replace(`src${path.sep}react`, outFolder);
  } else {
    dir = dir.replace('src', 'dist');

    if (outName.endsWith('.public')) {
      dir = dir.replace('react', 'public-api');
    }
  }

  return { in: filePath, out: path.join(dir, outName) };
};

export const getComponentName = (filePath: string): string => {
  return filePath.split(path.sep).find((part) => part.startsWith('elvis')) ?? '';
};
