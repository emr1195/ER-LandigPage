import {collection, getDocs} from 'firebase/firestore/lite'
import React from 'react'
import {FirebaseDB} from '../firebase/config'

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
    // Reference to the Firestore collection containing user's notes
    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`)

    // Retrieve documents (notes) from the collection
    const querySnapshot = await getDocs(collectionRef)

    // Extract notes from the query snapshot
    const notes = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    // Log the retrieved notes for demonstration purposes
    // console.log({notes})

    // Return the array of retrieved notes
    return notes
  } catch (error) {
    // Handle errors related to loading notes from the database
    throw new Error('Error loading notes from the database!', error)
  }
}
