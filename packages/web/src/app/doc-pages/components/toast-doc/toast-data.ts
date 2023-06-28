import changelogJson from '@elvia/elvis-toast/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const toastData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Toast',
  attributes: {
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the toast.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the toast. Example: {marginTop: '8px', width: '100%'}.",
    },
  },
  codeReact: `<Toast></Toast>`,
  codeAngular: `<elvia-toast></elvia-toast>`,
  codeVue: `<elvia-toast></elvia-toast>`,
  codeNativeHTML: `<elvia-toast></elvia-toast>
  
<button class="e-btn" id="toast-trigger">
  Show example toast
</button>`,
  codeNativeScript: `  const trigger = document.getElementById('toast-trigger');

  trigger.addEventListener('click', () => {
    /** 
     * Note: Don't do this. This is only for demo purposes.
     * Use the method "openElviaToast" instead:
     * 
     * import { openElviaToast } from '@elvia/elvis-toast';
     * openElviaToast({
     *    title: 'Short title',
     *    body: 'A successful confirmation message',
     *    duration: 7000,
     *    closable: true, 
     * });
     **/
    document.dispatchEvent(new CustomEvent('elviaToastOpen', { detail: {
      title: 'Short title',
      body: 'A successful confirmation message',
      duration: 7000,
      closable: true,
    }}))
  })
  `,
};
