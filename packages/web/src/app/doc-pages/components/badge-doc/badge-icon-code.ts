const badgeIconCode = {
  name: 'elvis-badge',
  elementNameW: 'elvia-badge',
  elementNameR: 'Badge',
  codeReact: `<Badge content={
    <i slot="content" class="e-icon e-icon--notification-bold e-icon--sm" aria-hidden="true"></i>
} count={19} type={"numbered"} badgeColor="red"/>`,
  codeAngular: `<elvia-badge [count]="19" [type]="numbered" [badgeColor]="red">
    <i slot="content" class="e-icon e-icon--notification-bold e-icon--sm" aria-hidden="true"></i>
  </elvia-badge>`,
  codeVue: `<elvia-badge :count=19 :type="numbered" :badgeColor="red">
    <i slot="content" class="e-icon e-icon--notification-bold e-icon--sm" aria-hidden="true"></i>
  </elvia-badge>`,
  codeNativeHTML: `<elvia-badge
  count="19" type="numbered" badgeColor="red"
><i slot="content" class="e-icon e-icon--notification-bold e-icon--sm" aria-hidden="true"></i>
</elvia-badge>`,
  codeNativeScript: ``,
};

export { badgeIconCode };
