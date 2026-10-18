import {ListItem, ListItemButton, ListItemText} from '@mui/material'
import React from 'react'
import {useDispatch} from 'react-redux'
import {setActiveSection} from '../../../store/dashboard'
import {prepareSection} from '../../../helpers/prepareSection'

export const MenuListItem = ({item, sectionKey, label, selected}) => {
  const dispatch = useDispatch()
  return (
    <ListItem disablePadding>
      <ListItemButton
        selected={selected}
        aria-current={selected ? 'page' : undefined}
        onClick={() => dispatch(setActiveSection({...prepareSection(item), sectionKey}))}
      >
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  )
}
