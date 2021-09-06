import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {LoginSignupAlertComponent} from "../messages/login-signup-alert/login-signup-alert.component";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public toggleOpen = true;

  constructor(public auth: AuthService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (!this.auth.isLogged()) {
      this.alertLoginSignUp();
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
    this.auth.removeUserLocal();
    this.alertLoginSignUp();
  }
}
