import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators , FormControl,FormGroupDirective, NgForm} from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Renderer,ElementRef } from '@angular/core';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.css']
})
export class ViewAdminComponent implements OnInit {

  public form:FormGroup

  constructor(public elementRef: ElementRef,public render:Renderer,public sa:AdminService,public sm:MainService,public su:UserService,public mts:MatSnackBar,public fb:FormBuilder) { }


  // Get product By Search-------------------------------------------->
  GetProduct(event) { 
      console.log(event.target.value)
      if(event.target.value.length === 0){
        this.su.GetAllProducts().subscribe(
          res => {
           this.su.products = JSON.parse(res)
          },
          err => {
            if(err.status === 401){
              this.sa.sendHome()
            }    
            this.mts.open('Were sorry, something happened in our system, please refresh the page and try again','close')
          }
        )
      }else{
        let  data = [{'name':event.target.value}]
        this.sa.GetProduct(data).subscribe(
          res => {
            console.log(res)
            let product = JSON.parse(res)
            this.su.products = product
          },
          err => {
            if(err.status === 401){
              this.sa.sendHome()
            }    
            this.mts.open('Were sorry, something happened in our system, please refresh the page and try again','close')
          }
          )
        }
  }
  
  // Get Products Of Categories--------------------------------------->
  GetProductsOfCategories(event){
    this.sa.GetProductsOfCategories(event).subscribe(
      res => {
        this.su.products = JSON.parse(res)
      },
      err => {
        if(err.status === 401){
          this.sa.sendHome()
        }
        this.mts.open('Were sorry, something happened in our system, please refresh the page and try again','close')
      }
    )
  }

  // Get Data of product for update/Get form for update--------------------------->
  GetProductAndForm(event){
    // let shadesEl = document.querySelector('.product');
    // shadesEl.classList.remove('border')
    this.sa.GetProductForUpdate(event).subscribe(
      res => {
        // let shadesEl1 = document.getElementById(`${event.target.id}+1`);
        // shadesEl1.classList.add('border')
      this.sa.productToUpdate = JSON.parse(res)
      this.sa.state_update = true
      this.sa.state_add = false
      console.log(this.sa.productToUpdate)
     },
     err => {
      if(err.status === 401){
        this.sa.sendHome()
      }
      this.mts.open('Were sorry, something happened in our system, please refresh the page and try again','close')
     }
   )
  }
  ngOnInit() {

    this.form = this.fb.group({
      name:[""]});

    // Get all categories
    this.sa.GetCategories().subscribe(
      res => {
       this.sm.categories = JSON.parse(res)
       console.log( this.sm.categories)
      },
      err => {
        if(err.status === 401){
          this.sa.sendHome()
        }
        this.mts.open('Were sorry, something happened in our system, please refresh the page and try again','close')
      }
    )

    // get all products
    this.su.GetAllProducts().subscribe(
      res => {
        this.su.products = JSON.parse(res)
      },
      err => {
        if(err.status === 401){
          this.sa.sendHome()
        }      
          this.mts.open('Were sorry, something happened in our system, please refresh the page and try again','close')
       })
    
  }

}
