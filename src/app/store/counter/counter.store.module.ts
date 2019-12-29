import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CounterService } from './counter.service';
import { CounterEffect } from './state/counter.effects';
import { counterReducer } from './state/counter.reducer';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('counter',counterReducer),
    EffectsModule.forFeature([CounterEffect])   
  ],
  providers:[
    CounterService
  ]
})
export class CounterStoreModule {}