import React,{ useState } from 'react'
import { View, Text, Button, Image, Alert, ScrollView, TextInput, TouchableOpacity } from 'react-native'
// ACTIONS
import { newProduct } from '../../../redux/actions/admin-actions/AdminActions'
// CAMERA
import ImagePicker from 'react-native-image-crop-picker'
// COMPONENTS 
import ImageCarousel from '../../../components/ImageCarousel'
import ProductForm from '../../../components/ProductForm'

export default function AddProduct() {

    const [ editableProduct, setEditableProduct ] = useState({
      imageURLS: []
    })

  const uploadFromGalery = async (images) => {

      try {

      if(images.length >= 3) { 
        Alert.alert('error!', 'El producto solo puede contar con 3 imágenes, intenta borrar alguna antes de agregar una nueva.', [{text: 'entendido'}])
      } else {
         const image = await ImagePicker.openPicker({
          mediaType: 'photo',
          cropping: true 
        })

        setEditableProduct(state => { return {
          ...state,
          imageURLS: [...state.imageURLS, image.path]
        }
        })
      }   
      } catch (err) {
        console.log(err)
      }
  }

  const uploadFromCamera = async (images) => {
        try {

      if(images.length >= 3) { 
        Alert.alert('error!', 'El producto solo puede contar con 3 imágenes, intenta borrar una imágen existente antes de agregar una nueva.', [{text: 'entendido'}])
      } else {
         const image = await ImagePicker.openCamera({
              cropping: true 
            })
            
            setEditableProduct(state => { return {
              ...state,
              imageURLS: [...state.imageURLS, image.path]
            }
            })
      }   
      } catch (err) {
        console.log(err)
      }
  }

  const imagesToDelete = image => {

    setEditableProduct({...editableProduct,
    imageURLS: editableProduct.imageURLS.filter(img => img !== image)
    })
 }

    return (
        <ScrollView>       
            <ImageCarousel 
            selectedImages={editableProduct.imageURLS}
            onDeleteFunction={imagesToDelete}
            />

            <Button title='Seleccionar imágen desde la galería' onPress={uploadFromGalery} />
            <Button title='Tomar una foto' onPress={uploadFromCamera} />  
          
            < ProductForm
              setEditableProduct={setEditableProduct}
              editableProduct={editableProduct}
              buttonName='Agregar producto'
              onSubmitFunction={newProduct}
             />
        </ScrollView>
    )
}
