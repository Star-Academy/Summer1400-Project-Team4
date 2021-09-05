import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public form! : FormGroup ;
  hide = true;
  constructor(public snackBar : MatSnackBar , private formBuilder: FormBuilder) { }

  ngOnInit(): void
  {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required],
      email   : [null , Validators.email],
      name    : [null , Validators.required],
    });
  }

  isFieldValid(field: string) {
    // @ts-ignore
    return !(this.form == null) && !this.form.get(field).valid && this.form.get(field).touched;
  }

  handle_log_in()
  {
    this.snackBar.open('ثبت نام موفقیت آمیز نبود' , 'بستن' , {duration : 3000 , verticalPosition :"bottom" ,
      horizontalPosition : "center" , panelClass : 'red-snackbar' })
  }


}
