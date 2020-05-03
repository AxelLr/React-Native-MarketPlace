import React,{ useState, useEffect } from 'react'
import { View, Text} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from './src/redux/actions/DataActions'

export default function Test() {

    const dispatch = useDispatch()

     useEffect(() => {
        dispatch(getAllProducts())
    }, [])

    const [ aver, setAver] = useState([])
    console.log('RENDERIZANDOO')

    return (
        <View>
            <Text>
            TEsTTTT
            </Text>            
        </View>
    )
}
