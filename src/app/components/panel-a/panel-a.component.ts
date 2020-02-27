import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl,FormGroupDirective, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainService } from 'src/app/services/main.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-panel-a',
  templateUrl: './panel-a.component.html',
  styleUrls: ['./panel-a.component.css']
})

export class PanelAComponent implements OnInit {

  public formLogin:FormGroup
  public formRegister_A:FormGroup
  public formRegister_B:FormGroup
  public state_A:boolean = false
  public state_B:boolean = false

  matcher = new MyErrorStateMatcher();

  constructor(public fb:FormBuilder,public sm:MainService,public su:UserService,public mts:MatSnackBar,public router:Router) {
    
    // Define first registration form + validator
    this.formRegister_A = this.fb.group({
      personal_id:["",Validators.required],
      userName:["",Validators.required],  
      password: ['', Validators.required],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });
    
  }
  
// functions=================================================================================>

// create validators for passwords
checkPasswords(group: FormGroup) { 
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPassword.value;
  
  return pass === confirmPass ? null : { notSame: true }
}

// change modal Login VS Register
GoRegister(){
      this.state_A = !this.state_A
}

// GoToNextPageUser------------------------------------------------------------->
NextPageUser(){
      // Create Cart for user
      if(this.su.cart.length === 0){
        this.sm.AddCart().subscribe(
          res => {
          this.su.cart = JSON.parse(res)
          this.router.navigateByUrl('/main/user')
          },
          err => {
            this.mts.open('Were sorry, something happened in our system, please refresh the page and try again','close')
          }
        )
        }

      this.router.navigateByUrl('/main/user')
}

// Login----------------------------------------------------------------------->
Login(){
      this.su.Login(this.formLogin.value).subscribe(
        res => {
          this.formLogin.reset()
          let data = JSON.parse(res)
          this.su.user = data
          this.su.guest = data[0].userName
         if(this.su.user[0].idAdmin === 0){
           this.su.GetChartOfUser().subscribe(
             res => {
              let data = JSON.parse(res)
              this.su.cart = data
              if(this.su.cart.length === 0){
                let LastOrder = this.su.orders.find( or => this.su.user[0].id === or.user_id )
                this.su.shopping = 'Start'
                this.su.Have_VT = !this.su.Have_VT
                if(LastOrder !== undefined){
                  this.su.order = LastOrder
                  this.su.Login_Order = !this.su.Login_Order 
                }else{
                  this.su.New_User = !this.su.New_User
                }
              }else{
               this.su.Login_Cart = !this.su.Login_Cart
               this.su.Have_VT = !this.su.Have_VT
               this.su.shopping = 'Resume'
              }
             },
             err => {
              this.mts.open('Were sorry, something happened in our system, please refresh the page and try again','close')
             }  
           )
         }else{
           console.log('ADMIN')
           this.router.navigateByUrl('/main/admin')
         }
        },
        err =>{
         this.formLogin.reset()
         console.log(err)
         if(err.status === 400){
          this.mts.open('One or more of the details you entered are incorrect, please try again','close')
         }else{
          this.mts.open('Were sorry, something happened in our system, please try again','close')
         }
         
        }
      )
}
  
// Register_A------------------------------------------------------------------>
Register_A(){
  this.su.Register_A(this.formRegister_A.value).subscribe(
    res => {
      if(res === 'OK'){
        this.su.form_A = this.formRegister_A.value
        this.state_B = !this.state_B
        this.formRegister_A.reset()
      }else{
        this.formRegister_A.reset()
        this.mts.open(res,'close')
      }
    },
    err =>{
      this.formRegister_A.reset()
      this.mts.open('We are sorry, something happened in our system, please try again','close')
    }
  )
}

// FullRegister/Register_B-------------------------------------------------------->
FullRegister(){
  let data = {'form_A':this.su.form_A,'form_B':this.formRegister_B.value}
  this.su.FullRegister(data).subscribe(
    res => {
      let data = JSON.parse(res)
      this.su.user = data[0]
      this.su.guest = data[0].userName
      this.state_B = !this.state_B
      this.state_A = !this.state_A
      this.su.Have_VT = !this.su.Have_VT
      this.su.shopping = 'Start'
      this.su.New_User = !this.su.New_User
    },
    err => {
      this.mts.open('We are sorry, something happened in our system, please try again','close')
    }
  )
}
  ngOnInit() {

    this.state_A = false
    this.state_B = false
    this.su.Have_VT = false
    this.su.New_User = false
    this.su.Login_Cart = false
    this.su.Login_Order = false
    this.su.guest = 'guest'
  
    this.formLogin = this.fb.group({
      userName:["",Validators.required],
      password:["",Validators.required],
    })

    this.formRegister_B = this.fb.group({
      city:["",Validators.required],  
      street:["",Validators.required],
      first_name: ['', Validators.required],
      last_name: ['',Validators.required]
    });

  }

}
