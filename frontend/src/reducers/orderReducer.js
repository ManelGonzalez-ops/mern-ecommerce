import {ADD_ORDERDB_REQUEST, ADD_ORDERDB_SUCCESS, ADD_ORDERDB_FAIL} from "../constants/orderConstants"

export const orderReducer = (state = {currentOrder: {}}, action) =>{

    switch(action.type){

        case ADD_ORDERDB_REQUEST:
            return {loading: true}
        
        case ADD_ORDERDB_SUCCESS:
            //we add success to trigger useffect when someone add the same order twice, because react will detect the same props ans wont rerender
            return {currentOrder: action.payload, loading: false, success: true}
        
        case ADD_ORDERDB_FAIL:
            return {error: action.payload, loading: false}

        case "CLEAR_ORDER":
            return {currentOrder: {}}

        default:
            return state
    }
}
