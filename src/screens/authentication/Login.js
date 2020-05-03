import React,{ useState } from 'react'
import { Image, TextInput, View, Text, ScrollView, Button } from 'react-native'
import  { globalStyles } from '../../util/globalStyles'
// COMPONENTES
import LoginButton from './components/LoginButton'
// ACTIONS
import { facebookLogin, googleLogin, logOut } from '../../redux/actions/AuthActions'
// REDUX 
import { useDispatch } from 'react-redux'

export default function Login({ loading }) {

  const dispatch = useDispatch()
 
  const handleFacebookLogin = () => {
    dispatch(facebookLogin())
  } 

  const handleGoogleLogin = () => {
    dispatch(googleLogin())
  } 

  const handleLogout = () => {
    logOutUser()
  }

    return (
          <ScrollView contentContainerStyle={globalStyles.formContainer} >                
                <LoginButton
                  loading={loading}  
                  name='facebook-square'
                  buttonText='Iniciar sesión con Facebook'
                  handleLogin={handleFacebookLogin}
                  background="#3b5998"
                />
                <LoginButton  
                  loading={loading}
                  name='google'
                  buttonText='Iniciar sesión con Google'
                  handleLogin={handleGoogleLogin}
                  background="#4286F4"
                /> 

              <Button title='desconexion' onPress={handleLogout} /> 
          </ScrollView>
    )
}
