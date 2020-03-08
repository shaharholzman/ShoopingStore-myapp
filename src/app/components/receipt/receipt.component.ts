import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})

export class ReceiptComponent implements OnInit {

  public form:FormGroup
  public searchResults:any
  public searchVal:string

  constructor(
    public router:Router,
    public sm:MainService,
    public su:UserService,
    public mts:MatSnackBar,
    public fb:FormBuilder,
    ) { }
    

    // Back To Cart Page--------------------------------------------------------------->
    GoToCartPage(){
      this.router.navigateByUrl('/main/user')
      }
    
  ngOnInit() {

    this.sm.BringCartAndProducts()

    this.searchResults = this.su.productsOfCart
    
    this.form = this.fb.group({
      name:[""]});
      

  }

}
