import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./components/landing/landing.component";
import {DashbordComponent} from "./components/dashbord/dashbord.component";
import {PostsComponent} from "./components/posts/posts.component";
const routes: Routes = [{
  path : '' ,
  component : LandingComponent ,
  children : [{
    path : '' ,
    component : DashbordComponent
  } ,
    {
    path : 'posts' ,
      component : PostsComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
