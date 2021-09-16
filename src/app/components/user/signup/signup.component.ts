import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Router } from '@angular/router';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public disableBtn : boolean  = false ;
  public form! : FormGroup ;
  hide = true;
  constructor(public snackBar : MatSnackBar , private formBuilder: FormBuilder , public userService : UserService ,
              public router : Router  , private auth : AuthService) { }

  ngOnInit(): void
  {
    this.form = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, Validators.required],
      email   : [null , Validators.email],
      fullName    : [null , Validators.required],
    });
  }

  isFieldValid(field: string) {
    // @ts-ignore
    return !(this.form == null) && !this.form.get(field).valid && this.form.get(field).touched;
  }

  handleSignUp(event: Event)
  {
    event.preventDefault();
    this.disableBtn = true ;
    const form = event.target as HTMLFormElement;
    const fullName : string = form.fullName.value;
    const email : string = form.email.value;
    const username : string = form.username.value;
    const password : string = form.password.value;

    const userdata = {username : username , email : email , password : password , fullName: fullName};

    //alternative way to pass the body of http request that is userData here :
    // const userdata = this.form.value

    this.userService.getSignUp(userdata).subscribe(res =>
      {
        this.auth.authToken = res;
      }
      , error =>
      {
        this.disableBtn = false ;
        const message = 'ثبت نام ناموفق : ایمیل یا نام کاربری از قبل در سیستم ثبت شده است ';
        this.snackBar.open(message , '' ,  {duration : 3000 , verticalPosition :"bottom" ,
          horizontalPosition : "center" , panelClass : 'red-snackbar' })
      } ,
      ()=>
      {
        const message = 'ثبت نام موفقیت آمیز در حال انتقال به صفحه ی اصلی ...';
        this.snackBar.open(message , '' , {duration : 2000 , verticalPosition :"bottom" ,
          horizontalPosition : "center" , panelClass : 'green-snackbar' } );
        setTimeout( ()=> {
          this.router.navigate(['/']).then();
        } , 2000 );
      });
  }
}
