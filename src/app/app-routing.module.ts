import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { PostsComponent } from './components/posts/posts.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { EditProfileComponent } from './components/user/edit-profile/edit-profile.component';
import { AuthGuard } from './guard/auth.guard';
import { PipelinesComponent } from './components/pipelines/pipelines.component';

const routes: Routes = [
    {
        path: 'pipeline',
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./pipeline/pipeline.module').then(
                (module) => module.PipelineModule
            ),
    },
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
                canActivate: [AuthGuard],
            },
        ],
    },
    {
        path: '',
        component: LandingComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'pipelines',
                component: PipelinesComponent,
            },
            {
                path: 'datasets',
                component: DashbordComponent,
            },
            {
                path: 'posts',
                component: PostsComponent,
            },
            {
                path: '**',
                redirectTo: 'datasets',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
