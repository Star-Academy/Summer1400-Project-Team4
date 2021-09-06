import { EventEmitter } from '@angular/core';
import { Component, OnInit , Output } from '@angular/core';
import {Router} from "@angular/router";
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output()  toggleForSideBar  : EventEmitter<ElementRef> = new EventEmitter();
  @Output()  toggleForLogOut: EventEmitter<ElementRef> = new EventEmitter();


  constructor(public router : Router) { }

  ngOnInit(): void {
  }
  toggleSideBar()
  {
    this.toggleForSideBar.emit();
  }

  logOut()
  {
    this.toggleForLogOut.emit();
  }
}
