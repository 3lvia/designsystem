import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

type DesktopAndMobile<T> = {
  desktop: T;
  mobile: T;
};

interface Classes {
  illustrationSize: string;
  typographies: string[];
  action: string[];
}

@Component({
  selector: 'app-empty-states-class-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './empty-states-class-list.component.html',
  styleUrl: './empty-states-class-list.component.scss',
})
export class EmptyStatesClassListComponent {
  classes = input.required<DesktopAndMobile<Partial<Classes>>>();
}
