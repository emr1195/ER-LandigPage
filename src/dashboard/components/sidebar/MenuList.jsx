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

  // const {info: navbarInfo} = useSelector((state) => state.navbar)
  // const {info: heroSectionInfo} = useSelector((state) => state.heroSection)
  // const {info: historyInfo} = useSelector((state) => state.history)
  // const {info: programStructureInfo} = useSelector(
  //   (state) => state.programStructure,
  // )
  // const {info: expeditionGroupInfo} = useSelector(
  //   (state) => state.expeditionGroup,
  // )
  // const {info: eventsInfo} = useSelector((state) => state.events)
  // const {info: organizationInfo} = useSelector((state) => state.organization)
  // const {info: footerInfo} = useSelector((state) => state.footer)

  const infoArray = [
    {sectionTitle: 'Inicio'},
    useSelector((state) => state.navbar.info),
    useSelector((state) => state.heroSection.info),
    useSelector((state) => state.history.info),
    useSelector((state) => state.programStructure.info),
    useSelector((state) => state.expeditionGroup.info),
    useSelector((state) => state.events.info),
    useSelector((state) => state.organization.info),
    useSelector((state) => state.footer.info),
  ]

  // console.log(infoArray)
  return (
    <List>
      {/* {['Enero', 'Febrero', 'Marzo', 'Abril'].map((text, index) => ( */}
      {infoArray.map((item, index) => (
        // <MenuListItem key={index} note={note} />
        <MenuListItem
          key={index}
          props={{item, index}}
          // sx={{background: '#000'}}
        />
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
