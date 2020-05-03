import { StyleSheet } from 'react-native'

export const globalStyles = StyleSheet.create({
    formContainer: {
        backgroundColor: '#e5e5e5',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        marginBottom: 5,
        width: '90%',
    },
    errorText: {
        color: 'red',
        fontFamily: 'nunito'
    },
    changeAuthScreen: {
        marginTop: 15,
        backgroundColor: 'red'
    },
    submitButton: {
        color: 'white',
        backgroundColor: '#04C1C8', 
        padding: 9,
        margin: 10,
        flexDirection: 'row'
    }
})