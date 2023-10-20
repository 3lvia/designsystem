type FrameworkName = 'angular' | 'vue';
export interface FrameworkSpec {
  attributePrefix: string;
  attributePostfix: string;
  eventPrefix: string;
  eventPostfix: string;
  castEventDataAsAny?: boolean;
}

export const frameworks: Record<FrameworkName, FrameworkSpec> = {
  angular: {
    attributePrefix: '[',
    attributePostfix: ']',
    eventPrefix: '(',
    eventPostfix: ')',
    castEventDataAsAny: true,
  },
  vue: {
    attributePrefix: ':',
    attributePostfix: '',
    eventPrefix: '@',
    eventPostfix: '',
  },
};
