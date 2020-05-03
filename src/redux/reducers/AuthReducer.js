import { AUTHENTICATED, UNAUTHENTICATED, LOADING, LOADED } from '../Types'

initialState = {
    authenticated: false,
    loggedUser: {},
    loading: false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case AUTHENTICATED:
            return {
                ...state,
                authenticated: true,
                loggedUser: { ...action.payload }
            }   
        case UNAUTHENTICATED: 
            return {
                ...state,
                loggedUser: {},
                authenticated: false
            }
        case LOADING:
            return {
                ...state,
                loading: true
            }
        case LOADED:
            return {
                ...state,
                loading: false
            }
    default: return state
    }
}