import {List} from '@mui/material'
import React from 'react'
import {useSelector} from 'react-redux'
import {MenuListItem} from './MenuListItem'

const sections = [
  ['home', 'Inicio'],
  ['navbar', 'Navbar'],
  ['heroSection', 'Hero Section'],
  ['history', 'Historia'],
  ['programStructure', 'Estructura del Programa'],
  ['expeditionGroup', 'Grupos'],
  ['events', 'Eventos'],
  ['organization', 'Organización'],
  ['detachment', 'Destacamento'],
  ['footer', 'Footer'],
]

export const MenuList = () => {
  const state = useSelector((currentState) => ({
    section: currentState.dashboard.section,
    info: sections.map(([key]) => currentState[key]?.info),
  }), (previous, next) => previous.section === next.section && previous.info.every((item, index) => item === next.info[index]))
  return (
    <List aria-label="Secciones del dashboard">
      {sections.map(([sectionKey, label], index) => (
        <MenuListItem
          key={sectionKey}
          sectionKey={sectionKey}
          label={label}
          item={state.info[index] || {sectionTitle: label}}
          selected={state.section?.sectionKey === sectionKey}
        />
      ))}
    </List>
  )
}
