import firestore from '@react-native-firebase/firestore'
// TYPES
import { SET_CART, ADD_PRODUCT, REMOVE_PRODUCT, UPDATE_PRODUCT_QUANTITY } from '../Types'

const db = firestore()

export function addToCart(productData, userId) {
    return async function(dispatch) {

        try { 

            let product = {
                    ...productData,
                    productId: productData.id,
                    addedAt: new Date()                                                                                                                
                }

            let getCart = db.collection('carts').where('userId', '==', userId).where('current', '==', true)
            let query = await getCart.get()
    
             if(!query.empty) { 

                let cartRef = query.docs[0] 
                let productsRef = db.collection('carts').doc(cartRef.id).collection('products')
                
                await productsRef.add(product)

                let products = (await productsRef.get()).docs
              
                let data = {
                    cart: cartRef.id,
                    products: []
                }

                products.forEach(prod => {
                    data.products.push(prod.data())
                })
                
                dispatch({type: SET_CART, payload: data})
              
             } else {
                console.log('THIS')
                
                  let cart = {
                      userId,
                      createdAt: new Date(),
                      current: true
                  }

             let cartCollectionRef = db.collection('carts')
             let cartRef = await (await cartCollectionRef.add(cart)).get()
             let prodRef = await (await cartCollectionRef.doc(cartRef.id).collection('products').add(product)).get()
                    
                data = {
                    cart: cartRef.id,
                    products: prodRef.data()
                }

                dispatch({type: ADD_PRODUCT, payload: data})   
            }    

        } catch (error) {
            console.log(error)
        }
    } 
}

export function getUserCart(setLoading, userId) {
    return async function(dispatch) {
        try {
            
            setLoading(true)
            let cart = await db.collection('carts').where('userId', '==', userId).where('current', '==', true).limit(1).get()
          
            if(!cart.empty){ 

                let data = {
                    cart: cart.docs[0].id,
                    products: []
                }

                let products = (await db.collection('carts').doc(cart.docs[0].id).collection('products').get()).docs
                products.forEach(prod => data.products.push(prod.data()))  
                
                dispatch({type: SET_CART, payload: data})
            }                    
         
            
        } catch (error) {
            console.log(error)
        }
    }
}

export function changeProductQuantity(productQuantity, productId, cartId) {
    return async function(dispatch) {

        try {
          
           const docRef = await db.collection('carts').doc(cartId).collection('products').where('productId', '==', productId).get()
           docRef.docs[0].ref.update({quantity: productQuantity})

           dispatch({type: UPDATE_PRODUCT_QUANTITY, payload: { productQuantity, productId } }) 

        } catch (error) {
            console.log(error)
        }
    }
}

export function removeFromCart(productId, cartId) {
    return async function(dispatch) {
        try {

              const response = await db.collection('carts').doc(cartId).collection('products').where('productId', '==', productId).get()

              response.forEach(doc => doc.ref.delete())

              dispatch({type: REMOVE_PRODUCT, payload: cartId})
            
        } catch (error) {
            console.log(error)
        }
    }
}


// BUY

// GET HISTORY