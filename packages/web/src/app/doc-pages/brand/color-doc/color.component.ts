import { Component } from '@angular/core';
import { LOCALE_CODE } from 'contentful/types';
import { LocalizationService, Locale } from 'src/app/core/services/localization.service';
import { Title } from '@angular/platform-browser';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
})
export class ColorComponent {
  purposeTokenExample = `.container {
  color: var(--e-color-text-1);
  background: var(--e-color-background-1);  
  border-color: var(--e-color-border-1);  
  &::hover {
    background: var(--e-color-background-hover-1);
    color: var(--e-color-background-hover-1--contrast)
  }
}`;

  baseTokenExample = `:root,
.e-theme-light {
  --container-color-border: var(--e-light-theme-grey-10);
}
.e-theme-dark,
.e-color-background-3 {
  --container-color-border: var(--e-dark-theme-grey-20);
}
.container {
  border-color: var(--container-color-border);
}`;

  classTokenExample = `<div class='e-color-background-1'>
  A container with text that follow the background-1 color contrast.   
  <span class='e-color-text-2'>
     Some kind of subtext with the e-color-text-2 color.
  </span>
</div>`;
  description = getDocPagesNotFromCMS('color')?.description;
  descriptionNo = getDocPagesNotFromCMS('color')?.descriptionNo;
  locale: LOCALE_CODE = 'en-GB';
  title = getDocPagesNotFromCMS('color')?.title;
  titleNo = getDocPagesNotFromCMS('color')?.titleNo;

  constructor(
    private titleService: Title,
    private localizationService: LocalizationService,
  ) {
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
