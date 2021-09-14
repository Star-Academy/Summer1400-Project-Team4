import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoginFailedComponent} from "../../messages/login-failed/login-failed.component";
import {Validators} from '@angular/forms';
import {FormGroup, FormBuilder} from '@angular/forms';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
const message = 'ورود موفقیت آمیز در حال انتقال به صفحه ی اصلی ...';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;
  hide = true;
  public disableBtn: boolean = false;

  constructor(public snackBar: MatSnackBar, private formBuilder: FormBuilder, public userService: UserService,
              public router: Router , public auth : AuthService) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  isFieldValid(field: string) {
    // @ts-ignore
    return !(this.form == null) && !this.form.get(field).valid && this.form.get(field).touched;
  }

  handle_log_in(event: Event) {
    event.preventDefault();
    this.disableBtn = true;
    const form = event.target as HTMLFormElement;
    const username: string = form.username.value;
    const password: string = form.password.value;

    const userdata = {username: username, password: password}

    this.userService.getUser(userdata).subscribe(res => {
        this.auth.authToken = res.token;
        this.auth.setUserLocal(username , (res.id).toString() , res.token); /* fix me! */
      }
      , error => {
        this.disableBtn = false;
        this.snackBar.openFromComponent(LoginFailedComponent, {
          duration: 3000, verticalPosition: "bottom",
          horizontalPosition: "center", panelClass: 'red-snackbar'
        })
      },
      () => {
        this.snackBar.open(message, '', {
          duration: 2000, verticalPosition: "bottom",
          horizontalPosition: "center", panelClass: 'green-snackbar'
        });
        setTimeout(() => {
          this.router.navigate(['/']).then();
        }, 2000);
      });
  }

}
