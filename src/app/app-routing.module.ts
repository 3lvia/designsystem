import { NgModule, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Pages } from './shared/pages.enum';
import { MainComponent } from './shell/main/main.component';
import { HomeComponent } from './shell/home/home.component';
import { DividerDocComponent } from './doc-pages/components/divider-doc/divider-doc.component';
import { ButtonDocComponent } from './doc-pages/components/button-doc/button-doc.component';
import { BadgeDocComponent } from './doc-pages/components/badge-doc/badge-doc.component';
import { CardDocComponent } from './doc-pages/components/card-doc/card-doc.component';
import { DropdownDocComponent } from './doc-pages/components/dropdown-doc/dropdown-doc.component';
import { FeedbackDocComponent } from './doc-pages/components/feedback-doc/feedback-doc.component';
import { HeaderDocComponent } from './doc-pages/components/header-doc/header-doc.component';
import { LinkDocComponent } from './doc-pages/components/link-doc/link-doc.component';
import { TableDocComponent } from './doc-pages/components/table-doc/table-doc.component';
import { TagsDocComponent } from './doc-pages/components/tags-doc/tags-doc.component';
import { TooltipDocComponent } from './doc-pages/components/tooltip-doc/tooltip-doc.component';
import { ColorDocComponent } from './doc-pages/utilities/color-doc/color-doc.component';
import { IconDocComponent } from './doc-pages/utilities/icon-doc/icon-doc.component';
import { TypographyDocComponent } from './doc-pages/utilities/typography-doc/typography-doc.component';
import { CheckboxDocComponent } from './doc-pages/components/forms/checkbox-doc/checkbox-doc.component';
import { CheckboxToggleDocComponent } from './doc-pages/components/forms/checkbox-toggle-doc/checkbox-toggle-doc.component';
import { InputDocComponent } from './doc-pages/components/forms/input-doc/input-doc.component';
import { RadiobuttonDocComponent } from './doc-pages/components/forms/radiobutton-doc/radiobutton-doc.component';
import { SelectDocComponent } from './doc-pages/components/forms/select-doc/select-doc.component';
import { ShadowDocComponent } from './doc-pages/utilities/shadow-doc/shadow-doc.component';
import { NotificationDotDocComponent } from './doc-pages/components/notification-dot-doc/notification-dot-doc.component';
import { AccessibilityComponent } from './doc-pages/accessibility/accessibility/accessibility.component';
import { AltTextComponent } from './doc-pages/accessibility/alt-text/alt-text.component';
import { UuToolsComponent } from './doc-pages/accessibility/uu-tools/uu-tools.component';
import { SpacingDocComponent } from './doc-pages/utilities/spacing-doc/spacing-doc.component';
import { BorderDocComponent } from './doc-pages/utilities/border-doc/border-doc.component';
import { OverviewAccessibilityComponent } from './doc-pages/accessibility/overview-accessibility/overview-accessibility.component';
import { OverviewUtilComponent } from './doc-pages/utilities/overview-util/overview-util.component';
import { OverviewComponent } from './doc-pages/components/overview-comp/overview-comp.component';
import { ContributeComponent } from './doc-pages/get-started/contribute/contribute.component';
import { NewProjectComponent } from './doc-pages/get-started/new-project/new-project.component';
import { TemplatesComponent } from './doc-pages/get-started/templates/templates.component';
import { AccessibilityStartComponent } from './doc-pages/accessibility/accessibility-start/accessibility-start.component';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: Pages.Home,
        component: HomeComponent
      },
      { path: Pages.AccessibilityStart,
        component: AccessibilityStartComponent,
        children: [
          {
            path: '',
            component: OverviewAccessibilityComponent
          },
          {
            path: Pages.OverviewAccess,
            component: OverviewAccessibilityComponent
          },
          {
            path: Pages.Accessibility,
            component: AccessibilityComponent
          },
          {
            path: Pages.AltText,
            component: AltTextComponent
          },
          {
            path: Pages.UUTools,
            component: UuToolsComponent
          },
        ]
      },
      {
        path: Pages.OverviewComp,
        component: OverviewComponent
      },
      {
        path: Pages.OverviewUtil,
        component: OverviewUtilComponent
      },
      {
        path: Pages.Badge,
        component: BadgeDocComponent
      },
      {
        path: Pages.Button,
        component: ButtonDocComponent
      },
      {
        path: Pages.Card,
        component: CardDocComponent
      },
      {
        path: Pages.Divider,
        component: DividerDocComponent
      },
      {
        path: Pages.Dropdown,
        component: DropdownDocComponent
      },
      {
        path: Pages.Feedback,
        component: FeedbackDocComponent
      },
      {
        path: Pages.Header,
        component: HeaderDocComponent
      },
      {
        path: Pages.Link,
        component: LinkDocComponent
      },
      {
        path: Pages.Table,
        component: TableDocComponent
      },
      {
        path: Pages.Tags,
        component: TagsDocComponent
      },
      {
        path: Pages.Tooltip,
        component: TooltipDocComponent
      },
      {
        path: Pages.Color,
        component: ColorDocComponent
      },
      {
        path: Pages.Icon,
        component: IconDocComponent
      },
      {
        path: Pages.Typography,
        component: TypographyDocComponent
      },
      {
        path: Pages.Checkbox,
        component: CheckboxDocComponent
      },
      {
        path: Pages.CheckboxToggle,
        component: CheckboxToggleDocComponent
      },
      {
        path: Pages.Input,
        component: InputDocComponent
      },
      {
        path: Pages.Radiobutton,
        component: RadiobuttonDocComponent
      },
      {
        path: Pages.Select,
        component: SelectDocComponent
      },
      {
        path: Pages.Shadow,
        component: ShadowDocComponent
      },
      {
        path: Pages.Notification,
        component: NotificationDotDocComponent
      },
      {
        path: Pages.Spacing,
        component: SpacingDocComponent
      },
      {
        path: Pages.Border,
        component: BorderDocComponent
      },
      {
        path: Pages.Contribute,
        component: ContributeComponent
      },
      {
        path: Pages.NewProject,
        component: NewProjectComponent
      },
      {
        path: Pages.Template,
        component: TemplatesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppRoutingModule { }
