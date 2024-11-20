import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { SafeHtmlPipe } from 'src/app/shared/safeHtml.pipe';

interface ContactInfo {
  firstName: string;
  lastName: string;
  image: string;
  title: string;
  email: string;
  slackUrl: string;
  emoji: string;
  loadedImg: boolean;
}

const docPage = getDocPagesNotFromCMS('contact');
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [ComponentHeaderComponent, ComponentSubsectionComponent, NgClass, SafeHtmlPipe],
})
export class ContactComponent {
  description = docPage.description;
  title = docPage.title;
  contactList: ContactInfo[] = [
    {
      firstName: 'Tom',
      lastName: 'Schrier',
      image: 'assets/contact/Tom.png',
      title: 'Developer',
      email: 'tom.schrier@elvia.no',
      slackUrl: 'slack://user?team=TU3R0B42K&id=U03MESY0YLD',
      emoji: '🦅',
      loadedImg: false,
    },
  ];

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | ' + 'Elvia design system');
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
}
