import { firebase } from '@react-native-firebase/auth'
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import { GoogleSignin } from '@react-native-community/google-signin'
// TYPES
import { AUTHENTICATED, UNAUTHENTICATED, LOADED } from '../Types'
// ASYNCSTORAGE
import AsyncStorage from '@react-native-community/async-storage'

// FACEBOOK LOGIN
export function facebookLogin () {
    return async function(dispatch) {

        try {
            
        const result = await LoginManager.logInWithPermissions(['public_profile'])

        // if (result.isCancelled) {
        //     throw new Error('Autenticacíon Cancelada')
        // }

        const data = await AccessToken.getCurrentAccessToken()
    
        // if (!data) {
        //     throw new Error('Algo salió mal obteniendo el token')
        // }

        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken)

        let user = await firebase.auth().signInWithCredential(credential)
  
        await AsyncStorage.setItem('@User', JSON.stringify(user))
         
        dispatch({type: AUTHENTICATED, payload: user})
            
        } catch (error) {
            console.log(error)
        }
    }
}

// GOOGLE LOGIN
export function googleLogin() {
    return async function(dispatch) {
      
           try {

            const { accessToken, idToken } = await GoogleSignin.signIn()

              const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken)
        
              await firebase.auth().signInWithCredential(credential)
    
              dispatch({type: AUTHENTICATED})
                             
           } catch (error) {
               console.log(error)
           }   
    }
}

export const logOut = () => {
    return async function(dispatch) {
        try {
            firebase.auth().signOut()
            await AsyncStorage.removeItem('@User')
            dispatch({type: UNAUTHENTICATED})
           
        } catch (error) {
            console.log(error)            
        }
    } 
}





