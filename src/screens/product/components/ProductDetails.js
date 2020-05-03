import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
// NAVIGATION
import { useNavigation } from '@react-navigation/native'
// COMPONENTS 
import RehusableButton from '../../../components/RehusableButton'
import ImageCarousel from '../../../components/ImageCarousel'
// ACTIONS
import { addToCart } from '../../../redux/actions/UserActions'
// REDUX
import { useDispatch, useSelector } from 'react-redux'

export default function ProductDetails({ product }) {

    const dispatch = useDispatch()
    const userId = useSelector(state => state.auth.loggedUser.user.uid)
    const cart = useSelector(state => state.cart.cart)
    const navigation = useNavigation()

    const { id, productName, price, quantity, description, imageURLS } = product

    const handleSubmit = () => {
        dispatch(addToCart(product, userId))
    }

    return (
        <View style={{flex: 1}}>
           <ImageCarousel selectedImages={imageURLS} />
           <View style={styles.infoContainer}> 
                <Text style={styles.name}>{productName}</Text> 
                <Text style={styles.description}>{description}</Text>
           </View>
           <View style={{flexDirection: 'row'}}> 
           <Text style={styles.price}>${price}</Text>
           </View>
           <RehusableButton 
           buttonName='Agregar al carro'
           onSubmit={handleSubmit} 
           circularProgressColor='green' 
           backgroundColor='blue'
           textColor='white'           
           />
           <TouchableWithoutFeedback onPress={ () => navigation.navigate('Cart')}><Text>go to cart</Text></TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({ 
    name: {
        fontSize: 24,
    },
    infoContainer: {
        padding: 10
    },
    price: {
        color: 'green',
        fontSize: 20,
        marginVertical: 10
    },
    description: {
        color: 'gray',
        fontSize: 12
    }
})