import * as customerActions from './customer.actions';
import { Customer } from "../customer.model";
import * as fromRoot from "../../state/app-state";
import { Action } from '@ngrx/store';
import { createFeatureSelector, createSelector } from "@ngrx/store";

import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

export interface CustomerState extends EntityState<Customer>{
    selectedCustomerId: number | null,
    loading: boolean,
    loaded: boolean,
    error: string
}

export interface AppState extends fromRoot.AppState{
    customers : CustomerState
}

export const customerAdapter:EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const defaultCustomer: CustomerState = {
    ids: [],
    entities: {},
    selectedCustomerId: null,
    loading: false,
    loaded: false,
    error: ""
}

export const initialState = customerAdapter.getInitialState(defaultCustomer);


export function customerReducer(state = initialState, action: customerActions.Action): CustomerState{
    switch (action.type) {
        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS:{
            /**
             * El siguiente codigo es igual a 
             *  
             *      state.loading = true;
             *      return state:
             */
            return {
            ...state,
            loading: true
            } 
        }

        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_SUCCESS:{
            return customerAdapter.addAll(action.payload, {
                ...state,
                loading: false,
                loaded: true
            })
        }

        case customerActions.CustomerActionTypes.LOAD_CUSTOMERS_FAIL:{
            return{
                ...state,
                entities: {},
                loading: false,
                loaded: false,
                error: action.payload
            }
        }
    
        default:{
            return state;
        }
    }
}



// Obtener el State requerido
const getCustomerFeatureState = createFeatureSelector<CustomerState>(
    "customer" // debe ser igual al que se tiene en la configuracion del module
)
 
// Selectors de propiedades especificas que se necesitan
export const getCustomers = createSelector(
    // feature
    getCustomerFeatureState ,

    //propiedad especifica que queremos obtener
    customerAdapter.getSelectors().selectAll
)

export const getCustomersLoading = createSelector(    
    getCustomerFeatureState ,   
    (state: CustomerState) => state.loading
)


export const getCustomersLoaded = createSelector(    
    getCustomerFeatureState ,   
    (state: CustomerState) => state.loaded
)

export const getError = createSelector(    
    getCustomerFeatureState ,   
    (state: CustomerState) => state.error
)
