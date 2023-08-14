import { Component } from '@angular/core';

@Component({
  selector: 'app-search-doc',
  templateUrl: './search-doc.component.html',
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
