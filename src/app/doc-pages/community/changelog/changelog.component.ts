import { Component } from '@angular/core';
import { getCommunity } from 'src/app/shared/e-items';

@Component({
  selector: 'app-changelog',
  templateUrl: './changelog.component.html',
  styleUrls: ['./changelog.component.scss'],
})
export class ChangelogComponent {

  externalUrl = getCommunity('changelog').externalUrl;
  description = getCommunity('changelog').description;

}
