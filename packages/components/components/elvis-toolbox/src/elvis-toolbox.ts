import * as lodashThrottle from 'lodash.throttle';

const throttle = (func: () => void, limit: number, options: { trailing: boolean }): void => {
  return lodashThrottle(func, limit, options);
};

export default { throttle: throttle };
