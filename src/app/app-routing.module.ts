import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DividerDocComponent } from './doc-pages/divider-doc/divider-doc.component';
import { ButtonDocComponent } from './doc-pages/button-doc/button-doc.component';
import { MainComponent } from './shell/main/main.component';
import { HomeComponent } from './shell/home/home.component';


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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
