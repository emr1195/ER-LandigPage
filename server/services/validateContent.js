const get = (body, path) =>
  path.split('.').reduce((value, key) => value?.[key], body)
export const contentValidationErrors = (key, body) => {
  const errors = {}
  const text = (path, message) => {
    const value = get(body, path)
    if (typeof value !== 'string' || !value.trim()) errors[path] = message
  }
  const list = (path) => {
    const value = get(body, path)
    if (
      !Array.isArray(value) ||
      value.some((row) => !row || typeof row !== 'object' || Array.isArray(row))
    ) {
      errors[path] = 'Revisa esta lista de elementos.'
      return []
    }
    if (value.length > 500)
      errors[path] = 'Se permiten hasta 500 elementos por lista.'
    return value
  }
  const rows = (path, name = 'title') => {
    const value = list(path)
    value.forEach((_, index) =>
      text(
        path + '.' + index + '.' + name,
        'Escribe un nombre para este elemento.',
      ),
    )
    return value
  }
  if (
    [
      'history',
      'programStructure',
      'expeditionGroup',
      'events',
      'organization',
    ].includes(key)
  )
    text('title', 'Escribe el título de esta sección.')
  switch (key) {
    case 'heroSection':
      text('textSection.title', 'Escribe el título principal.')
      text('textSection.description', 'Escribe la descripción de la portada.')
      rows('textSection.buttons')
      break
    case 'navbar':
      rows('listMenu')
      break
    case 'history':
      text('description', 'Escribe nuestra historia.')
      rows('infoSection')
      break
    case 'programStructure':
      rows('programValues')
      break
    case 'expeditionGroup':
      if (!rows('expeditionGroups').length)
        errors.expeditionGroups = 'Conserva al menos un grupo.'
      break
    case 'events':
      rows('events').forEach((row, index) => {
        if (typeof row.date !== 'string' || !row.date.split(';')[0].trim())
          errors['events.' + index + '.date'] = 'Escribe la fecha del evento.'
      })
      break
    case 'organization':
      for (const group of ['coorNac', 'comNac', 'teamNac', 'cmDist'])
        rows('members.' + group, 'name')
      break
    case 'footer':
      rows('mainSection.moreInfo', 'name')
      rows('menus').forEach((_, index) =>
        rows('menus.' + index + '.links', 'name'),
      )
      rows('socialMedia', 'name')
      rows('aditionalFooterInfo', 'name')
      break
  }
  const checkLinks = (value, path = '') => {
    if (Array.isArray(value)) {
      value.forEach((row, index) =>
        checkLinks(row, path ? path + '.' + index : String(index)),
      )
      return
    }
    if (!value || typeof value !== 'object') return
    for (const [name, entry] of Object.entries(value)) {
      const at = path ? path + '.' + name : name
      if (
        [
          'url',
          'logo',
          'image',
          'imageURL',
          'imageLeft',
          'imageRight',
          'emblema',
        ].includes(name) &&
        entry
      ) {
        const image = name !== 'url'
        if (typeof entry !== 'string') errors[at] = 'Usa una dirección válida.'
        else if (
          /^[a-z][a-z0-9+.-]*:/i.test(entry.trim()) &&
          !(
            image
              ? /^(https?:|data:image\/(?:png|jpeg|webp|gif|avif|svg\+xml)[;,])/i
              : /^(https?:|mailto:|tel:)/i
          ).test(entry.trim())
        )
          errors[at] = image
            ? 'Sube una imagen o usa una dirección HTTP o HTTPS.'
            : 'Usa una dirección HTTP, HTTPS, de correo o de teléfono.'
      }
      checkLinks(entry, at)
    }
  }
  checkLinks(body)
  return errors
}
