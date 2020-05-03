import React,{ useState } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Picker } from 'react-native'
// ICONS
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
// COMPONENTS
import RadioButton from '../../../../components/RadioButton'
import CheckBox from '@react-native-community/checkbox'
import { useDidUpdateEffect } from '../../../../customHooks/useDidUpdateEffect'

export default function Filters({ categories = [], orderByCategory, setOrderByCategory, setFilterableProducts, products = [] }) { 

    const [ orderByPrice, setOrderByPrice ] = useState([
        { order: 'ASC', text: 'Ascendente' },
        { order: 'DESC', text: 'Descendente' }
    ])

    const [ pickerValue, setPickerValue ] = useState(null)

    const setByPrice = (value) => {

       value === 'ASC' ? setFilterableProducts([...products].sort((a, b) => b.price - a.price)) :
       value === 'DESC' ? setFilterableProducts([...products].sort((a, b) => a.price - b.price)) :
       setFilterableProducts([...products])
    }

    useDidUpdateEffect(() => {
        pickerValue !== 0 ? setFilterableProducts([...products].filter(prod => prod.category === pickerValue)) :
        setFilterableProducts([...products])
    }, [pickerValue])


    return (
        <View style={styles.container} >
            <Text style={styles.title}> Precio </Text>
            < RadioButton items={orderByPrice} cb={setByPrice}/>

            <TouchableHighlight activeOpacity={1} style={styles.filterButtonContainer}> 
                    <Icon.Button  
                    underlayColor='transparent'
                    style={styles.filterButton} 
                    activeOpacity={1}
                    onPress={() => console.log('JASDJAJD')}
                    name='filter-variant' 
                    backgroundColor='transparent' 
                    color='blue'
                    size={30}
                    />
            </TouchableHighlight>
          
             <View style={{flexDirection: 'row', alignItems: 'center'}} >
                <Text>
                    Ordenar por categoría
                </Text>
                <CheckBox 
                    value={orderByCategory} 
                    onChange={() => setOrderByCategory(state => !state)}
                />
             </View>
             <View style={{flexDirection: 'row', alignItems: 'center'}} >
                 <Text> Filtrar por categoría </Text>
                <Picker
                    selectedValue={pickerValue}
                    onValueChange={(value, index) => setPickerValue(value)}
                    style={{height: 50, width: 100, backgroundColor: 'green'}}
                >
                <Picker.Item label='-' value={0} />
                   {categories.map((cat, idx) => <Picker.Item key={idx} label={cat} value={cat} />)}
                </Picker>
            </View>
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'red',
        elevation: 9,
        marginBottom: 20,
        padding: 10
    },
    title: {
        fontSize: 20,
        width: '60%',
        borderBottomWidth: 1,
        borderBottomColor: 'blue'

    },
    filterButtonContainer: {
        position: 'absolute',
        right: 0
    },
    filterButton: {
        width: '100%',
        height: '100%',
        textShadowOffset:{width:5, height:2},
        shadowColor:'#121212',
        shadowOpacity:0.7
    }
})
