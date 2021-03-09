import { NgModule } from '@angular/core';
import { CommunityStartModule } from './community-start/community-start.module';
import { OverviewCommunityModule } from './overview-community/overview-community.module';
import { ContributeModule } from './contribute/contribute.module';
import { FaqDocModule } from './faq-doc/faq-doc.module';
import { ChangelogModule } from './changelog/changelog.module';
import { ContactModule } from './contact/contact.module';
import { ContentfulExampleModule } from './contentful-example/contentful-example.module';
@NgModule({
  imports: [
    CommunityStartModule,
    OverviewCommunityModule,
    ContributeModule,
    FaqDocModule,
    ChangelogModule,
    ContactModule,
    ContentfulExampleModule
  ],
})
export class CommunityModule { }
