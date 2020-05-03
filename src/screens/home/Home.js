import React,{ useCallback } from 'react'
import { View } from 'react-native'
// NAVIGATION 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useFocusEffect } from '@react-navigation/native'
// SCREENS
import Cart from './cart/Cart'
import Market from './market/Market'
// REDUX
import { useDispatch } from 'react-redux'
import { OUT_ADMIN_VIEW } from '../../redux/Types'

const Tab = createBottomTabNavigator()

export default function Home() {

    const dispatch = useDispatch()

    useFocusEffect(useCallback(() => {
        dispatch({type: OUT_ADMIN_VIEW})    
     }, []))

    return (
        <View style={{flex: 1 }}>

                <Tab.Navigator
                     tabBarOptions={{
                     showLabel: false
                     }}
                >    
                    <Tab.Screen 
                        name='Market' 
                        component={Market}
                        options={{tabBarIcon: ({focused, color, size}) => (
                            <Icon name='ac-unit' color={focused ? 'orange' : 'black'}  />  
                          )
                          
                        }} 
                    />
                    <Tab.Screen 
                        name='Cart' 
                        options={{tabBarIcon: ({focused, color, size}) => (
                          <Icon name='shopping-cart' color={focused ? 'orange' : 'black'} />  
                        )
                        
                        }} 
                        component={Cart}
                    />              
                </Tab.Navigator>
        </View>
    )
}
