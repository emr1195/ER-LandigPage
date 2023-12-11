import React from 'react'
import {DashboardLayout} from '../layout/DashboardLayout'
import {NoteView, NothingSelectedView} from '../views'
import {IconButton} from '@mui/material'
import {AddOutlined} from '@mui/icons-material'

export const DashboardPage = () => {
  return (
    <DashboardLayout>
      {/* nothing selected */}
      <NothingSelectedView />
      {/* noteView */}
      {/* <NoteView /> */}

      <IconButton
        size="large"
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity: 0.8},
          position: 'fixed',
          bottom: 50,
          right: 50,
        }}
      >
        <AddOutlined sx={{fontSize: 30}} />
      </IconButton>
    </DashboardLayout>
  )
}
