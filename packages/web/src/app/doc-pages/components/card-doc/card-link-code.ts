const cardLinkCode = {
  name: 'elvis-card',
  elementNameW: 'elvia-card',
  elementNameR: 'Card',
  codeReact: `<Link to="/home">
    <Card 
        icon={<i slot="icon" class="e-icon e-icon--home e-icon--sm"></i>}
        header={"Home"}
    ></Card>
</Link>`,
  codeAngular: `<a [routerLink]="/home">
    <elvia-card
        [header]="'Home'"
    >
        <i slot="icon" class="e-icon e-icon--home e-icon--sm"></i>
    </elvia-card>
</a>`,
  codeNativeHTML: `<a href="/home" [routerLink]="['/home']">
    <elvia-card 
        header="Home"
    >
        <i slot="icon" class="e-icon e-icon--home e-icon--sm"></i>
    </elvia-card>
</a>`,
  codeNativeScript: `<script>
</script>`,
};

export { cardLinkCode };
