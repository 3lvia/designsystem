import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pages } from './shared/pages.enum';
import { MainComponent } from './shell/main/main.component';
import { HomeComponent } from './shell/home/home.component';
import { ButtonDocComponent } from './doc-pages/components/button-doc/button-doc.component';
import { LabelDocComponent } from './doc-pages/components/label-doc/label-doc.component';
import { CardDocComponent } from './doc-pages/components/card-doc/card-doc.component';
import { CarouselDocComponent } from './doc-pages/components/carousel-doc/carousel-doc.component';
import { LinkDocComponent } from './doc-pages/components/link-doc/link-doc.component';
import { TableDocComponent } from './doc-pages/components/table-doc/table-doc.component';
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
import { SpacingDocComponent } from './doc-pages/identity/spacing-doc/spacing-doc.component';
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
import { PopoverDocComponent } from './doc-pages/components/popover-doc/popover-doc.component';
import { ModalDocComponent } from './doc-pages/components/modal-doc/modal-doc.component';
import { AutocompleteDocComponent } from './doc-pages/components/autocomplete-doc/autocomplete-doc.component';
import { ContributeComponent } from './doc-pages/community/contribute/contribute.component';
import { DatepickerDocComponent } from './doc-pages/components/forms/datepicker-doc/datepicker-doc.component';
import { PositionPickerDocComponent } from './doc-pages/components/position-picker-doc/position-picker-doc.component';
import { AlertMessagesComponent } from './doc-pages/components/alert-messages/alert-messages.component';
import { FaqDocComponent } from './doc-pages/community/faq-doc/faq-doc.component';
import { AccessibilityDocComponent } from './doc-pages/tools/accessibility-doc/accessibility-doc.component';
import { CommunityStartComponent } from './doc-pages/community/community-start/community-start.component';
import { DevStartComponent } from './doc-pages/dev/dev-start/dev-start.component';
import { OverviewCommunityComponent } from './doc-pages/community/overview-community/overview-community.component';
import { OverviewGetStartedComponent } from './doc-pages/get-started/overview-get-started/overview-get-started.component';
import { GetStartedStartComponent } from './doc-pages/get-started/get-started-start/get-started-start.component';
import { ChangelogComponent } from './doc-pages/community/changelog/changelog.component';
import { PaginationDocComponent } from './doc-pages/components/pagination-doc/pagination-doc.component';
import { HeaderDocComponent } from './doc-pages/components/header-doc/header-doc.component';
import { DropdownDocComponent } from './doc-pages/components/dropdown-doc/dropdown-doc.component';
import { SearchDocComponent } from './doc-pages/components/forms/search-doc/search-doc.component';
import { AccordionDocComponent } from './doc-pages/components/accordion-doc/accordion-doc.component';
import { UtilitiesDocComponent } from './doc-pages/tools/utilities-doc/utilities-doc.component';
import { StepperDocComponent } from './doc-pages/components/stepper-doc/stepper-doc.component';
import { ContentLoaderDocComponent } from './doc-pages/components/content-loader-doc/content-loader-doc.component';
import { DesignProcessDocComponent } from './doc-pages/tools/design-process-doc/design-process-doc.component';
import { UserFeedbackDocComponent } from './doc-pages/tools/user-feedback-doc/user-feedback-doc.component';
import { ToneOfVoiceComponent } from './doc-pages/identity/tone-of-voice/tone-of-voice.component';
import { RadioFilterDocComponent } from './doc-pages/components/radio-filter-doc/radio-filter-doc.component';
import { PatternsDocComponent } from './doc-pages/tools/patterns-doc/patterns-doc.component';
import { GetStartedDesignersComponent } from './doc-pages/get-started/get-started-designers/get-started-designers.component';
import { ContactComponent } from './doc-pages/community/contact/contact.component';
import { TheDesignSystemDocComponent } from './doc-pages/get-started/the-design-system-doc/the-design-system-doc.component';
import { ChipsComponent } from './doc-pages/components/chips/chips.component';
import { ErrorComponent } from './shared/error/error.component';
import { DividerDocComponent } from './doc-pages/components/divider-doc/divider-doc.component';
import { TabsDocComponent } from './doc-pages/components/tabs-doc/tabs-doc.component';
import { TimepickerDocComponent } from './doc-pages/components/forms/timepicker-doc/timepicker-doc.component';
import { v2PlaygroundComponent } from './doc-pages/dev/v2-playground/v2-playground.component';
import { CMSPageComponent } from './doc-pages/cms/cms-page/cms-page.component';
import { BoxDocComponent } from './doc-pages/components/box-doc/box-doc.component';

const routes: Routes = [
  {
    path: Pages.Index,
    component: MainComponent,
    children: [
      {
        path: Pages.Index,
        pathMatch: 'full',
        component: HomeComponent,
      },
      /* {
        path: Pages.Home,
        redirectTo: Pages.Index,
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
            path: Pages.TheDesignSystem,
            component: TheDesignSystemDocComponent,
          },
          {
            path: Pages.NewProject,
            component: NewProjectComponent,
          },
          {
            path: Pages.GetStartedDesigners,
            component: GetStartedDesignersComponent,
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
            path: Pages.Color,
            component: ColorDocComponent,
          },
          {
            path: Pages.Icon,
            component: IconDocComponent,
          },
          {
            path: Pages.ToneOfVoice,
            component: ToneOfVoiceComponent,
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
            path: Pages.TheConcept,
            component: CMSPageComponent,
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
            path: Pages.Box,
            component: BoxDocComponent,
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
            path: Pages.Carousel,
            component: CarouselDocComponent,
          },
          {
            path: Pages.Chips,
            component: ChipsComponent,
          },
          {
            path: Pages.Checkbox,
            component: CheckboxDocComponent,
          },
          {
            path: Pages.ContentLoader,
            component: ContentLoaderDocComponent,
          },
          {
            path: Pages.Divider,
            component: DividerDocComponent,
          },
          {
            path: Pages.Dropdown,
            component: DropdownDocComponent,
          },
          {
            path: Pages.Tabs,
            component: TabsDocComponent,
          },
          {
            path: Pages.Toggle,
            component: ToggleDocComponent,
          },
          {
            path: Pages.Datepicker,
            component: DatepickerDocComponent,
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
            path: Pages.RadioFilter,
            component: RadioFilterDocComponent,
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
            path: Pages.Stepper,
            component: StepperDocComponent,
          },
          {
            path: Pages.Table,
            component: TableDocComponent,
          },
          {
            path: Pages.Timepicker,
            component: TimepickerDocComponent,
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
            path: Pages.DesignProcess,
            component: DesignProcessDocComponent,
          },
          {
            path: Pages.UserFeedback,
            component: UserFeedbackDocComponent,
          },
          {
            path: Pages.Utilities,
            component: UtilitiesDocComponent,
          },
          {
            path: Pages.Patterns,
            component: PatternsDocComponent,
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
            path: Pages.Contact,
            component: ContactComponent,
          },
          {
            path: Pages.Contribute,
            component: ContributeComponent,
          },
          {
            path: Pages.Faq,
            component: FaqDocComponent,
          },
        ],
      },
 */
      // Dev section
      {
        path: Pages.DevelopmentStart,
        component: DevStartComponent,
        children: [
          {
            path: '',
            component: v2PlaygroundComponent,
          },
          {
            path: Pages.DevelopmentPlayground,
            component: v2PlaygroundComponent,
          },
        ],
      },
      { path: 'not-found', component: ErrorComponent },

      {
        path: '**',
        component: CMSPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: 'legacy' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
