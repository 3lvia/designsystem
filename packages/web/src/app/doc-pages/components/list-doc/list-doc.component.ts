import { Component } from '@angular/core';

@Component({
  selector: 'app-list-doc',
  templateUrl: './list-doc.component.html',
  styleUrls: ['./list-doc.component.scss'],
})
export class ListDocComponent {
  doesExample1 = ['Items that are in no required order.'];
  doesExample3 = [
    'When you need to have a priority or hierarchy between list items.',
    'Item in required order (step by step).',
  ];
  doesExample4 = ['When you need to list up definitions or explain items.'];
}
