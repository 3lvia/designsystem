import { Component } from '@angular/core';
import { getIdentity } from 'src/app/shared/e-items';
import { CMSService } from 'src/app/core/services/cms/cms.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-the-concept',
  templateUrl: './the-concept.component.html',
  styleUrls: ['./the-concept.component.scss'],
})
export class TheConceptComponent {
  description = getIdentity('the-concept').description;
  cmsContent: any = {};

  constructor(private cmsService: CMSService, private sanitizer: DomSanitizer) {}
}
