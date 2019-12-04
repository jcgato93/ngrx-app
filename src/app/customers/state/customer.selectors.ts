import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CustomerState } from './customer.reducer';


// Obtener el State requerido
const getCustomerFeatureState = createFeatureSelector<CustomerState>(
    "customer" // debe ser igual al que se tiene en la configuracion del module
)
 
// Selectors de propiedades especificas que se necesitan
export const getCustomers = createSelector(
    // feature
    getCustomerFeatureState ,

    //propiedad especifica que queremos obtener
    (state: CustomerState) => state.customers
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