import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {HighlightPipeService} from './services/highlight.pipe.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PanelBComponent } from './components/panel-b/panel-b.component';
import { PanelCComponent } from './components/panel-c/panel-c.component';
import { PanelAComponent } from './components/panel-a/panel-a.component';
import { MainComponent } from './components/main/main.component';
import { MainUserComponent } from './components/main-user/main-user.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ViewComponent } from './components/view/view.component';

import { ResizableModule } from 'angular-resizable-element';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { OrderComponent } from './components/order/order.component';
import { MainOrderComponent } from './components/main-order/main-order.component';
import { MainAdminComponent } from './components/Admin_Components/main-admin/main-admin.component';
import { SideBarAdminComponent } from './components/Admin_Components/side-bar-admin/side-bar-admin.component';
import { ViewAdminComponent } from './components/Admin_Components/view-admin/view-admin.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PanelBComponent,
    PanelCComponent,
    PanelAComponent,
    MainComponent,
    MainUserComponent,
    SideBarComponent,
    ViewComponent,
    ReceiptComponent,
    OrderComponent,
    MainOrderComponent,
    HighlightPipeService,
    MainAdminComponent,
    SideBarAdminComponent,
    ViewAdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatGridListModule,
    MatSnackBarModule,
    MatSelectModule,
    ResizableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgbModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
