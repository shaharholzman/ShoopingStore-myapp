import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl,FormGroupDirective, NgForm} from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { MainService } from 'src/app/services/main.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-side-bar-admin',
  templateUrl: './side-bar-admin.component.html',
  styleUrls: ['./side-bar-admin.component.css']
})

export class SideBarAdminComponent implements OnInit {

  public addform:FormGroup
  public updateform:FormGroup
  
  constructor(public mts:MatSnackBar,public fb:FormBuilder,public su:UserService,public sa:AdminService,public sm:MainService) { }

  // Get Mudal of addform
  GetFormAdd(){
    this.sa.state_add = !this.sa.state_add
    this.sa.state_update = false
  }

  // Add Product------------------------------------------------->
  AddProduct(){
    let shadesEl = document.querySelectorAll('.product')
    for(let i = 0 ; i < shadesEl.length;i++){
      shadesEl[i].classList.add('border')
    }  
    this.sa.AddProduct(this.addform.value).subscribe(
      res => {
        this.sa.state_add = !this.sa.state_add
        this.addform.reset()
    this.su.GetAllProducts().subscribe(
      res => {
        this.su.products = JSON.parse(res)
      },
      err => {
        if(err.status === 401){
          this.sa.sendHome()
        }
        this.mts.open('Were sorry, something happened in our system, please refresh the page','close')
      }
    )
      },
      err => {
        if(err.status === 401){
          this.sa.sendHome()
        }
        console.log(err)
        this.addform.reset()
        this.sa.state_add = !this.sa.state_add
        this.mts.open('Were sorry, something happened in our system, please refresh the page','close')
      }
    )
  }

  // UpdateProduct------------------------------------------------>
  UpdateProduct(event){
   this.sa.UpdateProduct(this.updateform.value,event).subscribe(
     res => {
       this.sa.state_update = false
      this.su.GetAllProducts().subscribe(
        res => {
          this.su.products = JSON.parse(res)
         },
         err => {
          if(err.status === 401){
            this.sa.sendHome()
          }  
           this.mts.open('Were sorry, something happened in our system,the change is save , just refresh the page','close')
         })
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

    this.addform= this.fb.group({
      name:['',Validators.required],  
      price:['',Validators.required],
      img: ['', Validators.required],
      category: ['',Validators.required]
    })

    this.updateform= this.fb.group({
      name:[ '',Validators.required],  
      price:['',Validators.required],
      img: ['', Validators.required],
      categories_id: ['',Validators.required]
    })

  }

}
