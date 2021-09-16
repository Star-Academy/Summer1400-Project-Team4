import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {NewLocalDataset} from "../../models/dataset.model";
import {DatasetService} from "../../services/dataset.service";

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.scss']
})
export class DatasetComponent implements OnInit {

  form!: FormGroup;
  fileName = '';
  file!: File;
  fileString!: string;
  uploadSubscription!: Subscription;
  loading: boolean = false; // Flag check loading
  name: string = '';
  rowSelected!: string;
  filedSelected!: string;

  constructor(private http: HttpClient, public datasetService: DatasetService,
              private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<DatasetComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      csvFile: [null, Validators.required],
      autoMap: [false, Validators.required],
      doesHaveHeader: [false, Validators.required]
    });
  }

  close() {
    if (this.uploadSubscription)
      this.uploadSubscription.unsubscribe();
    this.dialogRef.close();
  }

  onFileChange(event: any) {
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
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.file = file;
    }
  }

  onUpload() {

    this.loading = !this.loading;

    const data: NewLocalDataset = {
      ...this.form.value, ...{
        fieldSeparator: this.filedSelected,
        rowSeparator: this.rowSelected
      }
    };
    console.log(data);
    this.uploadSubscription = this.datasetService.createLocal(data).subscribe(
      (event: any) => {
        this.loading = false;
      }
      , error => {
        alert('خطایی رخ داد لطفا مجددا تلاش کنید');
        this.loading = false;
      }, () => {
        this.dialogRef.close(this.form.value);
      }
    );
  }
}
