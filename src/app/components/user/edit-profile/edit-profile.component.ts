import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth/auth.service";
import {userSignUp} from "../../../interfaces/interface";

const message = 'ویرایش موفقیت آمیز در حال انتقال به صفحه ی اصلی ...';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {
  public userData!: userSignUp;
  public imageSrc: string | undefined = "";
  public form!: FormGroup;
  public hide = true;
  public disableBtn: boolean = false;
  public firstName: string = "";
  public email: string = "";
  public userName: string = "";

  constructor(public snackBar: MatSnackBar, private formBuilder: FormBuilder, public router: Router,
              public userService: UserService, public auth: AuthService) {
  }

  ngOnInit(): void {
    const userId: string | null = this.auth.getUserId();
    if (!userId) {
      this.router.navigateByUrl('/').then();
    }
    this.userService.getUserInfos(userId).subscribe(res => {
      this.userData = res.user;
      console.log(this.userData);
      this.firstName = res.user.first_name;
      this.email = res.user.email;
      this.userName = res.user.username;
      this.imageSrc = res.user.avatar;
    }, (error => {
      this.snackBar.open('خطایی رخ داد', '', {
        duration: 2000, panelClass: 'red-snackbar'
      });
    }));
    this.form = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, Validators.pattern('pattern=.{0}|.{4,}')],
      email: [null, Validators.email],
      // email: [null, [Validators.email ,  Validators.required]],
      firstName: [null, Validators.required],
    });
  }

  isFieldValid(field: string) {
    // @ts-ignore
    return !(this.form == null) && !this.form.get(field).valid && this.form.get(field).touched;
  }

  handleEditing() {
    this.disableBtn = true;
    const tokenData = {token: this.auth.getToken()};
    let userdata: Object;
    if (this.form.value.password) {
      userdata = {...tokenData, ...this.form.value , ...{avatar: this.imageSrc} };
    } else {
      userdata = {
        token: this.auth.getToken(), username: this.userName, email: this.email,
        firstName: this.firstName, avatar: this.imageSrc
      };
    }
    this.userService.updateUserInfos(userdata).subscribe(() => {
      }, error => {
        this.disableBtn = false;
        this.snackBar.open('ایمیل یا نام کاربری از قبل ثبت شده است ', '', {
          duration: 2000, panelClass: 'red-snackbar'
        });
        return false;
      },
      () => {
        this.snackBar.open(message, '', {
          duration: 2000, panelClass: 'green-snackbar'
        });
        setTimeout(() => {
          this.router.navigateByUrl('', {skipLocationChange: true}).then();
        }, 2000);
        return true;
      });
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files) {
      const [file] = event.target.files;
      // console.log(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form.patchValue({
          avatarSource: reader.result
        });
      }
    }
  }
}
