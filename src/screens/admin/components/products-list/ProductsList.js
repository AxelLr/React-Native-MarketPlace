import React,{ useEffect, useState } from 'react'
import { View, FlatList } from 'react-native'
// COMPONENTS
import SelectableProduct from './SelectableProduct'
import DeleteProducts from './DeleteProducts'
// REDUX
import { useDispatch, useSelector } from 'react-redux'
// ACTIONS 
import { getAllProducts } from '../../../../redux/actions/DataActions'

export default function ProductsList() {

    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)
    const loading  = useSelector(state => state.products.loadingProducts)
    
    const [ onSelectMode, setSelectMode ] = useState(false)
    const [ selectedProducts, setSelectedProducts ] = useState([])
    
    useEffect(() => {
        dispatch(getAllProducts())
        
        return () => {
        console.log('EXITING PRODUCTS LIST')
        // ADD CANCEL REQUEST 
        }
    }, [])

    useEffect(() => {
    
    onSelectMode && selectedProducts.length === 0 && setSelectMode(false)
        
    }, [selectedProducts] )

    return (
        <View style={{flex: 1}}>
            { onSelectMode && < DeleteProducts selectedProducts={selectedProducts} /> } 
            <FlatList
                keyExtractor={(item) => item.id}
                refreshing={loading}
                onRefresh={() => dispatch(getAllProducts())}
                data={products}
                renderItem={({ item }) =>( 
                
                <SelectableProduct 
                    product={item} 
                    setSelectedProducts={setSelectedProducts}
                    selectedProducts={selectedProducts}
                    onSelectMode={onSelectMode}
                    setSelectMode={setSelectMode}
                />
            )}
            />
        </View>    
    )
}

