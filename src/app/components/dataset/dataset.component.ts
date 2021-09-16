import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient, HttpEventType} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {

  form!: FormGroup;
  toppings!: FormGroup;
  fileName = '';
  file! : File;
  fileString! : string;
  uploadSubscription! : Subscription;
  loading: boolean = false; // Flag check loading
  datasetName : string = '';

  constructor( public http : HttpClient,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DatasetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  )
  { }

  ngOnInit()
  {
    this.form = this.formBuilder.group({
      datasetName: [null, [Validators.required]],
      csvFile: [null, Validators.required],
      autoMap:  [false, Validators.required],
      doesHaveHeader: [false, Validators.required]
    });
  }

  close()
  {
    if ( this.uploadSubscription )
      this.uploadSubscription.unsubscribe();
    this.dialogRef.close();
  }

  onFileChange(event : any) {
    const reader = new FileReader();
    if (event.target.files) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileString = reader.result as string;
        this.form.patchValue({
          csvFile: reader.result
        });
      }
    }
    const file : File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.file = file;
    }
  }

  onUpload() {

    console.log(this.form.value);

    this.loading = !this.loading;

    const formData = new FormData();

    formData.append("file", this.file, this.file.name);

    this.uploadSubscription = this.http.post("https://file.io" , formData ).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          console.log(event);
          this.loading = false; // Flag variable
        }
      }
      , error => {
        alert('خطایی رخ داد لطفا مجددا تلاش کنید');
        this.loading = false ;
      } , ()=>{
        this.dialogRef.close(this.form.value);
      }
    );

  }
}
