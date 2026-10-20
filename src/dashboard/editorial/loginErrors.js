export const loginErrorMessage = ({errorCode, errorMessage = ''} = {}) => {
  if (errorCode === 'INVALID_ORIGIN' || /invalid origin|untrusted origin/i.test(errorMessage)) {
    return 'El servidor no permite iniciar sesión desde esta dirección. Revisa CLIENT_ORIGIN y reinicia la API; no es un error de contraseña.'
  }
  if (['INVALID_EMAIL_OR_PASSWORD', 'INVALID_PASSWORD', 'INVALID_CREDENTIALS'].includes(errorCode) || /invalid (?:email or password|password|credentials)|incorrect (?:email|password)|contraseña incorrecta/i.test(errorMessage)) {
    return 'El correo o la contraseña no son correctos. Revisa tus datos.'
  }
  if (errorCode === 'TOO_MANY_REQUESTS') return 'Hay demasiados intentos de acceso. Espera un momento e inténtalo de nuevo.'
  return errorMessage || 'No pudimos iniciar sesión. Inténtalo de nuevo.'
}
