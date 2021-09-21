import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { exampleContents } from 'src/app/shared/example-contents';

@Component({
  selector: 'app-list-doc',
  templateUrl: './list-doc.component.html',
  styleUrls: ['./list-doc.component.scss'],
})
export class ListDocComponent {
  figmaUrl = getComponent('list').figmaUrl;
  description = getComponent('list').description;
  doesExample1 = ['Items that are in no required order.'];
  doesExample3 = [
    'When you need to have a priority or hierarchy between list items',
    'Item in required order (step by step)',
  ];
  doesExample4 = ['When you need to list up definitions or explain items.'];

  overviewExample = `<ul class="e-list">
  <li>Bullet point list</li>
  <li>Bullet point list</li>
  <li>Bullet point list</li>
</ul>
`;

  example1 = `<ul class="e-list">
  <li>This is a normal list</li>
  <li>This is a normal list</li>
</ul>
<ul class="e-list e-list--strong">
  <li>This is a bold list</li>
  <li>This is a bold list</li>
</ul>
`;

  example3 = `<ol class="e-list e-list--numbers">
  <li><strong>Describing title :</strong> After, one or multiple sentences could follow with more information.
    These sentences can span over multiple rows, but shouldn’t be too long.</li>
  <li><strong>This can also be the start of a sentence</strong> that continues in thinner font.
    The bold part should be describing and the rest of the text informative.</li>
  <li>
     <strong>Don’t use too many points</strong> and make sure the text is easy to read,
    informative and follows Elvia’s tone of voice.</li>
</ol>

`;

  example4 =
    `<ol class="e-list e-list--icons">
  <li>
    <span class="e-list__icon"><i class="e-icon e-icon e-icon--powermeter_ams e-icon--md"></i></span>
    <strong>` +
    exampleContents.texts.sm2['eng-GBR'].title +
    `:</strong> ` +
    exampleContents.texts.sm2['eng-GBR'].description +
    `
  </li>
  <li>
    <span class="e-list__icon"><i class="e-icon e-icon e-icon--han-color e-icon--md"></i></span>
    <strong>` +
    exampleContents.texts.xs['eng-GBR'].title +
    `:</strong> ` +
    exampleContents.texts.xs['eng-GBR'].description +
    `
  </li>
  <li>
    <span class="e-list__icon"><i class="e-icon e-icon e-icon--powermeter_old e-icon--md"></i></span>
    <strong>` +
    exampleContents.texts.sm['eng-GBR'].title +
    `:</strong> ` +
    exampleContents.texts.sm['eng-GBR'].description +
    `
  </li>
</ol>
`;
}
