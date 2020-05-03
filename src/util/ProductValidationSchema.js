import * as yup from 'yup'

export const productValidation = yup.object({
    productName: yup.string().required('Agrega un nombre al producto').min(6, 'El nombre es demasiado corto').max(32, 'El nombre es demasiado largo'),
    price: yup.number('Debe ser un número válido').required('Agrega un precio al producto').max(99999999),
    description: yup.string().required('Agrega una descripción al producto').min(6, 'Descripción demasiado Corta').max(200, 'La descripción es demasiado larga'),
    quantity: yup.number().required('Cantidad requerida').max(999999),
    category: yup.string().required('Agrega una categoría al producto').min(6).max(20)
})


