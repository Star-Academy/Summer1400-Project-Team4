import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingComponent} from "./landing.component";
import {DashbordComponent} from "../dashbord/dashbord.component";
import {RouterModule} from "@angular/router";
import {PostsComponent} from "../posts/posts.component";
import {HeaderComponent} from "../shared/header/header.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {SidebarComponent} from "../shared/sidebar/sidebar.component";

@NgModule({
  declarations: [ LandingComponent, DashbordComponent , PostsComponent , HeaderComponent , FooterComponent , SidebarComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LandingModule { }
