import {apiRequest} from '../api'

const toNote = ({id, data}) => ({id, ...data})

export const getNotes = async (userId) => {
  const data = await apiRequest('/api/notes')
  return data.map(toNote)
}

export const createNote = async (userId, note) => {
  const data = await apiRequest('/api/notes', {
    method: 'POST',
    body: JSON.stringify(note),
  })
  return toNote(data)
}

export const saveNote = async (userId, note) => {
  const {id, ...noteData} = note
  await apiRequest(`/api/notes/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(noteData),
  })
}

export const deleteNote = async (userId, noteId) => {
  await apiRequest(`/api/notes/${encodeURIComponent(noteId)}`, {
    method: 'DELETE',
  })
}
