import {TurnedInNot} from '@mui/icons-material'
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import React, {useMemo} from 'react'
import {setActiveNote} from '../../../store/dashboard'
import {useDispatch} from 'react-redux'

/**
 * Represents a list item in the menu displaying note information.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {Object} props.note - The note object containing id, body, title, date, and imagesUrls.
 * @returns {JSX.Element} The rendered MenuListItem component.
 */
export const MenuListItem = ({note}) => {
  const dispatch = useDispatch()

  //  Handles the click event on the menu item and dispatches an action to set the active note.
  const onClickNote = () => {
    dispatch(setActiveNote(note))
  }
  //   const newTitle = useMemo(() => {
  //     return title.length > 3 ? title.substring(0, 3) + '...' : title
  //   }, [title])

  return (
    <ListItem key={note.id} disablePadding>
      <ListItemButton onClick={onClickNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container direction="column">
          <ListItemText primary={note.title} />
          <ListItemText secondary={note.body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  )
}

/* 
    note = {
        id: '',
        body: '',
        title: '',
        date: '',
        imagesUrls: []
    }
*/
