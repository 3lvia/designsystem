import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-autocomplete-doc',
  templateUrl: './autocomplete-doc.component.html',
  styleUrls: ['./autocomplete-doc.component.scss']
})
export class AutocompleteDocComponent implements OnInit {

  externalUrl = getComponent('autocomplete-doc').externalUrl;
  componentStatus = getComponent('autocomplete-doc').status;

  example1 = `<div class="e-autocomplete">
    <input placeholder="Placeholder text"/>
  </div>`;

  example2 = `<div class="e-autocomplete" style="height:150px">
  <input placeholder="Placeholder text" value="Aus"/>

  <div class="e-autocomplete__content">
    <span class="e-autocomplete__content__item">Australia</span>
    <span class="e-autocomplete__content__item">Austria</span>
  </div>
</div>`;

  example3 = `<div class="e-autocomplete e-mt-16">
<input placeholder="Normal state" value="Normal state"/>
</div>
<div class="e-autocomplete e-autocomplete---active e-mt-16">
<input placeholder="Active/Focus state" value="Active/Focus state"/>
</div>
<div class="e-autocomplete e-autocomplete---invalid e-mt-16">
<input placeholder="Invalid error state" value="Invalid error state"/>
</div>
`;

exampleInHTML= `<div class="e-autocomplete">
  <input type="text" [value]="ChoosenLand" #searchTerm (keyup)="onSearch(searchTerm.value)" id="ChooseCountry"/>
  <div class="e-autocomplete__content" *ngIf="showResults">
    <div class="e-autocomplete__content__item" *ngFor="let country of results" (click)="SelectCountry(country)">
    {{ country }}
    </div>
  </div>
</div>
`;
exampleInTS= `results = [];
showResults = false;
ChoosenLand = '';

onSearch(searchTerm:string) {

  this.results = this.countries.filter(country => country.includes(searchTerm));

  if(searchTerm.length === 0) {
    this.showResults = false;
  } else if(this.results.length === 0) {
    this.showResults = false;
  } else {
    this.showResults = true;
  }
}

SelectCountry(value:string) {
  this.ChoosenLand = value;
  this.showResults = false;
}

countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda",
"Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh",
"Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina",
"Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia",
"Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China",
"Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus",
"Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador",
"Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland",
"France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana",
"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau",
"Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland",
"Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati",
"Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein",
"Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta",
"Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia",
"Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands",
"Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea",
"Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru",
"Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda",
"Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal",
"Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia",
"South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia",
"St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan",
"Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey",
"Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom",
"United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam",
"Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
`;

results = [];
showResults = false;
ChoosenLand = '';

onSearch(searchTerm:string) {

  this.results = this.countries.filter(country => country.includes(searchTerm));

  if(searchTerm.length === 0) {
    this.showResults = false;
  } else if(this.results.length === 0) {
    this.showResults = false;
  } else {
    this.showResults = true;
  }
}

SelectCountry(value:string) {
  this.ChoosenLand = value;
  this.showResults = false;
}

countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda",
"Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh",
"Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina",
"Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia",
"Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China",
"Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus",
"Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador",
"Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland",
"France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana",
"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau",
"Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland",
"Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati",
"Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein",
"Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta",
"Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia",
"Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands",
"Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea",
"Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru",
"Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda",
"Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal",
"Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia",
"South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia",
"St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan",
"Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey",
"Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom",
"United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam",
"Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

  constructor() { }

  ngOnInit() {
  }

}
