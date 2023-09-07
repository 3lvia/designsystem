import { PrimitiveProp } from 'src/app/doc-pages/components/component-data.interface';

export interface EventProp extends PrimitiveProp {
  attribute: string;
}

export interface InputProp extends PrimitiveProp {
  attribute: string;
}

export type ComponentProp = EventProp | InputProp;
