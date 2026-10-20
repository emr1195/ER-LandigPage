import {eventStatus, parseEventDates, formatEventDate} from './eventDates'

test('presenta fechas del calendario en español y conserva las horas', () => {
  expect(formatEventDate('2026-11-15;1-6pm')).toBe('15 de noviembre de 2026;1-6pm')
  expect(formatEventDate('2026-11-15 al 2026-11-17')).toBe('15 de noviembre de 2026 al 17 de noviembre de 2026')
  expect(formatEventDate('2 al 4 de Octubre 2026')).toBe('2 al 4 de Octubre 2026')
})

test.each([
  ['2 al 4 de Octubre 2026', '2026-10-02', '2026-10-04'],
  ['Del 2 al 4 de octubre de 2026;09:00 a. m.', '2026-10-02', '2026-10-04'],
  ['2-4 de octubre 2026', '2026-10-02', '2026-10-04'],
  ['30 de septiembre al 2 de octubre de 2026', '2026-09-30', '2026-10-02'],
  ['30 de diciembre al 2 de enero de 2027', '2026-12-30', '2027-01-02'],
  ['30 de diciembre de 2026 al 2 de enero', '2026-12-30', '2027-01-02'],
  ['2026-10-02 a 2026-10-04', '2026-10-02', '2026-10-04'],
  ['02/10/2026', '2026-10-02', '2026-10-02'],
  ['02-10-2026', '2026-10-02', '2026-10-02'],
  ['2026-10-02', '2026-10-02', '2026-10-02'],
  ['15 de Nov del 2026', '2026-11-15', '2026-11-15'],
  ['29 de febrero de 2028', '2028-02-29', '2028-02-29'],
])('interpreta %s sin conjeturas de idioma', (text, start, end) => {
  expect(parseEventDates(text)).toEqual({start, end})
})

test.each(['', undefined, 'Próximamente', 'octubre 2026', '2 al 4 de octubre', '31 de abril de 2026', '29 de febrero de 2026', '4 al 2 de octubre 2026', '2026-13-02', '02/31/2026'])('no inventa fechas para %s', (text) => {
  expect(parseEventDates(text)).toBeNull()
  expect(eventStatus(text).label).toBe('Fecha por confirmar')
})

test.each([
  ['2026-10-02T04:59:59Z', 'upcoming'],
  ['2026-10-02T05:00:00Z', 'ongoing'],
  ['2026-10-05T04:59:59Z', 'ongoing'],
  ['2026-10-05T05:00:00Z', 'finished'],
  ['2026-10-18T17:00:00Z', 'finished'],
])('usa el día de Panamá y el último día inclusivo: %s', (now, key) => {
  expect(eventStatus('2 al 4 de Octubre 2026', new Date(now)).key).toBe(key)
})
