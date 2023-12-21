import {List} from '@mui/material'
import React from 'react'
import {useSelector} from 'react-redux'
import {MenuListItem} from './MenuListItem'

/**
 * Represents a list of menu items displaying notes.
 *
 * @component
 * @returns {JSX.Element} The rendered MenuList component.
 */
export const MenuList = () => {
  // Retrieve notes from the Redux store
  const {notes} = useSelector((state) => state.dashboard)
  return (
    <List>
      {/* {['Enero', 'Febrero', 'Marzo', 'Abril'].map((text, index) => ( */}
      {notes.map((note, index) => (
        <MenuListItem key={index} note={note} />
      ))}
    </List>
  )
}
