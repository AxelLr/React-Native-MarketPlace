import React,{ useState, useEffect, createRef } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'

const DEVICE_WIDTH = Dimensions.get('window').width

export default function ImageCarousel({ selectedImages, onDeleteFunction, deleteImages }) {

    const scrollRef = createRef()
  
    const [focusedImage, setFocusedImage] = useState(0)

      const setFocus = event => {

        const viewSize = event.nativeEvent.layoutMeasurement.width
        const focus = event.nativeEvent.contentOffset.x
        const contentFocused = Math.floor(focus / viewSize)    
        setFocusedImage(contentFocused)   
    }

    useEffect(() => {
        scrollRef.current.scrollTo({y: 0, animated: true})
        setFocusedImage(0)
    }, [selectedImages])

    return (
        <View style={style.container}>
            <ScrollView
                
                horizontal 
                pagingEnabled
                minimumZoomScale={2} 
                maximumZoomScale={5}
                onMomentumScrollEnd={setFocus}
                ref={scrollRef}
            >
            {selectedImages.map((image, key) => 
            <View key={key}>
             <Image  source={{uri: image}} style={style.singleImage} />
           { deleteImages &&<TouchableOpacity onPress={() => 
                Alert.alert('','Seguro que deseas borrar la imágen?', [
                {text: 'Si', onPress: () => onDeleteFunction(image) },
                {text: 'cancelar'}
                ])} style={style.deleteButtonContainer}><Text> Delete Image </Text></ TouchableOpacity> }  
            </View>
            )}
            </ScrollView>
            <View  style={style.BallsContainer}>
                {selectedImages.map((image, key) => < View key={key} style={[style.ball,{ opacity: key === focusedImage ? 1 : .5 }]} />          
                )}
            </View>
           
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: 350,
        width: '100%',
        backgroundColor: 'red'
    },
    singleImage: {
        width: DEVICE_WIDTH,
        height: '100%',
    },
    BallsContainer: {
        position: 'absolute',
        bottom: 10,
        height: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ball: {
        margin: 2,
        backgroundColor: 'white',
        height: 6,
        width: 6,
        borderRadius: 5
    },
    deleteButtonContainer: {
        height: 50,
        backgroundColor: 'red',
        position: 'absolute',
        right: 0
    }
})
