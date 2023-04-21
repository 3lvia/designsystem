declare module '@elvia/elviselvis-accordion' {}
import { AccordionProps } from './dist/react/js/elvia-accordion.types';
type test = {
  test1: JSX.Element | string;
  test2: string;
  test3: number;
  test4: (a: number) => void;
};
type Props<T> = {
  [P in keyof T]: T[P] extends JSX.Element ? never : T[P];
};

type test2 = Props<test>;
export type AccordionProps = Props<AccordionProps>;
