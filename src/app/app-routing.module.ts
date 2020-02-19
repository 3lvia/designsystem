import { NgModule, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { ColorDocComponent } from './doc-pages/color-doc/color-doc.component';


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
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'badge-doc',
        component: BadgeDocComponent
      },
      {
        path: 'button-doc',
        component: ButtonDocComponent
      },
      {
        path: 'card-doc',
        component: CardDocComponent
      },
      {
        path: 'divider-doc',
        component: DividerDocComponent
      },
      {
        path: 'dropdown-doc',
        component: DropdownDocComponent
      },
      {
        path: 'feedback-doc',
        component: FeedbackDocComponent
      },
      {
        path: 'header-doc',
        component: HeaderDocComponent
      },
      {
        path: 'link-doc',
        component: LinkDocComponent
      },
      {
        path: 'table-doc',
        component: TableDocComponent
      },
      {
        path: 'tags-doc',
        component: TagsDocComponent
      },
      {
        path: 'tooltip-doc',
        component: TooltipDocComponent
      },
      {
        path: 'color-doc',
        component: ColorDocComponent
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
