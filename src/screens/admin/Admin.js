import React,{ useEffect, useState } from 'react'
import AddProduct from './components/AddProduct'
import { View, Text, TouchableOpacity, Button, Image, Modal, FlatList, StyleSheet } from 'react-native'
import ProductsList from './components/products-list/ProductsList'
// CAMERA
import Icon from 'react-native-vector-icons/Ionicons'
// REDUX
import { useDispatch } from 'react-redux'
import { ON_ADMIN_VIEW } from '../../redux/Types'

export default function Admin() {

  const dispatch = useDispatch()

  useEffect(() => { dispatch({type: ON_ADMIN_VIEW}) }, [])

  const [modal, setModal] = useState(false)

    return (
        <View style={styles.container}>
          <TouchableOpacity  onPress={() => setModal(!modal)} style={styles.buttonContainer} activeOpacity={0} > 
            <Icon.Button
                style={styles.addProduct}
                name='md-add-circle'                
                color='#0073b0'
                backgroundColor='transparent'
                onPress={() => setModal(!modal)}
                size={90}
                
            /> 
          </TouchableOpacity>   
         
            <Modal onRequestClose={() =>setModal(!modal)} visible={modal} animationType='slide'>
              <AddProduct setModal={setModal} />              
            </Modal>

            <ProductsList />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5e5e5'
  },
   buttonContainer: {
     position: 'absolute',
     right: 0,
     margin: 0,
     bottom: 5,
     zIndex: 10,
     borderRadius: 50    
   }
})
