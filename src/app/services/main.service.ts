import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public categories:any = []
  public order:any = []
  public complitedOrder:boolean = false
  public width:any = '100%'

  constructor(public http:HttpClient,public su:UserService, public mts:MatSnackBar) 
  { }

  // Get Categories(7)--------------------------------------------------------->
    GetCategories(){
      const headers = new HttpHeaders({
        'content-Type':'application/json'
      })
      return this.http.get(`http://localhost:3000/users/Categories`,{headers,withCredentials:true,responseType:'text'})
    }

  // Get Products Of Categories(8)--------------------------------------------------------->
    GetProductsOfCategories(e){
      const headers = new HttpHeaders({
        'content-Type':'application/json'
      })
      return this.http.get(`http://localhost:3000/users/Categories/${e.target.id}`,{headers,withCredentials:true,responseType:'text'})
    }

  // Get Product(9)--------------------------------------------------------->
    GetProduct(body){
      console.log(body)
      const headers = new HttpHeaders({
        'content-Type':'application/json'
      })
      return this.http.post(`http://localhost:3000/users/product`,JSON.stringify(body),{headers,withCredentials:true,responseType:'text'})
    }

  // Add Cart(10)--------------------------------------------------------->
    AddCart(){
      const headers = new HttpHeaders({
        'content-Type':'application/json'
      })
      return this.http.get(`http://localhost:3000/users/cart`,{headers,withCredentials:true,responseType:'text'})
    }

  // Add Product For Cart(11)--------------------------------------------------------->
    AddProductForCart(body,id){
      const headers = new HttpHeaders({
        'content-Type':'application/json'
      })
      return this.http.post(`http://localhost:3000/users/product/${id}`,JSON.stringify(body),{headers,withCredentials:true,responseType:'text'})
    }

    // Delete Product from Cart(13)---------------------------------------------------->
    DeleteProductFormCart(e){
      let body = {'id':this.su.cart[0].id}
      const headers = new HttpHeaders({
        'content-Type':'application/json'
      })
      return this.http.put(`http://localhost:3000/users/product/delete/${e.target.id}`,JSON.stringify(body),{headers,withCredentials:true,responseType:'text'})
    }

    // Delete Product from Cart(14)---------------------------------------------------->
    DeleteAllProductFormCart(){
      const headers = new HttpHeaders({
        'content-Type':'application/json'
      })
      return this.http.delete(`http://localhost:3000/users/product/delete/all/${this.su.cart[0].id}`,{headers,withCredentials:true,responseType:'text'})
    }

    // serch product of order(15)----------------------------------------------->
    SerchProductOfOrder(body){
      const headers = new HttpHeaders({
        'content-Type':'application/json'
      })
      return this.http.get(`http://localhost:3000/users/order/product/${body}`,{headers,withCredentials:true,responseType:'text'})

    }
    // Make Order(16)----------------------------------------------->
    MakeOrder(body){
      const headers = new HttpHeaders({
        'content-Type':'application/json'
      })
      return this.http.post(`http://localhost:3000/users/orders/${this.su.cart[0].id}`,JSON.stringify(body),{headers,withCredentials:true,responseType:'text'})

    }
 
    // bring cart && products of cart --------------------------------------------->
    BringCartAndProducts(){
      if(this.su.cart.length === 0){
        this.su.GetChartOfUser().subscribe(
          res => {
            this.su.cart = JSON.parse(res)
              this.su.GetProductsOfCart().subscribe(
                 res => {
                  this.su.productsOfCart = JSON.parse(res)
                  this.su.GetTotalPriceOfCart()
                    },
                    err => {
                      if(err.status === 401){
                        this.su.sendHome()
                      }            
                      this.mts.open('We111re sorry, something happened in our system, please try again','close')
                    })  
                  },
              err => {
              this.mts.open('We111re sorry, something happened in our system, please try again','close')
                  })
                }else{
                  this.su.GetProductsOfCart().subscribe(
                    res => {
                      this.su.productsOfCart = JSON.parse(res)
                      this.su.GetTotalPriceOfCart()
                    },
                    err => {
                      if(err.status === 401){
                        this.su.sendHome()
                      }            
                      this.mts.open('We111re sorry, something happened in our system, please try again','close')
                    })  
                  }
                }
    
}
