export const clone = <T>(controls: T): T => {
  return JSON.parse(JSON.stringify(controls));
};
