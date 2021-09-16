import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConnectionService } from 'src/app/services/connection.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {ConnectionsComponent} from "../connections/connections.component";

@Component({
    selector: 'app-new-connection',
    templateUrl: './new-connection.component.html',
    styleUrls: ['./new-connection.component.scss'],
})
export class NewConnectionComponent implements OnInit {
  form!: FormGroup;
    constructor(
        private connectionService: ConnectionService,
        private snackBar: MatSnackBar , private formBuilder: FormBuilder , public dialogRef: MatDialogRef<ConnectionsComponent>,
    ) {}

    ngOnInit(): void {
      this.form = this.formBuilder.group({
        name: [null, [Validators.required]],
        host: [null, Validators.required],
        username: [null, Validators.required],
        password: [null, Validators.required],
        databaseName:[null , Validators.required]
      });
    }



  onUpload() {
      const newConnection = this.form.value;
    this.connectionService.create(newConnection).subscribe({
      next: () => {this.dialogRef.close();},
      error: (error) => {
        console.error(error);
        this.snackBar.open('اشکال در افزودن اتصال', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: 'red-snackbar',
        });
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}
