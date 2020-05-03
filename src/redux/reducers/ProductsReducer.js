import { GET_ALL_PRODUCTS, LOADING_PRODUCTS, PRODUCTS_LOADED, ON_ADMIN_VIEW, OUT_ADMIN_VIEW } from '../Types'

initialState = {
    products: [],
    loadingProducts: false,
    adminView: false
}

export default function (state = initialState, action) {
    switch(action.type) {
        case GET_ALL_PRODUCTS:
            console.log('products setted')
            return {
                ...state,
                products: [...action.payload]
            }
        case LOADING_PRODUCTS: 
        console.log('loading')
            return {
                ...state,
                loadingProducts: true
            }
        case PRODUCTS_LOADED:
            console.log('loaded')
            return {
                ...state,
                loadingProducts: false
            }
        case ON_ADMIN_VIEW:
            console.log('ON ADMIN VIEW')
            return {
                ...state,
                adminView: true
            }
        case OUT_ADMIN_VIEW:
            console.log('OUT ADMIN VIEW')
            return {
                ...state,
                adminView: false
            }
    default: return state
    }
}