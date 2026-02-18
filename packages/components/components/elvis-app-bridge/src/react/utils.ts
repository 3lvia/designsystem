type Environment = 'dev' | 'test' | 'prod';

const getUrlParts = (): string[] => {
  const url = new URL(location.href);
  // E.g. ['design', 'elvia', 'io']
  return url.host.split('.');
};

export const getCurrentApp = (): string => {
  const url = getUrlParts()[0];
  return url;
};

/**
 * Gets the environment from the URL
 * - 'drops.dev-elvia.io' -> 'dev'
 * - 'drops.test-elvia.io' -> 'test'
 * - 'drops.elvia.io' -> 'prod'
 */
export const getEnvironment = (): Environment => {
  const secondToLast = getUrlParts().at(-2);
  if (secondToLast?.startsWith('dev-')) return 'dev';
  if (secondToLast?.startsWith('test-')) return 'test';
  return 'prod';
};

export const transformToEnvironmentUrl = (url: string, environment: Environment): string => {
  if (environment === 'prod') return url;

  // Salesforce
  if (url.includes('elvia.lightning.force.com')) {
    return url.replace('elvia.lightning.force.com', 'elvia--test.sandbox.lightning.force.com');
  }

  // IFS
  if (url.includes('elvia.ifs.cloud/main/')) {
    return url.replace('elvia.ifs.cloud/main/', 'elvia-uat.ifs.cloud/b2b/');
  }

  return url.replace('.elvia.io', `.${environment}-elvia.io`);
};
