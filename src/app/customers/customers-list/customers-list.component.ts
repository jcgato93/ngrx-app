import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css']
})
export class CustomersListComponent implements OnInit {

  customers:Customer[];

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch({type: 'LOAD_CUSTOMER'})
    this.store.subscribe(state => {      
      this.customers = state.customer.customers
    })
  }

}
