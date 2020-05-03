import React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'

export default function LoginButton({handleLogin, name, buttonText, background, loading }) {

    return (
        <View style={{margin: 15 }}>
            <Icon.Button
                disabled={loading}
                onPress={handleLogin}
                style={{alignItems: 'center', justifyContent: 'space-evenly', height: 45, minWidth: 24}}
                name={name}
                backgroundColor={background}
            >
                {buttonText}
            </Icon.Button>
        </View>
    )
}
