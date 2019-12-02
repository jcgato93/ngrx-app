import { Action } from '@ngrx/store';

const initialState = {
    customers:[
        {
            name : "John Doe",
            phone : "4654564564",
            address: "st",
            membership: "Platinum",
            id: 1
        }
    ],
    loading: false,
    loaded: true
}


export function customerReducer(state = initialState, action:Action){
    switch (action.type) {
        case "LOAD_CUSTOMER":{
            return {
                ...state,
                loading: true,
                loaded: false
            }
        }
                                    
        default:
            return state;
    }
}