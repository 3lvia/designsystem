import { Component, OnInit, Input } from '@angular/core';
import { TabNames } from 'src/app/shared/tab-names.enums';
import { getUtilities } from 'src/app/shared/e-items';
import { CopyService } from 'src/app/shared/copy.service';

@Component({
  selector: 'app-shadow-doc',
  templateUrl: './shadow-doc.component.html',
  styleUrls: ['./shadow-doc.component.scss']
})
export class ShadowDocComponent implements OnInit {

  @Input() selected = TabNames.Overview;

  tabNames = TabNames;
  tabs = [TabNames.Overview, TabNames.Code, TabNames.Guidelines];
  componentClasses = ['e-shadow'];
  componentStatus = getUtilities('shadow-doc').status;
  copyTooltip = 'Copy class';

  doCodeCSS = `box-shadow: var(--e-shadow-2);
box-shadow: none;`;
  dontCodeCSS = `box-shadow: var(--e-shadow-none);`;
  example1 = `<span class="e-shadow-1 e-mb-2 e-mt-2 example-box"></span>
<span class="e-shadow-2 e-mb-2 e-mt-2 example-box"></span>
<span class="e-shadow-3 e-mb-2 e-mt-2 example-box"></span>`;

  constructor(private copyService: CopyService) { }

  ngOnInit() {
  }

  copyMessage(copyMessage) {
    this.copyService.copyMessage(copyMessage);
    this.copyTooltip = 'Copied!';
    setTimeout(() => {
      this.copyTooltip = 'Copy class';
    }, 2000);
  }

}


