import React,{ useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function RadioButton({ items, cb }) {

    const [value, setValue]  = useState('')

    useEffect(() => {
        cb(value)
    }, [value])

		return (
			<View>
				{items.map((res, key) => 
					
						<View key={key} style={styles.container}>
							<Text style={styles.radioText}>{res.text}</Text>
							<TouchableOpacity
								style={styles.radioCircle}
								onPress={() => {
                                    setValue(res.order)
								}}>
                                  {value === res.order && <View style={styles.selectedRb} />}
							</TouchableOpacity>
						</View>
			    )}
			</View>
		)
}

const styles = StyleSheet.create({
	container: {
        alignItems: 'center',
        flexDirection: 'row',
		justifyContent: 'space-between',
	},
    radioText: {
        fontSize: 16,
        color: '#000',
        fontWeight: '100'
    },
	radioCircle: {
		height: 30,
		width: 30,
		borderRadius: 100,
		borderWidth: 2,
		borderColor: '#3740ff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedRb: {
		width: 15,
		height: 15,
		borderRadius: 50,
		backgroundColor: '#3740ff',
    },
    result: {
        marginTop: 20,
        color: 'white',
        fontWeight: '600',
        backgroundColor: '#F3FBFE',
    },
});