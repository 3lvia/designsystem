import { BehaviorSubject } from 'rxjs';
import { CegCustomText, Controls } from './controlType';

export abstract class ComponentExample {
  elementName: string;
  customText: CegCustomText[];

  controls: BehaviorSubject<Controls>;

  abstract updateValue(name: string, value: string | number | boolean): void;
}
