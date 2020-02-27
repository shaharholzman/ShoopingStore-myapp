import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PanelAComponent } from './components/panel-a/panel-a.component';
import { MainComponent } from './components/main/main.component';
import { MainUserComponent } from './components/main-user/main-user.component';
import { MainOrderComponent } from './components/main-order/main-order.component';
import { MainAdminComponent } from './components/Admin_Components/main-admin/main-admin.component';


const routes: Routes = [
  {path:'main',component:MainComponent,
        children:[
          {path:'home',component:HomeComponent},
          {path:'admin',component:MainAdminComponent},
          {path:'user',component:MainUserComponent},
          {path:'order',component:MainOrderComponent},
          {path:'',pathMatch:'full',redirectTo:'home'},
          {path:'**',redirectTo:'home'},        
        ]},
  {path:'',pathMatch:'full',redirectTo:'main'},
  {path:'**',redirectTo:'main'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
