import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Customer } from '../customer.model';
import { Observable } from "rxjs";
import * as customerActions from "../state/customer.actions";
import * as fromCustomer from "../state/customer.reducer";


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {

  customers$: Observable<Customer[]>;
  error$: Observable<String>;
  

  constructor(private store: Store<fromCustomer.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new customerActions.LoadCustomers());
    this.customers$ = this.store.pipe(
      select(fromCustomer.getCustomers)
    )

    this.error$ = this.store.pipe(select(fromCustomer.getError));
  }


  deleteCustomer(customer:Customer){
    if(confirm("Are You Sure you want to Delete the User?")){
      this.store.dispatch(new customerActions.DeleteCustomer(customer.id))
    }
  }

  editCustomer(customer:Customer){
    this.store.dispatch(new customerActions.LoadCustomer(customer.id))
  }

}
