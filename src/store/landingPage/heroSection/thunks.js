import {collection, getDocs} from 'firebase/firestore/lite'
import {FirebaseDB} from '../../../firebase/config'
import {setHeroSectionInfo} from './heroSectionSlice'

export const startLoadingHeroSection = () => {
  return async (dispatch, getState) => {
    try {
      // Reference to the Firestore collection containing user's notes
      const collectionRef = collection(
        FirebaseDB,
        `er_landing_page/heroSection/infoSection`,
      )

      // Retrieve documents (notes) from the collection
      const querySnapshot = await getDocs(collectionRef)

      // Extract notes from the query snapshot
      const newHeroSection = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      dispatch(setHeroSectionInfo(newHeroSection))
    } catch (error) {
      // Handle errors related to loading notes from the database
      throw new Error('Error cargando HeroSection de la DB!', error)
    }
  }
}

// export const updateListMenu = () => {
//   return async (dispatch, getState) => {
//     dispatch(setSavingNavbar())

//     const {uid, displayName} = getState().auth
//     const {listMenu: menuModified} = getState().navbar

//     // Construct the Firestore document reference for the active note
//     const docRef = doc(FirebaseDB, `notes/journal/notes/${activeNote.id}`)
//   }
// }
