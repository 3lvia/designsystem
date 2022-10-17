// Returns number always as two digits
interface Options {
  mode: 'prefix' | 'suffix';
}

export const padDigit = (d: number, opts?: Partial<Options>): string => {
  const defaultOptions: Options = {
    mode: 'prefix',
  };

  const mergedOpts = { ...defaultOptions, ...opts };

  if (mergedOpts.mode === 'prefix') {
    const paddedNumber = `0${d}`;
    return paddedNumber.substring(paddedNumber.length - 2);
  } else {
    const paddedNumber = `${d}0`;
    return paddedNumber.substring(0, 2);
  }
};
