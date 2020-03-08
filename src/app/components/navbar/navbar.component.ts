import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  
  constructor(public su:UserService,public mts:MatSnackBar) { }

  // LogOut & Refrash Token
  GetMudaleLogOut(){
    this.su.LogOut().subscribe(
      res => {
        this.su.sendHome()
      },
      err => {
        console.log(err)
        this.mts.open('Were sorry, something happened in our system, please refresh the page and try again','close')

      }
    )
  }

  ngOnInit() {
  }

}
