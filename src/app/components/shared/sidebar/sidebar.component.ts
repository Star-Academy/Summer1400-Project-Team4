import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public name: string = "";
  public imgSrc!: string | undefined;

  constructor(private userService: UserService, private auth: AuthService) {
  }

  ngOnInit(): void {
    // this.userService.getUserInfos(/* fix me! */).subscribe(res => {
    //   this.name = res.user.first_name;
    //   this.imgSrc = res.user.avatar;
    // })
  }

}
