import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { MainViewComponent } from './pages/main-view/main-view.component';

const routes: Routes = [ 
  {
    path: "", component: HomepageComponent
  },
  {
    path: "dashboard", component: MainViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
