import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function ProductItem({ product }) {

    const navigation = useNavigation()
    const { id, productName, price, quantity, description, imageURLS } = product

    return (
        <TouchableOpacity onPress={() => navigation.navigate('product', { product } )} style={styles.container}> 
           {imageURLS.slice(0, 1).map((image, key) => <Image key={key} source={{uri: image}} style={styles.image} />)}
            <View style={styles.infoContainer}>
                    <Text style={styles.title}>{productName}</Text>
                    <Text >{price}</Text>
                  
                  
                    <Text style={styles.description}>{description}...</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 250,
        margin: 10,
        backgroundColor: '#e5e5e5',
        elevation: 10
    },
    infoContainer: {
        padding: 5
    },
    title: {
        width: '100%',
        fontSize: 14,
        color: '#121212',
        fontWeight: 'bold',
        marginVertical: 5
    },
    description: {
        width: '100%',
        color: 'gray'
    },
    price:{
        color: 'green',
        marginVertical: 2
    },
    image: {
        width: '100%',
        height: '70%',
        resizeMode: 'cover'
    },
    button: {
        width: '100%',
        backgroundColor: 'red'
    }
})