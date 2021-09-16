import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TableVirtualScrollDataSource} from 'ng-table-virtual-scroll';
import {MatSort} from "@angular/material/sort";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DatasetComponent} from "../dataset/dataset.component";
import {AuthService} from "../../services/auth.service";
import {DatasetService} from "../../services/dataset.service";
import {Dataset} from "../../models/dataset.model";
import {Router} from "@angular/router";

export interface PeriodicElement {
  id: number;
  liked?: boolean;
  name: string;
}

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'like', 'deleteEmployee', 'add'];
  dataSource = new TableVirtualScrollDataSource<Dataset>();
  dataSets!: Dataset[];
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private auth: AuthService, private datasetService: DatasetService
              , private router : Router) {
  }

  ngOnInit(): void {
    this.getDataSets();
  }

  getDataSets() {
    this.datasetService.getAll().subscribe(res => {
        this.dataSets = res;
      },
      error => {
        alert('خطا در دریافت دیتاست ها ');
      },
      () => {
        this.dataSets.map((data: any) => {
          data.show = false
        });
        this.dataSource = new TableVirtualScrollDataSource<Dataset>(this.dataSets);
        this.dataSource.sort = this.sort;
        console.log(this.dataSets);
      }
    )
  }

  ngAfterViewInit(): void {
  }

  handleMouseOver(row: { id: any; }) {
    const id = row.id;
    this.dataSets.map((data: any) => {
      if (data.id === id) {
        data.show = true;
      }
    });
  }

  handleMouseLeave(row: { id: any; }) {
    const id = row.id;
    this.dataSets.map((data: any) => {
      if (data.id === id) {
        data.show = false;
      }
    });
  }

  getNextBatch(event: any) {
  }

  clickName(element: Dataset) {
    this.router.navigate([`posts/${element.id}`]).then();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.direction = "rtl";
    dialogConfig.width = '35rem';
    this.dialog.open(DatasetComponent, dialogConfig);
  }

  likedRequest(element: Dataset) {
    if (element.liked) {
      this.datasetService.dislike(element.id).subscribe(() => {
      }, error => {
        alert('خطا هنگام ارتباط با سرور');
      }, () => {
        this.getDataSets();
      });
    } else {
      this.datasetService.like(element.id).subscribe(res => {

      }, error => {
        alert('خطا هنگام ارتباط با سرور');
      }, () => {
        this.getDataSets();
      })
    }

  }

  removeRequest(element: Dataset) {
    this.datasetService.delete(element.id).subscribe(() => {
      }, error => {
        alert('خطا هنگام ارتباط با سرور');
      }
      , () => {
        this.getDataSets();
      });
  }
}
