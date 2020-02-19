import { NgModule, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DividerDocComponent } from './doc-pages/divider-doc/divider-doc.component';
import { ButtonDocComponent } from './doc-pages/button-doc/button-doc.component';
import { MainComponent } from './shell/main/main.component';
import { HomeComponent } from './shell/home/home.component';
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
        path: 'button-doc',
        component: ButtonDocComponent
      },
      {
        path: 'divider-doc',
        component: DividerDocComponent
      },
      {
        path: 'color-doc',
        component: ColorDocComponent
      }
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
