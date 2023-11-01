import { NgModule } from '@angular/core';
import { ContactModule } from './contact/contact.module';
import { GetStartedDocModule } from './get-started-doc/get-started-doc.module';
import { TheDesignSystemDocModule } from './the-design-system-doc/the-design-system-doc.module';

@NgModule({
  imports: [GetStartedDocModule, ContactModule, TheDesignSystemDocModule],
})
export class AboutModule {}
