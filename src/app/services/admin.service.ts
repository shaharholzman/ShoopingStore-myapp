import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  public state_update:boolean = false
  public state_add:boolean = false
  public productToUpdate:any = []

  constructor(public router:Router,public http:HttpClient) { }

    // verify
    verify(){
      const headers = new HttpHeaders({
        'content-Type':'application/json'
      })
      return this.http.get(`http://localhost:3000/admin/verify`,{headers,withCredentials:true,responseType:'text'})
    }
  
    // if vt fail
    sendHome(){
      this.router.navigateByUrl('/')
      setTimeout(() => {
        
        window.location.reload()
      }, 0.5);
    }
    // Get Categories(1)--------------------------------------------------------->
    GetCategories(){
      const headers = new HttpHeaders({
        'content-Type':'application/json'
      })
      return this.http.get('http://localhost:3000/admin/Categories',{headers,withCredentials:true,responseType:'text'})
    }

      // Get Products Of Categories(2)--------------------------------------------------------->
      GetProductsOfCategories(e){
        const headers = new HttpHeaders({
          'content-Type':'application/json'
        })
        return this.http.get(`http://localhost:3000/admin/Categories/${e.target.id}`,{headers,withCredentials:true,responseType:'text'})
      }

      // Add Product(3)--------------------------------------------------------->
      AddProduct(body){
        const headers = new HttpHeaders({
          'content-Type':'application/json'
        })
        return this.http.post('http://localhost:3000/admin/product',JSON.stringify(body),{headers,withCredentials:true,responseType:'text'})
      }

      // Get data of product to update(4)--------------------------------------------------------->
      GetProductForUpdate(e){
        const headers = new HttpHeaders({
          'content-Type':'application/json'
        })
        return this.http.get(`http://localhost:3000/admin/product/${e.target.id}`,{headers,withCredentials:true,responseType:'text'})
      }
  
      // update Product(5)--------------------------------------------------------->
      UpdateProduct(body,e){
        const headers = new HttpHeaders({
          'content-Type':'application/json'
        })
        return this.http.put(`http://localhost:3000/admin/product/update/${e.target.id}`,JSON.stringify(body),{headers,withCredentials:true,responseType:'text'})
      }

      // search Product(5)--------------------------------------------------------->
    GetProduct(body){
      const headers = new HttpHeaders({
        'content-Type':'application/json'
      })
      return this.http.post(`http://localhost:3000/admin/search/product`,JSON.stringify(body),{headers,withCredentials:true,responseType:'text'})
    }

}
