import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

export type ContactInfo = {
  name: string;
  image: string;
  title: string;
  email: string;
  slackUrl: string;
  emoji: string;
  loadedImg: boolean;
};

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  description = getDocPagesNotFromCMS('contact')?.description;
  title = getDocPagesNotFromCMS('contact')?.title;
  contactList: ContactInfo[] = [
    {
      name: 'Kari Clifford',
      image: 'assets/contact/Kari.jpg',
      title: 'Product lead',
      email: 'kari.clifford@elvia.no',
      slackUrl: 'slack://user?team=TU3R0B42K&id=U03NGQQJK16',
      emoji: '🐧',
      loadedImg: false,
    },
    {
      name: 'Fride Skarseth',
      image: 'assets/contact/Fride.jpg',
      title: 'Developer',
      email: 'fride.skarseth@elvia.no',
      slackUrl: 'slack://user?team=TU3R0B42K&id=U01BLN1QTHD',
      emoji: '🦙',
      loadedImg: false,
    },
    {
      name: 'Trygve Scheline Urdahl',
      image: 'assets/contact/Trygve.png',
      title: 'Developer',
      email: 'trygve.scheline.urdahl@elvia.no',
      slackUrl: 'slack://user?team=TU3R0B42K&id=U02M1T23PJM',
      emoji: '🐐',
      loadedImg: false,
    },
    {
      name: 'Viljar Tornøe',
      image: 'assets/contact/Viljar.png',
      title: 'Designer',
      email: 'viljar.tornoe@elvia.no',
      slackUrl: 'slack://user?team=TU3R0B42K&id=U02HB13D551',
      emoji: '🦥',
      loadedImg: false,
    },
    {
      name: 'Hilde Iren Breivik',
      image: 'assets/contact/Hilde.jpg',
      title: 'Designer',
      email: 'hilde.iren.breivik@elvia.no',
      slackUrl: 'slack://user?team=TU3R0B42K&id=U01A2FKJYCQ',
      emoji: '🙊',
      loadedImg: false,
    },
    {
      name: 'Tom Schrier',
      image: 'assets/contact/Tom.png',
      title: 'Developer',
      email: 'tom.schrier@elvia.no',
      slackUrl: 'slack://user?team=TU3R0B42K&id=U03MESY0YLD',
      emoji: '🦅',
      loadedImg: false,
    },
    {
      name: 'Erik Tallang',
      image: 'assets/contact/Erik.png',
      title: 'Developer',
      email: 'erik.tallang@elvia.no',
      slackUrl: 'slack://user?team=TU3R0B42K&id=U018X0SN05C',
      emoji: '🐘',
      loadedImg: false,
    },
    {
      name: 'Maja Bækken Nilsen',
      image: 'assets/contact/Maja.jpg',
      title: 'Developer',
      email: 'maja.bekken.nilsen@elvia.no',
      slackUrl: 'slack://user?team=TU3R0B42K&id=U051LSYMDA5',
      emoji: '🦔',
      loadedImg: false,
    },
  ];

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | ' + 'Elvia design system');
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  hideContentLoader(evt: any, index: number): void {
    if (evt && evt.target) {
      this.contactList[index].loadedImg = true;
    }
  }

  veryImportantFunction = (name: string, legacy: string): void => {
    const element = document.getElementById(name);
    if (!element) return;
    element.classList.add('criticallyImportantStyle');
    setTimeout(() => {
      if (element.innerHTML === '🦩') {
        element.innerHTML = legacy;
      } else {
        element.innerHTML = '🦩';
      }
      element.classList.remove('criticallyImportantStyle');
    }, 400);
  };

  getFirstName = (contact: ContactInfo): string => {
    return contact.name.split(' ')[0];
  };

  isEven = (n: number): boolean => {
    return n % 2 == 0;
  };
}
