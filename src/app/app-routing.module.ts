import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerDetailsComponent} from './customer/customer-details/customer-details.component';
import {CustomerViewComponent} from './customer/customer-view/customer-view.component';
import {CustomerEditDetailsComponent} from './customer/customer-edit-details/customer-edit-details.component';
import {CustomerViewDetailsComponent} from './customer/customer-view-details/customer-view-details.component';

const routes: Routes = [
  {path:'',redirectTo:'customerAdd',pathMatch:'full'},
  {path:'customerAdd', component:CustomerDetailsComponent},
  {path:'customerView', component:CustomerViewComponent},
  {path:'edit-customer-details/:id', component:CustomerEditDetailsComponent},
  {path:'view-individual-customer-details/:id', component:CustomerViewDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
