import { Component } from '@angular/core';
import { WhenToUseComponent } from '../../../../shared/when-to-use/when-to-use.component';
import { SearchSizeSmallCegComponent } from './search-size-small-ceg/search-size-small-ceg.component';
import { SearchSizeMediumCegComponent } from './search-size-medium-ceg/search-size-medium-ceg.component';
import { SearchFullwidthCegComponent } from './search-fullwidth-ceg/search-fullwidth-ceg.component';
import { SearchOnSubmitSearchedCegComponent } from './search-on-submit-searched-ceg/search-on-submit-searched-ceg.component';
import { SearchOnSubmitCegComponent } from './search-on-submit-ceg/search-on-submit-ceg.component';
import { RouterLink } from '@angular/router';
import { SearchInstantCegComponent } from './search-instant-ceg/search-instant-ceg.component';
import { ComponentSubsectionComponent } from '../../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSectionComponent } from '../../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { SearchCegComponent } from './search-ceg/search-ceg.component';
import { StaticCegComponent } from '../../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../../shared/component-documentation/component-documentation.component';

@Component({
    selector: 'app-search-doc',
    templateUrl: './search-doc.component.html',
    standalone: true,
    imports: [
        ComponentDocumentationComponent,
        StaticCegComponent,
        SearchCegComponent,
        ComponentSectionComponent,
        ComponentSubsectionComponent,
        SearchInstantCegComponent,
        RouterLink,
        SearchOnSubmitCegComponent,
        SearchOnSubmitSearchedCegComponent,
        SearchFullwidthCegComponent,
        SearchSizeMediumCegComponent,
        SearchSizeSmallCegComponent,
        WhenToUseComponent,
    ],
})
export class SearchDocComponent {
  does = [
    'Organize related information',
    'When you have a lot of content and the content is not important to always have available',
  ];
  donts = [
    'Don’t hide necessary and critical information to the user to complete their task in a accordion',
    'Don’t use it for navigation elements',
  ];
}
