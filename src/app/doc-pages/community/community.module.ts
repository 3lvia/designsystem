import { NgModule } from '@angular/core';
import { CommunityStartModule } from './community-start/community-start.module';
import { OverviewCommunityModule } from './overview-community/overview-community.module';
import { ContributeModule } from './contribute/contribute.module';
import { FaqDocModule } from './faq-doc/faq-doc.module';
import { ChangelogModule } from './changelog/changelog.module';
import { DiscussionModule } from './discussion/discussion.module';


@NgModule({
    imports: [
        CommunityStartModule,
        OverviewCommunityModule,
        ContributeModule,
        FaqDocModule,
        ChangelogModule,
        DiscussionModule,
    ],
})
export class CommunityModule { }


