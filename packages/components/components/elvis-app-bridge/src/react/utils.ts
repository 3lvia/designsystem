const getUrlParts = (): string[] => {
  const url = new URL(location.href);
  // E.g. ['design', 'elvia', 'io']
  return url.host.split('.');
};

export const getCurrentApp = (): string => {
  const url = getUrlParts()[0];
  return url;
};

export const isTestEnvironment = (): boolean => {
  return getUrlParts().includes('test-elvia');
};
