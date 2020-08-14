import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerViewComponent } from './customer/customer-view/customer-view.component';
import { AuthenticationService } from './authentication.service'
import { AuthGuardService } from './auth-guard.service'
import { HttpClientModule } from '@angular/common/http';
import { CustomerEditDetailsComponent } from './customer/customer-edit-details/customer-edit-details.component';
import { CustomerViewDetailsComponent } from './customer/customer-view-details/customer-view-details.component';
@NgModule({
  declarations: [
    AppComponent,
    CustomerDetailsComponent,
    CustomerViewComponent,
    CustomerEditDetailsComponent,
    CustomerViewDetailsComponent

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
