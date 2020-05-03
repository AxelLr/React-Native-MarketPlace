import React, { useState } from 'react'
import { StyleSheet, ScrollView, Text, View} from 'react-native'
// COMPONENTS 
import ImageCarousel from '../../components/ImageCarousel'
import ProductDetails from './components/ProductDetails'
import { useSelector } from 'react-redux'
import EditProductScreen from './components/editProduct'

export default function Product({ route }) {

    const onAdminView = useSelector(state => state.products.adminView)
    
    return (
        <ScrollView style={styles.container}>
            {onAdminView ? <EditProductScreen product={route.params.product}/> : <ProductDetails product={route.params.product} />   }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5'
    }
})
