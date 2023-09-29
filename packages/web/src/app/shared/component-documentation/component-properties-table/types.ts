import { ChildlessProp, NestedProp } from 'src/app/doc-pages/components/component-data.interface';

export interface EventProp extends ChildlessProp {
  attribute: string;
  level: number; // to define the indentation in the table
  childProps?: ComponentProp[];
}

export interface InputProp extends ChildlessProp {
  attribute: string;
  level: number; // to define the indentation in the table
  childProps?: ComponentProp[];
}

export interface NestedInputProp extends NestedProp<Record<string, any>> {
  attribute: string;
  level: number; // to define the indentation in the table
  childProps?: ComponentProp[];
}

export type ComponentProp = EventProp | InputProp | NestedInputProp;
