import React,{ useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, SectionList, Text } from 'react-native'
// COMPONENTS
import ProductItem from './components/ProductItem'
import Filters from './components/Filters'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
// ACTIONS
import { getAllProducts } from '../../../redux/actions/DataActions' 
//
// import { useNavigation } from '@react-navigation/native'

export default function Market() {

    // const navigation = useNavigation()
    const dispatch = useDispatch()

    const products = useSelector(state => state.products.products)

    const [ filterableProducts, setFilterableProducts ] = useState([]) 
    const [ orderByCategory, setOrderByCategory ] = useState(false)
    const [ structuredProducts, setStructuredProducts ] = useState([])
    const [ categories, setCategories ] = useState([])

    useEffect(() => {
        dispatch(getAllProducts())
    }, [])
  
    useEffect(() => { 
        let categoriesRef = products && [...new Set([...products].map(prod => prod.category ))]     
        setFilterableProducts(products)
        setCategories(categoriesRef)
    }, [products])    

    useEffect(() => {
        let prds = []
        categories && categories.forEach(cat => prds.push( { title: cat, data: filterableProducts.filter(prod => prod.category === cat) }))
        setStructuredProducts(prds)
    }, [filterableProducts])

 
    return (
        <View style={styles.container}>
            {/* <Button title='to test' onPress={() => navigation.navigate('test')} /> */}
            <Filters 
                orderByCategory={orderByCategory}
                setOrderByCategory={setOrderByCategory}
                products={products}
                setFilterableProducts={setFilterableProducts}
                categories={categories}
            />

            { orderByCategory ? 

                <SectionList                    
                    style={{flex: 1, backgroundColor: 'red', width: '100%' }}
                    sections={structuredProducts}
                    renderItem={({ item }) => (
                        < ProductItem product={item} />
                    )}
                    renderSectionHeader={({ section }) =>
                    <Text style={styles.headerTitle}>{section.title}</Text>
                    }
                    keyExtractor={(item) => item.id}                
                />
            :   
                <FlatList      
                    numColumns={2}
                    keyExtractor={(item) => item.id}
                    data={filterableProducts}
                    renderItem={({ item }) => (
                        < ProductItem  product={item} />
                    )} 
                />    
            }
         
        </View>          
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5e5e5',
        alignItems: 'center'
    },
    headerTitle: {
        backgroundColor: '#54B7EC'
    }
})