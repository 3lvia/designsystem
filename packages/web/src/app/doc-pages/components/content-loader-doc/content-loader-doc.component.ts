import { Component } from '@angular/core';
import { ContentLoaderTextCegComponent } from './content-loader-text-ceg/content-loader-text-ceg.component';
import { ContentLoaderCircleCegComponent } from './content-loader-circle-ceg/content-loader-circle-ceg.component';
import { ContentLoaderBoxCegComponent } from './content-loader-box-ceg/content-loader-box-ceg.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ContentLoaderCegComponent } from './content-loader-ceg/content-loader-ceg.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';

@Component({
    selector: 'app-content-loader-doc',
    templateUrl: './content-loader-doc.component.html',
    styleUrls: ['./content-loader-doc.component.scss'],
    standalone: true,
    imports: [
        ComponentDocumentationComponent,
        StaticCegComponent,
        ContentLoaderCegComponent,
        ComponentSectionComponent,
        ComponentSubsectionComponent,
        ContentLoaderBoxCegComponent,
        ContentLoaderCircleCegComponent,
        ContentLoaderTextCegComponent,
    ],
})
export class ContentLoaderDocComponent {}
