import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from "@angular/forms";

import * as customerActions from "../state/customer.actions"
import * as fromCustomer from "../state/customer.reducer"
import { Customer } from "../customer.model";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-customers-add',
  templateUrl: './customers-add.component.html',
  styleUrls: ['./customers-add.component.css']
})
export class CustomersAddComponent implements OnInit {

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
      membership: ["", Validators.required]
    })
  }

  createCustomer(){
    const newCustomer:Customer = this.customerForm.getRawValue();    

    this.store.dispatch(new customerActions.CreateCustomer(newCustomer));

    this.customerForm.reset();
  }

}
