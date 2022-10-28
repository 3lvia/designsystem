export interface ErrorOptions {
  text: string;
  hideText: boolean;
  isErrorState: boolean;
}

export interface HasError {
  errorOptions?: Partial<ErrorOptions>;
  errorOnChange?: (error: string) => void;
}
