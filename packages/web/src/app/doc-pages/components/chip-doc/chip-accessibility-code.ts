const chipAccessibilityCode = {
  type: 'simple',
  codeReact: `<fieldset className="e-strip-fieldset">
  <legend className="e-hide">Chip group description</legend>
  <div className="e-flex e-flex-direction-row">
    <Chip 
      type={"legend"}
      value={2020} 
      selected={false}
      ariaLabel={"Velg filtrering for 2020"}
      valueOnChange={(event) => handleValueOnChange(event)}
      inlineStyle={{margin: '8px'}}
    >
    </Chip>
    <Chip 
      type={"legend"}
      value={2021} 
      selected={true}
      ariaLabel={"Fjern filtrering for 2021"}
      valueOnChange={(event) => handleValueOnChange(event)}
      inlineStyle={{margin: '8px'}}
    >
    </Chip>
    <Chip 
      type={"legend"}
      value={2022} 
      selected={true}
      ariaLabel={"Fjern filtrering for 2022"}
      valueOnChange={(event) => handleValueOnChange(event)}
      inlineStyle={{margin: '8px'}}
    >
    </Chip>
  </div>
</div>
`,
  codeAngular: `<fieldset class="e-strip-fieldset">
  <legend class="e-hide">Chip group description</legend>
  <div class="e-flex e-flex-direction-row">
    <elvia-chip 
      [type]="'legend'"
      [value]="2020" 
      [selected]="false"
      [ariaLabel]="'Velg filtrering for 2020'" 
      (valueOnChange)="handleValueOnChange($event.detail.value)"
      [inlineStyle]="{ margin: '8px' }"
    >
    </elvia-chip>
    <elvia-chip 
      [type]="'legend'"
      [value]="2021" 
      [selected]="true"
      [ariaLabel]="'Fjern filtrering for 2021'" 
      (valueOnChange)="handleValueOnChange($event.detail.value)"
      [inlineStyle]="{ margin: '8px' }"
    >
    </elvia-chip>
    <elvia-chip 
      [type]="'legend'"
      [value]="2022" 
      [selected]="true"
      [ariaLabel]="'Fjern filtrering for 2022'" 
      (valueOnChange)="handleValueOnChange($event.detail.value)"
      [inlineStyle]="{ margin: '8px' }"
    >
    </elvia-chip>
  </div>
</div>
  `,
  codeVue: `<fieldset class="e-strip-fieldset">
  <legend class="e-hide">Chip group description</legend>
  <div class="e-flex e-flex-direction-row">
    <elvia-chip 
      :type="'legend'"
      :value="2020" 
      :selected="false"
      :ariaLabel="'Velg filtrering for 2020'" 
      :inlineStyle="{ margin: '8px' }"
      @value-on-change="handleValueOnChange($event.detail.value)"
    >
    </elvia-chip>
    <elvia-chip 
      :type="'legend'"
      :value="2021" 
      :selected="true"
      :ariaLabel="'Fjern filtrering for 2021'"
      :inlineStyle="{ margin: '8px' }"
      @value-on-change="handleValueOnChange($event.detail.value)"
    >
    </elvia-chip>
    <elvia-chip 
      :type="'legend'"
      :value="2022" 
      :selected="true"
      :ariaLabel="'Fjern filtrering for 2022'" 
      :inlineStyle="{ margin: '8px' }"
      @value-on-change="handleValueOnChange($event.detail.value)"
    >
    </elvia-chip>
  </div>
</div>
  `,
  codeNativeHTML: `<fieldset class="e-strip-fieldset">
  <legend class="e-hide">Chip group description</legend>
  <div class="e-flex e-flex-direction-row">
    <elvia-chip 
      id="example-elvia-chip-1"
      type="legend"
      selected="false"
      value="2020"
      ariaLabel="'Velg filtrering for 2020'"
    >
    </elvia-chip>
    <elvia-chip 
      id="example-elvia-chip-2"
      type="legend"
      selected="true"
      value="2021"
      ariaLabel="'Fjern filtrering for 2021'"
    >
    </elvia-chip>
    <elvia-chip 
      id="example-elvia-chip-3"
      type="legend"
      selected="true"
      value="2022"
      ariaLabel="'Fjern filtrering for 2022'"
    >
    </elvia-chip>
  </div>
</fieldset>
`,
  codeNativeScript: `  const chip1 = document.getElementById('example-elvia-chip-1');
  const chip2 = document.getElementById('example-elvia-chip-2');
  const chip3 = document.getElementById('example-elvia-chip-3');

  chip1.setProps({inlineStyle: {margin: '8px'} });
  chip2.setProps({inlineStyle: {margin: '8px'} });
  chip3.setProps({inlineStyle: {margin: '8px'} });
  `,
};

export { chipAccessibilityCode };
