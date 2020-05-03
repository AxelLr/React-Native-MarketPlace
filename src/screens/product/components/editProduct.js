import React,{ useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Dimensions } from 'react-native'
// COMPONENTS 
import ImageCarousel from '../../../components/ImageCarousel'
import ProductForm from '../../../components/ProductForm'
// ACTIONS 
import { editProduct } from '../../../redux/actions/admin-actions/AdminActions'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function EditProductScreen({ product }) {

     const [ storedImages, setStoredImages ] = useState([])
     const [ editableProduct, setEditableProduct ] = useState({   
        imageURLS: []
    })

     const imagesToDelete = image => {
        setStoredImages(state => [ ...state, image ])
        setEditableProduct({...editableProduct,
        imageURLS: editableProduct.imageURLS.filter(img => img !== image)
        })
     }

    useEffect(() => {
        setEditableProduct({...product})
    }, [])

    return (
        <ScrollView style={styles.container}>
          <ImageCarousel 
            selectedImages={editableProduct.imageURLS}
            onDeleteFunction={imagesToDelete}
            imageWidth={DEVICE_WIDTH}
          /> 
            < ProductForm
              imagesToDelete={storedImages}
              setEditableProduct={setEditableProduct}
              editableProduct={editableProduct}
              buttonName='Guardar Cambios'
              onSubmitFunction={editProduct}
             />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})