import { Component, OnInit } from '@angular/core';

import { FormBuilder,FormGroup, Validators } from "@angular/forms";

import * as customerActions from "../state/customer.actions"
import * as fromCustomer from "../state/customer.reducer"
import { Customer } from "../customer.model";
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-customers-edit',
  templateUrl: './customers-edit.component.html',
  styleUrls: ['./customers-edit.component.css']
})
export class CustomersEditComponent implements OnInit {

  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromCustomer.AppState>
  ) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      membership: ["", Validators.required],
      id: null
    })

    const customer$: Observable<Customer> = this.store.select(
      fromCustomer.getCurrentCustomer
    )

    customer$.subscribe(currentCustomer => {
      if(currentCustomer){
        this.customerForm.patchValue({
          name: currentCustomer.name,
          phone: currentCustomer.phone,
          address: currentCustomer.address,
          membership: currentCustomer.membership,
          id: currentCustomer.id
        })
      }
    })
  }


  updateCustomer(){
    const updateCustomer:Customer = this.customerForm.getRawValue();

    this.store.dispatch(new customerActions.UpdateCustomer(updateCustomer))
  }

}
