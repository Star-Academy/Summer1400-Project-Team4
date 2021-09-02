import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoginFailedComponent} from "../../messages/login-failed/login-failed.component";
import {Validators} from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form! : FormGroup ;
  hide = true;
  constructor(public snackBar : MatSnackBar , private formBuilder: FormBuilder) { }

  ngOnInit(): void
  {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  isFieldValid(field: string) {
    // @ts-ignore
    return !(this.form == null) && !this.form.get(field).valid && this.form.get(field).touched;
  }

  handle_log_in()
  {
    this.snackBar.openFromComponent(LoginFailedComponent , {duration : 3000 , verticalPosition :"bottom" ,
                                                                  horizontalPosition : "center" , panelClass : 'red-snackbar' })
  }



}
