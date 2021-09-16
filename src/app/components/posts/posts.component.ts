import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TableVirtualScrollDataSource} from "ng-table-virtual-scroll";
import {PeriodicElement} from "../dashbord/dashbord.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute} from "@angular/router";

const buffer = 200;
const message = 'نمونه های بیشتر لود شدند  ...';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit , AfterViewInit {

  displayedColumns = ['id', 'name'];
  dataSource!: TableVirtualScrollDataSource<PeriodicElement>;
  enableScroll: boolean = true;
  datasetId!: string | null;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(public snackBar: MatSnackBar, public http: HttpClient , private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.datasetId = this.route.snapshot.paramMap.get('datasetId');
    console.log(this.datasetId);
    this.dataSource = new TableVirtualScrollDataSource(ELEM);
  }

  ngAfterViewInit(): void
  {
    this.dataSource.sort = this.sort;
  }

  onTableScroll(e: { target: any; }) {
    console.log("datasource length : " + this.dataSource.data.length);
    const tableViewHeight = e.target.offsetHeight // viewport: 52rem
    const tableScrollHeight = e.target.scrollHeight // the length of loaded datas exist in hole table
    const scrollLocation = e.target.scrollTop; // how far user scrolled
    const limit = tableScrollHeight - tableViewHeight - buffer;

    if (scrollLocation > limit && this.enableScroll) {
      this.enableScroll = false;
      (this.http.get<Object>('https://songs.code-star.ir' + '/song/all').subscribe(res => {
          this.dataSource.data = this.dataSource.data.concat(ELEM);
          this.snackBar.open(message, '', {
            duration: 1000, verticalPosition: "bottom",
            horizontalPosition: "left", panelClass: 'purple-snackbar'
          });
          console.log(res);
        }, error => {
          console.log('error')
        }, () => {
          console.log('complete');
          this.enableScroll = true;
        }
      ))
    }
    console.log('*'.repeat(25))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
let ELEM: PeriodicElement[] = [
  {id: 1, name: 'هیدروزن'},
  {id: 2, name: 'هلیم'},
  {id: 3, name: 'لیتیم'},
  {id: 4, name: 'برلیم'},
  {id: 5, name: 'بورن'},
  {id: 6, name: 'بور'},
  {id: 7, name: 'نیترو'},
  {id: 8, name: 'اکسیژ'},
  {id: 9, name: 'فبور'},
  {id: 10, name: 'نیون'},
  {id: 11, name: 'هیدروزن'},
  {id: 12, name: 'هلیم'},
  {id: 13, name: 'لیتیم'},
  {id: 14, name: 'برلیم'},
  {id: 15, name: 'بورن'},
  {id: 16, name: 'بور'},
  {id: 17, name: 'نیترو'},
  {id: 18, name: 'اکسیژ'},
  {id: 19, name: 'فبور'},
  {id: 20, name: 'نیون'},
  {id: 21, name: 'هیدروزن'},
  {id: 22, name: 'هلیم'},
  {id: 23, name: 'لیتیم'},
  {id: 24, name: 'برلیم'},
  {id: 25, name: 'بورن'},
  {id: 26, name: 'بور'},
  {id: 27, name: 'نیترو'},
  {id: 28, name: 'اکسیژ'},
  {id: 29, name: 'فبور'},
  {id: 30, name: 'نیون'},
  {id: 31, name: 'هیدروزن'},
  {id: 32, name: 'هلیم'},
  {id: 33, name: 'لیتیم'},
  {id: 34, name: 'برلیم'},
  {id: 35, name: 'بورن'},
  {id: 36, name: 'بور'},
  {id: 37, name: 'نیترو'},
  {id: 38, name: 'اکسیژ'},
  {id: 39, name: 'فبور'},
  {id: 40, name: 'نیون'}
];


