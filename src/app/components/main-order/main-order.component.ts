import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jsPDF from 'jspdf'
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-main-order',
  templateUrl: './main-order.component.html',
  styleUrls: ['./main-order.component.css']
})
export class MainOrderComponent implements OnInit {

  public date:Date = new Date
  public moment: any = moment

  constructor(public router:Router,public sm:MainService,public su:UserService) { }
  
  name = 'Angular Html To Pdf ';
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;

  // GoHome------------------------------------>
  GoHome(){
    // this.router.navigateByUrl('main/home')
    this.su.sendHome()
  }

  downloadAsPDF(){
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    const pdfTable = this.pdfTable.nativeElement;
    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('tableToPdf.pdf');

  }

  ngOnInit() {


      this.sm.complitedOrder = false
      // // verify
      this.su.DoVerify()

  }

}
