import firestore from '@react-native-firebase/firestore'
import { GET_ALL_PRODUCTS, LOADING_PRODUCTS, PRODUCTS_LOADED } from '../Types'

const db = firestore()

export function getAllProducts() {
    return async function(dispatch) {

        try {

             dispatch({ type: LOADING_PRODUCTS})
   
            let products = []
            let response = await db.collection('products').orderBy('createdAt', 'desc').get()
            
            response.forEach(doc => {
              products.push({
                  ...doc.data(),
                  id: doc.id
              })  
            })

             dispatch({ type: PRODUCTS_LOADED})
            dispatch({type: GET_ALL_PRODUCTS, payload: products })   
            
        } catch (error) {
            console.log(err)
        }
    }
}


// FILTER BY CATEGORY

// ORDER BY CATEGORY

// ORDER BY DATE

// ORDER BY PRICE

// SEARCH BY NAME
