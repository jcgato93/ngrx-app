import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from "@ngrx/effects";
import { Action } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { map, mergeMap, catchError } from "rxjs/operators";

import { CounterService } from "../counter.service";
import * as counterActions from './counter.actions';
import { CounterModel } from "../counter.model";

@Injectable()
export class CounterEffect {
    constructor(
        private actions$: Actions,
        private counterService: CounterService
    ){}


    @Effect()
    loadCounters$: Observable<Action> = this.actions$.pipe(
        ofType<counterActions.LoadCounters>(
            counterActions.CounterActionTypes.LOAD_COUNTERS
        ),
        mergeMap((action: counterActions.LoadCounters)=>
            this.counterService.getCounters().pipe(
                map(
                    (counters: CounterModel[])=>
                    new counterActions.LoadCountersSuccess(counters)
                ),
                catchError(err => of (new counterActions.LoadCountersFail(err)))
            )
        )
    )


    @Effect()
    loadCounter$: Observable<Action> = this.actions$.pipe(
        ofType<counterActions.LoadCounter>(
            counterActions.CounterActionTypes.LOAD_COUNTER
        ),
        mergeMap((action: counterActions.LoadCounter)=>
            this.counterService.getCounterById(action.payload).pipe(
                map(
                    (counter: CounterModel)=>
                    new counterActions.LoadCounterSuccess(counter)
                ),
                catchError(err => of (new counterActions.LoadCounterFail(err)))
            )
        )
    )


    @Effect()
    createCustome$: Observable<Action> = this.actions$.pipe(
        ofType<counterActions.CreateCounter>(
            counterActions.CounterActionTypes.CREATE_COUNTER
        ),
        map((action: counterActions.CreateCounter) => action.payload),
        mergeMap((counter: CounterModel)=>
            this.counterService.createCounter(counter).pipe(
                map(
                    (newCounter: CounterModel)=>
                    new counterActions.CreateCounterSuccess(newCounter)
                ),
                catchError(err => of (new counterActions.CreateCounterFail(err)))
            )
        )
    )

    @Effect()
    updateCustome$: Observable<Action> = this.actions$.pipe(
        ofType<counterActions.UpdateCounter>(
            counterActions.CounterActionTypes.UPDATE_COUNTER
        ),
        map((action: counterActions.UpdateCounter) => action.payload),
        mergeMap((counter: CounterModel)=>
            this.counterService.updateCounter(counter).pipe(
                map(
                    (updateCounter: CounterModel)=>
                    new counterActions.UpdateCounterSuccess(
                        {
                            id: updateCounter.id,
                            changes: updateCounter
                        }
                    )
                ),
                catchError(err => of (new counterActions.UpdateCounterFail(err)))
            )
        )
    )

    @Effect()
    deleteCustome$: Observable<Action> = this.actions$.pipe(
        ofType<counterActions.DeleteCounter>(
            counterActions.CounterActionTypes.DELETE_COUNTER
        ),
        map((action: counterActions.DeleteCounter) => action.payload),
        mergeMap((id: string)=>
            this.counterService.deleteCounter(id).pipe(
                map(() => new counterActions.DeleteCounterSuccess(id)
                ),
                catchError(err => of (new counterActions.DeleteCounterFail(err)))
            )
        )
    )
}