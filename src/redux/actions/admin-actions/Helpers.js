import uuid from 'react-native-uuid'

export function isNewImage(image) {

    let type = image.split(':')
    console.log(type[0])
    console.log(image)
    return type[0] === 'file' 
}

export function getnewImageName(image) {

    let fileExtension = image.split('.').pop()
    let fileName = `${uuid.v4()}.${fileExtension}`

    return { fileName }
}

export function getNameFromURL(image) {

    let imageName = image.split('%')[1].split('?')[0].slice(2) 

    return { imageName } 
}