import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';
import { Locale, LocalizationService } from 'src/app/core/services/localization.service';
import { LOCALE_CODE } from 'contentful/types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-shadow-doc',
  templateUrl: './shadow-doc.component.html',
  styleUrls: ['./shadow-doc.component.scss'],
})
export class ShadowDocComponent {
  figmaUrl = getDocPagesNotFromCMS('shadow')?.figmaUrl;
  title = getDocPagesNotFromCMS('shadow')?.title;
  titleNo = getDocPagesNotFromCMS('shadow')?.titleNo;
  description = getDocPagesNotFromCMS('shadow')?.description;
  descriptionNo = getDocPagesNotFromCMS('shadow')?.descriptionNo;
  locale: LOCALE_CODE = 'en-GB';
  does = ['Behind overlays like popover and modal.'];
  donts = [
    'Should not be applied to typography or icons. ',
    'Don’t use a lot of shadows on the same surface, since our visual profile have a flat visual expression.',
  ];
  doesNo = ['Bak overlays som popover og modal.'];
  dontsNo = [
    'Bør ikke brukes på typografi eller ikoner.',
    'Ikke bruk mange skygger på samme flate, siden vår visuelle profil har et flatt visuelt uttrykk.',
  ];

  shadows = [
    { title: 'Soft', className: 'e-shadow-soft', blur: '50', opacity: '3%' },
    { title: 'Medium', className: 'e-shadow-medium', blur: '40', opacity: '6%' },
    { title: 'Hard', className: 'e-shadow-hard', blur: '30', opacity: '8%' },
  ];

  constructor(private titleService: Title, private localizationService: LocalizationService) {
    this.setTabTitle();
    this.localizationService
      .listenLocalization()
      .pipe(takeUntilDestroyed())
      .subscribe((locale) => {
        this.locale = locale === Locale['en-GB'] ? 'en-GB' : 'nb-NO';
        this.setTabTitle();
      });
  }

  setTabTitle = (): void => {
    this.titleService.setTitle(
      (this.locale === 'nb-NO' && this.titleNo ? this.titleNo : this.title) + ' | Elvia design system',
    );
  };
}
