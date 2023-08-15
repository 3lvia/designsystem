import { NgModule } from '@angular/core';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { PageWithSidenavModule } from './page-with-sidenav/page-with-sidenav.module';
import { ShortcutModule } from './shortcut/shortcut.module';

@NgModule({
  exports: [HeaderModule, FooterModule, PageWithSidenavModule, ShortcutModule],
})
export class ShellModule {}
