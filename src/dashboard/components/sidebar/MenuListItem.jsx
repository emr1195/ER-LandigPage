import {TurnedInNot} from '@mui/icons-material'
import {
  Grid,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import React, {useMemo} from 'react'
import {setActiveSection} from '../../../store/dashboard'
import {useDispatch} from 'react-redux'

export const MenuListItem = ({props}) => {
  const dispatch = useDispatch()
  const {item, index} = props

  //  Handles the click event on the menu item and dispatches an action to set the active note.
  const onClickNote = () => {
    // console.log(item)
    dispatch(setActiveSection(item))
  }
  //   const newTitle = useMemo(() => {
  //     return title.length > 3 ? title.substring(0, 3) + '...' : title
  //   }, [title])

  return (
    <ListItem key={index} disablePadding>
      <ListItemButton onClick={onClickNote}>
        {/* <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon> */}
        <Grid container direction="column">
          <ListItemText primary={item.sectionTitle} />
          {/* <ListItemText secondary={note.body} /> */}
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
