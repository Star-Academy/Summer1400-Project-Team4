import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { PostsComponent } from './components/posts/posts.component';
import { PipelineComponent } from './components/pipeline/pipeline.component';
import {UserComponent} from "./components/user/user.component";
import {LoginComponent} from "./components/user/login/login.component";
import {SignupComponent} from "./components/user/signup/signup.component";
import {EditProfileComponent} from "./components/user/edit-profile/edit-profile.component";

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'edit_profile',
        component: EditProfileComponent,
      },
    ],
  },
    { path: 'pipeline', component: PipelineComponent },
    {
        path: '',
        component: LandingComponent,
        children: [
            {
                path: '',
                component: DashbordComponent,
            },
            {
                path: 'posts',
                component: PostsComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
