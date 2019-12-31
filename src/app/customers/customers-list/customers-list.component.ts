import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Customer } from '../customer.model';
import { Observable } from "rxjs";
import * as customerActions from "../state/customer.actions";
import * as fromCustomer from "../state/customer.reducer";

import * as fromCounter from "../../store/counter/state/counter.reducer";
import * as counterActions from "../../store/counter/state/counter.actions";
import { CounterModel } from 'src/app/store/counter/counter.model';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {

  customers$: Observable<Customer[]>;
  error$: Observable<String>;
  
  counters$: Observable<CounterModel[]>;

  constructor(private store: Store<fromCustomer.AppState>,
    private storeCounter: Store<fromCounter.AppState>) { }

  ngOnInit() {        

  this.store.subscribe(x=> console.log("test store",x))    

    this.store.dispatch(new customerActions.LoadCustomers());
    this.customers$ = this.store.pipe(
      select(fromCustomer.getCustomers)
    )

    this.storeCounter.dispatch(new counterActions.LoadCounters());
    this.counters$ = this.store.pipe(
      select(fromCounter.getCounters)
    )      

    this.error$ = this.store.pipe(select(fromCustomer.getError));
  }


  deleteCustomer(customer:Customer){
    if(confirm("Are You Sure you want to Delete the User?")){
      this.store.dispatch(new customerActions.DeleteCustomer(customer.id))
    }
  }

  editCustomer(customer:Customer){
    this.store.dispatch(new customerActions.LoadCustomerSuccess(customer))
  }

}
