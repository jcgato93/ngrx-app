import { Injectable } from '@angular/core';
import { CounterModel } from './counter.model';
import { Observable, of } from 'rxjs';

@Injectable()
export class CounterService {


    counters: CounterModel[] = [
        { id: '1', item: 1},
        { id: '2', item: 2},
        { id: '3', item: 3},
        { id: '4', item: 4},
        { id: '5', item: 5},
    ]

      getCounters(): Observable<CounterModel[]> {
        return of(this.counters);
      }
    
      getCounterById(payload: string): Observable<CounterModel> {
        return of(this.counters.find(x=> x.id == payload))
      }
    
      createCounter(payload: CounterModel): Observable<CounterModel> {
        this.counters.push(payload)
        return of(payload)
      }
    
      updateCounter(counter: CounterModel): Observable<CounterModel> {
        
        let item = this.counters.find(x=> x.id == counter.id)
        item = counter;
        return of(item);
      }
    
      deleteCounter(payload: string):Observable<string> {
        let index = this.counters.findIndex(x=> x.id == payload)
        if(index != -1){
            this.counters.slice(index,1);
        }

        return of(payload)
      }
}