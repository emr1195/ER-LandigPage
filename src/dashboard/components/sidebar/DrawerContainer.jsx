import {Divider, Toolbar, Typography} from '@mui/material'
import React from 'react'
import {MenuList} from './MenuList'
import {useSelector} from 'react-redux'

/**
 * The `DrawerContainer` component represents the content of the drawer in the application.
 * It includes a toolbar with the user's full name and a divider, followed by the menu list.
 *
 * @component
 * @example
 * // Example usage of DrawerContainer in another component:
 * import { DrawerContainer } from './DrawerContainer';
 * // ...
 * return (
 *   <DrawerContainer />
 * );
 */
export const DrawerContainer = () => {
  const {status, displayName} = useSelector((state) => state.auth)
  const {notes} = useSelector((state) => state.dashboard)

  return (
    <>
      {/* Toolbar with User's Full Name */}
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="div"
          textTransform="capitalize"
        >
          {displayName}
        </Typography>
      </Toolbar>

      {/* Divider */}
      <Divider />

      {/* Menu List */}
      <MenuList />
    </>
  )
}
