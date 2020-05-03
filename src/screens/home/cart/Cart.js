import React,{ useState, useCallback, useEffect } from 'react'
import { View, FlatList, Text } from 'react-native'
// NAVIGATION
import { useFocusEffect } from '@react-navigation/native'
// ACTIONS
import { getUserCart } from '../../../redux/actions/UserActions'
// REDUX 
import { useDispatch, useSelector } from 'react-redux'
// COMPONENTS
import CartItem from './components/CartItem'

export default function Cart() {

    const [loading, setLoading] = useState(false)
    const [checkOut, setCheckOut] = useState([])

    const user = useSelector(state => state.auth.loggedUser)
    const cart = useSelector(state => state.cart)

    const dispatch = useDispatch()
    
    useFocusEffect( useCallback(() => { dispatch(getUserCart(setLoading, user.user.uid)) }, []))

    useEffect(() => {
        setCheckOut(cart.cartProducts.map(prod => prod.quantity * prod.price))
    }, [cart.cartProducts])
    
    return (
        <View style={{flex: 1 }}>
            {cart.cartProducts.length === 0 && <Text> Tu carrito está vacío </Text>}
            <FlatList
                extraData={cart.cart}
                contentContainerStyle={{ flex: 1, alignItems: 'center'}}
                keyExtractor={(item) => item.productId}
                data={cart.cartProducts}
                renderItem={ ({ item }) => (
                    < CartItem product={item} cartId={cart.cart} setCheckOut={setCheckOut} />
                )}                
            /> 
            <Text>Checkout: ${ checkOut.reduce((a, b) => a + b, 0) }</Text>
        </View>
    )
}
