import { SET_CART, ADD_PRODUCT, REMOVE_PRODUCT, UPDATE_PRODUCT_QUANTITY } from "../Types"

initialState = {
    cart: '',
    cartProducts: []
}
 
export default function (state = initialState, action) {
    switch(action.type) {
        case SET_CART: 
            return {
                cart: action.payload.cart,
                cartProducts: [ ...action.payload.products ]
            }
        case ADD_PRODUCT: 
            return {
                ...state,
                cartProducts: [...state.cartProducts, action.payload.products]
            }
        case REMOVE_PRODUCT: 
            return {
                ...state,
                cartProducts: state.cartProducts.filter(prod => {
                    prod.id !== action.payload
                })
            }
        case UPDATE_PRODUCT_QUANTITY:
            console.log(action.payload)
            console.log(state.cartProducts)
            return {
                ...state,
                cartProducts: state.cartProducts.map(prod => {
                    if(prod.productId === action.payload.productId) {
                        return { ...prod, quantity: action.payload.productQuantity }
                    }
                    return prod
                })

            }
        default: return state
    } 
}