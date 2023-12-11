import {TurnedInNot} from '@mui/icons-material'
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import React from 'react'

export const MenuList = () => {
  return (
    <List>
      {['Enero', 'Febrero', 'Marzo', 'Abril'].map((text, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <TurnedInNot />
            </ListItemIcon>
            <Grid container>
              <ListItemText primary={text} />
              <ListItemText
                secondary={
                  'Laborum cupidatat enim voluptate labore occaecat irure proident do.'
                }
              />
            </Grid>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  )
}
