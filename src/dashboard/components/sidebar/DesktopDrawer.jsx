import {Drawer} from '@mui/material'
import React from 'react'
import {DrawerContainer} from './DrawerContainer'

/**
 * The `DesktopDrawer` component represents the drawer for desktop-sized screens.
 * It is a permanent drawer that is always open, displaying the contents of the `DrawerContainer`.
 *
 * @component
 * @param {number} drawerWidth - The width of the drawer.
 * @example
 * // Example usage of DesktopDrawer in another component:
 * import { DesktopDrawer } from './DesktopDrawer';
 * // ...
 * return (
 *   <DesktopDrawer drawerWidth={240} />
 * );
 */
export const DesktopDrawer = ({drawerWidth}) => {
  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        display: {xs: 'none', sm: 'block'},
        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
      }}
    >
      {/* Contents of the Drawer */}
      <DrawerContainer />
    </Drawer>
  )
}
