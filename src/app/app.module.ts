import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PipelineComponent } from './components/pipeline/pipeline.component';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LandingComponent } from './components/landing/landing.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import {PostsComponent} from "./components/posts/posts.component";
@NgModule({
    declarations: [
        AppComponent,
        PipelineComponent,
        LandingComponent,
        DashbordComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        PostsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
    exports: [],
})
export class AppModule {}
