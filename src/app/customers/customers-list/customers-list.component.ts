import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Customer } from '../customer.model';
import { Observable } from "rxjs";
import * as customerActions from "../state/customer.actions";
import * as customerReducer from "../state/customer.reducer";
import * as customerSelectors from "../state/customer.selectors";


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.css'],
})
export class CustomersListComponent implements OnInit {

  customers$: Observable<Customer[]>;

  loaded$:  Observable<boolean>;

  constructor(private store: Store<customerReducer.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new customerActions.LoadCustomers());
    this.customers$ = this.store.pipe(
      select(customerSelectors.getCustomers)
    )
  }

}
