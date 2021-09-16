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
    if (this.auth.authToken)
    {
      this.userService.getUserInfos(this.auth.authToken).subscribe(res => {
        this.name = res.username;
        this.imgSrc = res.avatar;
      })
    }
  }

}
