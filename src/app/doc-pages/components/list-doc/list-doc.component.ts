import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-list-doc',
  templateUrl: './list-doc.component.html',
  styleUrls: ['./list-doc.component.scss'],
})
export class ListDocComponent {
  figmaUrl = getComponent('list-doc').figmaUrl;
  doesExample1 = ['Items that are in no required order.'];
  doesExample3 = [
    'When you need to have a priority or hierarchy between list items',
    'Item in required order (step by step)',
  ];
  doesExample4 = ['When you need to list up definitions or explain items.'];

  example1 = `<ul class="e-list">
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
</ul>
`;

  example2 = `<ul class="e-list e-list--strong">
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
  <li>Just a hunk, a hunk of burning list</li>
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

  example4 = `<ol class="e-list e-list--icons">
  <li>
    <span class="e-list__icon"><i class="e-icon e-icon e-icon--powermeter_ams e-icon--md"></i></span>
    <strong>Slik fungerer strømmåleren:</strong> Gjelder etablering og montering av nye målere og ved bytte av eksisterende målere.
  </li>
  <li>
    <span class="e-list__icon"><i class="e-icon e-icon e-icon--han-color e-icon--md"></i></span>
    <strong>Han Porten:</strong> Ønsker du detaljert informasjon om strømforbruket ditt?
    Vil du styre strømforbruket ditt bedre? Da kan det være en idé å bestille åpning av HAN-porten på strømmåleren din.
  </li>
  <li>
    <span class="e-list__icon"><i class="e-icon e-icon e-icon--powermeter_old e-icon--md"></i></span>
    <strong>Priser på målere og utstyr:</strong> Gjelder etablering og montering av nye målere og ved bytte av eksisterende målere.
  </li>
</ol>
`;
}
