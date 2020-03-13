import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})


export class SideBarComponent implements OnInit {

  constructor(
    public router:Router,
    public sm:MainService,
    public su:UserService,
    public mts:MatSnackBar
    ) 
    { }
 
  // Go To Order Page--------------------------------------------------------------->
  GoToOrderPage(){     
      this.router.navigateByUrl('/main/order')
  }

  // Delete Product from Cart------------------------------------------------------>
  DeleteProductFromCart(event){
    let shadesEl = document.getElementById(`${event.target.id}+1`);
    this.sm.DeleteProductFormCart(event).subscribe(
      res => {      
        this.su.GetProductsOfCart().subscribe(
          res => {
            shadesEl.classList.add('slide-out-blurred-left')
            setTimeout(() => { 
              this.su.productsOfCart = JSON.parse(res)
              this.su.GetTotalPriceOfCart()
            }, 800);
            },
            err => {
              if(err.status === 401){
                this.su.sendHome()
              }  
              this.mts.open('Were sorry, something happened in our system, please try again','close')
            }
            )   
      },
      err => {
        if(err.status === 401){
          this.su.sendHome()
        }
        this.mts.open('Were sorry, something happened in our system, please try again','close')
      }
    )
  }

  // Delete All from Cart---------------------------------------------------------->
  DeleteAll(){
    this.sm.DeleteAllProductFormCart().subscribe(
      res => {
        this.su.GetProductsOfCart().subscribe(
          res => {
            this.su.productsOfCart = JSON.parse(res)
            this.su.GetTotalPriceOfCart()
          },
          err => {
            if(err.status === 401){
              this.su.sendHome()
            }  
            this.mts.open('Were sorry, something happened in our system, please try again','close')
          }
        )  
      },
      err => {
        if(err.status === 401){
          this.su.sendHome()
        }
        this.mts.open('Were sorry, something happened in our system, please try again','close')

      }
    )
  }

  
  ngOnInit() {
    
    this.sm.BringCartAndProducts()
    
          }


}
