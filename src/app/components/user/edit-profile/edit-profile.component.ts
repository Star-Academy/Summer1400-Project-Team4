import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public imageSrc : string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQd326Nlb2A9bZXER6wetzJ_cBaaz6JLljAg&usqp=CAU"  ;
  public form! : FormGroup ;
  hide = true;
  constructor(public snackBar : MatSnackBar , private formBuilder: FormBuilder ) { }

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


  onFileChange(event: any)
  {
    const reader = new FileReader();
    if (event.target.files)
    {
      const [file] = event.target.files ;
      console.log(file);
      reader.readAsDataURL(file);
      reader.onload = () =>
      {
        this.imageSrc = reader.result as string;
      }
    }
  }
}
