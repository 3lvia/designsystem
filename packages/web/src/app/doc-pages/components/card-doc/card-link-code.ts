const cardLinkCode = {
  codeReact: `<Link to="/home">
  <Card 
    icon={<i slot="icon" className="e-icon e-icon--home e-icon--sm" aria-hidden="true"></i>}
    heading={"Home"}
  ></Card>
</Link>`,
  codeAngular: `<a [routerLink]="/home">
  <elvia-card [heading]="'Home'">
    <i slot="icon" class="e-icon e-icon--home e-icon--sm" aria-hidden="true"></i>
  </elvia-card>
</a>`,
  codeVue: `<router-link to="/home">
  <elvia-card :heading="'Home'">
    <i slot="icon" class="e-icon e-icon--home e-icon--sm" aria-hidden="true"></i>
  </elvia-card>
</router-link>`,
  codeNativeHTML: `<a href="/home">
  <elvia-card heading="Home">
    <i slot="icon" class="e-icon e-icon--home e-icon--sm" aria-hidden="true"></i>
  </elvia-card>
</a>`,
  codeNativeScript: ``,
};

export { cardLinkCode };
