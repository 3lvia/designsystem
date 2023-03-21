import { CegControl, CegControlGroup } from './controlType';

export const isControl = (control: CegControlGroup | CegControl): control is CegControl => {
  return 'type' in control;
};

export const isGroup = (control: CegControlGroup | CegControl): control is CegControlGroup => {
  return 'title' in control;
};
