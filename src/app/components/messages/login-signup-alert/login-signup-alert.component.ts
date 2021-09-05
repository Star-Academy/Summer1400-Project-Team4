import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-login-signup-alert',
  templateUrl: './login-signup-alert.component.html',
  styleUrls: ['./login-signup-alert.component.scss']
})
export class LoginSignupAlertComponent implements OnInit {

  constructor(private router: Router , public dialog : MatDialog) { }

  ngOnInit(): void {
  }

  Navigate(toLogin: boolean)
  {
    if (this.dialog.openDialogs.length > 0)
      this.dialog.closeAll();
    if (toLogin) {
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => this.router.navigate(['/user', 'login']));
    } else {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['/user', 'signup']));
    }
  }
}
