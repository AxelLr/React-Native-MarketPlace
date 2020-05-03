import React from 'react'
import { TouchableOpacity, ActivityIndicator, Text } from 'react-native'

export default function RehusableButton({ buttonName, loading, onSubmit, circularProgressColor, backgroundColor, textColor }) {
    return (
        <TouchableOpacity style={{backgroundColor: backgroundColor, opacity: loading ? .2 : 1}} disabled={loading} onPress={onSubmit}>
        <Text style={{color: textColor}} > 
          {buttonName} 
        </Text> 
        { loading &&  <ActivityIndicator size='small' color={circularProgressColor} /> } 
      </TouchableOpacity>
    )
}
