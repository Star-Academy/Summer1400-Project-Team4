import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {LoginSignupAlertComponent} from "../messages/login-signup-alert/login-signup-alert.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public toggleOpen = true;

  constructor(public auth: AuthService, public dialog: MatDialog , public router : Router) {
  }

  ngOnInit(): void {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['user', 'login']).then();
    }
  }

  alertLoginSignUp = (): void => {
    this.dialog.open(LoginSignupAlertComponent, {
      panelClass: 'custom-dialog-container', disableClose: true,
      closeOnNavigation: false
    });
  }

  toggleButton() {
    this.toggleOpen = !this.toggleOpen;
  }

  logOutUser() {
    this.auth.authToken = null;
    this.alertLoginSignUp();
  }
}
