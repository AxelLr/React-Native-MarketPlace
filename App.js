import React,{ useEffect } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { config } from './config'
// SCREENS
import Login from './src/screens/authentication/Login'
import Home from './src/screens/home/Home'
import Admin from './src/screens/admin/Admin'
import Product from './src/screens/product/Product'
import Test from './Test'
// COMPONENTS 
import LogOut from './src/screens/home/components/LogOut'
// REDUX 
import { useSelector, useDispatch } from 'react-redux'
// // NAVIGATION 
 import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
 import { NavigationContainer } from '@react-navigation/native' 
// FIREBASE
import { GoogleSignin } from '@react-native-community/google-signin'
// ASYNCSTORAGE
import AsyncStorage from '@react-native-community/async-storage'
import { AUTHENTICATED, LOADING, LOADED } from './src/redux/Types'


const Stack = createStackNavigator()

const App = () => {

  let authenticated = useSelector(state => state.auth.authenticated)
  let loading = useSelector(state => state.auth.loading)
  const dispatch = useDispatch()

  useEffect(() => {
        GoogleSignin.configure({
          scopes: config.googleScopes,
          webClientId: config.googleClient 
        })
  }, [])

  useEffect(() => {
    let getUser = async () => {

      dispatch({type: LOADING})
      let user = await AsyncStorage.getItem('@User')
      if(user) { 
        console.log(user)
       dispatch({type: AUTHENTICATED, payload: JSON.parse(user)})
       dispatch({type: LOADED})
      
      } else {
        dispatch({type: LOADED})
      }
    }
    getUser()
  }, [])

  if(loading) return <View><Text> CARGANDO </Text></View>

  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <Stack.Navigator screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
          { !authenticated ? 
            <Stack.Screen options={{headerShown: false}} name='login' component={Login} /> 
            :
            <> 
              <Stack.Screen
                name='home' 
                options={{headerTitle: props => < LogOut /> }}  
                component={Home} 
              />
              <Stack.Screen
              options={{
                headerTitle: 'Admin Panel'
              }} 
                name='admin'
                component={Admin}
              />
              <Stack.Screen 
              name='product'
              component={Product}
              />
              <Stack.Screen
              name='test'
              component={Test}
              />
            </>
            } 
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  )
}

export default App
