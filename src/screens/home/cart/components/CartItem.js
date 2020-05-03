import React,{ useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Alert, TextInput } from 'react-native'
// ICONS
import Icon from 'react-native-vector-icons/Feather'
import Arrows from 'react-native-vector-icons/AntDesign'
// CUSTOM HOOKS 
import { useDidUpdateEffect } from '../../../../customHooks/useDidUpdateEffect'
// ACTIONS
import { removeFromCart, changeProductQuantity } from '../../../../redux/actions/UserActions'
// REDUX
import { useDispatch } from 'react-redux'

export default function CartItem({ product, cartId }) {

    const dispatch = useDispatch()

    const { productId, productName, price, quantity, description, imageURLS } = product
    
    const [ productQuantity, setProductQuantity ] = useState(quantity)
    const [ timeOut, setTimeOut ] = useState(0)

    useDidUpdateEffect(() => {
        productQuantity < 1 && setProductQuantity(1)
        timeOut && clearTimeout(timeOut)
        setTimeOut(setTimeout( () => dispatch(changeProductQuantity(productQuantity, productId, cartId)), 1500))    
    }, [productQuantity])

    let descriptionPreview = description.split(' ').slice(0, 4).join(' ')

    const deleteFromCart = () => {
        Alert.alert(`${productName} (${quantity})`, '¿Deseas eliminar este artículo del carrito?', [
            {text: 'Si', onPress: () =>  dispatch(removeFromCart(productId, cartId)) },
            {text: 'Cancelar'}
        ])
    }

    return (
        <View style={styles.cardContainer}>
        {imageURLS.slice(0,1).map((image, key) => <Image key={key} source={{uri: image}} style={styles.image} />)}
            <View style={{padding: 3}}>
                <Text>{productName}</Text>
                <Text>{descriptionPreview}...</Text>
                <Text>${price}</Text>
                <Text>Cantidad /{quantity} </Text>
                <TextInput
                  maxLength={3}
                  keyboardType='numeric'
                  value={String(productQuantity)}
                  onChangeText={(text) => setProductQuantity(text.replace(/[^0-9]/g, ''))}                
                />
         
            </View>
            <View style={{height: 40, marginLeft: 19}}> 
                <Icon.Button
                    style={styles.deleteButton}
                    name='delete'              
                    color='red'
                    backgroundColor='transparent'
                    size={30}
                    onPress={deleteFromCart}
               />
            
                <Arrows.Button
                 name='caretup'
                 onPress={() => setProductQuantity(state => state + 1)}
                />
                
                <Arrows.Button
                 disabled={productQuantity === 1}
                 style={productQuantity === 1 && { opacity: .5}}
                 name='caretdown'
                 onPress={() => setProductQuantity(state => state - 1)}
                />         
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        marginVertical: 15,
        flexDirection: 'row',
        elevation: 8,
        backgroundColor: '#e5e5e5',
        height: 100,
        width: 300
    },
    image: {
        width: 100,
        height: '100%',
        resizeMode: 'cover'
    },
     deleteButton: {
         width: '100%'
     }
})
