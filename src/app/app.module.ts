import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LandingComponent } from './components/landing/landing.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostsComponent } from './components/posts/posts.component';
import { LoginSignupAlertComponent } from './components/messages/login-signup-alert/login-signup-alert.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { LoginFailedComponent } from './components/messages/login-failed/login-failed.component';
import { EditProfileComponent } from './components/user/edit-profile/edit-profile.component';

@NgModule({
    declarations: [
        AppComponent,
        LandingComponent,
        DashbordComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        PostsComponent,
        LoginSignupAlertComponent,
        UserComponent,
        LoginComponent,
        SignupComponent,
        LoginFailedComponent,
        EditProfileComponent
    ], entryComponents : [LoginSignupAlertComponent , LoginFailedComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [],
})
export class AppModule {}
