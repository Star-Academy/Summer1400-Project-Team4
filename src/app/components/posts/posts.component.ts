import {Component, OnInit} from '@angular/core';
import {TableVirtualScrollDataSource} from "ng-table-virtual-scroll";
import {PeriodicElement} from "../dashbord/dashbord.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";

const buffer = 200;
const message = 'نمونه های بیشتر لود شدند  ...';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  displayedColumns = ['position', 'name'];
  dataSource!: TableVirtualScrollDataSource<PeriodicElement>;
  public enableScroll: boolean = true;

  constructor(public snackBar: MatSnackBar, public http: HttpClient) {
  }

  onTableScroll(e: { target: any; }) {
    console.log("datasource length : " + this.dataSource.data.length);
    const tableViewHeight = e.target.offsetHeight // viewport: 52rem
    const tableScrollHeight = e.target.scrollHeight // the length of loaded datas exist in hole table
    const scrollLocation = e.target.scrollTop; // how far user scrolled
    const limit = tableScrollHeight - tableViewHeight - buffer;
    console.log('tableViewHeight : ' + tableViewHeight)
    console.log('tableScrollHeight : ' + tableScrollHeight)
    console.log('scrollLocation : ' + scrollLocation)
    console.log('limit : ' + limit)

    if (scrollLocation > limit && this.enableScroll) {
      console.log('scrollLocation : ' + scrollLocation)
      this.enableScroll = false;
      (this.http.get<Object>('https://songs.code-star.ir' + '/song/all').subscribe(res => {
          this.dataSource.data = this.dataSource.data.concat(ELEM);
          this.snackBar.open(message, '', {
            duration: 1000, verticalPosition: "bottom",
            horizontalPosition: "center", panelClass: 'purple-snackbar'
          });
          console.log('scroll height : ' + e.target.scrollHeight)
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

  ngOnInit(): void {
    this.dataSource = new TableVirtualScrollDataSource(ELEM);

    // console.log("ngOnInit");
    // setTimeout(()=>{
    //   this.dataSource.data[0].name = "opotoniom";
    // } , 3000)
  }

}

let ELEM: PeriodicElement[] = [
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
  {position: 40, name: 'نیون'},
];

