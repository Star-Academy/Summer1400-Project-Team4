import { Component, OnInit } from '@angular/core';
import { TableVirtualScrollDataSource } from 'ng-table-virtual-scroll';
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
];
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'like' , 'deleteEmployee'];
  dataSource = new TableVirtualScrollDataSource(ELEMENT_DATA);
  hovered :boolean = false;
  constructor() {
    ELEMENT_DATA.map((data: any) => {
      data.show = false
    });
  }

  ngOnInit(): void {
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
}
