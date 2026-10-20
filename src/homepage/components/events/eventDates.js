// Parse explicit calendar dates, not Date.parse's locale-dependent guesses.
const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const endpoint = (text) => {
  let match = text.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (match) return {year: +match[1], month: +match[2], day: +match[3]}
  match = text.match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/)
  if (match) return {year: +match[3], month: +match[2], day: +match[1]}
  match = text.match(/^(\d{1,2})(?:\s+(?:de\s+)?([a-z]+)(?:\s+(?:de\s+)?(\d{4}))?)?$/)
  if (!match) return null
  const monthName = match[2] === 'setiembre' ? 'septiembre' : match[2]
  const month = monthName ? months.findIndex(name => name === monthName || name.slice(0, 3) === monthName.replace(/\.$/, '')) + 1 : undefined
  if (monthName && !month) return null
  return {day: +match[1], month, year: match[3] ? +match[3] : undefined}
}
const calendarDay = ({day, month, year}) => {
  if (!day || !month || !year || year < 1000 || month < 1 || month > 12) return null
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day ? date.toISOString().slice(0, 10) : null
}

export const parseEventDates = (value) => {
  const text = String(value || '').split(';')[0].trim().toLowerCase().replace(/^del\s+/, '').replace(/\bdel\b/g, 'de').replace(/\s+/g, ' ')
    .replace(/^(\d{1,2})\s*-\s*(\d{1,2}\s+(?:de\s+)?[a-z]+)/, '$1 al $2')
  const parts = text.split(/\s+(?:al|a|hasta)\s+|\s*[–—]\s*|\s+-\s+/)
  if (!text || parts.length > 2) return null
  const first = endpoint(parts[0])
  const last = parts.length === 2 ? endpoint(parts[1]) : first
  if (!first || !last) return null
  const start = {...first, month: first.month || last.month, year: first.year || last.year}
  const end = {...last, month: last.month || first.month, year: last.year || first.year}
  // A range spanning New Year may state the year only at one end.
  if (!first.year && last.year && start.month > end.month) start.year--
  if (!last.year && first.year && end.month < start.month) end.year++
  const startDate = calendarDay(start)
  const endDate = calendarDay(end)
  return startDate && endDate && startDate <= endDate ? {start: startDate, end: endDate} : null
}

export const eventStatus = (value, now = new Date()) => {
  const range = parseEventDates(value)
  if (!range || Number.isNaN(now.getTime())) return {key: 'unknown', label: 'Fecha por confirmar'}
  const parts = new Intl.DateTimeFormat('en', {timeZone: 'America/Panama', year: 'numeric', month: '2-digit', day: '2-digit'}).formatToParts(now)
  const part = (type) => parts.find(item => item.type === type).value
  const today = `${part('year')}-${part('month')}-${part('day')}`
  if (today < range.start) return {key: 'upcoming', label: 'Próxima', ...range}
  if (today > range.end) return {key: 'finished', label: 'Finalizada', ...range}
  return {key: 'ongoing', label: 'En curso', ...range}
}

export const formatEventDate = (value = '') => {
  const [date, ...time] = String(value).split(';')
  const range = parseEventDates(date)
  if (!range || !/^\d{4}-/.test(date)) return String(value || '')
  const format = (day) => new Intl.DateTimeFormat('es-PA', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'}).format(new Date(`${day}T12:00:00Z`))
  return format(range.start) + (range.end !== range.start ? ` al ${format(range.end)}` : '') + (time.length ? ';' + time.join(';') : '')
}
