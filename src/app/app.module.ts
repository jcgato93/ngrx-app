import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { StoreModule } from "@ngrx/store";
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import { HttpClientModule } from "@angular/common/http";
import { EffectsModule } from '@ngrx/effects';

import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreRouterConnectingModule, routerReducer, RouterStateSerializer } from "@ngrx/router-store";
import { CustomSerializer } from "./shared/utils";
import { environment } from 'src/environments/environment';
import { CustomersModule } from './customers/customers.module';
import { CounterStoreModule } from './store/counter/counter.store.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      router: routerReducer
    }),
    StoreRouterConnectingModule.forRoot({      
      serializer: CustomSerializer
    }),
    EffectsModule.forRoot([]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    // CustomersModule,
    // CounterStoreModule   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
