import * as counterActions from './counter.actions';
import { CounterModel } from "../counter.model";
import * as fromRoot from "../../../state/app-state";
import { Action } from '@ngrx/store';
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface CounterState extends EntityState<CounterModel>{
    selectedCounterId: string | null,
    loading: boolean,
    loaded: boolean,
    error: string
}

export interface AppState extends fromRoot.AppState{
    counters : CounterState
}

export const counterAdapter:EntityAdapter<CounterModel> = createEntityAdapter<CounterModel>();

export const defaultCounter: CounterState = {
    ids: [],
    entities: {},
    selectedCounterId: null,
    loading: false,
    loaded: false,
    error: ""
}

export const initialState = counterAdapter.getInitialState(defaultCounter);


export function counterReducer(state = initialState, action: counterActions.Actions): CounterState{
    switch (action.type) {
    
        case counterActions.CounterActionTypes.LOAD_COUNTERS_SUCCESS:{
            return counterAdapter.addAll(action.payload, {
                ...state,
                loading: false,
                loaded: true
            })
        }

        case counterActions.CounterActionTypes.LOAD_COUNTERS_FAIL:{
            return{
                ...state,
                entities: {},
                loading: false,
                loaded: false,
                error: action.payload
            }
        }

     
        case counterActions.CounterActionTypes.LOAD_COUNTER_SUCCESS:{
            return counterAdapter.addOne(action.payload, {
                ...state,
                selectedCounterId: action.payload.id
            })
        }

        case counterActions.CounterActionTypes.LOAD_COUNTER_FAIL:{
            return{
                ...state,               
                error: action.payload
            }
        }


        case counterActions.CounterActionTypes.CREATE_COUNTER_SUCCESS:{
            return counterAdapter.addOne(action.payload, state)
        }

        case counterActions.CounterActionTypes.CREATE_COUNTER_FAIL:{
            return{
                ...state,               
                error: action.payload
            }
        }


        case counterActions.CounterActionTypes.UPDATE_COUNTER_SUCCESS:{
            return counterAdapter.updateOne(action.payload, state)
        }

        case counterActions.CounterActionTypes.UPDATE_COUNTER_FAIL:{
            return{
                ...state,               
                error: action.payload
            }
        }


        case counterActions.CounterActionTypes.DELETE_COUNTER_SUCCESS:{
            return counterAdapter.removeOne(action.payload, state)
        }

        case counterActions.CounterActionTypes.DELETE_COUNTER_FAIL:{
            return{
                ...state,               
                error: action.payload
            }
        }
    
        default:{
            return state;
        }
    }
}



// Obtener el State requerido
const getCounterFeatureState = createFeatureSelector<CounterState>(
    "counter" // debe ser igual al que se tiene en la configuracion del module
)
 
// Selectors de propiedades especificas que se necesitan
export const getCounters = createSelector(
    // feature
    getCounterFeatureState ,

    //propiedad especifica que queremos obtener
    counterAdapter.getSelectors().selectAll
)

export const getCountersLoading = createSelector(    
    getCounterFeatureState ,   
    (state: CounterState) => state.loading
)


export const getCountersLoaded = createSelector(    
    getCounterFeatureState ,   
    (state: CounterState) => state.loaded
)

export const getError = createSelector(    
    getCounterFeatureState ,   
    (state: CounterState) => state.error
)

export const getCurrentCounterId = createSelector(
    getCounterFeatureState,
    (state:CounterState) => state.selectedCounterId
)

export const getCurrentCounter = createSelector(
    getCounterFeatureState,
    getCurrentCounterId,
    state => state.entities[state.selectedCounterId]
)