import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-the-concept',
  templateUrl: './the-concept.component.html',
  styleUrls: ['./the-concept.component.scss'],
})
export class TheConceptComponent {
  description = getDocPagesNotFromCMS('the-concept').description;
  cmsContent: any = {};

  constructor(private cmsService: CMSService, private sanitizer: DomSanitizer) {}
}
