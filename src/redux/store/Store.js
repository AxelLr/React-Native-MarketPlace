import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// REDUCERS
import authReducer from '../reducers/AuthReducer'
import productsReducer from '../reducers/ProductsReducer'
import cartReducer from '../reducers/CartReducer'


const reducers = combineReducers ({
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer
})

const Store = createStore(reducers, applyMiddleware(thunk))

 export default Store