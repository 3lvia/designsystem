import { ComponentProp, EventProp, InputProp } from './types';

export const getEventProps = (props: ComponentProp[]): EventProp[] => {
  return props.filter((prop) => propIsEvent(prop));
};

export const getInputProps = (props: ComponentProp[]): InputProp[] => {
  return props.filter((prop) => !propIsEvent(prop));
};

const propIsEvent = (prop: ComponentProp): prop is InputProp => {
  return prop.type.includes('=>');
};
