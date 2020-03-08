import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public stateLog:boolean = false
  public form_A:any = []
  public Have_VT:boolean = false
  public New_User:boolean = false
  public Login_Cart:boolean = false
  public Login_Order:boolean = false
  public shopping:string
  public orders:any = []
  public order:any = {}
  public cart:any = []
  public productsOfCart:any = []
  public ProductsOfCartLowerCase:any = []
  public products:any = []
  public guest:string = 'guest' 
  public user:any = []
  public cities:any = [
    {name:'Haifa'},
    {name:'Herzliya'},
    {name:'Jafo'},
    {name:'Jerusalem'},
    {name:'Kfar-Saba'},
    {name:'Netanya'},
    {name:'Ramat-Gan'},
    {name:'Ranana'},
    {name:'Rosh-HaAyin'},
    {name:'Tel-Aviv'},
  ]
     public TotalAmount:number

  constructor(public http:HttpClient,public mts:MatSnackBar,public router:Router) { }
  
  // verify
  verify(){
    const headers = new HttpHeaders({
      'content-Type':'application/json'
    })
    return this.http.get(`http://localhost:3000/users/verify`,{headers,withCredentials:true,responseType:'text'})
  }

  //Verify user per page---------------------------------------------------------> 
  DoVerify(){
    this.verify().subscribe(
      res => {
        let data = JSON.parse(res)
        this.guest = data[2].c
        let array = [{'id':data[0].a},{'costomer_id':data[1].b}]
        this.cart = array
      },
      err => {
        this.sendHome()
      }
    )
  }
  
  // if vt fail
  sendHome(){
        this.router.navigateByUrl('/')
        setTimeout(() => {     
          window.location.reload()
        }, 0.5);
  }
  
   // Get Total Price Of Cart -------------------------------------------------->
   GetTotalPriceOfCart(){
      this.TotalAmount = 0
      for(let i=0; i < this.productsOfCart.length ;i++){
          let sum = this.TotalAmount + this.productsOfCart[i].total_price
          this.TotalAmount = sum
      }
  }
  

  //LogOut & Refrash Token
  LogOut(){
    const headers = new HttpHeaders({
      'content-Type':'application/json'
    })
    return this.http.get(`http://localhost:3000/users/LogOut`,{headers,withCredentials:true,responseType:'text'})

  }

  // Register_A----------------------------------------------------------------->
  Register_A(body){
    const headers = new HttpHeaders({
      'content-Type':'application/json'
    })
    return this.http.post(`http://localhost:3000/users/register_A`,JSON.stringify(body),{headers,responseType:'text'})

  }

  // Full-Register(1)----------------------------------------------------------->
  FullRegister(data){
    const headers = new HttpHeaders({
      'content-Type':'application/json'
    })
    return this.http.post(`http://localhost:3000/users/register`,JSON.stringify(data),{headers,withCredentials:true ,responseType:'text'})
  }

  // Login(2)------------------------------------------------------------------->
  Login(body){
    const headers = new HttpHeaders({
      'content-Type':'application/json'
    })
    return this.http.post(`http://localhost:3000/users/login`,JSON.stringify(body),{headers,withCredentials:true,responseType:'text'})
  }

  // GetAllProducts(3)---------------------------------------------------------->
  GetAllProducts(){
    const headers = new HttpHeaders({
      'content-Type':'application/json'
    })
   return this.http.get(`http://localhost:3000/users/products`,{headers ,withCredentials:true, responseType:'text'})
  }


// GetAllOrders(4)---------------------------------------------------------->
  GetAllOrders(){
  const headers = new HttpHeaders({
    'content-Type':'application/json'
  })
  return this.http.get(`http://localhost:3000/users/orders`,{headers ,withCredentials:true, responseType:'text'})
}

//GetChartOfUser(5)---------------------------------------------------------------> 
GetChartOfUser(){
  const headers = new HttpHeaders({
    'content-Type':'application/json'
  })

  return this.http.get('http://localhost:3000/users/cart/user',{headers ,withCredentials:true , responseType:'text'})

}

// GetProductsOfCart(12)----------------------------------------------------------->
GetProductsOfCart(){
  console.log(this.cart[0].id)
    const headers = new HttpHeaders({
      'content-Type':'application/json'
    })
    return this.http.get(`http://localhost:3000/users/product/${this.cart[0].id}`,{headers ,withCredentials:true , responseType:'text'})
}

       
}
