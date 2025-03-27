import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { LocalizationService } from 'src/app/core/services/localization.service';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { getDocPage } from 'src/app/shared/doc-pages';
import { SafeHtmlPipe } from 'src/app/shared/safeHtml.pipe';

interface DownloadableLogo {
  name: string;
  url: `assets/doc-pages/brand/logo/${string}.svg`;
}

const docPage = getDocPage('logo');
@Component({
  selector: 'app-logo-doc',
  imports: [
    ComponentHeaderComponent,
    ComponentSectionComponent,
    SafeHtmlPipe,
    ComponentSubsectionComponent,
    ComponentSubsubsectionComponent,
    RouterLink,
  ],
  templateUrl: './logo-doc.component.html',
  styleUrl: './logo-doc.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LogoDocComponent {
  docPage = docPage;
  locale = toSignal(inject(LocalizationService).listenLocalization());

  logosOnLight = [
    {
      name: 'logo (charge)',
      url: 'assets/doc-pages/brand/logo/light/logo.svg',
    },
    {
      name: 'logo (on)',
      url: 'assets/doc-pages/brand/logo/light/logo_on.svg',
    },
    {
      name: 'logo (off)',
      url: 'assets/doc-pages/brand/logo/light/logo_off.svg',
    },
    {
      name: 'logo (pride)',
      url: 'assets/doc-pages/brand/logo/logo_pride.svg',
    },
    {
      name: 'symbol',
      url: 'assets/doc-pages/brand/logo/light/symbol.svg',
    },
    {
      name: 'symbol (pride)',
      url: 'assets/doc-pages/brand/logo/symbol_pride.svg',
    },
  ] as const satisfies DownloadableLogo[];

  logosOnDark = [
    {
      name: 'logo (charge)',
      url: 'assets/doc-pages/brand/logo/dark/logo.svg',
    },
    {
      name: 'logo (on)',
      url: 'assets/doc-pages/brand/logo/dark/logo_on_negative.svg',
    },
    {
      name: 'logo (off)',
      url: 'assets/doc-pages/brand/logo/dark/logo_off_negative.svg',
    },
    {
      name: 'logo (pride)',
      url: 'assets/doc-pages/brand/logo/logo_pride.svg',
    },
    {
      name: 'symbol',
      url: 'assets/doc-pages/brand/logo/dark/symbol_negative.svg',
    },
    {
      name: 'symbol (pride)',
      url: 'assets/doc-pages/brand/logo/symbol_pride.svg',
    },
  ] as const satisfies DownloadableLogo[];

  logoApps = [
    { name: 'ai', url: 'assets/doc-pages/brand/logo/app/ai.svg' },
    { name: 'bildegjennomgang', url: 'assets/doc-pages/brand/logo/app/bildegjennomgang.svg' },
    { name: 'datakatalog', url: 'assets/doc-pages/brand/logo/app/datakatalog.svg' },
    { name: 'drops', url: 'assets/doc-pages/brand/logo/app/drops.svg' },
    { name: 'elflow', url: 'assets/doc-pages/brand/logo/app/elflow.svg' },
    { name: 'elvid', url: 'assets/doc-pages/brand/logo/app/elvid.svg' },
    { name: 'jordfeil', url: 'assets/doc-pages/brand/logo/app/jordfeil.svg' },
    { name: 'kundeportal', url: 'assets/doc-pages/brand/logo/app/kundeportal.svg' },
    { name: 'kvalitetsportalen', url: 'assets/doc-pages/brand/logo/app/kvalitetsportalen.svg' },
    { name: 'louvre', url: 'assets/doc-pages/brand/logo/app/louvre.svg' },
    { name: 'mdmx', url: 'assets/doc-pages/brand/logo/app/mdmx.svg' },
    { name: 'msic', url: 'assets/doc-pages/brand/logo/app/msic.svg' },
    { name: 'msim', url: 'assets/doc-pages/brand/logo/app/msim.svg' },
    { name: 'onetime', url: 'assets/doc-pages/brand/logo/app/onetime.svg' },
    { name: 'refi', url: 'assets/doc-pages/brand/logo/app/refi.svg' },
    { name: 'spectrum', url: 'assets/doc-pages/brand/logo/app/spectrum.svg' },
    { name: 'usla', url: 'assets/doc-pages/brand/logo/app/usla.svg' },
  ] as const satisfies DownloadableLogo[];
}
