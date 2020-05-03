import React,{ useState } from 'react'
import { Text, ActivityIndicator, Alert, ScrollView, TextInput, TouchableOpacity } from 'react-native'
// VALIDATION
import { productValidation } from '../util/ProductValidationSchema'
import { Formik } from 'formik'
import { globalStyles } from '../util/globalStyles'

export default function ProductForm({ onSubmitFunction, editableProduct, buttonName, imagesToDelete }) {

    const [ loading, setLoading ] = useState(false)

    return (
        <ScrollView>       
            <Formik
              enableReinitialize
              initialValues={editableProduct}
              validationSchema={productValidation}
              onSubmit={(values) => {
                
                if(editableProduct.imageURLS.length < 1) { Alert.alert('OOPS!', 'Agrega al menos una imágen al producto.', [{text: 'entendido'}]) }  
                else {
                  onSubmitFunction(values, imagesToDelete, setLoading)
                }    
            }}
            >
            {props => (
              <ScrollView contentContainerStyle={globalStyles.formContainer} >

                <TextInput
                  style={globalStyles.input}
                  placeholder='Nombre del producto'
                  onChangeText={props.handleChange('productName')}
                  value={props.values.productName}
                  onBlur={props.handleBlur('productName')} 
                />
                <Text style={globalStyles.errorText}>{props.touched.productName && props.errors.productName}</Text>
    
                <TextInput
                  keyboardType='numeric'
                  style={globalStyles.input}
                  placeholder='Precio'
                  onChangeText={props.handleChange('price')}
                  value={props.values.price}
                  onBlur={props.handleBlur('price')} 
                />
                <Text style={globalStyles.errorText}>{props.touched.price && props.errors.price}</Text>
    
                <TextInput
                  multiline 
                  style={globalStyles.input}
                  placeholder='Descripción'
                  onChangeText={props.handleChange('description')}
                  value={props.values.description}
                  onBlur={props.handleBlur('description')}
                  numberOfLines={5}
                />
                <Text style={globalStyles.errorText}>{props.touched.description && props.errors.description}</Text>

                <TextInput 
                  keyboardType='numeric'
                  style={globalStyles.input}
                  placeholder='Cantidad'
                  onChangeText={props.handleChange('quantity')}
                  value={props.values.quantity}
                  onBlur={props.handleBlur('quantity')} 
                />
                <Text style={globalStyles.errorText}>{props.touched.quantity && props.errors.quantity}</Text>
                
                <TextInput 
                  style={globalStyles.input}
                  placeholder='Categoría'
                  onChangeText={props.handleChange('category')}
                  value={props.values.category}
                  onBlur={props.handleBlur('category')} 
                />
                <Text style={globalStyles.errorText}>{props.touched.category && props.errors.category}</Text>

                <TouchableOpacity style={[globalStyles.submitButton, { opacity: loading ? .2 : 1}]} disabled={loading} onPress={props.handleSubmit}>
                  <Text style={{color: '#e5e5e5'}} > 
                    {buttonName} 
                  </Text> 
                  { loading &&  <ActivityIndicator size='small' color='0000ff' /> } 
                </TouchableOpacity>
                
              </ScrollView>
            )}
        </Formik>                 
        </ScrollView>
    )
}
