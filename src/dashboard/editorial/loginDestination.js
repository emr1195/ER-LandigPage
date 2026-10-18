const allowed = (value) =>
  typeof value === 'string' && /^\/dashboard(?:\/[A-Za-z]+)?$/.test(value)
export const loginDestination = ({pathname, search}) => {
  if (allowed(pathname)) return pathname
  const requested = new URLSearchParams(search).get('returnTo')
  return allowed(requested) ? requested : '/dashboard'
}
