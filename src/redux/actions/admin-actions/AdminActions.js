import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import uuid from 'react-native-uuid'
import { isNewImage, getNewImageName, getNameFromURL } from './Helpers'

const db = firestore()
const storageRef = storage().ref()

 export async function newProduct (product, nope, setLoading) {

        try {

           let imageURL = []
           
           setLoading(true)
             
           for await(image of product.imageURLS) {
      
            let fileExtension = image.split('.').pop()
            let fileName = `${uuid.v4()}.${fileExtension}`
            
            await storageRef.child(`images/${fileName}`).putFile(image)

            let url = await storageRef.child(`images/${fileName}`).getDownloadURL()

            imageURL.push(url)
           }

          let newProduct = {
              ...product,
              imageURLS: imageURL,
              createdAt: new Date()
          }

          await db.collection('products').add(newProduct)     
        
          setLoading(false)

         } catch (error) {
             console.log(error)
         }
 }

export async function editProduct (product, imagesToDelete, setLoading) {
    
        try {
            let imageURL = []

             setLoading(true)

            for await(image of imagesToDelete) if(!isNewImage(image)) {
                let { imageName } = getNameFromURL(image)
                await storageRef.child(`images/${imageName}`).delete() 
            }  
             
             for await(image of product.imageURLS) if(isNewImage(image)) {
                 let { fileName } = getNewImageName(image)
                 let URLRef = await storageRef.child(`images/${fileName}`).getDownloadURL()
                 imageURL.push(URLRef)
              } else {
                  imageURL.push(image)
              }

              console.log('LALALALA')

              let newVProduct = {
                  ...product,
                  imageURLS: imageURL
              }

               await db.collection('products').doc(`${product.id}`).update(newVProduct)
            
              setLoading(false)

              console.log('finished')

        } catch (err) {
            console.log(err)            
        }
}

export function deleteProducts (selectedProducts, loading) { 
    return async function(dispatch) {

        try {
            let imagesToDelete = []

             selectedProducts.forEach(product => 
             product.imageURLS.forEach(image => imagesToDelete.push(image.split('%')[1].split('?')[0].slice(2))
             ))

             for await(image of imagesToDelete) {
           
                await storageRef.child(`images/${image}`).delete()
             }

            for await(product of selectedProducts) {
                 await db.collection('products').doc(`${product.id}`).delete()
            } 
            
           console.log('finish')

        } catch (error) {
            console.log(error)
        }
    }
}

// export function addAdminClaim(email) {
//     return async function() {
//         try {
//             firebase.auth().currentUser.
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }