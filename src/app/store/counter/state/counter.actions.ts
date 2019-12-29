import { Action } from '@ngrx/store'
import { CounterModel } from "../counter.model";
import { Update } from '@ngrx/entity'

export enum CounterActionTypes{
    LOAD_COUNTERS = "[Counter] Load Counters",
    LOAD_COUNTERS_SUCCESS = "[Counter] Load Counters Success",
    LOAD_COUNTERS_FAIL = "[Counter] Load Counters Fail",

    LOAD_COUNTER = "[Counter] Load Counter",
    LOAD_COUNTER_SUCCESS = "[Counter] Load Counter Success",
    LOAD_COUNTER_FAIL = "[Counter] Load Counter Fail",

    CREATE_COUNTER = "[Counter] Create Counter",
    CREATE_COUNTER_SUCCESS = "[Counter] Create Counter Success",
    CREATE_COUNTER_FAIL = "[Counter] Create Counter Fail",

    UPDATE_COUNTER = "[Counter] Update Counter",
    UPDATE_COUNTER_SUCCESS = "[Counter] Update Counter Success",
    UPDATE_COUNTER_FAIL = "[Counter] Update Counter Fail",

    DELETE_COUNTER = "[Counter] Delete Counter",
    DELETE_COUNTER_SUCCESS = "[Counter] Delete Counter Success",
    DELETE_COUNTER_FAIL = "[Counter] Delete Counter Fail",
}

export class LoadCounters implements Action{
    readonly type = CounterActionTypes.LOAD_COUNTERS
}


export class LoadCountersSuccess implements Action{
    readonly type = CounterActionTypes.LOAD_COUNTERS_SUCCESS

    constructor(public payload: CounterModel[]){}
}

export class LoadCountersFail implements Action{
    readonly type = CounterActionTypes.LOAD_COUNTERS_FAIL

    constructor(public payload: string){}
}


export class LoadCounter implements Action{
    readonly type = CounterActionTypes.LOAD_COUNTER

    constructor(public payload:string){}
}

export class LoadCounterSuccess implements Action{
    readonly type = CounterActionTypes.LOAD_COUNTER_SUCCESS

    constructor(public payload: CounterModel){}
}

export class LoadCounterFail implements Action{
    readonly type = CounterActionTypes.LOAD_COUNTER_FAIL

    constructor(public payload: string){}
}

export class CreateCounter implements Action{
    readonly type = CounterActionTypes.CREATE_COUNTER

    constructor(public payload:CounterModel){}
}

export class CreateCounterSuccess implements Action{
    readonly type = CounterActionTypes.CREATE_COUNTER_SUCCESS

    constructor(public payload: CounterModel){}
}

export class CreateCounterFail implements Action{
    readonly type = CounterActionTypes.CREATE_COUNTER_FAIL

    constructor(public payload: string){}
}



export class UpdateCounter implements Action{
    readonly type = CounterActionTypes.UPDATE_COUNTER

    constructor(public payload:CounterModel){}
}

export class UpdateCounterSuccess implements Action{
    readonly type = CounterActionTypes.UPDATE_COUNTER_SUCCESS

    constructor(public payload: Update<CounterModel>){}
}

export class UpdateCounterFail implements Action{
    readonly type = CounterActionTypes.UPDATE_COUNTER_FAIL

    constructor(public payload: string){}
}


export class DeleteCounter implements Action{
    readonly type = CounterActionTypes.DELETE_COUNTER

    constructor(public payload:string){}
}

export class DeleteCounterSuccess implements Action{
    readonly type = CounterActionTypes.DELETE_COUNTER_SUCCESS

    constructor(public payload: string){} 
}

export class DeleteCounterFail implements Action{
    readonly type = CounterActionTypes.DELETE_COUNTER_FAIL

    constructor(public payload: string){}
}



export type Actions =
    LoadCounters
    | LoadCountersSuccess
    | LoadCountersFail
    | LoadCounter
    | LoadCounterSuccess
    | LoadCounterFail
    | CreateCounter
    | CreateCounterSuccess
    | CreateCounterFail
    | UpdateCounter
    | UpdateCounterSuccess
    | UpdateCounterFail
    | DeleteCounter
    | DeleteCounterSuccess
    | DeleteCounterFail
    ;