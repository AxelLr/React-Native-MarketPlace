import React,{ useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Vibration, Image } from 'react-native'
// NAVIGATION 
import { useNavigation } from '@react-navigation/native'

export default function SelectableProduct(props) {

    const navigation = useNavigation()

    const { id, productName, description, quantity, imageURLS, price } = props.product
    const { selectedProducts, setSelectedProducts, onSelectMode, setSelectMode } = props

    const [ isSelected, setSelected ] = useState(false)

    let descriptionPreview = description.split(' ').slice(0, 14).join(' ')

    const checkItem = () => {
        setSelectedProducts(state => [
            ...state,
            { id, imageURLS }
        ])
    }

    const uncheckItem = () => {
        setSelectedProducts(state => state.filter(item => item.id !== id))
    }

    const selectItem = () => {
        
        if(!isSelected) {
            setSelected(true)
            setSelectMode(true)
            checkItem()
            selectedProducts.length === 0 && Vibration.vibrate(100)
        } else {
            setSelected(false)
            uncheckItem()
            selectedProducts.length === 1 && Vibration.vibrate(100)
        }
    }

    return (
        <TouchableOpacity
            style={styles.touchableContainer}
            onLongPress={selectItem} 
            onPress={onSelectMode ? selectItem : () => navigation.navigate('product', { product: props.product }) } 
            
        >
        <View style={[styles.container, { opacity: isSelected ? .2 : 1 }]}> 
        
            <View style={styles.textContainer}> 
                <Text style={styles.productName}>{productName}</Text>
                <Text>Descripción: {descriptionPreview}...</Text>
                <Text>Cantidad: {quantity}</Text>
                <Text>Precio: ${price}</Text>
            </View>
            <View style={styles.imagesContainer}> 
          {imageURLS.slice(0,1).map((image, key) => 
                <Image 
                    resizeMode='contain' 
                    key={key} 
                    source={{uri: image}}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                /> )}
          </View>  
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchableContainer: {
        backgroundColor: '#e5e5e5',
        width: '100%',
        marginTop: 30,
        display: 'flex',
        alignItems: 'center'
    },
    container: {
        backgroundColor: 'white',
        elevation: 6,
        flexDirection: 'row',
        width: '90%',
    },
    productName: {
        fontSize: 20
    },
    textContainer: {
        flexDirection: 'column',
        margin: 10,
        width: '60%'
    },
    imagesContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', 
        width: '40%'
    }
})
