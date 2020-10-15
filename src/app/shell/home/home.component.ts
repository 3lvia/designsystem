import { Component, OnInit } from '@angular/core';
import { eHomes } from 'src/app/shared/e-items';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  overviewTitle = 'Elvia design system';
  pages = eHomes;

  ngOnInit(): void {
    this.findEndOfRow();
  }

  findEndOfRow(): void {
    const rows = document.getElementsByTagName('tr');
    setTimeout(() => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 1; i < rows.length; i++) {
        rows[i].classList.add('e-none');
      }
      const divider = document.getElementsByClassName('changelog-divider')[0] as HTMLElement;
      divider.classList.add('e-none');
    }, 500);
  }
}
