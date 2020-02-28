import { Component } from '@angular/core';
import { Icon } from 'src/app/shared/icon.interface';
import { fadeIn } from 'src/app/shared/animations';

@Component({
  selector: 'app-icon-doc',
  templateUrl: './icon-doc.component.html',
  styleUrls: ['./icon-doc.component.scss'],
  animations: [ fadeIn ]
})
export class IconDocComponent {


  example = `<i class="e-icon-clock e-icon-xl"></i>
<i class="e-icon-clock e-icon-lg"></i>
<i class="e-icon-clock e-icon-md"></i>
<i class="e-icon-clock e-icon-sm"></i>
<i class="e-icon-clock e-icon-xs"></i>`;

example2 = `<i class="e-icon-custom e-icon-xl">
  <img src="assets/icons/example-custom-icon.svg"></img>
</i>

<i class="e-icon-custom">
  <img src="assets/icons/example-custom-icon.svg"></img>
</i>`;

term;
IconClassList: Icon[] = [
  // Misc Icons
  {
    title: 'add-circle',
    class: 'e-icon-add-circle',
    altTerm: ['addition', 'pluss']
  },
  {
    title: 'alert-circle',
    class: 'e-icon-alert-circle',
    altTerm: []
  },
  {
    title: 'attachment',
    class: 'e-icon-attachment',
    altTerm: []
  },
  {
    title: 'box',
    class: 'e-icon-box',
    altTerm: []
  },
  {
    title: 'calender',
    class: 'e-icon-calender',
    altTerm: []
  },
  {
    title: 'calender-clock',
    class: 'e-icon-calender-clock',
    altTerm: []
  },
  {
    title: 'charger',
    class: 'e-icon-charger',
    altTerm: []
  },
  {
    title: 'check-circle',
    class: 'e-icon-check-circle',
    altTerm: []
  },
  {
    title: 'clock',
    class: 'e-icon-clock',
    altTerm: []
  },
  {
    title: 'download',
    class: 'e-icon-download',
    altTerm: []
  },
  {
    title: 'earth',
    class: 'e-icon-earth',
    altTerm: []
  },
  {
    title: 'email',
    class: 'e-icon-email',
    altTerm: []
  },
  {
    title: 'equipment-pressure-measure',
    class: 'e-icon-equipment-pressure-measure',
    altTerm: []
  },
  {
    title: 'gauge-dashboard',
    class: 'e-icon-gauge-dashboard',
    altTerm: []
  },
  {
    title: 'graph-bar',
    class: 'e-icon-graph-bar',
    altTerm: []
  },
  {
    title: 'graph-stats',
    class: 'e-icon-graph-stats',
    altTerm: []
  },
  {
    title: 'home',
    class: 'e-icon-home',
    altTerm: []
  },
  {
    title: 'house-user',
    class: 'e-icon-house-user',
    altTerm: []
  },
  {
    title: 'hyperlink',
    class: 'e-icon-hyperlink',
    altTerm: []
  },
  {
    title: 'info-circle',
    class: 'e-icon-info-circle',
    altTerm: []
  },
  {
    title: 'loader',
    class: 'e-icon-loader',
    altTerm: []
  },
  {
    title: 'lock',
    class: 'e-icon-lock',
    altTerm: []
  },
  {
    title: 'lock-unlocked',
    class: 'e-icon-lock-unlocked',
    altTerm: []
  },
  {
    title: 'login',
    class: 'e-icon-login',
    altTerm: []
  },
  {
    title: 'logout',
    class: 'e-icon-logout',
    altTerm: []
  },
  {
    title: 'pin',
    class: 'e-icon-pin',
    altTerm: []
  },
  {
    title: 'question-circle',
    class: 'e-icon-question-circle',
    altTerm: []
  },
  {
    title: 'question-conversation',
    class: 'e-icon-question-conversation',
    altTerm: []
  },
  {
    title: 'refresh',
    class: 'e-icon-refresh',
    altTerm: []
  },
  {
    title: 'remove',
    class: 'e-icon-remove',
    altTerm: []
  },
  {
    title: 'remove-circle',
    class: 'e-icon-remove-circle',
    altTerm: []
  },
  {
    title: 'safety-warning-el',
    class: 'e-icon-safety-warning-el',
    altTerm: []
  },
  {
    title: 'search',
    class: 'e-icon-search',
    altTerm: []
  },
  {
    title: 'subtract-circle',
    class: 'e-icon-subtract-circle',
    altTerm: []
  },
  {
    title: 'upload',
    class: 'e-icon-upload',
    altTerm: []
  },
  {
    title: 'user',
    class: 'e-icon-user',
    altTerm: []
  },
  // Arrows Icons
  {
    title: 'arrow-down',
    class: 'e-icon-arrow-down',
    altTerm: []
  },
  {
    title: 'arrow-left',
    class: 'e-icon-arrow-left',
    altTerm: []
  },
  {
    title: 'arrow-right',
    class: 'e-icon-arrow-right',
    altTerm: []
  },
  {
    title: 'arrow-up',
    class: 'e-icon-arrow-up',
    altTerm: []
  },
  // Invoice Icons
  {
    title: 'invoice',
    class: 'e-icon-invoice',
    altTerm: []
  },
  {
    title: 'invoice-check',
    class: 'e-icon-invoice-check',
    altTerm: []
  },
  {
    title: 'invoice-edit',
    class: 'e-icon-invoice-edit',
    altTerm: []
  },
  {
    title: 'invoice-info',
    class: 'e-icon-invoice-info',
    altTerm: []
  },
  {
    title: 'invoice-search',
    class: 'e-icon-invoice-search',
    altTerm: []
  },
  {
    title: 'invoice-warning',
    class: 'e-icon-invoice-warning',
    altTerm: []
  },
  // Phone Icons
  {
    title: 'phone',
    class: 'e-icon-phone',
    altTerm: []
  },
  {
    title: 'phone-action-question',
    class: 'e-icon-phone-action-question',
    altTerm: []
  },
  {
    title: 'phone-mobile',
    class: 'e-icon-phone-mobile',
    altTerm: []
  },
  {
    title: 'phone-mobile-comment',
    class: 'e-icon-phone-mobile-comment',
    altTerm: []
  },
  {
    title: 'phone-mobile-image',
    class: 'e-icon-phone-mobile-image',
    altTerm: []
  },
  {
    title: 'phone-mobile-notification',
    class: 'e-icon-phone-mobile-notification',
    altTerm: []
  },
  {
    title: 'phone-mobile-pin',
    class: 'e-icon-phone-mobile-pin',
    altTerm: []
  },
  {
    title: 'phone-support',
    class: 'e-icon-phone-support',
    altTerm: []
  },
];
  constructor() { }
}
