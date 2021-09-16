import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Connection } from 'src/app/models/connection.model';
import { ConnectionService } from 'src/app/services/connection.service';
import {TableVirtualScrollDataSource} from "ng-table-virtual-scroll";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {NewConnectionComponent} from "../new-connection/new-connection.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import {Dataset} from "../../models/dataset.model";

@Component({
    selector: 'app-connections',
    templateUrl: './connections.component.html',
    styleUrls: ['./connections.component.scss'],
})
export class ConnectionsComponent implements OnInit {
    connections: Connection[] = [];
  displayedColumns: string[] = ['id', 'name' ,'deleteEmployee', 'add'];
  dataSource = new TableVirtualScrollDataSource<Connection>();
  constructor(private dialog: MatDialog, private auth: AuthService, private connectionService: ConnectionService
    , private router : Router , private snackBar : MatSnackBar) {
  }

    ngOnInit(): void {
    this.refreshConnections();
    }


  getDataSets() {
    this.connectionService.getAll().subscribe(res => {
        this.connections = res ;
      },
      error => {
        alert('خطا در دریافت دیتاست ها ');
      },
      () => {
        this.connections.map((data: any) => {
          data.show = false
        });
        this.dataSource = new TableVirtualScrollDataSource<Connection>(this.connections);
        console.log(this.connections);
      }
    )
  }


  clickName(element: any) {
    this.router.navigate([`posts/${element.id}`]).then();
  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.width = '35rem';
    this.dialog.open(NewConnectionComponent, dialogConfig).afterClosed().subscribe(res=>{
      this.refreshConnections();
    });

  }

  refreshConnections() {
    this.connectionService.getAll().subscribe({
      next: (connections) => {
        this.connections = connections;
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open('اشکال در دریافت اتصال‌ها از سرور', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: 'red-snackbar',
        });
      }, complete: ()=>{this.dataSource = new TableVirtualScrollDataSource<Connection>(this.connections);}
    });
  }
  deleteConnection(element: Connection) {
    this.connectionService.delete(element.id!).subscribe({
      next: () => {
        this.snackBar.open('اتصال با موفقیت حذف شد', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: 'green-snackbar',
        });
        this.refreshConnections();
      },
      error: (error) => {
        console.error(error);
        this.snackBar.open('اشکال در حذف اتصال', '', {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'center',
          panelClass: 'red-snackbar',
        });
      },
    });
  }

  handleMouseOver(row: { id: any; }) {
    const id = row.id;
    this.connections.map((data: any) => {
      if (data.id === id) {
        data.show = true;
      }
    });
  }

  handleMouseLeave(row: { id: any; }) {
    const id = row.id;
    this.connections.map((data: any) => {
      if (data.id === id) {
        data.show = false;
      }
    });
  }



}
