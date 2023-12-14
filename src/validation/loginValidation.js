import * as Yup from 'yup'

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Formato de correo no válido.')
    .required('Correo es requerido.'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres.')
    .required('Contraseña es requerida.'),
})
