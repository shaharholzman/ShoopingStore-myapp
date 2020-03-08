import { Component, OnInit ,ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, Validators , FormControl,FormGroupDirective, NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainService } from 'src/app/services/main.service';
import { ErrorStateMatcher } from '@angular/material/core';
import * as moment from 'moment';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class OrderComponent implements OnInit {
  
  public form:FormGroup
  public dateOrder:any = []
  public street:string = ""
  public moment: any = moment
  public arr:any = []
  matcher = new MyErrorStateMatcher();
  
  constructor(public fb:FormBuilder,public sm:MainService,public su:UserService,public mts:MatSnackBar,public router:Router) { 
    
    this.form = this.fb.group({
      city:["",Validators.required],
      street:[this.street,Validators.required],
      DeliveryDate:["",Validators.required],
      credit:["",Validators.required]
    },{validators : this.checkCredits})

  }
  

  // create validators for credit
  checkCredits(group: FormGroup) { 
  let credit = group.controls.credit.value
  const RegexCard = /^(?:4[0-9]{12}(?:[0-9]{3})?)$|^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$|^3[47][0-9]{13}$/
 
  return credit = RegexCard.test(credit) ? null : { notSame : true }
  }

  // Prevent  Sunday from being selected.
  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 6;
  }
  
  // marks full book date
  dateClass = (d:Date) => {
        let selected = false;
        selected = this.arr.some((item) => 
        new Date(item).getFullYear()  == d.getFullYear()
        &&   new Date(item).getDate() == d.getDate() 
        &&   new Date(item).getMonth() == d.getMonth())
        
        return selected ? 'example-custom-date-class' : undefined;
    }

  // Check if date if full-book
  checkDate(event){
    let new_data = this.moment(new Date(event.target.value)).format('D MMM YYYY')
    let bool = this.dateOrder.findIndex(item => 
      this.moment(new Date(item)).format('D MMM YYYY') == new_data)
    if(bool >= 0){
     this.form.controls.DeliveryDate.setValue('')
     this.form.controls['DeliveryDate'].setErrors({'incorrect' : true})
     this.mts.open('Were sorry,All shipments are busy on this day, please try a different date','close')
    }
    }
    
    // Bring Street of User---------------------------------------------->
    GetStreet(){
      this.street = this.su.user[0].street   
    }
    
    // Make Order---------------------------------------------------------->
    MakeOrder(){
      console.log(this.form.value)
      let newDate = this.moment(this.form.controls.DeliveryDate.value).format()  
      let form = this.form.value
      let total_price = this.su.TotalAmount
      let body = {form,total_price,'newDate':newDate}
      this.sm.MakeOrder(body).subscribe(
        res => {
          this.form.reset()
          this.sm.complitedOrder = !this.sm.complitedOrder
        },
        err =>{
          console.log(err)
          if(err.status === 401){
            this.su.sendHome()
          }else{
            this.mts.open('Were sorry, something happened in our system, please go to home page and connect again(your order is saved)','close')
          }
      }
      )
    }
    
    ngOnInit() {

      // Get All Delivery Dates
      this.su.GetAllOrders().subscribe(
        res => {
          let array = JSON.parse(res)
      for (let i = 0; i < array.length; i++) {
        let count = 0
        count = 0
        for (let z = 0; z < array.length; z++){
          if (array[i].DeliveryDate === array[z].DeliveryDate) {
              count++
              if(count >= 3){
                let index = this.dateOrder.find(item =>item ===array[i].DeliveryDate )
                if(index == undefined){
                  let l = array[i].DeliveryDate
                 this.dateOrder.push(l)
               }
              }
          }
        }  
      }
      this.dateOrder.map(item => 
      this.arr.push(this.moment(new Date(item)).format()))
        },
        err => {
          if(err.status === 401){
            this.su.sendHome()
          }
          this.mts.open('We are sorry, something happened in our system, please try again','close')
        }
      )
    
        
    }
    
    
  }
