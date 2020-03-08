import { Component, OnInit } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element'
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrls: ['./main-admin.component.css']
})
export class MainAdminComponent implements OnInit {

  public style: any = {}
  public style1: any = {}

  constructor(public router:Router,public sa:AdminService,public su:UserService) { }

  validate(event: ResizeEvent) {
    const MIN_DIMENSIONS_PX: number = 960;
    if (
      event.rectangle.width &&
      (event.rectangle.width < MIN_DIMENSIONS_PX 
    )) {
      return false;
    }   
    return true;
    }
 
  onResizeEnd(event: ResizeEvent): void {
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
    this.sa.verify().subscribe(
      res => {
      this.su.guest = JSON.parse(res)
      },
      err => {
        this.sa.sendHome()
      }
    )
  }

}
