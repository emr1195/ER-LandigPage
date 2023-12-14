import * as Yup from 'yup'

export const registrationSchema = Yup.object({
  name: Yup.string().required('Nombre Completo es requerido.'),
  email: Yup.string()
    .email('Formato de correo no válido.')
    .required('Correo es requerido.'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres.')
    .required('Contraseña es requerida.'),
})
