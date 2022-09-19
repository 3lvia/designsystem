const badgeIconCode = {
  name: 'elvis-badge',
  elementNameW: 'elvia-badge',
  elementNameR: 'Badge',
  codeReact: `<button class="e-btn e-btn--icon e-mr-8" aria-label="Beskrivelse av ikon-knapp">
  <Badge content={
    <span slot="content"class="e-btn__icon">
      <i class="e-icon e-icon--notification-bold" aria-hidden="true"></i>
    </span>
  } count={12} badgeColor="red"/>
</button>`,
  codeAngular: `<button class="e-btn e-btn--icon e-mr-8" aria-label="Beskrivelse av ikon-knapp">
  <elvia-badge [badgeColor]="red" [count]="12">
     <span slot="content"class="e-btn__icon">
        <i class="e-icon e-icon--notification-bold" aria-hidden="true"></i>
     </span>
  </elvia-badge>
</button>`,
  codeVue: `<button class="e-btn e-btn--icon e-mr-8" aria-label="Beskrivelse av ikon-knapp">
  <elvia-badge :badgeColor="red" :count="12">
     <span slot="content"class="e-btn__icon">
        <i class="e-icon e-icon--notification-bold" aria-hidden="true"></i>
     </span>
  </elvia-badge>
</button>`,
  codeNativeHTML: `<button class="e-btn e-btn--icon e-mr-8" aria-label="Beskrivelse av ikon-knapp">
  <elvia-badge badgeColor="red" count="12">
     <span slot="content"class="e-btn__icon">
        <i class="e-icon e-icon--notification-bold" aria-hidden="true"></i>
     </span>
  </elvia-badge>
</button>`,
  codeNativeScript: ``,
};

export { badgeIconCode };
