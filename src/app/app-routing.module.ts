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
import { TypographyDocComponent } from './doc-pages/utilities/typography-doc/typography-doc.component';
import { CheckboxDocComponent } from './doc-pages/components/forms/checkbox-doc/checkbox-doc.component';
import { CheckboxToggleDocComponent } from './doc-pages/components/forms/checkbox-toggle-doc/checkbox-toggle-doc.component';
import { InputDocComponent } from './doc-pages/components/forms/input-doc/input-doc.component';
import { RadiobuttonDocComponent } from './doc-pages/components/forms/radiobutton-doc/radiobutton-doc.component';
import { SelectDocComponent } from './doc-pages/components/forms/select-doc/select-doc.component';
import { ShadowDocComponent } from './doc-pages/utilities/shadow-doc/shadow-doc.component';
import { NotificationDotDocComponent } from './doc-pages/components/notification-dot-doc/notification-dot-doc.component';
import { OverviewComponent } from './doc-pages/overview/overview.component';


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
      {
        path: Pages.Overview,
        component: OverviewComponent
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
