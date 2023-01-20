import { exampleContents } from 'src/app/shared/example-contents';

export const accordionGroupData = {
  codeReact: `<div></div>`,
  codeAngular: `<div></div>`,
  codeVue: `<div></div>`,
  codeNativeHTML: `<div style="display: flex; flex-direction: column; gap: 16px;">
  <elvia-accordion 
    isFullWidth="true"
    typography="text-lg-strong"
    openLabel="${exampleContents.texts.md['eng-GBR'].title}" 
    closeLabel="${exampleContents.texts.md['eng-GBR'].title}"
  >
    <div slot="content">
        ${exampleContents.texts.md['eng-GBR'].description}
    </div>
  </elvia-accordion>
  <elvia-divider></elvia-divider>
  <elvia-accordion 
    isFullWidth="true"
    typography="text-lg-strong"
    openLabel="${exampleContents.texts.sm['eng-GBR'].title}" 
    closeLabel="${exampleContents.texts.sm['eng-GBR'].title}"
  >
    <div slot="content">
        ${exampleContents.texts.sm['eng-GBR'].description}
    </div>
  </elvia-accordion>
  <elvia-divider></elvia-divider>
  <elvia-accordion 
    isFullWidth="true"
    typography="text-lg-strong"
    openLabel="${exampleContents.texts.lg['eng-GBR'].title}" 
    closeLabel="${exampleContents.texts.lg['eng-GBR'].title}"
  >
    <div slot="content">
        ${exampleContents.texts.lg['eng-GBR'].description}
    </div>
  </elvia-accordion>
</div>`,
  codeNativeScript: ``,
};
