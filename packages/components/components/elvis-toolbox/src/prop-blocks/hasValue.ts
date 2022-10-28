export interface HasValue<T> {
  value?: T;
  valueOnChange?: (value: T | null) => void;
}
