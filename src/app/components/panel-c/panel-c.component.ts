import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';

@Component({
  selector: 'app-panel-c',
  templateUrl: './panel-c.component.html',
  styleUrls: ['./panel-c.component.css']
})
export class PanelCComponent implements OnInit {

  public moment: any = moment

  constructor(public su:UserService,public mts:MatSnackBar) { }

  ngOnInit() {

    // get all products
    this.su.GetAllProducts().subscribe(
      res => {
       this.su.products = JSON.parse(res)
      },
      err => {
        this.mts.open('We are sorry, something happened in our system, please refresh the page and try again','close')

      }
    )

    // get all orders
    this.su.GetAllOrders().subscribe(
      res => {
        this.su.orders = JSON.parse(res)
      },
      err => {
        this.mts.open('We are sorry, something happened in our system, please refresh the page and try again','close')

      }
    )
  }

}
