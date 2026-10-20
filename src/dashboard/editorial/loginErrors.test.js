import {loginErrorMessage} from './loginErrors'

test.each([
  {errorCode: 'INVALID_ORIGIN', errorMessage: 'Invalid origin'},
  {errorMessage: 'Invalid origin'},
  {errorMessage: 'Untrusted origin'},
])('no confunde un origen bloqueado con credenciales inválidas', (result) => {
  expect(loginErrorMessage(result)).toContain('CLIENT_ORIGIN')
  expect(loginErrorMessage(result)).not.toContain('Revisa tus datos')
})

test.each([
  {errorCode: 'INVALID_EMAIL_OR_PASSWORD', errorMessage: 'Invalid email or password'},
  {errorCode: 'INVALID_PASSWORD', errorMessage: 'Invalid password'},
  {errorMessage: 'Invalid email or password'},
])('mantiene el mensaje de credenciales incorrectas cuando corresponde', (result) => {
  expect(loginErrorMessage(result)).toBe('El correo o la contraseña no son correctos. Revisa tus datos.')
})

test('conserva los errores de permisos y distingue los límites de intentos', () => {
  expect(loginErrorMessage({errorCode: 'ADMIN_REQUIRED', errorMessage: 'Esta cuenta no tiene permiso para administrar el sitio.'})).toContain('no tiene permiso')
  expect(loginErrorMessage({errorCode: 'TOO_MANY_REQUESTS'})).toContain('demasiados intentos')
  expect(loginErrorMessage({errorMessage: 'Invalid callback URL'})).toBe('Invalid callback URL')
  expect(loginErrorMessage()).toBe('No pudimos iniciar sesión. Inténtalo de nuevo.')
})
