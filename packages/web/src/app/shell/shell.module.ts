import { NgModule } from '@angular/core';
import { HeaderModule } from './header/header.module';
import { MainModule } from './main/main.module';
import { NavbarModule } from './navbar/navbar.module';
import { FooterModule } from './footer/footer.module';
import { SearchMenuModule } from './header/search-menu/search-menu.module';

@NgModule({
  imports: [HeaderModule, SearchMenuModule, MainModule, NavbarModule, FooterModule],
  exports: [HeaderModule, FooterModule],
})
export class ShellModule {}
