import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingComponent} from "./landing.component";
import {DashbordComponent} from "../dashbord/dashbord.component";
import {RouterModule} from "@angular/router";
import {PostsComponent} from "../posts/posts.component";
import {HeaderComponent} from "../shared/header/header.component";
import {FooterComponent} from "../shared/footer/footer.component";
import {SidebarComponent} from "../shared/sidebar/sidebar.component";
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from'@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
const mat = [
  MatSidenavModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  FlexLayoutModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule
];
@NgModule({
  declarations: [ LandingComponent, DashbordComponent , PostsComponent , HeaderComponent , FooterComponent , SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    mat
  ] ,
  exports: [ mat ]
})
export class LandingModule { }
