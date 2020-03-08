import { Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element'
import { MainService } from 'src/app/services/main.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html',
  styleUrls: ['./main-user.component.css'],
})
export class MainUserComponent implements OnInit {

  public style: any = {}
  public style1: any = {}

  constructor(public su:UserService,public sm:MainService,public router:Router) { }

  validate(event: ResizeEvent) {
    const MIN_DIMENSIONS_PX: number = 900;
    if (
      event.rectangle.width &&
      (event.rectangle.width < MIN_DIMENSIONS_PX 
    )) {
      return false;
    }   
    return true;
    }
 
  onResizeEnd(event: ResizeEvent): void {

    if( window.innerWidth - event.rectangle.width - 115 !< 200 ){
      this.sm.width =  `${ window.innerWidth - event.rectangle.width - 115}px`
    }else{
      this.sm.width ='100%'
    }

    this.style = {
      position: 'fixed',
      right: `0px`,
      width: `${event.rectangle.width}px`,
    },
    this.style1 = {
      position: 'fixed',
      left: `0px`,
      width: `${ window.innerWidth - event.rectangle.width}px`
    }
  }
  
  ngOnInit() {

  this.su.stateLog = true
  // verify
  this.su.DoVerify()
  this.sm.width ='100%'


  }

}
