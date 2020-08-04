import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pages } from './shared/pages.enum';
import { MainComponent } from './shell/main/main.component';
import { HomeComponent } from './shell/home/home.component';
import { ButtonDocComponent } from './doc-pages/components/button-doc/button-doc.component';
import { LabelDocComponent } from './doc-pages/components/label-doc/label-doc.component';
import { CardDocComponent } from './doc-pages/components/card-doc/card-doc.component';
import { LinkDocComponent } from './doc-pages/components/link-doc/link-doc.component';
import { TableDocComponent } from './doc-pages/components/table-doc/table-doc.component';
import { TagsDocComponent } from './doc-pages/components/tags-doc/tags-doc.component';
import { TooltipDocComponent } from './doc-pages/components/tooltip-doc/tooltip-doc.component';
import { ColorDocComponent } from './doc-pages/identity/color-doc/color-doc.component';
import { IconDocComponent } from './doc-pages/identity/icon-doc/icon-doc.component';
import { TypographyDocComponent } from './doc-pages/identity/typography-doc/typography-doc.component';
import { CheckboxDocComponent } from './doc-pages/components/forms/checkbox-doc/checkbox-doc.component';
import { ToggleDocComponent } from './doc-pages/components/forms/toggle-doc/toggle-doc.component';
import { InputDocComponent } from './doc-pages/components/forms/input-doc/input-doc.component';
import { RadiobuttonDocComponent } from './doc-pages/components/forms/radiobutton-doc/radiobutton-doc.component';
import { SelectDocComponent } from './doc-pages/components/forms/select-doc/select-doc.component';
import { ShadowDocComponent } from './doc-pages/identity/shadow-doc/shadow-doc.component';
import { NotificationDotDocComponent } from './doc-pages/components/notification-dot-doc/notification-dot-doc.component';
import { AltTextComponent } from './doc-pages/tools/alt-text/alt-text.component';
import { UuToolsComponent } from './doc-pages/tools/uu-tools/uu-tools.component';
import { SpacingDocComponent } from './doc-pages/identity/spacing-doc/spacing-doc.component';
import { BorderDocComponent } from './doc-pages/identity/border-doc/border-doc.component';
import { OverviewToolsComponent } from './doc-pages/tools/overview-tools/overview-tools.component';
import { OverviewIdentityComponent } from './doc-pages/identity/overview-identity/overview-identity.component';
import { OverviewComponent } from './doc-pages/components/overview-comp/overview-comp.component';
import { NewProjectComponent } from './doc-pages/get-started/new-project/new-project.component';
import { ToolsStartComponent } from './doc-pages/tools/tools-start/tools-start.component';
import { ComponentsStartComponent } from './doc-pages/components/components-start/components-start.component';
import { IdentityStartComponent } from './doc-pages/identity/identity-start/identity-start.component';
import { ListDocComponent } from './doc-pages/components/list-doc/list-doc.component';
import { LogoDocComponent } from './doc-pages/identity/logo-doc/logo-doc.component';
import { GridDocComponent } from './doc-pages/identity/grid-doc/grid-doc.component';
import { SegmentedControlsDocComponent } from './doc-pages/components/forms/segmented-controls-doc/segmented-controls-doc.component';
import { FileUploadDocComponent } from './doc-pages/components/file-upload-doc/file-upload-doc.component';
import { ProgressbarDocComponent } from './doc-pages/components/progressbar-doc/progressbar-doc.component';
import { DraganddropDocComponent } from './doc-pages/components/forms/draganddrop-doc/draganddrop-doc.component';
import { AlignmentDocComponent } from './doc-pages/identity/alignment-doc/alignment-doc/alignment-doc.component';
import { PopoverDocComponent } from './doc-pages/components/popover-doc/popover-doc.component';
import { ModalDocComponent } from './doc-pages/components/modal-doc/modal-doc.component';
import { AutocompleteDocComponent } from './doc-pages/components/autocomplete-doc/autocomplete-doc.component';
import { ContributeComponent } from './doc-pages/community/contribute/contribute.component';
import { DatetimePickerDocComponent } from './doc-pages/components/forms/datetime-picker-doc/datetime-picker-doc.component';
import { PositionPickerDocComponent } from './doc-pages/components/position-picker-doc/position-picker-doc.component';
import { AlertMessagesComponent } from './doc-pages/components/alert-messages/alert-messages.component';
import { FaqDocComponent } from './doc-pages/community/faq-doc/faq-doc.component';
import { AccessibilityDocComponent } from './doc-pages/tools/accessibility-doc/accessibility-doc.component';
import { CommunityStartComponent } from './doc-pages/community/community-start/community-start.component';
import { OverviewCommunityComponent } from './doc-pages/community/overview-community/overview-community.component';
import { OverviewGetStartedComponent } from './doc-pages/get-started/overview-get-started/overview-get-started.component';
import { GetStartedStartComponent } from './doc-pages/get-started/get-started-start/get-started-start.component';
import { ChangelogComponent } from './doc-pages/community/changelog/changelog.component';
import { DiscussionComponent } from './doc-pages/community/discussion/discussion.component';
import { PaginationDocComponent } from './doc-pages/components/pagination-doc/pagination-doc.component';
import { HeaderDocComponent } from './doc-pages/components/header-doc/header-doc.component';
import { DropdownDocComponent } from './doc-pages/components/dropdown-doc/dropdown-doc.component';
import { SearchDocComponent } from './doc-pages/components/forms/search-doc/search-doc.component';
import { AccordionDocComponent } from './doc-pages/components/accordion-doc/accordion-doc.component';
import { UtilitiesDocComponent } from './doc-pages/identity/utilities-doc/utilities-doc.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: Pages.Home,
      },
      {
        path: Pages.Home,
        component: HomeComponent,
      },
      // Get Started section
      {
        path: Pages.GetStartedStart,
        component: GetStartedStartComponent,
        children: [
          {
            path: '',
            component: OverviewGetStartedComponent,
          },
          {
            path: Pages.OverviewGetStarted,
            component: OverviewGetStartedComponent,
          },
          {
            path: Pages.NewProject,
            component: NewProjectComponent,
          },
        ],
      },
      // Identity section
      {
        path: Pages.IdentityStart,
        component: IdentityStartComponent,
        children: [
          {
            path: '',
            component: OverviewIdentityComponent,
          },
          {
            path: Pages.OverviewIdentity,
            component: OverviewIdentityComponent,
          },
          {
            path: Pages.Border,
            component: BorderDocComponent,
          },
          {
            path: Pages.Color,
            component: ColorDocComponent,
          },
          {
            path: Pages.Icon,
            component: IconDocComponent,
          },
          {
            path: Pages.Typography,
            component: TypographyDocComponent,
          },
          {
            path: Pages.Shadow,
            component: ShadowDocComponent,
          },
          {
            path: Pages.Spacing,
            component: SpacingDocComponent,
          },
          {
            path: Pages.Grid,
            component: GridDocComponent,
          },
          {
            path: Pages.Logo,
            component: LogoDocComponent,
          },
          {
            path: Pages.Alignment,
            component: AlignmentDocComponent,
          },
          {
            path: Pages.Utilities,
            component: UtilitiesDocComponent,
          },
        ],
      },
      // Components section
      {
        path: Pages.ComponentsStart,
        component: ComponentsStartComponent,
        children: [
          {
            path: '',
            component: OverviewComponent,
          },
          {
            path: Pages.OverviewComp,
            component: OverviewComponent,
          },
          {
            path: Pages.Accordion,
            component: AccordionDocComponent,
          },
          {
            path: Pages.Alert,
            component: AlertMessagesComponent,
          },
          {
            path: Pages.Autocomplete,
            component: AutocompleteDocComponent,
          },
          {
            path: Pages.Button,
            component: ButtonDocComponent,
          },
          {
            path: Pages.Card,
            component: CardDocComponent,
          },
          {
            path: Pages.Checkbox,
            component: CheckboxDocComponent,
          },
          {
            path: Pages.Dropdown,
            component: DropdownDocComponent,
          },
          {
            path: Pages.Toggle,
            component: ToggleDocComponent,
          },
          {
            path: Pages.DateTimePicker,
            component: DatetimePickerDocComponent,
          },
          {
            path: Pages.DragAndDrop,
            component: DraganddropDocComponent,
          },
          {
            path: Pages.FileUpload,
            component: FileUploadDocComponent,
          },
          {
            path: Pages.Header,
            component: HeaderDocComponent,
          },
          {
            path: Pages.Input,
            component: InputDocComponent,
          },
          {
            path: Pages.Label,
            component: LabelDocComponent,
          },
          {
            path: Pages.Link,
            component: LinkDocComponent,
          },
          {
            path: Pages.List,
            component: ListDocComponent,
          },
          {
            path: Pages.Modal,
            component: ModalDocComponent,
          },
          {
            path: Pages.Notification,
            component: NotificationDotDocComponent,
          },
          {
            path: Pages.Pagination,
            component: PaginationDocComponent,
          },
          {
            path: Pages.Progressbar,
            component: ProgressbarDocComponent,
          },
          {
            path: Pages.Popover,
            component: PopoverDocComponent,
          },
          {
            path: Pages.PositionPicker,
            component: PositionPickerDocComponent,
          },
          {
            path: Pages.Radiobutton,
            component: RadiobuttonDocComponent,
          },
          {
            path: Pages.SegmentedControl,
            component: SegmentedControlsDocComponent,
          },
          {
            path: Pages.Search,
            component: SearchDocComponent,
          },
          {
            path: Pages.Select,
            component: SelectDocComponent,
          },
          {
            path: Pages.Table,
            component: TableDocComponent,
          },
          {
            path: Pages.Tags,
            component: TagsDocComponent,
          },
          {
            path: Pages.Tooltip,
            component: TooltipDocComponent,
          },
        ],
      },
      // Tools section
      {
        path: Pages.ToolsStart,
        component: ToolsStartComponent,
        children: [
          {
            path: '',
            component: OverviewToolsComponent,
          },
          {
            path: Pages.OverviewTools,
            component: OverviewToolsComponent,
          },
          {
            path: Pages.Accessibility,
            component: AccessibilityDocComponent,
          },
          {
            path: Pages.AltText,
            component: AltTextComponent,
          },
          {
            path: Pages.UUTools,
            component: UuToolsComponent,
          },
        ],
      },
      // Community section
      {
        path: Pages.CommunityStart,
        component: CommunityStartComponent,
        children: [
          {
            path: '',
            component: OverviewCommunityComponent,
          },
          {
            path: Pages.OverviewCommunity,
            component: OverviewCommunityComponent,
          },
          {
            path: Pages.Changelog,
            component: ChangelogComponent,
          },
          {
            path: Pages.Contribute,
            component: ContributeComponent,
          },
          {
            path: Pages.Discussion,
            component: DiscussionComponent,
          },
          {
            path: Pages.Faq,
            component: FaqDocComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule { }
