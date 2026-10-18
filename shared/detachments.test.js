import {getDetachments, sortDetachments} from './detachments'

test('los registros sin número conservan identidades independientes al normalizar', () => {
  const info = {detachments: [{name: '', number: ''}, {name: '', number: ''}]}
  const first = getDetachments(info)
  expect(new Set(first.map((record) => record.id)).size).toBe(2)
  expect(getDetachments({detachments: first})).toEqual(first)
})

test('admite el formato antiguo aunque el nombre esté vacío', () => {
  expect(getDetachments({name: '', number: '24'})).toEqual([expect.objectContaining({name: '', number: '24'})])
})

test('ordena los números y códigos antes de los registros sin número', () => {
  const records = [{number: '', id: 'draft-a'}, {number: 'ON'}, {number: '2'}, {number: '', id: 'draft-b'}]
  expect(sortDetachments(records).map((record) => record.number)).toEqual(['2', 'ON', '', ''])
})
