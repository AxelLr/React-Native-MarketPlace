import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
// REDUX
import { useDispatch } from 'react-redux'
// ACTIONS
import { deleteProducts } from '../../../../redux/actions/admin-actions/AdminActions'

export default function DeleteProducts({ selectedProducts }) {

    const dispatch = useDispatch()

    const handleDelete = () => {

        Alert.alert('Cuidado!','Seguro que deseas borrar los productos? esta acción es irreversible', [
            {text: 'Si', onPress: () => dispatch(deleteProducts(selectedProducts)) },
            {text: 'cancelar'}
            ])
    }

    return (
        <View style={styles.deleteProductContainer}>
            <Text style={styles.itemCount}>{selectedProducts.length}</Text> 
            <Icon.Button
                name='trash'              
                color='red'
                style={styles.deleteIcon}
                backgroundColor='transparent'
                size={40}
                onPress={handleDelete}
            />
        </View>             
    )
}

const styles = StyleSheet.create({
    deleteIcon: {
        width: '100%',
        height: '100%'
    },
    deleteProductContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'row',  
        width: '100%', 
        height: 50
    },
    itemCount: {
        color: 'red',
        fontSize: 15
    }
})
