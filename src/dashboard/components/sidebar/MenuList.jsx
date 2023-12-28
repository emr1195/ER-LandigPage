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
      {Menu.map((item, index) => (
        // <MenuListItem key={index} note={note} />
        <MenuListItem key={index} props={{item, index}} />
      ))}
    </List>
  )
}

const Menu = [
  'Inicio',
  'Navbar',
  'Hero Section',
  'Historia',
  'Estructura del Programa',
  'Grupos de Expedicion',
  'Eventos',
  ' Organizacion',
  ' Footer',
  'Users',
]
