import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public toggleOpen = false ;

  constructor() { }

  ngOnInit(): void {
  }
  toggleButton()
  {
    this.toggleOpen = !this.toggleOpen;
  }

}
