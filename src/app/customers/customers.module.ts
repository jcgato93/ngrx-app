import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers/customers.component';
import { CustomersAddComponent } from './customers-add/customers-add.component';
import { CustomersEditComponent } from './customers-edit/customers-edit.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { Routes, RouterModule } from '@angular/router';


import { StoreModule } from "@ngrx/store";
import { customerReducer } from "./state/customer.reducer";

import { EffectsModule, Actions } from "@ngrx/effects";
import { CustomerEffect } from "./state/customer.effects";



const customerRoutes: Routes = [
  { path: "", component: CustomersComponent }
];

@NgModule({
  declarations: [
    CustomersComponent, 
    CustomersAddComponent, 
    CustomersEditComponent, 
    CustomersListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(customerRoutes),
    StoreModule.forFeature("customer", customerReducer),
    EffectsModule.forFeature([CustomerEffect])
  ]
})
export class CustomersModule { }
