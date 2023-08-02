import { Component, Input } from '@angular/core';
import { CMSService } from 'src/app/core/services/cms/cms.service';

@Component({
  selector: 'app-component-related',
  templateUrl: './component-related.component.html',
  styleUrls: ['./component-related.component.scss'],
})
export class ComponentRelatedComponent {
  @Input() relatedComponents: string[];

  constructor(private cmsService: CMSService) {
    this.componentIcons = this.cmsService.getComponentIcons();
  }

  componentIcons: ReturnType<typeof this.cmsService.getComponentIcons>;
}
