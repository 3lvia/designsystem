import { CommentTag, InterfaceName, Prop, TsDoc } from './configFromJson.types';
import { CegTypes, Controls, Radio } from './controlType';
import typedocJson from 'src/typedoc-output.json';

export const cegControlsFromTsDoc = (componentName: string): Controls => {
  const controls: Controls = {};

  const docs = typedocJson.children.find((child) => child.name.includes(componentName));
  const interfaces = (docs?.children as InterfaceName[]) || [];
  const props = interfaces.find((componentInterface) => componentInterface.name.endsWith('Props'));

  if (props) {
    props.children.forEach((prop) => {
      const cegConfig = getCegComments(prop);
      if (cegConfig.length) {
        const type = getCegProp(cegConfig, '@cegType') as CegTypes;
        const label = getCegProp(cegConfig, '@cegLabel');
        const group = getCegProp(cegConfig, '@cegGroup');
        const value = getCegProp(cegConfig, '@cegValue');

        if (type === 'checkbox') {
          controls[prop.name] = { type: 'checkbox', group: group, label: label, value: value === 'true' };
        } else if (type === 'counter') {
          const increment = +getCegProp(cegConfig, '@cegCounterIncrement');
          controls[prop.name] = { type: 'counter', group: group, increment: increment, value: +value };
        } else if (type === 'switch') {
          controls[prop.name] = { type: 'switch', group: group, label: label, value: value === 'true' };
        } else if (type === 'text') {
          const inputType = getCegProp(cegConfig, '@cegInputType') as 'input' | 'textarea';

          controls[prop.name] = {
            type: 'text',
            group: group,
            label: label,
            value: value,
            inputType: inputType,
          };
        } else if (type === 'radioGroup') {
          controls[prop.name] = {
            type: 'radioGroup',
            group: group,
            value: value,
            radios: getCegRadios(docs as TsDoc, prop.type.name),
          };
        }
      }
    });
  }

  return controls;
};

const getCegRadios = (json: TsDoc, typeName: string): Radio[] => {
  const child = json.children.find((child) => child.name === typeName);
  return child.type.types.map((type) => ({ label: type.value, value: type.value } as Radio));
};

const getCegProp = (cegConfig: CommentTag[], tagName: string): string => {
  const prop = cegConfig.find((config) => config.tag === tagName);
  if (prop) {
    return prop.content[0].text;
  }

  return '';
};

const getCegComments = (prop: Prop): CommentTag[] => {
  const propComments = prop.comment?.blockTags || [];
  return propComments.filter((comment) => comment.tag.startsWith('@ceg'));
};
