const getUrlParts = (): string[] => {
  const url = new URL(location.href);
  // E.g. ['design', 'elvia', 'io']
  return url.host.split('.');
};

export const getActiveApp = (): string => {
  const url = getUrlParts()[0];
  return url;
};
