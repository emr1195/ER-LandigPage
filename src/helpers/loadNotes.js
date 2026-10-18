import {getNotes} from '../repositories/notes'

/**
 * Loads notes from the Firestore database for a specified user ID (UID).
 * @param {string} uid - The user ID for which to load notes.
 * @throws {Error} If the user ID is missing or empty.
 * @returns {Promise<Array>} A promise that resolves to an array of notes retrieved from the database.
 */
export const loadNotes = async (uid = '') => {
  // Throw an error if the user ID is missing or empty
  if (!uid) throw new Error('El UID del usuario no existe!!')

  try {
    return await getNotes(uid)
  } catch (error) {
    throw new Error(`Error loading notes from the database: ${error.message}`)
  }
}
