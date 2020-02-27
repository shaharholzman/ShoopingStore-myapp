import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators , FormControl,FormGroupDirective, NgForm} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})


export class ViewComponent implements OnInit {
  
  public form:FormGroup
  public form_input:FormGroup
  public state_input:boolean = false
  public AddProduct:any = []
  public amount:number = 0
  public class_opacity:boolean = true
  public number:number = 1
  public btn:boolean = false

  constructor(public sm:MainService,public su:UserService,public mts:MatSnackBar,public fb:FormBuilder) { }
  
  
  // validator of form
  valiNumber(group: FormGroup) { 
    let number = group.controls.add.value;
    console.log(number)
    return number > 0 ? null : { notValid: true }
  }


  // Get product By Search-------------------------------------------->
  GetProduct(event) { 
    if(event.target.value.length === 0){
      this.su.GetAllProducts().subscribe(
        res => {
         this.su.products = JSON.parse(res)
        },
        err => {
          if(err.status === 401){
            this.su.sendHome()
          }
          this.mts.open('Were sorry, something happened in our system, please refresh the page and try again','close')
        }
      )
    }else{
      let  data = [{'name':event.target.value}]
      this.sm.GetProduct(data).subscribe(
        res => {
          let product = JSON.parse(res)
          this.su.products = product
        },
        err => {
          if(err.status === 401){
            this.su.sendHome()
          }
          this.mts.open('Were sorry, something happened in our system, please refresh the page and try again','close')
        }
        )
      }
  }

  // Get Products Of Categories--------------------------------------->
  GetProductsOfCategories(event){
    this.sm.GetProductsOfCategories(event).subscribe(
      res => {
        this.su.products = JSON.parse(res)
      },
      err => {
        if(err.status === 401){
          this.su.sendHome()
        }
        this.mts.open('Were sorry, something happened in our system, please refresh the page and try again','close')
      }
    )
  }
  
  // Get Model Of Add Product----------------------------------------->
  GetProductAndForm(event){
    if(this.state_input !== true){
      this.number = 1
      this.class_opacity = false
      this.state_input = true
      let  data = [{'name':event.target.id}]
      this.sm.GetProduct(data).subscribe(
        res => {
          this.AddProduct = JSON.parse(res)
        },
        err => {
          if(err.status === 401){
            this.su.sendHome()
          }
          this.mts.open('Were sorry, something happened in our system, please refresh the page and try again','close')
        }
        )
    }else{
      this.class_opacity = true
      this.state_input = !this.state_input
      this.amount = 0
      this.number = 1
      this.form_input = this.fb.group({
      add:[this.number,Validators.required]},{validator:this.valiNumber});    
      }


  }

  // Show total price of item*amount in form
  AddAmount(event){
    console.log(event)
  this.amount = this.AddProduct[0].price*event.target.value
  }

  // Add Product To Cart---------------------------------------------->
  AddProductToCart(){
    this.number = 1
    this.state_input = !this.state_input
    this.class_opacity = true
    let id = this.su.cart[0].id
    let total_price = this.form_input.value.add*this.AddProduct[0].price
    let amount = this.form_input.value.add
    let product_id = this.AddProduct[0].id
    let body = {total_price,amount,product_id }
    this.sm.AddProductForCart(body,id).subscribe(
      res => {
        this.amount = 0
        this.number = 1
        this.form_input = this.fb.group({
        add:[this.number,Validators.required]},{validator:this.valiNumber});    
         this.su.productsOfCart = JSON.parse(res)
         this.su.GetTotalPriceOfCart()
      },
      err => {
        if(err.status === 401){
          this.su.sendHome()
        }
        this.mts.open('Were sorry, something happened in our system, please refresh the page and try again','close')
      }
      )
  }

  ngOnInit() {

    
    this.form = this.fb.group({
      name:[""]});

    this.form_input = this.fb.group({
      add:[this.number,Validators.required]},{validator:this.valiNumber});

    // Get all categories
    this.sm.GetCategories().subscribe(
      res => {
       this.sm.categories = JSON.parse(res)
      },
      err => {
        if(err.status === 401){
          this.su.sendHome()
        }
        this.mts.open('Were sorry, something happened in our system, please refresh the page and try again','close')
      }
    )

// for Refrash ================================================>
    // get all products
    if(this.su.products.length === 0){
      this.su.GetAllProducts().subscribe(
       res => {
         this.su.products = JSON.parse(res)
        },
        err => {
          this.mts.open('Were sorry, something happened in our system, please refresh the page and try again','close')
        })
      }
        


  }



}
