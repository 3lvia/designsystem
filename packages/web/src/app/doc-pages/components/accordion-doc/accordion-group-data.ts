import { exampleContents } from 'src/app/shared/example-contents';

export const accordionGroupData = {
  codeReact: `<div style={{display: 'flex'; flexDirection: 'column'; gap: '16px'}}>
  <Accordion 
    isFullWidth="true"
    typography="text-lg-strong"
    openLabel="${exampleContents.texts.md['eng-GBR'].title}" 
    closeLabel="${exampleContents.texts.md['eng-GBR'].title}"
    content="${exampleContents.texts.md['eng-GBR'].description}"
  /></Accordion>
  <Divider></Divider>
  <Accordion 
    isFullWidth="true"
    typography="text-lg-strong"
    openLabel="${exampleContents.texts.sm['eng-GBR'].title}" 
    closeLabel="${exampleContents.texts.sm['eng-GBR'].title}"
    content="${exampleContents.texts.sm['eng-GBR'].description}"
  ></Accordion>
  <Divider></Divider>
  <Accordion 
    isFullWidth="true"
    typography="text-lg-strong"
    openLabel="${exampleContents.texts.lg['eng-GBR'].title}" 
    closeLabel="${exampleContents.texts.lg['eng-GBR'].title}"
    content="${exampleContents.texts.lg['eng-GBR'].description}"
  ></Accordion>
</div>`,
  codeAngular: `<div style="display: flex; flex-direction: column; gap: 16px">
  <elvia-accordion 
    [isFullWidth]="true"
    [typography]="'text-lg-strong'"
    [openLabel]="'${exampleContents.texts.md['eng-GBR'].title}'" 
    [closeLabel]="'${exampleContents.texts.md['eng-GBR'].title}'"
  >
    <div slot="content">
        ${exampleContents.texts.md['eng-GBR'].description}
    </div>
  </elvia-accordion>
  <elvia-divider></elvia-divider>
  <elvia-accordion 
    [isFullWidth]="true"
    [typography]="'text-lg-strong'"
    [openLabel]="'${exampleContents.texts.sm['eng-GBR'].title}'" 
    [closeLabel]="'${exampleContents.texts.sm['eng-GBR'].title}'"
  >
    <div slot="content">
        ${exampleContents.texts.sm['eng-GBR'].description}
    </div>
  </elvia-accordion>
  <elvia-divider></elvia-divider>
  <elvia-accordion 
    [isFullWidth]="true"
    [typography]="'text-lg-strong'"
    [openLabel]="'${exampleContents.texts.lg['eng-GBR'].title}'" 
    [closeLabel]="'${exampleContents.texts.lg['eng-GBR'].title}'"
  >
    <div slot="content">
        ${exampleContents.texts.lg['eng-GBR'].description}
    </div>
  </elvia-accordion>
</div>`,
  codeVue: `<div style="display: flex; flex-direction: column; gap: 16px">
  <elvia-accordion 
    :isFullWidth="true"
    :typography="'text-lg-strong'"
    :openLabel="'${exampleContents.texts.md['eng-GBR'].title}'" 
    :closeLabel="'${exampleContents.texts.md['eng-GBR'].title}'"
  >
    <div slot="content">
        ${exampleContents.texts.md['eng-GBR'].description}
    </div>
  </elvia-accordion>
  <elvia-divider></elvia-divider>
  <elvia-accordion 
    :isFullWidth="true"
    :typography="'text-lg-strong'"
    :openLabel="'${exampleContents.texts.sm['eng-GBR'].title}'" 
    :closeLabel="'${exampleContents.texts.sm['eng-GBR'].title}'"
  >
    <div slot="content">
        ${exampleContents.texts.sm['eng-GBR'].description}
    </div>
  </elvia-accordion>
  <elvia-divider></elvia-divider>
  <elvia-accordion 
    :isFullWidth="true"
    :typography="'text-lg-strong'"
    :openLabel="'${exampleContents.texts.lg['eng-GBR'].title}'" 
    :closeLabel="'${exampleContents.texts.lg['eng-GBR'].title}'"
  >
    <div slot="content">
        ${exampleContents.texts.lg['eng-GBR'].description}
    </div>
  </elvia-accordion>
</div>`,
  codeNativeHTML: `<div style="display: flex; flex-direction: column; gap: 16px">
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
