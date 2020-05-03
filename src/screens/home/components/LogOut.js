import React from 'react'
import { View, Button } from 'react-native'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import { logOut } from '../../../redux/actions/AuthActions'
// // NAVIGATION
import { useNavigation } from '@react-navigation/native'
// REDUX
import { useDispatch } from 'react-redux'

export default function LogOut() {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logOut())
    }

    return (
        <View style={{margin: 230, flexDirection: 'row'}}>
            <Icon.Button
                name='logout'
                onPress={handleLogout}
                backgroundColor='white'
                color='black'   
            >
            </Icon.Button>
            <Button title='admin' onPress={() => navigation.navigate('admin')} />
        </View>
    )
}
