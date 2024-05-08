import { createContext } from '@lit/context';

export type DropdownContext = {
  value: string | null;
  updateValue: (value: string) => void;
};
export const dropdownContext = createContext<DropdownContext>(Symbol('dropdown-context'));
