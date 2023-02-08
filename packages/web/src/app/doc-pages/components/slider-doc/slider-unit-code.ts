const sliderUnitCode = {
  codeReact: `<Slider
  unit={" kWh"}
  label={"Kilowatt hours"}
  hasInputField={true}
></Slider>`,
  codeAngular: `<elvia-slider
  [unit]="' kWh'" 
  [label]="'Kilowatt hours'"
  [hasInputField]="true"
></elvia-slider>`,
  codeVue: `<elvia-slider
  :unit="' kWh'"
  :label="'Kilowatt hours'"
  :hasInputField="true"
></elvia-slider>`,
  codeNativeHTML: `<elvia-slider
  unit=" kWh"
  label="Kilowatt hours"
  hasInputField="true"
></elvia-slider>`,
};

export { sliderUnitCode };
