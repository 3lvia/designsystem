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
  fontLoaded = false;
  date = new Date();
  christmasMonth = 11;
  christmas = false;

  ngOnInit(): void {
    this.findEndOfRow();
    this.christmas = this.date.getMonth() === this.christmasMonth ? true : false;
    if (document && (document as any).fonts) {
      (document as any).fonts.ready.then(() => {
        this.fontLoaded = true;
      });
    }
  }

  findEndOfRow(): void {
    const rows = document.getElementsByTagName('tr');
    setTimeout(() => {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 1; i < rows.length; i++) {
        rows[i].classList.add('e-none');
      }
      const divider = document.getElementsByClassName('changelog-divider')[0] as HTMLElement;
      if (divider) {
        divider.classList.add('e-none');
      }
    }, 500);
  }
}
