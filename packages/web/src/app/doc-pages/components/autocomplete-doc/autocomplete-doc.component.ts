import { Component, HostListener } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-autocomplete-doc',
  templateUrl: './autocomplete-doc.component.html',
  styleUrls: ['./autocomplete-doc.component.scss'],
})
export class AutocompleteDocComponent {
  figmaUrl = getComponent('autocomplete').figmaUrl;
  description = getComponent('autocomplete').description;
  does = ['When you have many options in a list and the input must be validated'];

  exampleAutocomplete = `<div class="e-form-field">
  <label class="e-form-field__label" for="compact">Label</label>
  <div class="e-input" style="height:155px">
    <input placeholder="Country" value="Aus"/>
    <div class="e-autocomplete">
      <span class="e-autocomplete__item">Australia</span>
      <span class="e-autocomplete__item">Austria</span>
    </div>
  </div>
</div>
`;

  exampleCompact = `<div style="width: 240px;">
  <div class="e-form-field e-form-field--compact">
    <label class="e-form-field__label" for="compact">Label</label>
    <div class="e-input" style="height:105px">
      <input placeholder="Country" value="Aus"/>
      <div class="e-autocomplete">
        <span class="e-autocomplete__item">Australia</span>
        <span class="e-autocomplete__item">Austria</span>
      </div>
    </div>
  </div>
</div>
`;

  exampleInHTML = `<div class="e-form-field">
  <label class="e-form-field__label" for="compact">Country</label>
  <div class="e-input">
    <input
      placeholder="Search for country"
      [value]="chosenLand"
      #searchTerm
      (keyup)="onSearch(searchTerm.value)"
      (click)="onInputClick()"
      id="ChooseCountry"
    />
    <div class="e-autocomplete" *ngIf="showResults" id="countryOptions">
      <span 
        class="e-autocomplete__item" 
        *ngFor="let country of results" 
        (click)="SelectCountry(country)">
        {{ country }}
      </span>
    </div>
  </div>
</div>
`;

  exampleInTS = `results = this.countries;
showResults = false;
chosenLand = '';

// for autocomplete options when click on outside of options or input area
@HostListener('click', ['$event'])
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
onClick(event: any): void {
  if (event.target.id === 'ChooseCountry' || event.target.id === 'countryOptions') {
    return;
  } else {
    this.showResults = false;
  }
}

onSearch(searchTerm: string): void {
  this.results = this.countries.filter((country) => country.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));

  if (searchTerm.length === 0) {
    this.showResults = false;
  } else if (this.results.length === 0) {
    this.showResults = false;
  } else {
    this.showResults = true;
  }
}
// choose countrey from autocomplete options
SelectCountry(value: string): void {
  this.chosenLand = value;
  this.showResults = false;
}
// opens autocomplete options on click
onInputClick(): void {
  if (this.results.length === 0) {
    this.showResults = false
  } else {
    this.showResults = true;
  }
}

countries = ["Afghanistan","Albania","Algeria","Andorra", "and so on..."];
`;

  countries = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Anguilla',
    'Antigua &amp; Barbuda',
    'Argentina',
    'Armenia',
    'Aruba',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bermuda',
    'Bhutan',
    'Bolivia',
    'Bosnia &amp; Herzegovina',
    'Botswana',
    'Brazil',
    'British Virgin Islands',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Cape Verde',
    'Cayman Islands',
    'Central Arfrican Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Congo',
    'Cook Islands',
    'Costa Rica',
    'Cote D Ivoire',
    'Croatia',
    'Cuba',
    'Curacao',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Ethiopia',
    'Falkland Islands',
    'Faroe Islands',
    'Fiji',
    'Finland',
    'France',
    'French Polynesia',
    'French West Indies',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Gibraltar',
    'Greece',
    'Greenland',
    'Grenada',
    'Guam',
    'Guatemala',
    'Guernsey',
    'Guinea',
    'Guinea Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hong Kong',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Isle of Man',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jersey',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Macau',
    'Macedonia',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Montserrat',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauro',
    'Nepal',
    'Netherlands',
    'Netherlands Antilles',
    'New Caledonia',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Korea',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Puerto Rico',
    'Qatar',
    'Reunion',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Pierre &amp; Miquelon',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'St Kitts &amp; Nevis',
    'St Lucia',
    'St Vincent',
    'Sudan',
    'Suriname',
    'Swaziland',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    "Timor L'Este",
    'Togo',
    'Tonga',
    'Trinidad &amp; Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Turks &amp; Caicos',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States of America',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Virgin Islands (US)',
    'Yemen',
    'Zambia',
    'Zimbabwe',
  ];

  results = this.countries;
  showResults = false;
  chosenLand = '';

  // for autocomplete options when click on outside of options or input area
  @HostListener('click', ['$event'])
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  onClick(event: any): void {
    if (
      event.target.id !== 'ChooseCountry' ||
      (event.target.id !== 'countryOptions' && this.results.length === 0)
    ) {
      this.showResults = false;
    }
  }

  onSearch(searchTerm: string): void {
    this.results = this.countries.filter((country) =>
      country.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()),
    );

    if (searchTerm.length === 0) {
      this.showResults = false;
    } else if (this.results.length === 0) {
      this.showResults = false;
    } else {
      this.showResults = true;
    }
  }
  // choose countrey from autocomplete options
  SelectCountry(value: string): void {
    this.chosenLand = value;
    this.showResults = false;
  }
  // opens autocomplete options on click
  onInputClick(): void {
    if (this.results.length === 0) {
      this.showResults = false;
    } else {
      this.showResults = true;
    }
  }
}
