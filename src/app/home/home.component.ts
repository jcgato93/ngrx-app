import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromCustomer from "../customers/state/customer.reducer";
import { Customer } from '../customers/customer.model';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  
  error$: Observable<String>;
  customer$: Observable<Customer>

  suscriptions:Subscription[] = []

  constructor(private store: Store<fromCustomer.AppState>) { }

  ngOnInit() {    
    this.customer$ = this.store.select(
      fromCustomer.getCurrentCustomer
    )

    
    this.suscriptions.push(
      this.customer$.subscribe(customer => {
        console.log(customer, "from home")
      })
    )
  }


  ngOnDestroy(): void {
    this.suscriptions.forEach(element=> element.unsubscribe())
  }

}
