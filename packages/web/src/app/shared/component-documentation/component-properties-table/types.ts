import { ChildlessProp, NestedProp } from 'src/app/doc-pages/components/component-data.interface';

export interface EventProp extends ChildlessProp {
  attribute: string;
}

export interface InputProp extends ChildlessProp {
  attribute: string;
}

export interface NestedInputProp extends NestedProp<Record<string, any>> {
  attribute: string;
}

export type ComponentProp = EventProp | InputProp | NestedInputProp;
