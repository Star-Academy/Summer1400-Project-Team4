import {Component, OnInit} from '@angular/core';
import {TableVirtualScrollDataSource} from 'ng-table-virtual-scroll';
import {LoginSignupAlertComponent} from "../messages/login-signup-alert/login-signup-alert.component";
import {FilteringTreeComponent} from "../filtering-tree/filtering-tree.component";
import {MatDialog} from "@angular/material/dialog";
export interface PeriodicElement {
  name: string;
  position: number;
}
let ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'هیدروزن'},
  {position: 2, name: 'هلیم'},
  {position: 3, name: 'لیتیم'},
  {position: 4, name: 'برلیم'},
  {position: 5, name: 'بورن'},
  {position: 6, name: 'بور'},
  {position: 7, name: 'نیترو'},
  {position: 8, name: 'اکسیژ'},
  {position: 9, name: 'فبور'},
  {position: 10, name: 'نیون'},
  {position: 11, name: 'هیدروزن'},
  {position: 12, name: 'هلیم'},
  {position: 13, name: 'لیتیم'},
  {position: 14, name: 'برلیم'},
  {position: 15, name: 'بورن'},
  {position: 16, name: 'بور'},
  {position: 17, name: 'نیترو'},
  {position: 18, name: 'اکسیژ'},
  {position: 19, name: 'فبور'},
  {position: 20, name: 'نیون'},
  {position: 21, name: 'هیدروزن'},
  {position: 22, name: 'هلیم'},
  {position: 23, name: 'لیتیم'},
  {position: 24, name: 'برلیم'},
  {position: 25, name: 'بورن'},
  {position: 26, name: 'بور'},
  {position: 27, name: 'نیترو'},
  {position: 28, name: 'اکسیژ'},
  {position: 29, name: 'فبور'},
  {position: 30, name: 'نیون'},
  {position: 31, name: 'هیدروزن'},
  {position: 32, name: 'هلیم'},
  {position: 33, name: 'لیتیم'},
  {position: 34, name: 'برلیم'},
  {position: 35, name: 'بورن'},
  {position: 36, name: 'بور'},
  {position: 37, name: 'نیترو'},
  {position: 38, name: 'اکسیژ'},
  {position: 39, name: 'فبور'},
  {position: 40, name: 'نیون'}
];

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'like', 'deleteEmployee'];
  dataSource!: TableVirtualScrollDataSource<PeriodicElement>;

  constructor(public dialog : MatDialog) {
    ELEMENT_DATA.map((data: any) => {
      data.show = false
    });
  }

  ngOnInit(): void {
    this.dialog.open(FilteringTreeComponent, {
      panelClass: 'filterDialog', disableClose: true,
      closeOnNavigation: false
    });
    this.dataSource = new TableVirtualScrollDataSource(ELEMENT_DATA);
  }

  handleMouseOver(row: { position: any; }) {
    const position = row.position;
    ELEMENT_DATA.map((data: any) => {
      if (data.position === position) {
        data.show = true;
      }
    });
  }

  handleMouseLeave(row: { position: any; }) {
    const position = row.position;
    ELEMENT_DATA.map((data: any) => {
      if (data.position === position) {
        data.show = false;
      }
    });
  }

  getNextBatch(event: any) {
  }

  clickName(element: PeriodicElement) {
    console.log(element);
  }
}
